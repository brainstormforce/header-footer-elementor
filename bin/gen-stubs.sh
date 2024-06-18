#!/bin/bash

# Define the directories to generate stubs for
DIRECTORIES=(
    "../elementor"
)

# Output directory for stubs
OUTPUT_DIR="tests"

# Create the output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Temporary directory for storing problematic paths
PROBLEMATIC_PATHS=()

# Function to generate stubs with debugging output
generate_stubs() {
    local DIR="$1"
    local OUTPUT_FILE="$OUTPUT_DIR/$(echo $DIR | sed 's/[^a-zA-Z0-9]/_/g')-stubs.php"

    # Generate stubs with additional debugging
    echo "Generating stubs for $DIR..."
    vendor/bin/generate-stubs "$DIR" --out="$OUTPUT_FILE" 2>&1 | tee stubs_generation.log

    # Check for errors in the log
    if grep -q "Class not found" stubs_generation.log; then
        echo "Error generating stubs for $DIR. Checking for problematic paths..."
        PROBLEMATIC_PATHS+=("$DIR")
    else
        echo "Stubs generated for $DIR and saved to $OUTPUT_FILE"
    fi

    # Clean up log file
    rm stubs_generation.log
}

# Generate stubs for each directory
for DIR in "${DIRECTORIES[@]}"; do
    generate_stubs "$DIR"
done

# Output problematic paths
if [ ${#PROBLEMATIC_PATHS[@]} -gt 0 ]; then
    echo "The following paths encountered issues and may be problematic:"
    for PATH in "${PROBLEMATIC_PATHS[@]}"; do
        echo "- $PATH"
    done
fi

echo "All stubs generated successfully in $OUTPUT_DIR directory"