<?php
/**
 * HFE_Astra_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Astra theme compatibility.
 */
class HFE_Astra_Compat {

	/**
	 * Instance of HFE_Astra_Compat.
	 *
	 * @var HFE_Astra_Compat
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function instance() {

		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_Astra_Compat();

			add_action( 'wp', array( self::$instance, 'hooks' ) );
		}

		return self::$instance;
	}

	/**
	 * Run all the Actions / Filters.
	 */
	public function hooks() {

		if ( hfe_header_enabled() ) {
			add_action( 'template_redirect', array( $this, 'astra_setup_header' ), 10 );
			add_action( 'astra_header', 'hfe_render_header' );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'template_redirect', array( $this, 'astra_setup_footer' ), 10 );
			add_action( 'astra_footer', 'hfe_render_footer' );
		}

	}

	/**
	 * Disable header from the theme.
	 */
	public function astra_setup_header() {
		remove_action( 'astra_header', 'astra_header_markup' );
	}

	/**
	 * Disable footer from the theme.
	 */
	public function astra_setup_footer() {
		remove_action( 'astra_footer', 'astra_footer_markup' );
	}

}

HFE_Astra_Compat::instance();
