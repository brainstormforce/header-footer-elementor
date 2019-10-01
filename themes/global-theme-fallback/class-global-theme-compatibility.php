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

}

new Global_Theme_Compatibility();
