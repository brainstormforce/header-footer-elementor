<?php
/**
 * HFE_Neve_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Neve theme compatibility.
 *
 * @since 2.4.9
 */
class HFE_Neve_Compat {

	/**
	 * Instance of HFE_Neve_Compat.
	 *
	 * @var HFE_Neve_Compat
	 */
	private static $instance;

	/**
	 *  Initiator
	 *
	 * @return HFE_Neve_Compat
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_Neve_Compat();

			add_action( 'wp', [ self::$instance, 'hooks' ] );
		}

		return self::$instance;
	}

	/**
	 * Run all the Actions / Filters.
	 *
	 * @return void
	 */
	public function hooks() {
		
		if ( hfe_header_enabled() ) {
			add_action( 'template_redirect', [ $this, 'neve_setup_header' ], 10 );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'template_redirect', [ $this, 'neve_setup_footer' ], 10 );
		}

		if ( hfe_is_before_footer_enabled() ) {
			add_action( 'neve_before_footer_hook', 'hfe_render_before_footer' );
		}
	}

	/**
	 * Disable header from the theme.
	 *
	 * @return void
	 */
	public function neve_setup_header() {
		// Remove all actions from neve_do_header to prevent double header.
		remove_all_actions( 'neve_do_header' );
		remove_all_actions( 'neve_do_top_bar' );
		
		// Add our header after removing theme's header.
		add_action( 'neve_do_header', 'hfe_render_header', 0 );
	}

	/**
	 * Disable footer from the theme.
	 *
	 * @return void
	 */
	public function neve_setup_footer() {
		// Remove all actions from neve_do_footer to prevent double footer.
		remove_all_actions( 'neve_do_footer' );
		
		// Add our footer after removing theme's footer.
		add_action( 'neve_do_footer', 'hfe_render_footer', 0 );
	}
}

HFE_Neve_Compat::instance();
