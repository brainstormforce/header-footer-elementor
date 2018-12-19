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
			self::$instance = new HFE_Astra_Compat();

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
			add_action( 'template_redirect', array( $this, 'astra_setup_header' ), 10 );
			add_action( 'astra_header', 'hfe_render_header' );
		}

		if ( hfe_footer_enabled() ) {
			add_action( 'template_redirect', array( $this, 'astra_setup_footer' ), 10 );
			add_action( 'astra_footer', 'hfe_render_footer' );
		}

		if ( $this->is_before_footer_enabled() ) {

			// Action `elementor/page_templates/canvas/after_content` is introduced in Elementor Version 1.9.0.
			if ( version_compare( ELEMENTOR_VERSION, '1.9.0', '>=' ) ) {

				// check if current page template is Elemenntor Canvas.
				if ( 'elementor_canvas' == get_page_template_slug() ) {

					$override_cannvas_template = get_post_meta( $this->get_hfe_before_footer_id(), 'display-on-canvas-template', true );

					if ( '1' == $override_cannvas_template ) {
						add_action( 'elementor/page_templates/canvas/after_content', array( $this, 'render_before_footer' ), 9 );
					}
				}
			}

			add_action( 'astra_footer_before', array( $this, 'render_before_footer' ) );

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

	/**
	 * Get HFE Before Footer ID
	 *
	 * @since  1.0.2
	 * @return (String|boolean) before gooter id if it is set else returns false.
	 */
	function get_hfe_before_footer_id() {

		$before_footer_id = Header_Footer_Elementor::get_settings( 'type_before_footer', '' );

		if ( '' === $before_footer_id ) {
			$before_footer_id = false;
		}

		return apply_filters( 'get_hfe_before_footer_id', $before_footer_id );
	}

	/**
	 * Checks if Before Footer is enabled from HFE.
	 *
	 * @since  1.0.2
	 * @return bool True if before footer is enabled. False if before footer is not enabled.
	 */
	function is_before_footer_enabled() {

		$before_footer_id = Header_Footer_Elementor::get_settings( 'type_before_footer', '' );
		$status           = false;

		if ( '' !== $before_footer_id ) {
			$status = true;
		}

		return apply_filters( 'hfe_before_footer_enabled', $status );
	}

	/**
	 * Display before footer markup.
	 *
	 * @since  1.0.2
	 */
	public function render_before_footer() {

		if ( false == apply_filters( 'enable_hfe_render_before_footer', true ) ) {
			return;
		}

		?>
			<div class="hfe-before-footer-wrap">
				<?php $this->get_before_footer_content(); ?>
			</div>
		<?php

	}

	/**
	 * Prints the Before Footer content.
	 */
	public function get_before_footer_content() {

		echo "<div class='footer-width-fixer'>";
		echo self::$elementor_instance->frontend->get_builder_content_for_display( $this->get_hfe_before_footer_id() );
		echo '</div>';
	}

}

HFE_Astra_Compat::instance();
