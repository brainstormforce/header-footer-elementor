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
 * HFE Product Rating widget
 *
 * HFE widget for site title
 *
 * @since x.x.x
 */
class Product_Ratings extends Widget_Base {


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
		return 'product-ratings';
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
		return __( 'Product Ratings', 'header-footer-elementor' );
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
	 * Register Product Rating controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_general_content_controls();
	}

	/**
	 * Register Product Rating General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_product_rating_style',
			[
				'label' => __( 'Style', 'elementor-pro' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'wc_style_warning',
			[
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => __( 'The style of this widget is often affected by your theme and plugins. If you experience any such issue, try to switch to a basic theme and deactivate related plugins.', 'elementor-pro' ),
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-info',
			]
		);

		$this->add_control(
			'star_color',
			[
				'label'     => __( 'Star Color', 'elementor-pro' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'.woocommerce {{WRAPPER}} .star-rating' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'empty_star_color',
			[
				'label'     => __( 'Empty Star Color', 'elementor-pro' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'.woocommerce {{WRAPPER}} .star-rating::before' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'link_color',
			[
				'label'     => __( 'Link Color', 'elementor-pro' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'.woocommerce {{WRAPPER}} .woocommerce-review-link' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'text_typography',
				'selector' => '.woocommerce {{WRAPPER}} .woocommerce-review-link',
			]
		);

		$this->add_control(
			'star_size',
			[
				'label'     => __( 'Star Size', 'elementor-pro' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'unit' => 'em',
				],
				'range'     => [
					'em' => [
						'min'  => 0,
						'max'  => 4,
						'step' => 0.1,
					],
				],
				'selectors' => [
					'.woocommerce {{WRAPPER}} .star-rating' => 'font-size: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->add_control(
			'space_between',
			[
				'label'      => __( 'Space Between', 'elementor-pro' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em' ],
				'default'    => [
					'unit' => 'em',
				],
				'range'      => [
					'em' => [
						'min'  => 0,
						'max'  => 4,
						'step' => 0.1,
					],
					'px' => [
						'min'  => 0,
						'max'  => 50,
						'step' => 1,
					],
				],
				'selectors'  => [
					'.woocommerce:not(.rtl) {{WRAPPER}} .star-rating' => 'margin-right: {{SIZE}}{{UNIT}}',
					'.woocommerce.rtl {{WRAPPER}} .star-rating' => 'margin-left: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->add_responsive_control(
			'alignment',
			[
				'label'        => __( 'Alignment', 'elementor-pro' ),
				'type'         => Controls_Manager::CHOOSE,
				'options'      => [
					'left'    => [
						'title' => __( 'Left', 'elementor-pro' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center'  => [
						'title' => __( 'Center', 'elementor-pro' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right'   => [
						'title' => __( 'Right', 'elementor-pro' ),
						'icon'  => 'eicon-text-align-right',
					],
					'justify' => [
						'title' => __( 'Justified', 'elementor-pro' ),
						'icon'  => 'eicon-text-align-justify',
					],
				],
				'prefix_class' => 'elementor-product-rating--align-',
			]
		);

		$this->end_controls_section();
	}


	/**
	 * Retrive Product Rating.
	 *
	 * @since x.x.x
	 * @access public
	 */
	public function widget() {
		if ( ! post_type_supports( 'product', 'comments' ) ) {
			return;
		}

		global $product;
		$product = wc_get_product();

		if ( empty( $product ) ) {
			return;
		}

		wc_get_template( 'single-product/rating.php' );
	}

	/**
	 * Render Product Rating output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings();

		?>
		<div class="hfe-product-ratings">
		<?php
			echo wp_kses_post( $this->widget() );
		?>
		</div>
		<?php
	}
		/**
		 * Render Product Rating widgets output in the editor.
		 *
		 * Written as a Backbone JavaScript template and used to generate the live preview.
		 *
		 * @since x.x.x
		 * @access protected
		 */
	protected function _content_template() {
	}
}
