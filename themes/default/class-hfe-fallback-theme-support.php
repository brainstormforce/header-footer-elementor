<?php
/**
 * HFE Fallback Theme Support.
 *
 * Add theme compatibility for all the WordPress themes.
 *
 * @since x.x.x
 * @package hfe
 */

namespace HFE\Themes;

/**
 * Class HFE Theme Fallback support.
 *
 * @since x.x.x
 */
class HFE_Fallback_Theme_Support {

	/**
	 * Constructor.
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		$this->setup_fallback_support();

		add_action( 'admin_menu', [ $this, 'hfe_settings_page' ] );
		add_action( 'admin_init', [ $this, 'hfe_save_setting_data' ] );
	}

	/**
	 * Setup Theme Support.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function setup_fallback_support() {
		$hfe_compatibility_option = get_option( 'hfe_all_theme_support_option', '1' );

		if ( '1' === $hfe_compatibility_option ) {
			require HFE_DIR . 'themes/default/class-hfe-default-compat.php';
		} elseif ( '2' === $hfe_compatibility_option ) {
			require HFE_DIR . 'themes/default/class-global-theme-compatibility.php';
		}
	}

	/**
	 * Show a settings page incase of unsupported theme.
	 *
	 * @since x.x.x
	 *
	 * @return void
	 */
	public function hfe_settings_page() {
		add_submenu_page(
			'options-general.php',
			'Header Footer Elementor',
			'Header Footer Elementor',
			'manage_options',
			'hfe',
			[ $this, 'hfe_settings_page_html' ]
		);
	}

	/**
	 * Settings page.
	 *
	 * Settings page markup in the file which is included.
	 *
	 * @since x.x.x
	 */
	public function hfe_settings_page_html() {
		require_once HFE_DIR . 'inc/hfe-settings-page.php';
	}

	/**
	 * Save the data from the settings page.
	 *
	 * @since x.x.x
	 *
	 * @return void
	 */
	public function hfe_save_setting_data() {
		// bail if our option is not set.
		if ( empty( $_POST['hfe_radio_button'] ) ) {
			return;
		}

		$hfe_radio = sanitize_text_field( wp_unslash( $_POST['hfe_radio_button'] ) );
		update_option( 'hfe_all_theme_support_option', $hfe_radio );
	}

}

new HFE_Fallback_Theme_Support();
