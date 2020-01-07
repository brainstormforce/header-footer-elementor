<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Control_Media;
use Elementor\Utils;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Scheme_Typography;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Image_Size;
use Elementor\Repeater;
use Elementor\Group_Control_Css_Filter;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Plugin;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Post Navigation widget.
 *
 * HFE widget for Post Navigation.
 *
 * @since x.x.x
 */
class Post_Nav extends Widget_Base {
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
		return 'post-nav';
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
		return __( 'Post Navigation', 'header-footer-elementor' );
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
	 * Retrieve the list of public post types.
	 *
	 * Used to retrieve the post type.
	 *
	 * @since x.x.x
	 *
	 * @access protected
	 *
	 * @return array post types.
	 *
	 * @param array $args array of query arguments.
	 */
	protected function get_avail_post_types( $args = [] ) {

		$post_type_args = [
			// Default is the value $public.
			'show_in_nav_menus' => true,
		];

		// Keep for backwards compatibility.
		if ( ! empty( $args['post_type'] ) ) {
			$post_type_args['name'] = $args['post_type'];
			unset( $args['post_type'] );
		}

		$post_type_args = wp_parse_args( $post_type_args, $args );

		$_post_types = get_post_types( $post_type_args, 'objects' );

		$post_types = [];

		// Retrieve the label of each post type.
		foreach ( $_post_types as $post_type => $object ) {
			$post_types[ $post_type ] = $object->label;
		}

		return $post_types;
	}

	/**
	 * Retrieve the list of taxonomies.
	 *
	 * Used to retrieve the post taxonomies.
	 *
	 * @since x.x.x
	 *
	 * @access protected
	 *
	 * @return array of taxonomies.
	 *
	 * @param array  $args array of query arguments.
	 * @param string $output name of taxonomies.
	 * @param string $operator name of operator.
	 */
	protected function get_avail_taxonomies( $args = [], $output = 'names', $operator = 'and' ) {
		// Fetch all the taxonomies available.
		global $wp_taxonomies;

		$field = ( 'names' === $output ) ? 'name' : false;
	
		// Handle 'object_type' separately.
		if ( isset( $args['object_type'] ) ) {
			$object_type = (array) $args['object_type'];
			unset( $args['object_type'] );
		}

		$taxonomies = wp_filter_object_list( $wp_taxonomies, $args, $operator );

		if ( isset( $object_type ) ) {
			foreach ( $taxonomies as $tax => $tax_data ) {
				if ( ! array_intersect( $object_type, $tax_data->object_type ) ) {
					unset( $taxonomies[ $tax ] );
				}
			}
		}

		if ( $field ) {
			$taxonomies = wp_list_pluck( $taxonomies, $field );
		}

		return $taxonomies;
	}

