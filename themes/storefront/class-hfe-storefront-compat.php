<?php
/**
 * HFE_Storefront_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Astra theme compatibility.
 */
class HFE_Storefront_Compat {

	/**
	 * Instance of HFE_Storefront_Compat.
	 *
	 * @var HFE_Storefront_Compat
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_Storefront_Compat();

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
			add_action( 'storefront_before_header', 'hfe_render_header', 500 );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'template_redirect', [ $this, 'setup_footer' ], 10 );
			add_action( 'storefront_after_footer', 'hfe_render_footer', 500 );
		}

		if ( hfe_is_before_footer_enabled() ) {
			add_action( 'storefront_before_footer', 'hfe_render_before_footer' );
		}

		if ( hfe_header_enabled() || hfe_footer_enabled() ) {
			add_action( 'wp_enqueue_scripts', [ $this, 'styles' ] );
		}
	}

	/**
	 * Add inline CSS to hide empty divs for header and footer in storefront
	 *
	 * @since 1.2.0
	 * @return void
	 */
	public function styles() {
		$css = '';

		if ( true === hfe_header_enabled() ) {
			$css .= '.site-header {
				display: none;
			}';
		}

		if ( true === hfe_footer_enabled() ) {
			$css .= '.site-footer {
				display: none;
			}';
		}

		wp_add_inline_style( 'hfe-style', $css );
	}

	/**
	 * Disable header from the theme.
	 */
	public function setup_header() {
		for ( $priority = 0; $priority < 200; $priority ++ ) {
			remove_all_actions( 'storefront_header', $priority );
		}
	}

	/**
	 * Disable footer from the theme.
	 */
	public function setup_footer() {
		for ( $priority = 0; $priority < 200; $priority ++ ) {
			remove_all_actions( 'storefront_footer', $priority );
		}
	}

}

HFE_Storefront_Compat::instance();
