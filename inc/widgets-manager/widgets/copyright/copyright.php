<?php
/**
 * Elementor Classes.
 *
 * @package Header Footer Elementor
 */

namespace HFE\WidgetsManager\Widgets\Copyright;

use Elementor\Controls_Manager;
use Elementor\Utils;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;

use HFE\WidgetsManager\Base\Common_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * Elementor Copyright
 *
 * Elementor widget for copyright.
 *
 * @since 1.2.0
 */
class Copyright extends Common_Widget {

	/**
	 * Retrieve the widget name.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return parent::get_widget_slug( 'Copyright' );
	}
	/**
	 * Retrieve the widget title.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return parent::get_widget_title( 'Copyright' );
	}
	/**
	 * Retrieve the widget icon.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return parent::get_widget_icon( 'Copyright' );
	}

	/**
	 * Indicates if the widget's content is dynamic.
	 *
	 * This method returns true if the widget's output is dynamic and should not be cached,
	 * or false if the content is static and can be cached.
	 *
	 * @since 1.6.41
	 * @return bool True for dynamic content, false for static content.
	 */
	protected function is_dynamic_content(): bool { // phpcs:ignore
		return false;
	}

	/**
	 * Register Copyright controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	protected function register_controls() {
		$this->register_content_copy_right_controls();
		$this->register_pro_promotion_controls();
	}
	/**
	 * Register Copyright General Controls.
	 *
	 * @since 1.2.0
	 * @access protected
	 * @return void
	 */
	protected function register_content_copy_right_controls() {
		$this->start_controls_section(
			'section_title',
			[
				'label' => __( 'Copyright', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'shortcode',
			[
				'label'   => __( 'Copyright Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXTAREA,
				'dynamic' => [
					'active' => true,
				],
				'default' => __( 'Copyright © [hfe_current_year] [hfe_site_title] | Powered by [hfe_site_title]', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'link',
			[
				'label'       => __( 'Link', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
			]
		);

		$this->add_responsive_control(
			'align',
			[
				'label'              => __( 'Alignment', 'header-footer-elementor' ),
				'type'               => Controls_Manager::CHOOSE,
				'options'            => [
					'left'   => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-center',
					],
					'right'  => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-right',
					],
				],
				'selectors'          => [
					'{{WRAPPER}} .hfe-copyright-wrapper' => 'text-align: {{VALUE}};',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'title_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_TEXT,
				],
				'selectors' => [
					// Stronger selector to avoid section style from overwriting.
					'{{WRAPPER}} .hfe-copyright-wrapper a, {{WRAPPER}} .hfe-copyright-wrapper' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'caption_typography',
				'selector' => '{{WRAPPER}} .hfe-copyright-wrapper, {{WRAPPER}} .hfe-copyright-wrapper a',
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_TEXT,
				],
			]
		);
		
		$this->end_controls_section();
	}

	/**
	 * Register Copyright Promotion Controls.
	 *
	 * @since 2.4.0
	 * @access protected
	 */
	protected function register_pro_promotion_controls() {

		if(! defined( 'UAEL_VER' )){
			$this->start_controls_section(
				'section_pro_features_field',
				array(
					'label' => __( 'Go Pro for More Features', 'header-footer-elementor' ),
				)
			);

			$this->add_control(
				'uae_pro_promotion_notice',
				[
					'type' => Controls_Manager::NOTICE,
					'notice_type' => 'info',
					'dismissible' => false,
					'content' => __( '<b>Build smarter and faster</b> with premium widgets, 200+ section blocks, and advanced customisation controls — all available in the <a href="https://ultimateelementor.com/pricing/?utm_source=uae-dashboard&utm_medium=editor&utm_campaign=uae-pro-promotion" target="_blank">UAE Pro</a>.', 'header-footer-elementor' ),
				]
			);


			$this->end_controls_section();
		}
	}

	/**
	 * Render Copyright output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.2.0
	 * @access protected
	 * @return void
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		$link     = isset( $settings['link']['url'] ) ? $settings['link']['url'] : '';

		if ( ! empty( $link ) ) {
			$this->add_link_attributes( 'link', $settings['link'] );
		}

		$copy_right_shortcode = do_shortcode( shortcode_unautop( $settings['shortcode'] ) ); ?>
		<div class="hfe-copyright-wrapper">
			<?php if ( ! empty( $link ) ) { ?>
				<a <?php echo wp_kses_post( $this->get_render_attribute_string( 'link' ) ); ?>>
					<span><?php echo wp_kses_post( $copy_right_shortcode ); ?></span>
				</a>
			<?php } else { ?>
				<span><?php echo wp_kses_post( $copy_right_shortcode ); ?></span>
			<?php } ?>
		</div>
		<?php
	}

	/**
	 * Render shortcode widget as plain content.
	 *
	 * Override the default behavior by printing the shortcode instead of rendering it.
	 *
	 * @since 1.2.0
	 * @access public
	 * @return void
	 */
	public function render_plain_content() {
		// In plain mode, render without shortcode.
		echo esc_attr( $this->get_settings( 'shortcode' ) );
	}

	/**
	 * Render shortcode widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function content_template() {}
}
