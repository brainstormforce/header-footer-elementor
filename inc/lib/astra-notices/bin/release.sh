#!/bin/bash -e
#
# Deploy your branch.
#

DEPLOY_SUFFIX="${DEPLOY_SUFFIX:--built}"
GIT_USER="${DEPLOY_GIT_USER:-GitHub Actions}"
GIT_EMAIL="${DEPLOY_GIT_EMAIL:-hello@bsf.io}"

BRANCH="${GITHUB_REF:-master}"
SRC_DIR="$PWD"
BUILD_DIR="/tmp/brainstormforce-build"

if [[ -d "$BUILD_DIR" ]]; then
	echo "WARNING: ${BUILD_DIR} already exists. You may have accidentally cached this"
	echo "directory. This will cause issues with deploying."
	exit 1
fi

COMMIT=$(git rev-parse HEAD)
VERSION=$(grep 'private static $version = ' class-astra-notices.php | grep -oEi "'([0-9\.a-z\+-]+)';$" | sed "s/'//g; s/;//")

if [[ $VERSION != "null" ]]; then
    DEPLOY_BRANCH="release/${VERSION}"
    DEPLOY_AS_RELEASE="${DEPLOY_AS_RELEASE:-yes}"
else
    DEPLOY_BRANCH="${BRANCH}${DEPLOY_SUFFIX}"
    DEPLOY_AS_RELEASE="${DEPLOY_AS_RELEASE:-no}"
fi

echo "Deploying $BRANCH to $DEPLOY_BRANCH"

# If the deploy branch doesn't already exist, create it from the empty root.
if ! git rev-parse --verify "remotes/origin/$DEPLOY_BRANCH" >/dev/null 2>&1; then
	echo -e "\nCreating $DEPLOY_BRANCH..."
	git worktree add --detach "$BUILD_DIR"
	cd "$BUILD_DIR"
	git checkout --orphan "$DEPLOY_BRANCH"
else
	echo "Using existing $DEPLOY_BRANCH"
	git worktree add --detach "$BUILD_DIR" "remotes/origin/$DEPLOY_BRANCH"
	cd "$BUILD_DIR"
	git checkout "$DEPLOY_BRANCH"
fi

# Ensure we're in the right dir
cd "$BUILD_DIR"

# Remove existing files
git rm -rfq .

# Sync built files
echo -e "\nSyncing files..."

rsync -av "$SRC_DIR/" "$BUILD_DIR" --exclude-from "$SRC_DIR/.distignore"

# Add changed files
git add .

if [ -z "$(git status --porcelain)" ]; then
	echo "No changes to built files."
	exit
fi

# Print status!
echo -e "\nSynced files. Changed:"
git status -s

# Double-check our user/email config
if ! git config user.email; then
	git config user.name "$GIT_USER"
	git config user.email "$GIT_EMAIL"
fi

# Commit it.
MESSAGE=$( printf 'Build changes from %s\n\n%s' "${COMMIT}" "${CIRCLE_BUILD_URL}" )
git commit -m "$MESSAGE"

# Push it (real good).
git push origin "$DEPLOY_BRANCH"

# Make a release if one doesn't exist.
if [[ $DEPLOY_AS_RELEASE = "yes" && $(git tag -l "$VERSION") != $VERSION ]]; then
    git tag "$VERSION"
    git push origin "$VERSION"
    echo "BRAINSTORM_FORCE_RELEASE=$VERSION" >> $GITHUB_ENV
fi