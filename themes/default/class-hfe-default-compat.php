<?php
/**
 * HFE_Default_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Astra theme compatibility.
 */
class HFE_Default_Compat {

	/**
	 * Instance of HFE_Default_Compat.
	 *
	 * @var HFE_Default_Compat
	 */
	private static $instance;

	/**
	 * Instance of Elementor Frontend class.
	 *
	 * @var \Elementor\Frontend()
	 */
	private static $elementor_instance;

	/**
	 *  Initiator
	 */
	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_Default_Compat();
			add_action( 'wp', array( self::$instance, 'hooks' ) );
		}
		if ( defined( 'ELEMENTOR_VERSION' ) && is_callable( 'Elementor\Plugin::instance' ) ) {
			self::$elementor_instance = Elementor\Plugin::instance();
		}
		return self::$instance;
	}
	
	/**
	 * Run all the Actions / Filters.
	 */
	public function hooks() {
		if ( hfe_header_enabled() ) {
			add_action( 'hfe_header', 'hfe_render_header' );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'hfe_footer', 'hfe_render_footer' );
		}

		if ( hfe_is_before_footer_enabled() ) {
			// Action `elementor/page_templates/canvas/after_content` is introduced in Elementor Version 1.9.0.
			if ( version_compare( ELEMENTOR_VERSION, '1.9.0', '>=' ) ) {
				// check if current page template is Elemenntor Canvas.
				if ( 'elementor_canvas' == get_page_template_slug() ) {
					$override_cannvas_template = get_post_meta( hfe_get_before_footer_id(), 'display-on-canvas-template', true );
					if ( '1' == $override_cannvas_template ) {
						add_action( 'elementor/page_templates/canvas/after_content', array( 'Header_Footer_Elementor', 'get_before_footer_content' ), 9 );
					}
				}
			}
			add_action( 'hfe_footer_before', array( 'Header_Footer_Elementor', 'get_before_footer_content' ) );
		}
	}

}

HFE_Default_Compat::instance();
