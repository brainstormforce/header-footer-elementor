<?php
/**
 * HFE Woo Products Widget.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\WooProductGrid;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Border;
use Elementor\Utils;

use HFE\WidgetsManager\Widgets_Loader;
use HFE\WidgetsManager\Base\Common_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * HFE Woo Products Widget
 *
 * @since 2.6.0
 */
class Woo_Product_Grid extends Common_Widget {

	/**
	 * Products Query
	 *
	 * @var \WP_Query
	 */
	private $query = null;

	/**
	 * Retrieve the widget name.
	 *
	 * @since 2.6.0
	 * @access public
	 * @return string Widget name.
	 */
	public function get_name() {
		return parent::get_widget_slug( 'Woo_Product_Grid' );
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 2.6.0
	 * @access public
	 * @return string Widget title.
	 */
	public function get_title() {
		return parent::get_widget_title( 'Woo_Product_Grid' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 2.6.0
	 * @access public
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return parent::get_widget_icon( 'Woo_Product_Grid' );
	}

	/**
	 * Retrieve the list of keywords the widget belongs to.
	 *
	 * @since 2.6.0
	 * @access public
	 * @return array Widget keywords.
	 */
	public function get_keywords() {
		return parent::get_widget_keywords( 'Woo_Product_Grid' );
	}

	/**
	 * Get Script Depends.
	 *
	 * @since 2.6.0
	 * @access public
	 * @return array scripts.
	 */
	public function get_script_depends() {
		return [ 'hfe-woo-product-grid' ];
	}

	/**
	 * Get Style Depends.
	 *
	 * @since 2.6.0
	 * @access public
	 * @return array styles.
	 */
	public function get_style_depends() {
		return [ 'hfe-woo-product-grid' ];
	}

	/**
	 * Check if WooCommerce is active.
	 *
	 * @since 2.6.0
	 * @access private
	 * @return bool
	 */
	private function is_woocommerce_active() {
		return class_exists( 'WooCommerce' );
	}

	/**
	 * Indicates if the widget's content is dynamic.
	 *
	 * @since 2.6.0
	 * @access protected
	 * @return bool True for dynamic content, false for static content.
	 */
	protected function is_dynamic_content(): bool {
		return true;
	}

	/**
	 * Get widget upsale data.
	 *
	 * Retrieve the widget promotion data.
	 *
	 * @since 2.6.0
	 * @access protected
	 *
	 * @return array Widget promotion data.
	 */
	protected function get_upsale_data() {
		return [
			'condition' => ! defined( 'UAEL_VER' ),
			'image' => esc_url( HFE_URL . 'assets/images/upgrade-pro.png' ),
			'image_alt' => esc_attr__( 'Upgrade', 'header-footer-elementor' ),
			'title' => esc_html__( 'Upgrade your Woo Products widget', 'header-footer-elementor' ),
			'description' => esc_html__( 'Get the advanced Woo Products widget and unlock powerful layouts, filters, and customization options with UAE Pro.', 'header-footer-elementor' ),
			'upgrade_url' => esc_url( 'https://ultimateelementor.com/pricing/?utm_source=UAE-Basic-Post&utm_medium=editor&utm_campaign=static-promotion' ),
			'upgrade_text' => esc_html__( 'Upgrade Now', 'header-footer-elementor' ),
		];
	}

	/**
	 * Register widget controls.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function register_controls() {
		if ( ! $this->is_woocommerce_active() ) {
			$this->register_woocommerce_notice_controls();
			return;
		}

		$this->register_general_controls();
		$this->register_content_controls();
		$this->register_query_controls();
		$this->register_layout_style_controls();
		$this->register_content_style_controls();
		$this->register_pro_promotion_controls();
	}

	/**
	 * Register WooCommerce notice controls.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function register_woocommerce_notice_controls() {
		$this->start_controls_section(
			'section_woocommerce_notice',
			[
				'label' => __( 'WooCommerce Required', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'woocommerce_notice',
			[
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => sprintf(
					/* translators: %1$s: opening link tag, %2$s: closing link tag */
					__( 'This widget requires WooCommerce to be installed and activated. %1$sInstall WooCommerce%2$s', 'header-footer-elementor' ),
					'<a href="' . esc_url( admin_url( 'plugin-install.php?s=woocommerce&tab=search&type=term' ) ) . '" target="_blank">',
					'</a>'
				),
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register general controls.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function register_general_controls() {
		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
			]
		);

