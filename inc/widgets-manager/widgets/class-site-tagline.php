<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
use Elementor\Widget_Base;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Scheme_Color;


if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Site tagline widget
 *
 * HFE widget for site tagline
 *
 * @since x.x.x
 */
class Site_Tagline extends Widget_Base {

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
		return 'hfe-site-tagline';
	}

	/**
	 * Retrieve the widget tagline.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget tagline.
	 */
	public function get_tagline() {
		return __( 'Site Tagline', 'header-footer-elementor' );
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
		return 'fas fa-search';
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
		return [ 'hfe-widgets' ];
	}

	/**
	 * Register site tagline controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_general_content_controls();
	}

	/**
	 * Register site tagline General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Style', 'header-footer-elementor' ),
			]
		);

		$this->add_responsive_control(
			'heading_text_align',
			[
				'label'     => __( 'Alignment', 'header-footer-elementor' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => [
					'left'    => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-left',
					],
					'center'  => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-center',
					],
					'right'   => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-right',
					],
					'justify' => [
						'title' => __( 'Justify', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-justify',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-site-tagline' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'tagline_typography',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_2,
				'selector' => '{{WRAPPER}} .hfe-site-tagline',
			]
		);
		$this->add_control(
			'tagline_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_2,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-site-tagline' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render site tagline output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		?>
		<div class="hfe-site-tagline hfe-site-tagline-wrapper">
			<span><?php echo wp_kses_post( get_bloginfo( 'description' ) ); ?></span>
		</div>
		<?php
	}

	/**
	 * Render Site Tagline widgets output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {
		?>
		<div class="hfe-site-tagline hfe-site-tagline-wrapper">
			<span><?php echo wp_kses_post( get_bloginfo( 'description' ) ); ?></span>
		</div>
		<?php
	}
}
