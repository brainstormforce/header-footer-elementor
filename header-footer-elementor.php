<?php
/**
 * Plugin Name: Elementor Header & Footer Builder
 * Plugin URI:  https://github.com/Nikschavan/header-footer-elementor
 * Description: This powerful plugin allows creating a custom header, footer with Elementor and display them on selected locations. You can also create custom Elementor blocks and place them anywhere on the website with a shortcode.
 * Author:      Brainstorm Force, Nikhil Chavan
 * Author URI:  https://www.brainstormforce.com/
 * Text Domain: header-footer-elementor
 * Domain Path: /languages
 * Version: 1.6.46
 * Elementor tested up to: 3.25
 * Elementor Pro tested up to: 3.25
 *
 * @package         header-footer-elementor
 */

define( 'HFE_VER', '1.6.46' );
define( 'HFE_FILE', __FILE__ );
define( 'HFE_DIR', plugin_dir_path( __FILE__ ) );
define( 'HFE_URL', plugins_url( '/', __FILE__ ) );
define( 'HFE_PATH', plugin_basename( __FILE__ ) );
define( 'HFE_DOMAIN', trailingslashit( 'https://ultimateelementor.com' ) );

/**
 * Load the class loader.
 */
require_once HFE_DIR . '/inc/class-header-footer-elementor.php';

/**
 * Load the Plugin Class.
 *
 * @return void
 */
function hfe_plugin_activation() {
	update_option( 'hfe_plugin_is_activated', 'yes' );
}

register_activation_hook( HFE_FILE, 'hfe_plugin_activation' );

/**
 * Load the Plugin Class.
 *
 * @return void
 */
function hfe_init() {
	Header_Footer_Elementor::instance();
}

add_action( 'plugins_loaded', 'hfe_init' );

/** Function for FA5, Social Icons, Icon List */
function hfe_enqueue_font_awesome() {

	if ( class_exists( 'Elementor\Plugin' ) ) {
		
		wp_enqueue_style(
			'hfe-icons-list',
			plugins_url( '/elementor/assets/css/widget-icon-list.min.css', 'elementor' ),
			[],
			'3.24.3'
		);
		wp_enqueue_style(
			'hfe-social-icons',
			plugins_url( '/elementor/assets/css/widget-social-icons.min.css', 'elementor' ),
			[],
			'3.24.0'
		);
		wp_enqueue_style(
			'hfe-social-share-icons-brands',
			plugins_url( '/elementor/assets/lib/font-awesome/css/brands.css', 'elementor' ),
			[],
			'5.15.3'
		);

		wp_enqueue_style(
			'hfe-social-share-icons-fontawesome',
			plugins_url( '/elementor/assets/lib/font-awesome/css/fontawesome.css', 'elementor' ),
			[],
			'5.15.3'
		);
		wp_enqueue_style(
			'hfe-nav-menu-icons',
			plugins_url( '/elementor/assets/lib/font-awesome/css/solid.css', 'elementor' ),
			[],
			'5.15.3'
		);
	}
	if ( class_exists( '\ElementorPro\Plugin' ) ) {
		wp_enqueue_style(
			'hfe-widget-blockquote',
			plugins_url( '/elementor-pro/assets/css/widget-blockquote.min.css', 'elementor' ),
			[],
			'3.25.0'
		);
	}
}
add_action( 'wp_enqueue_scripts', 'hfe_enqueue_font_awesome', 20 );
