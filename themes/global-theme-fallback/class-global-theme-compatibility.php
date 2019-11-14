<?php
/**
 * Support all themes.
 *
 * @package header-footer-elementor
 */

namespace HFE\Themes;
/**
 * Global theme compatibility.
 */
class Global_Theme_Compatibility {
	/**
	 *  Initiator
	 */
	public function __construct() {
		add_action( 'wp', array( $this, 'hooks' ) );
	}
	/**
	 * Run all the Actions / Filters.
	 */
	public function hooks() {
		if ( hfe_header_enabled() ) {
			// Replace header.php.
			add_action( 'get_header', array( $this, 'option_override_header' ) );

			add_action( 'wp_body_open', array( 'Header_Footer_Elementor', 'get_header_content' ) );
			add_action( 'hfe_fallback_header', array( 'Header_Footer_Elementor', 'get_header_content' ) );
		}

		if ( hfe_is_before_footer_enabled() ) {
			add_action( 'wp_footer', array( 'Header_Footer_Elementor', 'get_before_footer_content' ), 20 );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'wp_footer', array( 'Header_Footer_Elementor', 'get_footer_content' ), 50 );
		}
	}

	/**
	 * Function overriding the header in the wp_body_open way.
	 *
	 * @since 1.0.16
	 *
	 * @return void
	 */
	public function option_override_header() {
		$templates   = array();
		$templates[] = 'header.php';
		locate_template( $templates, true );

		if ( ! did_action( 'wp_body_open' ) ) {
			echo '<div class="force-stretched-header">';
			do_action( 'hfe_fallback_header' );
			echo '</div>';
		}
	}
}
new Global_Theme_Compatibility();
