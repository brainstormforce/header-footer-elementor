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
 * HFE Short Description
 *
 * HFE widget for Short Description.
 *
 * @since x.x.x
 */
class Short_Description extends Widget_Base {
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
		return 'short-description';
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
		return __( 'Short Description', 'header-footer-elementor' );
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
	 * Register Short Description controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_general_style_controls();
	}

	/**
	 *
	 * Register Short Description General Controls.
	 *
	 * @since x.x.x * @access protected.
	 */
	protected function register_general_style_controls() {
		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Style', 'header-footer-elementor' ),
			]
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'typography',
				'scheme'   => Schemes\Typography::TYPOGRAPHY_3,
				'selector' => '{{WRAPPER}} .hfe-short-desp-parent .hfe-short-desp-child',
			]
		);
		$this->add_control(
			'text_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-short-desp-parent .hfe-short-desp-child' => 'color: {{VALUE}};',
				],
				'scheme'    => [
					'type'  => Schemes\Color::get_type(),
					'value' => Schemes\Color::COLOR_3,
				],
			]
		);
		$this->add_control(
			'heading_tag',
			[
				'label'   => __( 'HTML Tag', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					'h1' => __( 'H1', 'header-footer-elementor' ),
					'h2' => __( 'H2', 'header-footer-elementor' ),
					'h3' => __( 'H3', 'header-footer-elementor' ),
					'h4' => __( 'H4', 'header-footer-elementor' ),
					'h5' => __( 'H5', 'header-footer-elementor' ),
					'h6' => __( 'H6', 'header-footer-elementor' ),
				],
				'default' => 'h2',
			]
		);
		$this->add_control(
			'size',
			[
				'label'   => __( 'Size', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => [
					'default' => __( 'Default', 'header-footer-elementor' ),
					'small'   => __( 'Small', 'header-footer-elementor' ),
					'medium'  => __( 'Medium', 'header-footer-elementor' ),
					'large'   => __( 'Large', 'header-footer-elementor' ),
					'xl'      => __( 'XL', 'header-footer-elementor' ),
					'xxl'     => __( 'XXL', 'header-footer-elementor' ),
				],
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
				'selectors' => [
					'{{WRAPPER}} .hfe-short-desp-child' => 'text-align: {{VALUE}};',
				],
			]
		);
		$this->end_controls_section();
	}
	/**
	 * Render Short Description output on the frontend.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	public function render_short_description() {
		global $product;
		if ( is_product() ) {
			$product           = wc_get_product( get_the_ID() );
			$short_description = $product->get_short_description();
		}
		return $short_description;
	}
	/**
	 * Render Short Description output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		$this->add_render_attribute(
			'hfe_short_desp_parent',
			'class',
			[
				'hfe-short-desp-parent',
				'elementor-size-' . $settings['size'],
			]
		);
		$this->add_render_attribute( 'short_desp_child', 'class', 'hfe-short-desp-child' );
		?>
		<div <?php echo $this->get_render_attribute_string( 'hfe_short_desp_parent' ); ?>>
			<<?php echo $settings['heading_tag'];?> <?php echo $this->get_render_attribute_string( 'short_desp_child' ); ?>><?php echo $this->render_short_description(); ?>
		</div>
		<?php
	}
	/**
	 * Render Short Description output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 1.2.0
	 * @access protected
	 */
	protected function _content_template() {}
}
