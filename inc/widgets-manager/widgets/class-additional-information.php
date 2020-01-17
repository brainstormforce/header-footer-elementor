<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;
use Elementor\Controls_Manager;
use Elementor\Core\Schemes;
use Elementor\Group_Control_Typography;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * HFE Additional Information
 *
 * HFE widget for Additional Information.
 *
 * @since x.x.x
 */
class Additional_Information extends Widget_Base {
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
		return 'additional-information';
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
		return __( 'Additional Information', 'header-footer-elementor' );
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
	 * Register Additional Information controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->start_controls_section(
			'section_additional_info_style',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'show_heading',
			[
				'label'        => __( 'Heading', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Show', 'header-footer-elementor' ),
				'label_off'    => __( 'Hide', 'header-footer-elementor' ),
				'render_type'  => 'ui',
				'return_value' => 'yes',
				'default'      => 'yes',
				'prefix_class' => 'elementor-show-heading-',
			]
		);
		$this->add_control(
			'heading_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-additional-heading-tag' => 'color: {{VALUE}}',
				],
				'condition' => [
					'show_heading!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'heading_typography',
				'label'     => __( 'Typography', 'header-footer-elementor' ),
				'selector'  => '{{WRAPPER}} .hfe-additional-heading-tag',
				'condition' => [
					'show_heading!' => '',
				],
			]
		);
		$this->add_control(
			'heading_tag',
			[
				'label'     => __( 'HTML Tag', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => [
					'h1' => __( 'H1', 'header-footer-elementor' ),
					'h2' => __( 'H2', 'header-footer-elementor' ),
					'h3' => __( 'H3', 'header-footer-elementor' ),
					'h4' => __( 'H4', 'header-footer-elementor' ),
					'h5' => __( 'H5', 'header-footer-elementor' ),
					'h6' => __( 'H6', 'header-footer-elementor' ),
				],
				'default'   => 'h2',
				'condition' => [
					'show_heading!' => '',
				],
			]
		);
		$this->add_responsive_control(
			'align',
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
				'selectors' => [
					'{{WRAPPER}} .hfe-additional-heading-tag' => 'text-align: {{VALUE}};',
				],
				'condition' => [
					'show_heading!' => '',
				],
			]
		);
		$this->add_control(
			'content_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .shop_attributes' => 'color: {{VALUE}}',
				],
				'separator' => 'before',
			]
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'content_typography',
				'label'    => __( 'Typography', 'header-footer-elementor' ),
				'selector' => '{{WRAPPER}} .shop_attributes',
			]
		);
		$this->end_controls_section();
	}
	/**
	 * Render Additional Information output on the frontend.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	public function render_additional_information() {
		global $product;
		if ( is_product() ) {
			$product                = wc_get_product( get_the_ID() );
			$additional_information = $product->list_attributes();
		}
		return $additional_information;
	}
	/**
	 * Render Additional Information output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		global $product;
		$product = wc_get_product();
		$heading = apply_filters( 'woocommerce_product_additional_information_heading', __( 'Additional information', 'header-footer-elementor' ) );
		$this->add_render_attribute( 'hfe_additional_heading', 'class', 'hfe-additional-heading' );
		$this->add_render_attribute( 'hfe_additional_heading_tag', 'class', 'hfe-additional-heading-tag' );
		if ( $heading ) : ?>
			<<?php echo $settings['heading_tag']; ?> <?php echo $this->get_render_attribute_string( 'hfe_additional_heading_tag' ); ?>><?php echo esc_html( $heading ); ?></h2>
		<?php endif; ?>
		<div <?php echo $this->get_render_attribute_string( 'hfe_additional_heading' ); ?>>
			<?php echo $this->render_additional_information(); ?>
		</div>
		<?php
	}
}
