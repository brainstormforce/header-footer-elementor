<?php
/**
 * PHPUnit bootstrap file
 *
 * @package Astra_Notices
 */

// Composer autoloader must be loaded before WP_PHPUNIT__DIR will be available
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

/**
 * Load PHPUnit Polyfills for the WP testing suite.
 *
 * @see https://github.com/WordPress/wordpress-develop/pull/1563/
 */
define( 'WP_TESTS_PHPUNIT_POLYFILLS_PATH', dirname( __DIR__, 2 ) . '/vendor/yoast/phpunit-polyfills/phpunitpolyfills-autoload.php' );

// Give access to tests_add_filter() function.
require_once getenv( 'WP_PHPUNIT__DIR' ) . '/includes/functions.php';

tests_add_filter(
	'muplugins_loaded',
	function() {
		require dirname( dirname( __FILE__ ) ) . '/class-astra-notices.php';
	}
);

// Start up the WP testing environment.
require getenv( 'WP_PHPUNIT__DIR' ) . '/includes/bootstrap.php';
