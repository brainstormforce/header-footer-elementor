<?php
/**
 * Plugin Name: Ultimate Addons for Elementor Lite
 * Plugin URI:  https://wordpress.org/plugins/header-footer-elementor/
 * Description: Formerly known as "Elementor Header & Footer Builder", this powerful plugin allows you to create custom headers and footers with Elementor and display them in selected locations. You can also create custom Elementor blocks and place them anywhere on your website using a shortcode.
 * Author:      Brainstorm Force
 * Author URI:  https://www.brainstormforce.com/
 * Text Domain: header-footer-elementor
 * Domain Path: /languages
 * Version: 2.1.0
 * Elementor tested up to: 3.27
 * Elementor Pro tested up to: 3.27
 *
 * @package         header-footer-elementor
 */

define( 'HFE_VER', '2.1.0' );
define( 'HFE_FILE', __FILE__ );
define( 'HFE_DIR', plugin_dir_path( __FILE__ ) );
define( 'HFE_URL', plugins_url( '/', __FILE__ ) );
define( 'HFE_PATH', plugin_basename( __FILE__ ) );
define( 'HFE_DOMAIN', trailingslashit( 'https://ultimateelementor.com' ) );
define( 'UAE_LITE', true );

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

add_action( 'plugins_loaded', 'load_hfe_textdomain' );

/**
 * Loads textdomain for the plugin.
 *
 * @return void
 */
function load_hfe_textdomain() {
	// load_plugin_textdomain( 'header-footer-elementor' );

	// Default languages directory for "header-footer-elementor".
	$lang_dir = HFE_DIR . 'languages/';

	/**
	 * Filters the languages directory path to use for AffiliateWP.
	 *
	 * @param string $lang_dir The languages directory path.
	 */
	$lang_dir = apply_filters( 'hfe_languages_directory', $lang_dir );

	// Traditional WordPress plugin locale filter.
	global $wp_version;

	$get_locale = get_locale();

	if ( $wp_version >= 4.7 ) {
		$get_locale = get_user_locale();
	}

	/**
	 * Language Locale for Ultimate Elementor
	 *
	 * @var $get_locale The locale to use. Uses get_user_locale()` in WordPress 4.7 or greater,
	 *                  otherwise uses `get_locale()`.
	 */
	$locale = apply_filters( 'plugin_locale', $get_locale, 'header-footer-elementor' );
	$mofile = sprintf( '%1$s-%2$s.mo', 'header-footer-elementor', $locale );

	// Setup paths to current locale file.
	$mofile_local  = $lang_dir . $mofile;
	$mofile_global = WP_LANG_DIR . '/header-footer-elementor/' . $mofile;

	// if ( file_exists( $mofile_global ) ) {
	// 	// Look in global /wp-content/languages/header-footer-elementor/ folder.
	// 	load_textdomain( 'header-footer-elementor', $mofile_global );
	// } else
	if ( file_exists( $mofile_local ) ) {

		error_log( 'mofile_local: ' . $mofile_local );
		// Look in local /wp-content/plugins/header-footer-elementor/languages/ folder.
		load_textdomain( 'header-footer-elementor', $mofile_local );
	} else {
		// Load the default language files.
		load_plugin_textdomain( 'header-footer-elementor', false, $lang_dir );
	}
}

/** Function for FA5, Social Icons, Icon List */
function hfe_enqueue_font_awesome() {

	if ( class_exists( 'Elementor\Plugin' ) ) {

		// Ensure Elementor Icons CSS is loaded.
        wp_enqueue_style(
            'hfe-elementor-icons',
            plugins_url( '/elementor/assets/lib/eicons/css/elementor-icons.min.css', 'elementor' ),
            [],
            '5.34.0'
        );
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
		wp_enqueue_style(
			'hfe-mega-menu',
			plugins_url( '/elementor-pro/assets/css/widget-mega-menu.min.css', 'elementor' ),
			[],
			'3.26.2'
		);
		wp_enqueue_style(
			'hfe-nav-menu-widget',
			plugins_url( '/elementor-pro/assets/css/widget-nav-menu.min.css', 'elementor' ),
			[],
			'3.26.0'
		);
	}
}
add_action( 'wp_enqueue_scripts', 'hfe_enqueue_font_awesome', 20 );
