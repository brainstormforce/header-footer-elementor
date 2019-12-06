<?php
/**
 * Elementor Classes.
 *
 * @package Header Footer Elementor
 */

use Elementor\Controls_Manager;
use Elementor\Utils;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
use Elementor\Scheme_Color;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * Elementor Copy Right
 *
 * Elementor widget for copy right.
 *
 * @since x.x.x
 */
class CopyRight extends Widget_Base {

	/**
	 * Retrieve the widget name.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'copyright';
	}
	/**
	 * Retrieve the widget title.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Copyright', 'hfe' );
	}
	/**
	 * Retrieve the widget icon.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'fa fa-copyright';
	}
	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return array( 'HFE' );
	}
	/**
	 * Register Copy Right controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_content_retina_image_controls();
	}
	/**
	 * Register Copy Right General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_content_retina_image_controls() {
		$this->start_controls_section(
			'section_title',
			array(
				'label' => __( 'Copyright', 'hfe' ),
			)
		);

		$this->add_control(
			'shortcode',
			array(
				'label'   => __( 'Copyright Title', 'hfe' ),
				'type'    => Controls_Manager::TEXTAREA,
				'dynamic' => array(
					'active' => true,
				),
				'default' => __( 'Copyright © [hfe_current_year] [hfe_site_title] | Powered by [hfe_site_title]', 'hfe' ),
			)
		);

		$this->add_control(
			'link',
			array(
				'label'       => __( 'Link', 'hfe' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'hfe' ),
			)
		);

		$this->add_responsive_control(
			'align',
			array(
				'label'     => __( 'Alignment', 'hfe' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'left'   => array(
						'title' => __( 'Left', 'hfe' ),
						'icon'  => 'fa fa-align-left',
					),
					'center' => array(
						'title' => __( 'Center', 'hfe' ),
						'icon'  => 'fa fa-align-center',
					),
					'right'  => array(
						'title' => __( 'Right', 'hfe' ),
						'icon'  => 'fa fa-align-right',
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-copyright-wrapper' => 'text-align: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'Text Color', 'hfe' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => array(
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				),
				'selectors' => array(
					// Stronger selector to avoid section style from overwriting.
					'{{WRAPPER}} .hfe-copyright-wrapper a, {{WRAPPER}} .hfe-copyright-wrapper' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'caption_typography',
				'selector' => '{{WRAPPER}} .hfe-copyright-wrapper',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_3,
			)
		);

	}

	/**
	 * Render Copyright output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		$link     = isset( $settings['link']['url'] ) ? $settings['link']['url'] : '';

		$copy_right_shortcode = do_shortcode( shortcode_unautop( $settings['shortcode'] ) );
		if ( ! empty( $link ) ) { ?>
			<div class="hfe-copyright-wrapper">
				<a href="<?php echo $link; ?>">
					<span><?php echo $copy_right_shortcode; ?></span>
				</a>
			</div>
		<?php } else { ?>
			<div class="hfe-copyright-wrapper">
				<span><?php echo $copy_right_shortcode; ?></span>
			</div>
		<?php }
	}

	/**
	 * Render shortcode widget as plain content.
	 *
	 * Override the default behavior by printing the shortcode instead of rendering it.
	 *
	 * @since x.x.x
	 * @access public
	 */
	public function render_plain_content() {
		// In plain mode, render without shortcode.
		echo $this->get_settings( 'shortcode' );
	}

	/**
	 * Render shortcode widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {}
}
