<?php
/**
 * WordPress test configuration for Local Sites
 *
 * This configuration uses the existing WordPress database with test tables.
 */

// Local Sites database configuration
define( 'DB_NAME', 'local' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', 'root' );

// Find Local Sites MySQL socket
$socket_paths = glob( '/Users/akshayurankar/Library/Application Support/Local/run/*/mysql/mysqld.sock' );
if ( ! empty( $socket_paths ) ) {
	define( 'DB_HOST', 'localhost:' . $socket_paths[0] );
} else {
	// Fallback to default
	define( 'DB_HOST', 'localhost' );
}

define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// Use test table prefix to avoid conflicts
$table_prefix = 'wptests_';

// WordPress Test Suite configuration
define( 'WP_TESTS_DOMAIN', 'example.org' );
define( 'WP_TESTS_EMAIL', 'admin@example.org' );
define( 'WP_TESTS_TITLE', 'Test Blog' );
define( 'WP_PHP_BINARY', 'php' );
define( 'WPLANG', '' );

// Path to WordPress installation
define( 'ABSPATH', '/Users/akshayurankar/Local Sites/new-dashboard/app/public/' );