		$this->add_responsive_control(
			'columns',
			[
				'label'              => __( 'Columns', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SELECT,
				'default'            => '4',
				'tablet_default'     => '3',
				'mobile_default'     => '1',
				'options'            => [
					'1' => '1',
					'2' => '2',
					'3' => '3',
					'4' => '4',
					'5' => '5',
					'6' => '6',
				],
				'frontend_available' => true,
				'selectors'          => [
					'{{WRAPPER}} .hfe-woo-products-grid' => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
				],
			]
		);

		$this->add_control(
			'products_per_page',
			[
				'label'   => __( 'Products Per Page', 'header-footer-elementor' ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 8,
				'min'     => 1,
				'max'     => 100,
			]
		);


		$this->end_controls_section();
	}

	/**
	 * Register content controls.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function register_content_controls() {
		$this->start_controls_section(
			'section_content_toggles',
			[
				'label' => __( 'Content', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'show_image',
			[
				'label'        => __( 'Show Image', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'show_category',
			[
				'label'        => __( 'Show Category', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'show_title',
			[
				'label'        => __( 'Show Title', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'show_rating',
			[
				'label'        => __( 'Show Rating', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'show_price',
			[
				'label'        => __( 'Show Price', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'show_description',
			[
				'label'        => __( 'Show Short Description', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => '',
			]
		);

		$this->add_control(
			'show_add_to_cart',
			[
				'label'        => __( 'Show Add to Cart', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register query controls.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function register_query_controls() {
		$this->start_controls_section(
			'section_query',
			[
				'label' => __( 'Query', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'orderby',
			[
				'label'     => __( 'Order By', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'date',
				'options'   => [
					'date'       => __( 'Date', 'header-footer-elementor' ),
					'title'      => __( 'Title', 'header-footer-elementor' ),
					'price'      => __( 'Price', 'header-footer-elementor' ),
					'popularity' => __( 'Popularity', 'header-footer-elementor' ),
					'rating'     => __( 'Rating', 'header-footer-elementor' ),
					'rand'       => __( 'Random', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'order',
			[
				'label'     => __( 'Order', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'desc',
				'options'   => [
					'desc' => __( 'Descending', 'header-footer-elementor' ),
					'asc'  => __( 'Ascending', 'header-footer-elementor' ),
				],
				'condition' => [
					'orderby!' => 'rand',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register layout style controls.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function register_layout_style_controls() {
		$this->start_controls_section(
			'section_layout_style',
			[
				'label' => __( 'Layout', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'column_gap',
			[
				'label'      => __( 'Column Gap', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', 'rem' ],
				'range'      => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'default'    => [
					'size' => 20,
					'unit' => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-woo-products-grid' => 'column-gap: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'row_gap',
			[
				'label'      => __( 'Row Gap', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', 'rem' ],
				'range'      => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'default'    => [
					'size' => 35,
					'unit' => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-woo-products-grid' => 'row-gap: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'product_box_shadow',
				'label'    => __( 'Box Shadow', 'header-footer-elementor' ),
				'selector' => '{{WRAPPER}} .hfe-product-item',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'     => 'product_border',
				'label'    => __( 'Border', 'header-footer-elementor' ),
				'selector' => '{{WRAPPER}} .hfe-product-item',
			]
		);

		$this->add_responsive_control(
			'product_border_radius',
			[
				'label'      => __( 'Border Radius', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'default'    => [
					'top'    => 0,
					'right'  => 0,
					'bottom' => 0,
					'left'   => 0,
					'unit'   => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-product-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register content style controls.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function register_content_style_controls() {
		// Content Area Styling
		$this->start_controls_section(
			'section_content_area_style',
			[
				'label' => __( 'Card', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'content_alignment',
			[
				'label'     => __( 'Alignment', 'header-footer-elementor' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => [
					'left'   => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right'  => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-right',
					],
				],
				'default'   => 'left',
				'prefix_class' => 'hfe-content%s-align-',
				'frontend_available' => true,
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'     => 'content_background',
				'label'    => __( 'Background', 'header-footer-elementor' ),
				'types'    => [ 'classic', 'gradient' ],
				'selector' => '{{WRAPPER}} .hfe-product-item',
				'fields_options' => [
					'background' => [
						'default' => 'classic',
					],
					'color' => [
						'default' => '#f6f6f6',
					],
				],
			]
		);

		$this->add_responsive_control(
			'product_content_padding',
			[
				'label'      => __( 'Content Padding', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'default'    => [
					'top'    => 20,
					'right'  => 20,
					'bottom' => 20,
					'left'   => 20,
					'unit'   => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-product-content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

		$this->register_image_size_style_controls();
		

		// Category Styling
		$this->start_controls_section(
			'section_category_style',
			[
				'label'     => __( 'Category', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_category' => 'yes',
				],
			]
		);

		$this->add_control(
			'category_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_SECONDARY,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-product-category' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'category_typography',
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_TEXT,
				],
				'selector' => '{{WRAPPER}} .hfe-product-category',
			]
		);

		$this->add_responsive_control(
			'category_spacing',
			[
				'label'      => __( 'Bottom Spacing', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em' ],
				'default'    => [
					'size' => 10,
					'unit' => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-product-category' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

		// Title, Rating, Price, Add to Cart styles (condensed)
		$this->register_title_style_controls();
		$this->register_rating_style_controls();
		$this->register_price_style_controls();
		$this->register_short_description_style_controls();
		$this->register_add_to_cart_style_controls();
	}

	/**
	 * Register title style controls.
	 *
	 * @since 2.6.0
	 * @access private
	 */
	private function register_title_style_controls() {
		$this->start_controls_section(
			'section_title_style',
			[
				'label'     => __( 'Title', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [ 'show_title' => 'yes' ],
			]
		);

		$this->add_control(
			'title_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_PRIMARY,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-product-title, {{WRAPPER}} .hfe-product-title a' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'title_hover_color',
			[
				'label'     => __( 'Hover Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-product-title a:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'title_typography',
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				],
				'selector' => '{{WRAPPER}} .hfe-product-title',
			]
		);

		$this->add_responsive_control(
			'title_spacing',
			[
				'label'      => __( 'Bottom Spacing', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em' ],
				'default'    => [
					'size' => 10,
					'unit' => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-product-title' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register rating style controls.
	 *
	 * @since 2.6.0
	 * @access private
	 */
	private function register_rating_style_controls() {
		$this->start_controls_section(
			'section_rating_style',
			[
				'label'     => __( 'Rating', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [ 'show_rating' => 'yes' ],
			]
		);

		$this->add_control(
			'rating_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_ACCENT,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-woo-products-grid .hfe-product-rating .star-rating' => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-woo-products-grid .hfe-product-rating .star-rating::before' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'rating_spacing',
			[
				'label'      => __( 'Bottom Spacing', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em' ],
				'default'    => [
					'size' => 10,
					'unit' => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-product-rating' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register price style controls.
	 *
	 * @since 2.6.0
	 * @access private
	 */
	private function register_price_style_controls() {
		$this->start_controls_section(
			'section_price_style',
			[
				'label'     => __( 'Price', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [ 'show_price' => 'yes' ],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'price_typography',
				'label'    => __( 'Typography', 'header-footer-elementor' ),
				'selector' => '{{WRAPPER}} .hfe-product-price span',
			]
		);

		$this->add_control(
			'price_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_PRIMARY,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-product-price span' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'price_spacing',
			[
				'label'      => __( 'Bottom Spacing', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em' ],
				'default'    => [
					'size' => 10,
					'unit' => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-product-price' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register short description style controls.
	 *
	 * @since 2.6.0
	 * @access private
	 */
	private function register_short_description_style_controls() {
		$this->start_controls_section(
			'section_short_description_style',
			[
				'label'     => __( 'Short Description', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [ 'show_description' => 'yes' ],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'short_description_typography',
				'label'    => __( 'Typography', 'header-footer-elementor' ),
				'selector' => '{{WRAPPER}} .hfe-product-description',
			]
		);

		$this->add_control(
			'short_description_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_TEXT,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-product-description' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'short_description_spacing',
			[
				'label'      => __( 'Bottom Spacing', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em' ],
				'default'    => [
					'size' => 10,
					'unit' => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-product-description' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register add to cart style controls.
	 *
	 * @since 2.6.0
	 * @access private
	 */
	private function register_add_to_cart_style_controls() {
		$this->start_controls_section(
			'section_add_to_cart_style',
			[
				'label'     => __( 'Add to Cart', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [ 'show_add_to_cart' => 'yes' ],
			]
		);

		$this->add_responsive_control(
			'add_to_cart_padding',
			[
				'label'      => __( 'Padding', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'default'    => [
					'top'    => 12,
					'right'  => 20,
					'bottom' => 12,
					'left'   => 20,
					'unit'   => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-product-add-to-cart .button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->start_controls_tabs( 'add_to_cart_tabs' );

			$this->start_controls_tab(
				'add_to_cart_normal_tab',
				[
					'label' => __( 'Normal', 'header-footer-elementor' ),
				]
			);

				$this->add_control(
					'add_to_cart_color',
					[
						'label'     => __( 'Text Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'selectors' => [
							'{{WRAPPER}} .hfe-product-add-to-cart .button' => 'color: {{VALUE}};',
						],
					]
				);

				$this->add_group_control(
					Group_Control_Background::get_type(),
					[
						'name'           => 'add_to_cart_background_color',
						'label'          => __( 'Background Color', 'header-footer-elementor' ),
						'types'          => [ 'classic', 'gradient' ],
						'selector'       => '{{WRAPPER}} .hfe-product-add-to-cart .button',
						'fields_options' => [
							'color' => [
								'global' => [
									'default' => Global_Colors::COLOR_ACCENT,
								],
							],
						],
					]
				);

			$this->end_controls_tab();

			$this->start_controls_tab(
				'add_to_cart_hover_tab',
				[
					'label' => __( 'Hover', 'header-footer-elementor' ),
				]
			);

				$this->add_control(
					'add_to_cart_hover_color',
					[
						'label'     => __( 'Text Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'selectors' => [
							'{{WRAPPER}} .hfe-product-add-to-cart .button:hover' => 'color: {{VALUE}};',
						],
					]
				);

				$this->add_group_control(
					Group_Control_Background::get_type(),
					[
						'name'     => 'add_to_cart_hover_background_color',
						'label'    => __( 'Background Color', 'header-footer-elementor' ),
						'types'    => [ 'classic', 'gradient' ],
						'selector' => '{{WRAPPER}} .hfe-product-add-to-cart .button:hover',
					]
				);

			$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'add_to_cart_typography',
				'selector' => '{{WRAPPER}} .hfe-product-add-to-cart .button',
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_ACCENT,
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register image hover style controls.
	 *
	 * @since 2.6.0
	 * @access private
	 */
	private function register_image_size_style_controls() {
		$this->start_controls_section(
			'section_image_size_style',
			[
				'label'     => __( 'Image', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [ 'show_image' => 'yes' ],
			]
		);

		$this->add_control(
			'image_size',
			[
				'label'   => __( 'Image Size', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'woocommerce_thumbnail',
				'options' => [
					'thumbnail'             => __( 'Thumbnail', 'header-footer-elementor' ),
					'medium'                => __( 'Medium', 'header-footer-elementor' ),
					'large'                 => __( 'Large', 'header-footer-elementor' ),
					'full'                  => __( 'Full Size', 'header-footer-elementor' ),
					'woocommerce_thumbnail' => __( 'WooCommerce Thumbnail', 'header-footer-elementor' ),
					'woocommerce_single'    => __( 'WooCommerce Single', 'header-footer-elementor' ),
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register promotion controls.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function register_pro_promotion_controls() {
		// Add promotion controls if needed for pro features
	}

	/**
	 * Build query arguments.
	 *
	 * @since 2.6.0
	 * @access private
	 * @return array
	 */
	private function build_query_args() {
		$settings = $this->get_settings_for_display();

		$args = [
			'post_type'      => 'product',
			'post_status'    => 'publish',
			'posts_per_page' => $settings['products_per_page'],
			'meta_query'     => WC()->query->get_meta_query(), // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			'tax_query'      => WC()->query->get_tax_query(), // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		];

		// Set ordering
		switch ( $settings['orderby'] ) {
			case 'price':
				$args['meta_key'] = '_price'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
				$args['orderby']  = 'meta_value_num';
				break;
			case 'popularity':
				$args['meta_key'] = 'total_sales'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
				$args['orderby']  = 'meta_value_num';
				break;
			case 'rating':
				$args['meta_key'] = '_wc_average_rating'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
				$args['orderby']  = 'meta_value_num';
				break;
			default:
				$args['orderby'] = $settings['orderby'];
				break;
		}

		$args['order'] = $settings['order'];

		return $args;
	}

	/**
	 * Get products query.
	 *
	 * @since 2.6.0
	 * @access private
	 * @return \WP_Query
	 */
	private function get_products_query() {
		if ( null === $this->query ) {
			$this->query = new \WP_Query( $this->build_query_args() );
		}

		return $this->query;
	}

	/**
	 * Render widget output on both frontend and editor.
	 *
	 * @since 2.6.0
	 * @access protected
	 */
	protected function render() {
		if ( ! $this->is_woocommerce_active() ) {
			$this->render_woocommerce_notice();
			return;
		}

		$settings = $this->get_settings_for_display();
		$query    = $this->get_products_query();

		if ( ! $query->have_posts() ) {
			$this->render_no_products_message();
			return;
		}

		$this->add_render_attribute( 'wrapper', 'class', 'hfe-woo-products-wrapper' );
		$this->add_render_attribute( 'grid', 'class', 'hfe-woo-products-grid' );

		?>
		<div <?php $this->print_render_attribute_string( 'wrapper' ); ?>>
			<div <?php $this->print_render_attribute_string( 'grid' ); ?>>
				<?php
				while ( $query->have_posts() ) :
					$query->the_post();
					$this->render_product_item( $settings );
				endwhile;
				wp_reset_postdata();
				?>
			</div>
		</div>
		<?php
	}

	/**
	 * Render WooCommerce notice.
	 *
	 * @since 2.6.0
	 * @access private
	 */
	private function render_woocommerce_notice() {
		?>
		<div class="hfe-woo-products-notice">
			<p><?php esc_html_e( 'WooCommerce is not installed or activated. Please install and activate WooCommerce to use this widget.', 'header-footer-elementor' ); ?></p>
		</div>
		<?php
	}

	/**
	 * Render no products message.
	 *
	 * @since 2.6.0
	 * @access private
	 */
	private function render_no_products_message() {
		?>
		<div class="hfe-woo-products-empty">
			<p><?php esc_html_e( 'No products found.', 'header-footer-elementor' ); ?></p>
		</div>
		<?php
	}

	/**
	 * Render individual product item.
	 *
	 * @since 2.6.0
	 * @access private
	 * @param array $settings Widget settings.
	 */
	private function render_product_item( $settings ) {
		global $product;

		if ( ! $product || ! $product->is_visible() ) {
			return;
		}

		?>
		<div class="hfe-product-item">
			<?php if ( 'yes' === $settings['show_image'] ) : ?>
				<div class="hfe-product-image">
					<a href="<?php echo esc_url( get_permalink() ); ?>">
						<?php
						$image_size = ! empty( $settings['image_size'] ) ? $settings['image_size'] : 'woocommerce_thumbnail';
						echo wp_kses_post( woocommerce_get_product_thumbnail( $image_size ) );
						?>
					</a>
				</div>
			<?php endif; ?>

			<div class="hfe-product-content">
				<?php if ( 'yes' === $settings['show_category'] ) : ?>
					<div class="hfe-product-category">
						<?php
						$categories = get_the_terms( get_the_ID(), 'product_cat' );
						if ( $categories && ! is_wp_error( $categories ) ) {
							$category_names = wp_list_pluck( $categories, 'name' );
							echo esc_html( implode( ', ', $category_names ) );
						}
						?>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_title'] ) : ?>
					<div class="hfe-product-title">
						<a href="<?php echo esc_url( get_permalink() ); ?>" class="hfe-loop-product__link">
							<?php woocommerce_template_loop_product_title(); ?>
						</a>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_rating'] ) : ?>
					<div class="hfe-product-rating">
						<?php woocommerce_template_loop_rating(); ?>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_price'] ) : ?>
					<div class="hfe-product-price">
						<?php woocommerce_template_loop_price(); ?>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_description'] ) : ?>
					<div class="hfe-product-description">
						<?php echo wp_kses_post( wp_trim_words( get_the_excerpt(), 15 ) ); ?>
					</div>
				<?php endif; ?>

				<?php if ( 'yes' === $settings['show_add_to_cart'] ) : ?>
					<div class="hfe-product-add-to-cart">
						<?php woocommerce_template_loop_add_to_cart(); ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}

	// NO content_template() method - this forces Elementor to use render() for both editor and frontend
}
