<?php
/**
 * Plugin Name: Elementor Header & Footer Builder
 * Plugin URI:  https://github.com/Nikschavan/header-footer-elementor
 * Description: This powerful plugin allows creating a custom header, footer with Elementor and display them on selected locations. You can also create custom Elementor blocks and place them anywhere on the website with a shortcode.
 * Author:      Brainstorm Force, Nikhil Chavan
 * Author URI:  https://www.brainstormforce.com/
 * Text Domain: header-footer-elementor
 * Domain Path: /languages
 * Version: 1.6.15
 * Elementor tested up to: 3.15
 * Elementor Pro tested up to: 3.15
 *
 * @package         header-footer-elementor
 */

define( 'HFE_VER', '1.6.15' );
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
 */
function hfe_plugin_activation() {
	update_option( 'hfe_plugin_is_activated', 'yes' );
}

register_activation_hook( HFE_FILE, 'hfe_plugin_activation' );

/**
 * Load the Plugin Class.
 */
function hfe_init() {
	Header_Footer_Elementor::instance();
}

add_action( 'plugins_loaded', 'hfe_init' );
