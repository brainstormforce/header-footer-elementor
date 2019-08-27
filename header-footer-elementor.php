<?php
/**
 * Plugin Name:     Elementor - Header, Footer & Blocks
 * Plugin URI:      https://github.com/Nikschavan/header-footer-elementor
 * Description:     Create Header and Footer for your site using Elementor Page Builder.
 * Author:          Brainstorm Force, Nikhil Chavan
 * Author URI:      https://www.brainstormforce.com/
 * Text Domain:     header-footer-elementor
 * Domain Path:     /languages
 * Version:         1.1.4
 *
 * @package         header-footer-elementor
 */

define( 'HFE_VER', '1.1.4' );
define( 'HFE_DIR', plugin_dir_path( __FILE__ ) );
define( 'HFE_URL', plugins_url( '/', __FILE__ ) );
define( 'HFE_PATH', plugin_basename( __FILE__ ) );

/**
 * Load the class loader.
 */
require_once HFE_DIR . '/inc/class-header-footer-elementor.php';

/**
 * Load the Plugin Class.
 */
function hfe_init() {
	new Header_Footer_Elementor();
}

add_action( 'plugins_loaded', 'hfe_init' );
