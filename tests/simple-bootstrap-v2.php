<?php
/**
 * Simplified PHPUnit bootstrap for Local Sites
 * This version creates a minimal WordPress environment for testing
 */

// Prevent WordPress from loading themes
define( 'WP_USE_THEMES', false );
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', false );
define( 'WP_DEBUG_DISPLAY', false );

// Set the WordPress path
$_SERVER['DOCUMENT_ROOT'] = '/Users/akshayurankar/Local Sites/new-dashboard/app/public';

// First include WordPress files
require_once '/Users/akshayurankar/Local Sites/new-dashboard/app/public/wp-includes/plugin.php';
require_once '/Users/akshayurankar/Local Sites/new-dashboard/app/public/wp-includes/functions.php';

// Mock functions that require database
if ( ! function_exists( 'get_option' ) ) {
	function get_option( $option, $default = false ) {
		return $default;
	}
}

if ( ! function_exists( 'update_option' ) ) {
	function update_option( $option, $value, $autoload = null ) {
		return true;
	}
}

if ( ! function_exists( 'get_post_meta' ) ) {
	function get_post_meta( $post_id, $key = '', $single = false ) {
		return $single ? '' : array();
	}
}

if ( ! function_exists( 'update_post_meta' ) ) {
	function update_post_meta( $post_id, $meta_key, $meta_value, $prev_value = '' ) {
		return true;
	}
}

// Define constants that the plugin expects
if ( ! defined( 'WP_CONTENT_DIR' ) ) {
	define( 'WP_CONTENT_DIR', '/Users/akshayurankar/Local Sites/new-dashboard/app/public/wp-content' );
}

if ( ! defined( 'WP_CONTENT_URL' ) ) {
	define( 'WP_CONTENT_URL', 'http://new-dashboard.local/wp-content' );
}

if ( ! defined( 'WP_PLUGIN_DIR' ) ) {
	define( 'WP_PLUGIN_DIR', WP_CONTENT_DIR . '/plugins' );
}

if ( ! defined( 'WP_PLUGIN_URL' ) ) {
	define( 'WP_PLUGIN_URL', WP_CONTENT_URL . '/plugins' );
}

// Define plugin file constant
define( 'HFE_FILE', dirname( dirname( __FILE__ ) ) . '/header-footer-elementor.php' );

// Load only the constants and basic functionality from our plugin
require_once dirname( dirname( __FILE__ ) ) . '/header-footer-elementor.php';

/**
 * Simple test case that doesn't require database
 */
class HFE_Unit_Test_Case extends PHPUnit\Framework\TestCase {
	
	protected function setUp(): void {
		parent::setUp();
		
		// Mock WordPress functions that might be called
		if ( ! function_exists( 'register_post_type' ) ) {
			function register_post_type( $post_type, $args = array() ) {
				global $wp_post_types;
				if ( ! is_array( $wp_post_types ) ) {
					$wp_post_types = array();
				}
				$wp_post_types[ $post_type ] = (object) $args;
			}
		}
		
		if ( ! function_exists( 'post_type_exists' ) ) {
			function post_type_exists( $post_type ) {
				global $wp_post_types;
				return isset( $wp_post_types[ $post_type ] );
			}
		}
		
		if ( ! function_exists( 'is_plugin_active' ) ) {
			function is_plugin_active( $plugin ) {
				return true; // Mock as active for testing
			}
		}
		
		if ( ! function_exists( 'add_shortcode' ) ) {
			function add_shortcode( $tag, $callback ) {
				global $shortcode_tags;
				if ( ! is_array( $shortcode_tags ) ) {
					$shortcode_tags = array();
				}
				$shortcode_tags[ $tag ] = $callback;
			}
		}
	}
}