	/**
	 * Register Post Navigation Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_content_controls();
		$this->register_styling_controls();
	}

	/**
	 * Register Post Navigation General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_content_controls() {
		$this->start_controls_section(
			'post_navigation_content',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'show_label',
			[
				'label'     => __( 'Label', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SWITCHER,
				'label_on'  => __( 'Show', 'header-footer-elementor' ),
				'label_off' => __( 'Hide', 'header-footer-elementor' ),
				'default'   => 'yes',
			]
		);

		$this->add_control(
			'prev_label',
			[
				'label'     => __( 'Previous Label', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Previous', 'header-footer-elementor' ),
				'condition' => [
					'show_label' => 'yes',
				],
			]
		);

		$this->add_control(
			'next_label',
			[
				'label'     => __( 'Next Label', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Next', 'header-footer-elementor' ),
				'condition' => [
					'show_label' => 'yes',
				],
			]
		);

		$this->add_control(
			'show_title',
			[
				'label'     => __( 'Post Title', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SWITCHER,
				'label_on'  => __( 'Show', 'header-footer-elementor' ),
				'label_off' => __( 'Hide', 'header-footer-elementor' ),
				'default'   => 'yes',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'post_navigation_term',
			[
				'label' => __( 'Filter', 'header-footer-elementor' ),
			]
		);

		// Filter out post type without taxonomies.
		$post_type_options    = [];
		$post_type_taxonomies = [];
		foreach ( $this->get_avail_post_types() as $post_type => $post_type_label ) {
			$taxonomies = $this->get_avail_taxonomies( [ 'object_type' => $post_type ], false );
			if ( empty( $taxonomies ) ) {
				continue;
			}

			$post_type_options[ $post_type ]    = $post_type_label;
			$post_type_taxonomies[ $post_type ] = [];
			foreach ( $taxonomies as $taxonomy ) {
				$post_type_taxonomies[ $post_type ][ $taxonomy->name ] = $taxonomy->label;
			}
		}

		$this->add_control(
			'in_same_term',
			[
				'label'       => __( 'Select Term', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT2,
				'options'     => $post_type_options,
				'default'     => '',
				'multiple'    => true,
				'label_block' => true,
				'description' => __( 'Indicates whether next post must be within the same taxonomy term as the current post, this lets you set a taxonomy per each post type', 'header-footer-elementor' ),
			]
		);

		foreach ( $post_type_options as $post_type => $post_type_label ) {
			$this->add_control(
				$post_type . '_taxonomy',
				[
					'label'     => $post_type_label . ' ' . __( 'Taxonomy', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SELECT,
					'options'   => $post_type_taxonomies[ $post_type ],
					'default'   => '',
					'condition' => [
						'in_same_term' => $post_type,
					],
				]
			);
		}
		$this->end_controls_section();

		$this->start_controls_section(
			'post_navigation_arrow',
			[
				'label' => __( 'Arrows', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'show_arrow',
			[
				'label'     => __( 'Arrows', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SWITCHER,
				'label_on'  => __( 'Show', 'header-footer-elementor' ),
				'label_off' => __( 'Hide', 'header-footer-elementor' ),
				'default'   => 'yes',
			]
		);

		$this->add_control(
			'arrow',
			[
				'label'     => __( 'Type', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => [
					'fa fa-angle-left'          => __( 'Angle', 'header-footer-elementor' ),
					'fa fa-angle-double-left'   => __( 'Double Angle', 'header-footer-elementor' ),
					'fa fa-chevron-left'        => __( 'Chevron', 'header-footer-elementor' ),
					'fa fa-chevron-circle-left' => __( 'Chevron Circle', 'header-footer-elementor' ),
					'fa fa-caret-left'          => __( 'Caret', 'header-footer-elementor' ),
					'fa fa-arrow-left'          => __( 'Arrow', 'header-footer-elementor' ),
					'fa fa-long-arrow-left'     => __( 'Long Arrow', 'header-footer-elementor' ),
					'fa fa-arrow-circle-left'   => __( 'Arrow Circle', 'header-footer-elementor' ),
					'fa fa-arrow-circle-o-left' => __( 'Arrow Circle Negative', 'header-footer-elementor' ),
				],
				'default'   => 'fa fa-angle-left',
				'condition' => [
					'show_arrow' => 'yes',
				],
			]
		);

		$this->add_responsive_control(
			'arrow_size',
			[
				'label'     => __( 'Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 6,
						'max' => 300,
					],
				],
				'default' => '30',
				'selectors' => [
					'{{WRAPPER}} .hfe-post-nav-arrow-wrapper' => 'font-size: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'arrow_padding',
			[
				'label'     => __( 'Gap', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'selectors' => [
					'body:not(.rtl) {{WRAPPER}} .hfe-post-nav-arrow-prev' => 'padding-right: {{SIZE}}{{UNIT}};',
					'body:not(.rtl) {{WRAPPER}} .hfe-post-nav-arrow-next' => 'padding-left: {{SIZE}}{{UNIT}};',
					'body.rtl {{WRAPPER}} .hfe-post-nav-arrow-prev' => 'padding-left: {{SIZE}}{{UNIT}};',
					'body.rtl {{WRAPPER}} .hfe-post-nav-arrow-next' => 'padding-right: {{SIZE}}{{UNIT}};',
				],
				'range'     => [
					'em' => [
						'min' => 0,
						'max' => 5,
					],
				],
				'default' => '15',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'post_navigation_separator',
			[
				'label' => __( 'Separator', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'show_separator',
			[
				'label' => __( 'Enable', 'header-footer-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'label_on' => __( 'Yes', 'header-footer-elementor' ),
				'label_off' => __( 'No', 'header-footer-elementor' ),
				'default' => 'no',
				'prefix_class' => 'hfe-post-nav-separator-',
			]
		);

		$this->add_control(
			'separator_style',
			array(
				'label'       => __( 'Style', 'uael' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'none',
				'label_block' => false,
				'options'     => array(
					'none'   => __( 'None', 'uael' ),
					'solid'  => __( 'Solid', 'uael' ),
					'double' => __( 'Double', 'uael' ),
					'dotted' => __( 'Dotted', 'uael' ),
					'dashed' => __( 'Dashed', 'uael' ),
				),
				'condition'   => array(
					'show_separator' => 'yes',
				),
				'selectors'   => array(
					'{{WRAPPER}} .hfe-post-nav-separator-wrapper' => 'border-left-style: {{VALUE}};',
				),
			)
		);
		$this->add_control(
			'separator_color',
			array(
				'label'     => __( 'Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => array(
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				),
				'condition'   => array(
					'show_separator' => 'yes',
				),
				'default'   => '',
				'selectors' => array(
					'{{WRAPPER}} .hfe-post-nav-separator-wrapper' => 'border-left-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'separator_size',
			array(
				'label'      => __( 'Width', 'uael' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'default'    => array(
					'size' => 40,
				),
				'range'      => array(
					'px' => array(
						'max' => 150,
					),
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-post-nav-separator-wrapper' => 'border-left-width: {{SIZE}}{{UNIT}}; box-sizing:content-box;',
				),
				'condition'   => array(
					'show_separator' => 'yes',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Register Post Navigation General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_styling_controls() {
		$this->start_controls_section(
			'label_style',
			[
				'label'     => __( 'Label', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_label' => 'yes',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'label_typography',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_2,
				'selector' => '{{WRAPPER}} span.hfe-post-nav-prev-label, {{WRAPPER}} span.hfe-post-nav-next-label',
				'exclude'  => [ 'line_height' ],
			]
		);

		$this->start_controls_tabs( 'tabs_label_style' );

		$this->start_controls_tab(
			'label_color_normal',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'label_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
				'selectors' => [
					'{{WRAPPER}} span.hfe-post-nav-prev-label' => 'color: {{VALUE}};',
					'{{WRAPPER}} span.hfe-post-nav-next-label' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'label_color_hover',
			[
				'label' => __( 'Hover', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'label_hover_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} span.hfe-post-nav-prev-label:hover' => 'color: {{VALUE}};',
					'{{WRAPPER}} span.hfe-post-nav-next-label:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'title_style',
			[
				'label'     => __( 'Title', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_title' => 'yes',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'title_typography',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_2,
				'selector' => '{{WRAPPER}} span.hfe-post-nav-prev-title, {{WRAPPER}} span.hfe-post-nav-next-title',
				'exclude'  => [ 'line_height' ],
			]
		);

		$this->start_controls_tabs( 'tabs_post_navigation_style' );

		$this->start_controls_tab(
			'tab_color_normal',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'text_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_2,
				],
				'selectors' => [
					'{{WRAPPER}} span.hfe-post-nav-prev-title, {{WRAPPER}} span.hfe-post-nav-next-title' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_color_hover',
			[
				'label' => __( 'Hover', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'hover_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} span.hfe-post-nav-prev-title:hover, {{WRAPPER}} span.hfe-post-nav-next-title:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'arrow_style',
			[
				'label'     => __( 'Arrow', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_arrow' => 'yes',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_post_navigation_arrow_style' );

		$this->start_controls_tab(
			'arrow_color_normal',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'arrow_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-post-nav-arrow-wrapper' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'arrow_color_hover',
			[
				'label' => __( 'Hover', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'arrow_hover_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-post-nav-arrow-wrapper:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Render Post Navigation output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings_for_display();

		$prev_label = '';
		$next_label = '';
		$prev_title = '';
		$next_title = '';
		$prev_arrow = '';
		$next_arrow = '';

		if ( 'yes' === $settings['show_label'] ) {
			$prev_label = '<span class="hfe-post-nav-prev-label">' . $settings['prev_label'] . '</span>';
			$next_label = '<span class="hfe-post-nav-next-label">' . $settings['next_label'] . '</span>';
		}

		if ( 'yes' === $settings['show_title'] ) {
			$prev_title = '<span class="hfe-post-nav-prev-title">%title</span>';
			$next_title = '<span class="hfe-post-nav-next-title">%title</span>';
		}

		if ( 'yes' === $settings['show_arrow'] ) {
			if ( is_rtl() ) {
				$prev_icon_class = str_replace( 'left', 'right', $settings['arrow'] );
				$next_icon_class = $settings['arrow'];
			} else {
				$prev_icon_class = $settings['arrow'];
				$next_icon_class = str_replace( 'left', 'right', $settings['arrow'] );
			}

			$prev_arrow = '<span class="hfe-post-nav-arrow-wrapper hfe-post-nav-arrow-prev"><i class="' . $prev_icon_class . '" aria-hidden="true"></i><span class="elementor-screen-only">' . esc_html__( 'Prev', 'header-footer-elementor' ) . '</span></span>';
			$next_arrow = '<span class="hfe-post-nav-arrow-wrapper hfe-post-nav-arrow-next"><i class="' . $next_icon_class . '" aria-hidden="true"></i><span class="elementor-screen-only">' . esc_html__( 'Next', 'header-footer-elementor' ) . '</span></span>';
		}

		$in_same_term = false;
		$taxonomy     = 'category';
		$post_type    = get_post_type( get_queried_object_id() );

		if ( ! empty( $settings['in_same_term'] ) && is_array( $settings['in_same_term'] ) && in_array( $post_type, $settings['in_same_term'] ) ) {
			if ( isset( $settings[ $post_type . '_taxonomy' ] ) ) {
				$in_same_term = true;
				$taxonomy     = $settings[ $post_type . '_taxonomy' ];
			}
		}

		?>

		<div class="hfe-post-navigation elementor-grid">
			<div class="hfe-post-nav-prev hfe-post-nav-link">
				<?php previous_post_link( '%link', $prev_arrow . '<span class="hfe-post-nav-link-prev">' . $prev_label . $prev_title . '</span>', $in_same_term, '', $taxonomy ); ?>
			</div>
			<?php if ( 'yes' === $settings['show_separator'] ) { ?>
				<div class="hfe-post-nav-separator-wrapper">
					<div class="hfe-post-nav-separator"></div>
				</div>
			<?php } ?>
			<div class="hfe-post-nav-next hfe-post-nav-link">
				<?php next_post_link( '%link', '<span class="hfe-post-nav-link-next">' . $next_label . $next_title . '</span>' . $next_arrow, $in_same_term, '', $taxonomy ); ?>
			</div>
		</div>

		<?php
	}
}
