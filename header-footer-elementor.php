<?php
/**
 * Plugin Name:     Header Footer Elementor
 * Plugin URI:      https://github.com/Nikschavan/header-footer-elemento
 * Description:     Create Header and Footer for your site using Elementor Page Builder.
 * Author:          Brainstorm Force, Nikhil Chavan
 * Author URI:      https://www.brainstormforce.com/
 * Text Domain:     header-footer-elementor
 * Domain Path:     /languages
 * Version:         1.0.1
 *
 * @package         header-footer-elementor
 */

/**
 * Load the class loader.
 */
require_once 'class-header-footer-elementor.php';

define( 'HFE_VER', '1.0.1' );
define( 'HFE_DIR', plugin_dir_path( __FILE__ ) );
define( 'HFE_URL', plugins_url( '/', __FILE__ ) );
define( 'HFE_PATH', plugin_basename( __FILE__ ) );

/**
 * Load the Plugin Class.
 */
function hfe_init() {
	new Header_Footer_Elementor();
}

add_action( 'plugins_loaded', 'hfe_init' );
