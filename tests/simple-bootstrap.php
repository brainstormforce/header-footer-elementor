<?php
/**
 * Simple PHPUnit bootstrap for Local Sites
 *
 * This bootstrap loads WordPress from your Local Sites installation directly.
 */

// Define test configuration
define( 'WP_USE_THEMES', false );
define( 'WP_TESTS_FORCE_KNOWN_BUGS', false );

// Local Sites WordPress path
$wordpress_path = '/Users/akshayurankar/Local Sites/new-dashboard/app/public';

// Change to WordPress directory
chdir( $wordpress_path );

// Load WordPress
require_once $wordpress_path . '/wp-load.php';

// Load the plugin
require_once dirname( dirname( __FILE__ ) ) . '/header-footer-elementor.php';

// Activate plugins needed for testing
if ( ! function_exists( 'activate_plugin' ) ) {
	require_once $wordpress_path . '/wp-admin/includes/plugin.php';
}

// Activate Elementor if available
if ( file_exists( $wordpress_path . '/wp-content/plugins/elementor/elementor.php' ) ) {
	activate_plugin( 'elementor/elementor.php' );
}

// Activate our plugin
activate_plugin( 'header-footer-elementor/header-footer-elementor.php' );

// Set up test environment
global $wp_rewrite;
$wp_rewrite->init();
$wp_rewrite->flush_rules();

// Create test user
$user_id = wp_create_user( 'test_admin', 'test_pass', 'test@example.com' );
if ( ! is_wp_error( $user_id ) ) {
	$user = new WP_User( $user_id );
	$user->set_role( 'administrator' );
	wp_set_current_user( $user_id );
}

/**
 * Base test case for simple testing
 */
class HFE_Simple_Test_Case extends PHPUnit\Framework\TestCase {
	
	protected function setUp(): void {
		parent::setUp();
		
		// Start transaction
		global $wpdb;
		$wpdb->query( 'START TRANSACTION' );
	}
	
	protected function tearDown(): void {
		// Rollback transaction
		global $wpdb;
		$wpdb->query( 'ROLLBACK' );
		
		parent::tearDown();
	}
	
	/**
	 * Create a test HFE template
	 */
	protected function create_hfe_template( $type = 'header', $args = array() ) {
		$defaults = array(
			'post_type'   => 'elementor-hf',
			'post_status' => 'publish',
			'post_title'  => 'Test ' . ucfirst( $type ),
			'meta_input'  => array(
				'ehf_template_type' => $type,
			),
		);
		
		$args = wp_parse_args( $args, $defaults );
		return wp_insert_post( $args );
	}
}