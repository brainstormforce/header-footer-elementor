<?php
/**
 * Mock-based PHPUnit bootstrap
 * This allows testing without loading WordPress
 */

// Define WordPress constants
define( 'ABSPATH', '/Users/akshayurankar/Local Sites/new-dashboard/app/public/' );
define( 'WP_CONTENT_DIR', ABSPATH . 'wp-content' );
define( 'WP_CONTENT_URL', 'http://new-dashboard.local/wp-content' );
define( 'WP_PLUGIN_DIR', WP_CONTENT_DIR . '/plugins' );
define( 'WP_PLUGIN_URL', WP_CONTENT_URL . '/plugins' );
define( 'WPINC', 'wp-includes' );

// Mock WordPress functions
if ( ! function_exists( 'add_action' ) ) {
	function add_action( $tag, $function, $priority = 10, $accepted_args = 1 ) {
		global $wp_filter;
		if ( ! isset( $wp_filter[ $tag ] ) ) {
			$wp_filter[ $tag ] = array();
		}
		$wp_filter[ $tag ][] = array(
			'function' => $function,
			'priority' => $priority,
			'accepted_args' => $accepted_args,
		);
	}
}

if ( ! function_exists( 'add_filter' ) ) {
	function add_filter( $tag, $function, $priority = 10, $accepted_args = 1 ) {
		add_action( $tag, $function, $priority, $accepted_args );
	}
}

if ( ! function_exists( 'apply_filters' ) ) {
	function apply_filters( $tag, $value ) {
		$args = func_get_args();
		return $value;
	}
}

if ( ! function_exists( 'do_action' ) ) {
	function do_action( $tag ) {
		global $wp_actions;
		if ( ! isset( $wp_actions ) ) {
			$wp_actions = array();
		}
		if ( ! isset( $wp_actions[ $tag ] ) ) {
			$wp_actions[ $tag ] = 1;
		} else {
			$wp_actions[ $tag ]++;
		}
	}
}

if ( ! function_exists( 'did_action' ) ) {
	function did_action( $tag ) {
		global $wp_actions;
		if ( ! isset( $wp_actions[ $tag ] ) ) {
			return 0;
		}
		return $wp_actions[ $tag ];
	}
}

if ( ! function_exists( '__' ) ) {
	function __( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( '_e' ) ) {
	function _e( $text, $domain = 'default' ) {
		echo $text;
	}
}

if ( ! function_exists( 'esc_html__' ) ) {
	function esc_html__( $text, $domain = 'default' ) {
		return htmlspecialchars( $text );
	}
}

if ( ! function_exists( 'esc_attr__' ) ) {
	function esc_attr__( $text, $domain = 'default' ) {
		return esc_attr( $text );
	}
}

if ( ! function_exists( 'esc_attr' ) ) {
	function esc_attr( $text ) {
		return htmlspecialchars( $text, ENT_QUOTES );
	}
}

if ( ! function_exists( 'esc_html' ) ) {
	function esc_html( $text ) {
		return htmlspecialchars( $text );
	}
}

if ( ! function_exists( 'wp_kses_post' ) ) {
	function wp_kses_post( $content ) {
		return $content;
	}
}

if ( ! function_exists( 'register_post_type' ) ) {
	function register_post_type( $post_type, $args = array() ) {
		global $wp_post_types;
		if ( ! is_array( $wp_post_types ) ) {
			$wp_post_types = array();
		}
		$wp_post_types[ $post_type ] = (object) $args;
		return true;
	}
}

if ( ! function_exists( 'post_type_exists' ) ) {
	function post_type_exists( $post_type ) {
		global $wp_post_types;
		return isset( $wp_post_types[ $post_type ] );
	}
}

if ( ! function_exists( 'is_admin' ) ) {
	function is_admin() {
		return false;
	}
}

if ( ! function_exists( 'plugin_dir_url' ) ) {
	function plugin_dir_url( $file ) {
		$plugin_dir = dirname( $file );
		$plugin_dir = str_replace( WP_PLUGIN_DIR, '', $plugin_dir );
		return WP_PLUGIN_URL . $plugin_dir . '/';
	}
}

if ( ! function_exists( 'plugin_dir_path' ) ) {
	function plugin_dir_path( $file ) {
		return dirname( $file ) . '/';
	}
}

if ( ! function_exists( 'plugin_basename' ) ) {
	function plugin_basename( $file ) {
		$file = str_replace( WP_PLUGIN_DIR . '/', '', $file );
		return $file;
	}
}

if ( ! function_exists( 'trailingslashit' ) ) {
	function trailingslashit( $string ) {
		return rtrim( $string, '/\\' ) . '/';
	}
}

if ( ! function_exists( 'is_plugin_active' ) ) {
	function is_plugin_active( $plugin ) {
		return true; // Mock as active
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

if ( ! function_exists( 'plugins_url' ) ) {
	function plugins_url( $path = '', $plugin = '' ) {
		if ( $plugin ) {
			$plugin_dir = dirname( $plugin );
			$plugin_dir = str_replace( WP_PLUGIN_DIR, '', $plugin_dir );
			return WP_PLUGIN_URL . $plugin_dir . '/' . ltrim( $path, '/' );
		}
		return WP_PLUGIN_URL . '/' . ltrim( $path, '/' );
	}
}

if ( ! function_exists( 'register_activation_hook' ) ) {
	function register_activation_hook( $file, $callback ) {
		// Mock implementation
	}
}

if ( ! function_exists( 'register_deactivation_hook' ) ) {
	function register_deactivation_hook( $file, $callback ) {
		// Mock implementation
	}
}

if ( ! function_exists( 'get_template' ) ) {
	function get_template() {
		return 'theme-name';
	}
}

if ( ! function_exists( 'load_plugin_textdomain' ) ) {
	function load_plugin_textdomain( $domain, $deprecated = false, $plugin_rel_path = false ) {
		return true;
	}
}

if ( ! function_exists( 'admin_url' ) ) {
	function admin_url( $path = '', $scheme = 'admin' ) {
		return 'http://example.com/wp-admin/' . ltrim( $path, '/' );
	}
}

if ( ! function_exists( 'wp_nonce_url' ) ) {
	function wp_nonce_url( $actionurl, $action = -1, $name = '_wpnonce' ) {
		return $actionurl . '&' . $name . '=nonce';
	}
}

if ( ! function_exists( 'current_user_can' ) ) {
	function current_user_can( $capability ) {
		return true; // Mock as admin
	}
}

// Define the plugin file path if not already defined
if ( ! defined( 'HFE_FILE' ) ) {
	define( 'HFE_FILE', dirname( __DIR__ ) . '/header-footer-elementor.php' );
}

// Load the plugin file
require_once HFE_FILE;

/**
 * Base test case for mock testing
 */
class HFE_Mock_Test_Case extends PHPUnit\Framework\TestCase {
	
	protected function setUp(): void {
		parent::setUp();
		// Reset globals
		global $wp_filter, $wp_post_types, $shortcode_tags;
		$wp_filter = array();
		$wp_post_types = array();
		$shortcode_tags = array();
	}
	
	protected function tearDown(): void {
		parent::tearDown();
		// Clean up globals
		global $wp_filter, $wp_post_types, $shortcode_tags;
		$wp_filter = array();
		$wp_post_types = array();
		$shortcode_tags = array();
	}
}