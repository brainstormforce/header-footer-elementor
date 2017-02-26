<?php
/**
 * Plugin Name:     Elementor Header Footer
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          Nikhil Chavan
 * Author URI:      https://www.nikhilchavan.com
 * Text Domain:     header-footer-elementor
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         header-footer-elementor
 */

/**
 * Load the class loader.
 */
require_once 'class-header-footer-elementor.php';

define( 'HFE_VER', '0.1.0' );
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
