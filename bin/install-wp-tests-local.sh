#!/usr/bin/env bash

# This script is specifically for Local by Flywheel environments

if [ $# -lt 3 ]; then
	echo "usage: $0 <db-name> <db-user> <db-pass> [wp-version]"
	echo ""
	echo "For Local Sites, use:"
	echo "  Database User: root"
	echo "  Database Password: root"
	echo "  Database Host: localhost with socket path"
	echo ""
	echo "Example: $0 wordpress_test root root"
	exit 1
fi

DB_NAME=$1
DB_USER=$2
DB_PASS=$3
WP_VERSION=${4-latest}

# Local Sites specific paths
LOCAL_SITE_PATH="/Users/akshayurankar/Local Sites/new-dashboard/app/public"

# Find the actual socket path - quote the path to handle spaces
SOCKET_PATTERN="/Users/akshayurankar/Library/Application Support/Local/run/*/mysql/mysqld.sock"
ACTUAL_SOCKET=$(find "/Users/akshayurankar/Library/Application Support/Local/run" -name "mysqld.sock" -type s 2>/dev/null | head -n1)

if [ -z "$ACTUAL_SOCKET" ]; then
	echo "Could not find MySQL socket for Local Sites."
	echo "Make sure Local is running and the site is started."
	exit 1
fi

echo "Using MySQL socket: $ACTUAL_SOCKET"

TMPDIR=${TMPDIR-/tmp}
TMPDIR=$(echo $TMPDIR | sed -e "s/\/$//")
WP_TESTS_DIR=${WP_TESTS_DIR-$TMPDIR/wordpress-tests-lib}
WP_CORE_DIR=${WP_CORE_DIR-$TMPDIR/wordpress}

download() {
    if [ `which curl` ]; then
        curl -s "$1" > "$2";
    elif [ `which wget` ]; then
        wget -nv -O "$2" "$1"
    fi
}

if [[ $WP_VERSION =~ ^[0-9]+\.[0-9]+\-(beta|RC)[0-9]+$ ]]; then
	WP_BRANCH=${WP_VERSION%\-*}
	WP_TESTS_TAG="branches/$WP_BRANCH"
elif [[ $WP_VERSION =~ ^[0-9]+\.[0-9]+$ ]]; then
	WP_TESTS_TAG="branches/$WP_VERSION"
elif [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0-9]+ ]]; then
	if [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0] ]]; then
		WP_TESTS_TAG="tags/${WP_VERSION%??}"
	else
		WP_TESTS_TAG="tags/$WP_VERSION"
	fi
elif [[ $WP_VERSION == 'nightly' || $WP_VERSION == 'trunk' ]]; then
	WP_TESTS_TAG="trunk"
else
	download http://api.wordpress.org/core/version-check/1.7/ $TMPDIR/wp-latest.json
	grep '[0-9]+\.[0-9]+(\.[0-9]+)?' $TMPDIR/wp-latest.json
	LATEST_VERSION=$(grep -o '"version":"[^"]*' $TMPDIR/wp-latest.json | sed 's/"version":"//')
	if [[ -z "$LATEST_VERSION" ]]; then
		echo "Latest WordPress version could not be found"
		exit 1
	fi
	WP_TESTS_TAG="tags/$LATEST_VERSION"
fi

set -ex

