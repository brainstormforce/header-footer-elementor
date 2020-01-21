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
use Elementor\Scheme_Color;


if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Product Price
 *
 * HFE widget for Product Price.
 *
 * @since x.x.x
 */
class Product_Price extends Widget_Base {

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
		return 'hfe-product-price';
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
		return __( 'Product Price', 'header-footer-elementor' );
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
	 * Register Product Price controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {

		$this->register_general_content_controls();
	}

	/**
	 * Register Product Price General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Product Price', 'header-footer-elementor' ),
			]
		);

			$this->add_control(
				'title_color',
				[
					'label'     => __( 'Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'scheme'    => [
						'type'  => Scheme_Color::get_type(),
						'value' => Scheme_Color::COLOR_2,
					],
					'selectors' => [
						'{{WRAPPER}} .hfe-product-price, {{WRAPPER}} .hfe-product-price .price' => 'color: {{VALUE}};',
					],
				]
			);

			$this->add_group_control(
				Group_Control_Typography::get_type(),
				[
					'name'     => 'title_typography',
					'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
					'selector' => '{{WRAPPER}} .hfe-product-price, {{WRAPPER}} .hfe-product-price .price',
				]
			);

			$this->add_responsive_control(
				'align',
				[
					'label'     => __( 'Alignment', 'header-footer-elementor' ),
					'type'      => Controls_Manager::CHOOSE,
					'options'   => [
						'left'    => [
							'title' => __( 'Left', 'header-footer-elementor' ),
							'icon'  => 'eicon-text-align-left',
						],
						'center'  => [
							'title' => __( 'Center', 'header-footer-elementor' ),
							'icon'  => 'eicon-text-align-center',
						],
						'right'   => [
							'title' => __( 'Right', 'header-footer-elementor' ),
							'icon'  => 'eicon-text-align-right',
						],
						'justify' => [
							'title' => __( 'Justified', 'header-footer-elementor' ),
							'icon'  => 'eicon-text-align-justify',
						],
					],
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .hfe-product-price' => 'text-align: {{VALUE}};',
					],
				]
			);

			$this->add_control(
				'sale_separator',
				[
					'label' => __( 'Sale Price', 'header-footer-elementor' ),
					'type' => Controls_Manager::HEADING,
					'separator' => 'before'
				]
			);

			$this->add_control(
				'sale_title_color',
				[
					'label'     => __( 'Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'scheme'    => [
						'type'  => Scheme_Color::get_type(),
						'value' => Scheme_Color::COLOR_2,
					],
					'selectors' => [
						'{{WRAPPER}} .hfe-product-price .price ins' => 'color: {{VALUE}};',
					],
				]
			);

			$this->add_group_control(
				Group_Control_Typography::get_type(),
				[
					'name'     => 'sale_title_typography',
					'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
					'selector' => '{{WRAPPER}} .hfe-product-price .price ins',
				]
			);

			$this->add_responsive_control(
				'sale_price_spacing',
				[
					'label'     => __( 'Spacing', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'range'     => [
						'px' => [
							'min' => 0,
							'max' => 50,
						],
					],
					'selectors' => [
						'{{WRAPPER}} .hfe-product-price .price ins' => 'margin-left: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}}.hfe-product-price-yes .price ins' => 'margin-top: {{SIZE}}{{UNIT}}; margin-left: 0{{UNIT}};',
					],
				]
			);

			$this->add_control(
				'inline_items',
				[
					'label'     => __( 'Stacked', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SWITCHER,
					'label_on'  => __( 'Yes', 'header-footer-elementor' ),
					'label_off' => __( 'No', 'header-footer-elementor' ),
					'default'   => 'yes',
					'prefix_class' => 'hfe-product-price-',
				]
			);

		$this->end_controls_section();
	}

	/**
	 * Render Product Price output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		?>
		<div class="hfe-product-price">
			<?php
				global $product;
				$product = wc_get_product();

			if ( empty( $product ) ) {
				return;
			}

				wc_get_template( '/single-product/price.php' );
			?>
		</div>
		<?php
	}

	/**
	 * Render Product Price widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {}

}
