<?php
/**
 * Basic Posts Widget for Header Footer Elementor.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\BasicPosts;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Background;
use Elementor\Utils;

use HFE\WidgetsManager\Base\Common_Widget;
use HFE\WidgetsManager\Widgets_Loader;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * HFE Basic Posts widget
 *
 * Fast and lightweight posts widget with basic card layout
 *
 * @since 2.5.0
 */
class Basic_Posts extends Common_Widget {

	/**
	 * Query object
	 *
	 * @var \WP_Query
	 */
	protected $query = null;

	/**
	 * Retrieve the widget name.
	 *
	 * @since 2.5.0
	 * @access public
	 * @return string Widget name.
	 */
	public function get_name() {
		return parent::get_widget_slug( 'Basic_Posts' );
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 2.5.0
	 * @access public
	 * @return string Widget title.
	 */
	public function get_title() {
		return parent::get_widget_title( 'Basic_Posts' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 2.5.0
	 * @access public
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'hfe-icon-posts';
	}

	/**
	 * Retrieve the list of keywords the widget belongs to.
	 *
	 * @since 2.5.0
	 * @access public
	 * @return array Widget keywords.
	 */
	public function get_keywords() {
		return [ 'posts', 'blog', 'grid', 'cards', 'basic', 'fast' ];
	}

	/**
	 * Indicates if the widget's content is dynamic.
	 *
	 * @since 2.5.0
	 * @return bool True for dynamic content.
	 */
	protected function is_dynamic_content(): bool {
		return true;
	}

	/**
	 * Get widget upsale data.
	 *
	 * Retrieve the widget promotion data.
	 *
	 * @since 2.5.0
	 * @access protected
	 *
	 * @return array Widget promotion data.
	 */
	protected function get_upsale_data() {
		return [
			'condition' => ! defined( 'UAEL_VER' ),
			'image' => esc_url( HFE_URL . 'assets/images/upgrade-pro.png' ),
			'image_alt' => esc_attr__( 'Upgrade', 'header-footer-elementor' ),
			'title' => esc_html__( 'Upgrade your Basic Posts Widget', 'header-footer-elementor' ),
			'description' => esc_html__( 'Get the Advanced Posts widget and unlock powerful layouts, filters, and customization options with UAE Pro.', 'header-footer-elementor' ),
			'upgrade_url' => esc_url( 'https://ultimateelementor.com/pricing/?utm_source=UAE-Basic-Post&utm_medium=editor&utm_campaign=static-promotion' ),
			'upgrade_text' => esc_html__( 'Upgrade Now', 'header-footer-elementor' ),
		];
	}

	/**
	 * Register widget controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_controls(): void {
		$this->register_general_controls();
		$this->register_query_controls();
		$this->register_image_controls();
		$this->register_content_controls();
		$this->register_meta_controls();
		$this->register_excerpt_controls();
		$this->register_read_more_controls();
		
		// Style Controls
		$this->register_layout_style_controls();
		$this->register_card_style_controls();
		$this->register_title_style_controls();
		$this->register_meta_style_controls();
		$this->register_excerpt_style_controls();
		$this->register_read_more_style_controls();
	}

	/**
	 * Register Query Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_query_controls() {
		$this->start_controls_section(
			'section_query',
			[
				'label' => __( 'Query', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'orderby',
			[
				'label'   => __( 'Order By', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'date',
				'options' => [
					'date'          => __( 'Date', 'header-footer-elementor' ),
					'title'         => __( 'Title', 'header-footer-elementor' ),
					'menu_order'    => __( 'Menu Order', 'header-footer-elementor' ),
					'rand'          => __( 'Random', 'header-footer-elementor' ),
					'comment_count' => __( 'Comment Count', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'order',
			[
				'label'   => __( 'Order', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'desc',
				'options' => [
					'asc'  => __( 'ASC', 'header-footer-elementor' ),
					'desc' => __( 'DESC', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'exclude_current',
			[
				'label'        => __( 'Exclude Current Post', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => '',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register General Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_general_controls() {
		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'posts_per_page',
			[
				'label'   => __( 'Posts Per Page', 'header-footer-elementor' ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 6,
				'min'     => 1,
				'max'     => 100,
			]
		);

		$this->add_responsive_control(
			'columns',
			[
				'label'              => __( 'Columns', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SELECT,
				'default'            => '3',
				'tablet_default'     => '2',
				'mobile_default'     => '1',
				'options'            => [
					'1' => '1',
					'2' => '2',
					'3' => '3',
					'4' => '4',
					'5' => '5',
					'6' => '6',
				],
				'selectors'          => [
					'{{WRAPPER}} .hfe-posts-grid' => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Image Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_image_controls() {
		$this->start_controls_section(
			'section_image',
			[
				'label' => __( 'Featured Image', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'show_image',
			[
				'label'        => __( 'Show Featured Image', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'image_size',
			[
				'label'     => __( 'Image Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'medium',
				'options'   => $this->get_image_sizes(),
				'condition' => [
					'show_image' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Content Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_content_controls() {
		$this->start_controls_section(
			'section_content',
			[
				'label' => __( 'Title', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
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
			'title_tag',
			[
				'label'     => __( 'Title HTML Tag', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'h3',
				'options'   => [
					'h1' => 'H1',
					'h2' => 'H2',
					'h3' => 'H3',
					'h4' => 'H4',
					'h5' => 'H5',
					'h6' => 'H6',
				],
				'condition' => [
					'show_title' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Meta Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_meta_controls() {
		$this->start_controls_section(
			'section_meta',
			[
				'label' => __( 'Meta', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'show_meta',
			[
				'label'        => __( 'Show Meta Data', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'show_date',
			[
				'label'        => __( 'Show Date', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
				'condition'    => [
					'show_meta' => 'yes',
				],
			]
		);

		$this->add_control(
			'show_author',
			[
				'label'        => __( 'Show Author', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
				'condition'    => [
					'show_meta' => 'yes',
				],
			]
		);

		$this->add_control(
			'show_comments',
			[
				'label'        => __( 'Show Comments Count', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'no',
				'condition'    => [
					'show_meta' => 'yes',
				],
			]
		);

		$this->add_control(
			'meta_separator',
			[
				'label'     => __( 'Meta Separator', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => ' | ',
				'condition' => [
					'show_meta' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Excerpt Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_excerpt_controls() {
		$this->start_controls_section(
			'section_excerpt',
			[
				'label' => __( 'Excerpt', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'show_excerpt',
			[
				'label'        => __( 'Show Excerpt', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'excerpt_length',
			[
				'label'     => __( 'Excerpt Length', 'header-footer-elementor' ),
				'type'      => Controls_Manager::NUMBER,
				'default'   => 20,
				'min'       => 0,
				'max'       => 100,
				'condition' => [
					'show_excerpt' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Read More Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_read_more_controls() {
		$this->start_controls_section(
			'section_read_more',
			[
				'label' => __( 'Call to Action', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'show_read_more',
			[
				'label'        => __( 'Show Read More', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);

		$this->add_control(
			'read_more_text',
			[
				'label'     => __( 'Read More Text', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Read More →', 'header-footer-elementor' ),
				'condition' => [
					'show_read_more' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Layout Style Controls.
	 *
	 * @since 2.5.0
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
				'label'     => __( 'Column Gap', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 20,
				],
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-posts-grid' => 'column-gap: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'row_gap',
			[
				'label'     => __( 'Row Gap', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 30,
				],
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-posts-grid' => 'row-gap: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Card Style Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_card_style_controls() {
		$this->start_controls_section(
			'section_card_style',
			[
				'label' => __( 'Card', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'     => 'card_background',
				'label'    => __( 'Background', 'header-footer-elementor' ),
				'types'    => [ 'classic', 'gradient' ],
				'selector' => '{{WRAPPER}} .hfe-post-card',
				'fields_options' => [
					'background' => [
						'default' => 'classic',
					],
					'color' => [
						'default' => '#F6F6F6',
					],
				],
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'     => 'card_border',
				'label'    => __( 'Border', 'header-footer-elementor' ),
				'selector' => '{{WRAPPER}} .hfe-post-card',
			]
		);

		$this->add_responsive_control(
			'card_border_radius',
			[
				'label'      => __( 'Border Radius', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-post-card' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					'{{WRAPPER}} .hfe-post-image img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} 0{{UNIT}} 0{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'card_box_shadow',
				'label'    => __( 'Box Shadow', 'header-footer-elementor' ),
				'selector' => '{{WRAPPER}} .hfe-post-card',
			]
		);

		$this->add_responsive_control(
			'card_padding',
			[
				'label'      => __( 'Padding', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'default'    => [
					'top'      => '20',
					'right'    => '20',
					'bottom'   => '20',
					'left'     => '20',
					'unit'     => 'px',
					'isLinked' => true,
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-post-content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Title Style Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_title_style_controls() {
		$this->start_controls_section(
			'section_title_style',
			[
				'label'     => __( 'Title', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_title' => 'yes',
				],
			]
		);

		$this->add_control(
			'title_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_PRIMARY,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-post-title a' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'title_hover_color',
			[
				'label'     => __( 'Hover Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-post-title a:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'title_typography',
				'label'    => __( 'Typography', 'header-footer-elementor' ),
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				],
				'selector' => '{{WRAPPER}} .hfe-post-title',
			]
		);

		$this->add_responsive_control(
			'title_spacing',
			[
				'label'     => __( 'Bottom Spacing', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 5,
					'unit' => 'px',
				],
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-post-title' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Meta Style Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_meta_style_controls() {
		$this->start_controls_section(
			'section_meta_style',
			[
				'label'     => __( 'Meta', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_meta' => 'yes',
				],
			]
		);

		$this->add_control(
			'meta_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				// 'default'   => '#ADADAD',
				'global'    => [
					'default' => Global_Colors::COLOR_TEXT,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-post-meta' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'meta_typography',
				'label'    => __( 'Typography', 'header-footer-elementor' ),
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_SECONDARY,
				],
				'selector' => '{{WRAPPER}} .hfe-post-meta',
			]
		);

		$this->add_responsive_control(
			'meta_spacing',
			[
				'label'     => __( 'Bottom Spacing', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 15,
					'unit' => 'px',
				],
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-post-meta' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Excerpt Style Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_excerpt_style_controls() {
		$this->start_controls_section(
			'section_excerpt_style',
			[
				'label'     => __( 'Excerpt', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_excerpt' => 'yes',
				],
			]
		);

		$this->add_control(
			'excerpt_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_TEXT,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-post-excerpt' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'excerpt_typography',
				'label'    => __( 'Typography', 'header-footer-elementor' ),
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_TEXT,
				],
				'selector' => '{{WRAPPER}} .hfe-post-excerpt',
			]
		);

		$this->add_responsive_control(
			'excerpt_spacing',
			[
				'label'     => __( 'Bottom Spacing', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 15,
					'unit' => 'px',
				],
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-post-excerpt' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Read More Style Controls.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function register_read_more_style_controls() {
		$this->start_controls_section(
			'section_read_more_style',
			[
				'label'     => __( 'Call to Action', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_read_more' => 'yes',
				],
			]
		);

		$this->add_control(
			'read_more_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_ACCENT,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-read-more' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'read_more_hover_color',
			[
				'label'     => __( 'Hover Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-read-more:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'read_more_typography',
				'label'    => __( 'Typography', 'header-footer-elementor' ),
				'selector' => '{{WRAPPER}} .hfe-read-more',
			]
		);

		$this->end_controls_section();
	}


	/**
	 * Get available image sizes.
	 *
	 * @since 2.5.0
	 * @access protected
	 * @return array
	 */
	protected function get_image_sizes() {
		$image_sizes = get_intermediate_image_sizes();
		$options     = [];

		$options['full'] = __( 'Full', 'header-footer-elementor' );

		foreach ( $image_sizes as $size ) {
			$options[ $size ] = ucwords( str_replace( '_', ' ', $size ) );
		}

		return $options;
	}



	/**
	 * Query posts.
	 *
	 * @since 2.5.0
	 * @access protected
	 */
	protected function query_posts() {
		$settings = $this->get_settings_for_display();

		// Sanitize inputs.
		$posts_per_page = absint( $settings['posts_per_page'] ?? 6 );
		$orderby = sanitize_key( $settings['orderby'] ?? 'date' );
		$order = sanitize_key( $settings['order'] ?? 'desc' );

		// Ensure posts_per_page is within bounds
		$posts_per_page = max( 1, min( 100, $posts_per_page ) );

		// Validate orderby against allowed values
		$allowed_orderby = [ 'date', 'title', 'menu_order', 'rand', 'comment_count' ];
		if ( ! in_array( $orderby, $allowed_orderby, true ) ) {
			$orderby = 'date';
		}

		// Validate order
		$order = strtoupper( $order );
		if ( ! in_array( $order, [ 'ASC', 'DESC' ], true ) ) {
			$order = 'DESC';
		}

		$args = [
			'post_type'      => 'post',
			'posts_per_page' => $posts_per_page,
			'orderby'        => $orderby,
			'order'          => $order,
			'post_status'    => 'publish',
		];

		// Exclude current post if enabled
		if ( 'yes' === $settings['exclude_current'] && is_singular() ) {
			$current_id = get_the_ID();
			if ( $current_id ) {
				$args['post__not_in'] = [ absint( $current_id ) ];
			}
		}

		$this->query = new \WP_Query( $args );
	}
	
	/**
	 * Render template HTML using ob_start
	 *
	 * @param array $settings Widget settings.
	 * @return string Rendered HTML.
	 */
	protected function render_template( $settings ) {
		ob_start();
		include __DIR__ . '/template.php';
		return ob_get_clean();
	}

	/**
	 * Render Basic Posts widget output on the frontend.
	 *
	 * @since 2.4.0
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings_for_display();

		$this->query_posts();

		if ( ! $this->query->have_posts() ) {
			echo '<p>' . esc_html__( 'No posts found.', 'header-footer-elementor' ) . '</p>';
			return;
		}

		echo $this->render_template( $settings );
	}
}
