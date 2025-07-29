<?php
/**
 * PHPUnit bootstrap file for Local Sites environment
 *
 * @package Header_Footer_Elementor
 */

// Get Local Sites MySQL socket path
$socket_pattern = '/Users/' . get_current_user() . '/Library/Application Support/Local/run/*/mysql/mysqld.sock';
$sockets = glob( $socket_pattern );
$socket = ! empty( $sockets ) ? $sockets[0] : '';

if ( empty( $socket ) ) {
	echo "Error: Could not find Local Sites MySQL socket. Make sure Local is running.\n";
	exit( 1 );
}

// Set database connection constants for Local Sites
define( 'DB_NAME', getenv( 'WP_TESTS_DB_NAME' ) ?: 'wordpress_test' );
define( 'DB_USER', getenv( 'WP_TESTS_DB_USER' ) ?: 'root' );
define( 'DB_PASSWORD', getenv( 'WP_TESTS_DB_PASS' ) ?: 'root' );
define( 'DB_HOST', 'localhost:' . $socket );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
	echo "Could not find $_tests_dir/includes/functions.php\n";
	echo "Have you run bin/install-wp-tests-local.sh?\n";
	exit( 1 );
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	// Load Elementor if available in the Local Sites installation
	$local_site_path = '/Users/akshayurankar/Local Sites/new-dashboard/app/public';
	$elementor_path = $local_site_path . '/wp-content/plugins/elementor/elementor.php';
	
	if ( file_exists( $elementor_path ) ) {
		require $elementor_path;
	} else {
		// Try relative path
		$elementor_path = dirname( dirname( dirname( __FILE__ ) ) ) . '/elementor/elementor.php';
		if ( file_exists( $elementor_path ) ) {
			require $elementor_path;
		}
	}

	// Load our plugin
	require dirname( dirname( __FILE__ ) ) . '/header-footer-elementor.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';