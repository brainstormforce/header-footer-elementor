<?php
/**
 * HFE_Kadence_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Kadence theme compatibility.
 *
 * @since 2.4.9
 */
class HFE_Kadence_Compat {

	/**
	 * Instance of HFE_Kadence_Compat.
	 *
	 * @var HFE_Kadence_Compat
	 */
	private static $instance;

	/**
	 *  Initiator
	 *
	 * @return HFE_Kadence_Compat
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_Kadence_Compat();

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
			add_action( 'template_redirect', [ $this, 'kadence_setup_header' ], 10 );
			add_action( 'kadence_header', 'hfe_render_header' );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'template_redirect', [ $this, 'kadence_setup_footer' ], 10 );
			add_action( 'kadence_footer', 'hfe_render_footer' );
		}

		if ( hfe_is_before_footer_enabled() ) {
			add_action( 'kadence_before_footer', 'hfe_render_before_footer' );
		}
	}

	/**
	 * Disable header from the theme.
	 *
	 * @return void
	 */
	public function kadence_setup_header() {
		// Remove the main header markup function.
		remove_action( 'kadence_header', 'Kadence\header_markup' );
		
		// Remove individual header row functions in case they are called directly.
		remove_action( 'kadence_top_header', 'Kadence\top_header' );
		remove_action( 'kadence_main_header', 'Kadence\main_header' );
		remove_action( 'kadence_bottom_header', 'Kadence\bottom_header' );
		
		// Remove mobile header functions.
		remove_action( 'kadence_mobile_header', 'Kadence\mobile_header' );
		remove_action( 'kadence_mobile_top_header', 'Kadence\mobile_top_header' );
		remove_action( 'kadence_mobile_main_header', 'Kadence\mobile_main_header' );
		remove_action( 'kadence_mobile_bottom_header', 'Kadence\mobile_bottom_header' );
	}

	/**
	 * Disable footer from the theme.
	 *
	 * @return void
	 */
	public function kadence_setup_footer() {
		// Remove the main footer markup function.
		remove_action( 'kadence_footer', 'Kadence\footer_markup' );
		
		// Remove individual footer row functions in case they are called directly.
		remove_action( 'kadence_top_footer', 'Kadence\top_footer' );
		remove_action( 'kadence_middle_footer', 'Kadence\middle_footer' );
		remove_action( 'kadence_bottom_footer', 'Kadence\bottom_footer' );
	}

	/**
	 * Check if Kadence theme supports blocks header/footer
	 *
	 * @return bool
	 */
	private function has_blocks_support() {
		return function_exists( 'Kadence\kadence' ) && 
			   is_callable( [ \Kadence\kadence(), 'option' ] ) && 
			   \Kadence\kadence()->option( 'blocks_header' ) && 
			   defined( 'KADENCE_BLOCKS_VERSION' );
	}

	/**
	 * Get Kadence theme version for compatibility checks
	 *
	 * @return string
	 */
	private function get_theme_version() {
		return defined( 'KADENCE_VERSION' );
	}

}

HFE_Kadence_Compat::instance();
