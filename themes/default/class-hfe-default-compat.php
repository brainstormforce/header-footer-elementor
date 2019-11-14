<?php
/**
 * HFE_Default_Compat setup
 *
 * @package header-footer-elementor
 */

namespace HFE\Themes;
/**
 * Astra theme compatibility.
 */
class HFE_Default_Compat {

	/**
	 *  Initiator
	 */
	public function __construct() {
		add_action( 'wp', [ $this, 'hooks' ] );
	}

	/**
	 * Run all the Actions / Filters.
	 */
	public function hooks() {
		if ( hfe_header_enabled() ) {
			// Replace header.php template.
			add_action( 'get_header', array( $this, 'override_header' ) );

			// Display HFE's header in the replaced header.
			add_action( 'hfe_header', 'hfe_render_header' );
		}

		if ( hfe_footer_enabled() ) {
			// Replace footer.php template.
			add_action( 'get_footer', array( $this, 'override_footer' ) );

			// Display HFE's footer in the replaced header.
			add_action( 'hfe_footer', 'hfe_render_footer' );
		}

		if ( hfe_is_before_footer_enabled() ) {
			add_action( 'hfe_footer_before', array( 'Header_Footer_Elementor', 'get_before_footer_content' ) );
		}
	}

	/**
	 * Function for overriding the header in the elmentor way.
	 *
	 * @since x.x.x
	 *
	 * @return void
	 */
	public function override_header() {
		require HFE_DIR . 'themes/default/hfe-header.php';
		$templates   = array();
		$templates[] = 'header.php';
		// Avoid running wp_head hooks again.
		remove_all_actions( 'wp_head' );
		ob_start();
		locate_template( $templates, true );
		ob_get_clean();
	}

	/**
	 * Function for overriding the footer in the elmentor way.
	 *
	 * @since x.x.x
	 *
	 * @return void
	 */
	public function override_footer() {
		require HFE_DIR . 'themes/default/hfe-footer.php';
		$templates   = array();
		$templates[] = 'footer.php';
		// Avoid running wp_head hooks again.
		remove_all_actions( 'wp_head' );
		ob_start();
		locate_template( $templates, true );
		ob_get_clean();
	}

}

new HFE_Default_Compat();
