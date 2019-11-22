<?php
/**
 * HFE_OceanWP_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * OceanWP theme compatibility.
 */
class HFE_OceanWP_Compat {

	/**
	 * Instance of HFE_OceanWP_Compat.
	 *
	 * @var HFE_OceanWP_Compat
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_OceanWP_Compat();

			add_action( 'wp', [ self::$instance, 'hooks' ] );
		}

		return self::$instance;
	}

	/**
	 * Run all the Actions / Filters.
	 */
	public function hooks() {
		if ( hfe_header_enabled() ) {
			add_action( 'template_redirect', [ $this, 'setup_header' ], 10 );
			add_action( 'ocean_header', 'hfe_render_header' );
		}

		if ( hfe_is_before_footer_enabled() ) {
			add_action( 'ocean_footer', [ 'Header_Footer_Elementor', 'get_before_footer_content' ], 5 );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'template_redirect', [ $this, 'setup_footer' ], 10 );
			add_action( 'ocean_footer', 'hfe_render_footer' );
		}
	}

	/**
	 * Disable header from the theme.
	 */
	public function setup_header() {
		remove_action( 'ocean_top_bar', 'oceanwp_top_bar_template' );
		remove_action( 'ocean_header', 'oceanwp_header_template' );
		remove_action( 'ocean_page_header', 'oceanwp_page_header_template' );
	}

	/**
	 * Disable footer from the theme.
	 */
	public function setup_footer() {
		remove_action( 'ocean_footer', 'oceanwp_footer_template' );
	}

}

HFE_OceanWP_Compat::instance();
