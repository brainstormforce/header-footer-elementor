<?php
/**
 * Plugin Name: BSF UTM Analytics
 * Description: It is a started and simple which helps you to speedup the process.
 * Author: brainstormforce
 * Version: 0.0.6
 * License: GPL v2
 * Text Domain: bsf-utm-analytics
 *
 * @package bsf-utm-analytics
 */

/**
 * Set constants
 */
define( 'BSF_UTM_ANALYTICS_FILE', __FILE__ );
define( 'BSF_UTM_ANALYTICS_BASE', plugin_basename( BSF_UTM_ANALYTICS_FILE ) );
define( 'BSF_UTM_ANALYTICS_DIR', plugin_dir_path( BSF_UTM_ANALYTICS_FILE ) );
define( 'BSF_UTM_ANALYTICS_URL', plugins_url( '/', BSF_UTM_ANALYTICS_FILE ) );
define( 'BSF_UTM_ANALYTICS_VER', '0.0.6' );
define( 'BSF_UTM_ANALYTICS_REFERER_OPTION', 'bsf_product_referers' );

require_once 'plugin-loader.php';
