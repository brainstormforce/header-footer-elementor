<?php
/**
 * HFE_Blocksy_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Blocksy theme compatibility.
 *
 * @since 2.4.9
 */
class HFE_Blocksy_Compat {

	/**
	 * Instance of HFE_Blocksy_Compat.
	 *
	 * @var HFE_Blocksy_Compat
	 */
	private static $instance;

	/**
	 *  Initiator
	 *
	 * @return HFE_Blocksy_Compat
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_Blocksy_Compat();

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
			add_action( 'template_redirect', [ $this, 'blocksy_setup_header' ], 10 );
			add_filter( 'blocksy:builder:header:enabled', '__return_false' );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'template_redirect', [ $this, 'blocksy_setup_footer' ], 10 );
			add_filter( 'blocksy:builder:footer:enabled', '__return_false' );
		}

		if ( hfe_is_before_footer_enabled() ) {
			add_action( 'blocksy:footer:before', 'hfe_render_before_footer', 1 );
		}
	}

	/**
	 * Disable header from the theme.
	 *
	 * @return void
	 */
	public function blocksy_setup_header() {
		// Use Blocksy's filter to disable theme header.
		add_filter( 'blocksy:builder:header:enabled', '__return_false' );
		
		// Add HFE header to blocksy_output_header function.
		add_action( 'blocksy:header:before', 'hfe_render_header', 5 );
	}

	/**
	 * Disable footer from the theme.
	 *
	 * @return void
	 */
	public function blocksy_setup_footer() {
		// Use Blocksy's filter to disable theme footer.
		add_filter( 'blocksy:builder:footer:enabled', '__return_false' );
		
		// Add HFE footer - use a different hook that's not inside blocksy_output_footer.
		add_action( 'blocksy:footer:before', [ $this, 'render_custom_footer' ], 5 );
	}
	
	/**
	 * Render custom footer with proper HTML structure
	 *
	 * @return void
	 */
	public function render_custom_footer() {
		echo '<footer id="footer">';
		hfe_render_footer();
		echo '</footer>';
	}
}

HFE_Blocksy_Compat::instance();