install_wp() {
	if [ -d $WP_CORE_DIR ]; then
		return;
	fi

	mkdir -p $WP_CORE_DIR

	if [[ $WP_VERSION == 'nightly' || $WP_VERSION == 'trunk' ]]; then
		mkdir -p $TMPDIR/wordpress-trunk
		rm -rf $TMPDIR/wordpress-trunk/*
		svn export --quiet https://core.svn.wordpress.org/trunk $TMPDIR/wordpress-trunk/wordpress
		mv $TMPDIR/wordpress-trunk/wordpress/* $WP_CORE_DIR
	else
		if [ $WP_VERSION == 'latest' ]; then
			local ARCHIVE_NAME='latest'
		elif [[ $WP_VERSION =~ [0-9]+\.[0-9]+ ]]; then
			download https://api.wordpress.org/core/version-check/1.7/ $TMPDIR/wp-latest.json
			if [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0] ]]; then
				LATEST_VERSION=${WP_VERSION%??}
			else
				local VERSION_ESCAPED=`echo $WP_VERSION | sed 's/\./\\\\./g'`
				LATEST_VERSION=$(grep -o '"version":"'$VERSION_ESCAPED'[^"]*' $TMPDIR/wp-latest.json | sed 's/"version":"//' | head -1)
			fi
			if [[ -z "$LATEST_VERSION" ]]; then
				local ARCHIVE_NAME="wordpress-$WP_VERSION"
			else
				local ARCHIVE_NAME="wordpress-$LATEST_VERSION"
			fi
		else
			local ARCHIVE_NAME="wordpress-$WP_VERSION"
		fi
		download https://wordpress.org/${ARCHIVE_NAME}.tar.gz  $TMPDIR/wordpress.tar.gz
		tar --strip-components=1 -zxmf $TMPDIR/wordpress.tar.gz -C $WP_CORE_DIR
	fi

	download https://raw.github.com/markoheijnen/wp-mysqli/master/db.php $WP_CORE_DIR/wp-content/db.php
}

install_test_suite() {
	if [[ $(uname -s) == 'Darwin' ]]; then
		local ioption='-i.bak'
	else
		local ioption='-i'
	fi

	if [ ! -d $WP_TESTS_DIR ]; then
		mkdir -p $WP_TESTS_DIR
		rm -rf $WP_TESTS_DIR/{includes,data}
		svn export --quiet --ignore-externals https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/includes/ $WP_TESTS_DIR/includes
		svn export --quiet --ignore-externals https://develop.svn.wordpress.org/${WP_TESTS_TAG}/tests/phpunit/data/ $WP_TESTS_DIR/data
	fi

	if [ ! -f "$WP_TESTS_DIR"/wp-tests-config.php ]; then
		download https://develop.svn.wordpress.org/${WP_TESTS_TAG}/wp-tests-config-sample.php "$WP_TESTS_DIR"/wp-tests-config.php
		WP_CORE_DIR=$(echo $WP_CORE_DIR | sed "s:/\+$::")
		sed $ioption "s:dirname( __FILE__ ) . '/src/':'$WP_CORE_DIR/':" "$WP_TESTS_DIR"/wp-tests-config.php
		sed $ioption "s:__DIR__ . '/src/':'$WP_CORE_DIR/':" "$WP_TESTS_DIR"/wp-tests-config.php
		sed $ioption "s/youremptytestdbnamehere/$DB_NAME/" "$WP_TESTS_DIR"/wp-tests-config.php
		sed $ioption "s/yourusernamehere/$DB_USER/" "$WP_TESTS_DIR"/wp-tests-config.php
		sed $ioption "s/yourpasswordhere/$DB_PASS/" "$WP_TESTS_DIR"/wp-tests-config.php
		
		# For Local Sites, use socket connection
		sed $ioption "s|localhost|localhost:$ACTUAL_SOCKET|" "$WP_TESTS_DIR"/wp-tests-config.php
	fi
}

create_db() {
	echo "Creating database $DB_NAME..."
	mysql --socket="$ACTUAL_SOCKET" --user="$DB_USER" --password="$DB_PASS" --execute="CREATE DATABASE IF NOT EXISTS $DB_NAME DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
}

drop_db() {
	echo "Dropping database $DB_NAME..."
	mysql --socket="$ACTUAL_SOCKET" --user="$DB_USER" --password="$DB_PASS" --execute="DROP DATABASE IF EXISTS $DB_NAME;"
}

install_db() {
	# Check if database exists
	DB_EXISTS=$(mysql --socket="$ACTUAL_SOCKET" --user="$DB_USER" --password="$DB_PASS" --skip-column-names --batch --execute="SHOW DATABASES LIKE '$DB_NAME';" 2>/dev/null || echo "")
	
	if [ ! -z "$DB_EXISTS" ]; then
		echo "Test database ($DB_NAME) already exists."
		read -p 'Do you want to recreate it? [y/N]: ' RECREATE_DB
		
		case "$RECREATE_DB" in
			[yY][eE][sS]|[yY])
				drop_db
				create_db
				echo "Database recreated."
				;;
			*)
				echo "Using existing database."
				;;
		esac
	else
		create_db
		echo "Database created."
	fi
}

echo "Installing WordPress test suite for Local Sites environment..."
echo "Socket: $ACTUAL_SOCKET"

install_wp
install_test_suite
install_db

echo "Done! WordPress test suite is ready."
echo ""
echo "To run PHPUnit tests, use:"
echo "  composer test"
echo ""
echo "Note: Make sure your Local site is running when executing tests."