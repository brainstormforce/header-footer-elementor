<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\PostInfo;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;
use Elementor\Utils;
use Elementor\Icons_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Repeater;
use Elementor\Modules\DynamicTags\Module as TagsModule;

use HFE\WidgetsManager\Widgets_Loader;
use HFE\WidgetsManager\Base\Common_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Post Info widget
 *
 * HFE widget for Post Info.
 *
 * @since x.x.x
 */
class Post_Info extends Common_Widget {

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
		return parent::get_widget_slug( 'Post_Info' );
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
		return parent::get_widget_title( 'Post_Info' );
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
		return parent::get_widget_icon( 'Post_Info' );
	}

	/**
	 * Register Post Info controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_controls() {
		$this->register_general_post_info_controls();
		$this->register_style_post_info_meta_controls();
		$this->register_style_post_info_icon_controls();
		$this->register_style_post_info_text_controls();
	}

	
	/**
	 * Register general Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_general_post_info_controls() {
		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'view',
			[
				'label'        => __( 'Layout', 'header-footer-elementor' ),
				'type'         => Controls_Manager::CHOOSE,
				'default'      => 'inline',
				'options'      => [
					'inline'      => [
						'title' => __( 'Inline', 'header-footer-elementor' ),
						'icon'  => 'eicon-ellipsis-h',
					],
					'traditional' => [
						'title' => __( 'Default', 'header-footer-elementor' ),
						'icon'  => 'eicon-editor-list-ul',
					],
				],
				'render_type'  => 'template',
				'prefix_class' => 'hfe-post-info-layout-',
			]
		);

		$repeater = new Repeater();
		
		$repeater->add_control(
			'type',
			[
				'label'   => __( 'Type', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'date',
				'options' => [
					'author'   => __( 'Author', 'header-footer-elementor' ),
					'time'     => __( 'Time', 'header-footer-elementor' ),
					'date'     => __( 'Date', 'header-footer-elementor' ),
					'terms'    => __( 'Terms', 'header-footer-elementor' ),
					'comments' => __( 'Comments', 'header-footer-elementor' ),
					'custom'   => __( 'Custom', 'header-footer-elementor' ),
				],
			]
		);

		$repeater->add_control(
			'date_format',
			[
				'label'     => __( 'Date Format', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'default',
				'options'   => [
					'default' => 'Default',
					'0'       => _x( 'June 1, 2024 (F j, Y)', 'Date Format', 'header-footer-elementor' ),
					'1'       => '06/01/2024 (d/m/Y)',
					'2'       => '2024-01-06 (Y-m-d)',
					'3'       => '01/06/2024 (m/d/Y)',
					'custom'  => __( 'Custom', 'header-footer-elementor' ),
				],
				'condition' => [
					'type' => 'date',
				],
			]
		);

		
		$repeater->add_control(
			'custom_date_format',
			[
				'label'       => __( 'Custom Date Format', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => 'F j, Y',
				'condition'   => [
					'type'        => 'date',
					'date_format' => 'custom',
				],
				'description' => sprintf(
					/* translators: %s: Allowed data letters (see: http://php.net/manual/en/function.date.php). */
					__( 'Use the letters: %s', 'header-footer-elementor' ),
					'l D d j S F m M n Y y'
				),
			]
		);

		$repeater->add_control(
			'time_format',
			[
				'label'     => __( 'Time Format', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'default',
				'options'   => [
					'default' => 'Default',
					'0'       => '3:31 pm (g:i a)',
					'1'       => '3:31 PM (g:i A)',
					'2'       => '15:31 (H:i)',
					'custom'  => __( 'Custom', 'header-footer-elementor' ),
				],
				'condition' => [
					'type' => 'time',
				],
			]
		);
		$repeater->add_control(
			'custom_time_format',
			[
				'label'       => __( 'Custom Time Format', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => 'g:i a',
				'placeholder' => 'g:i a',
				'condition'   => [
					'type'        => 'time',
					'time_format' => 'custom',
				],
				'description' => sprintf(
					/* translators: %s: Allowed time letters (see: http://php.net/manual/en/function.time.php). */
					__( 'Use the letters: %s', 'header-footer-elementor' ),
					'g G H i a A'
				),
			]
		);

		$repeater->add_control(
			'taxonomy',
			[
				'label'       => __( 'Taxonomy', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT2,
				'label_block' => true,
				'default'     => [],
				'options'     => $this->get_taxonomies(),
				'condition'   => [
					'type' => 'terms',
				],
			]
		);

		$repeater->add_control(
			'text_prefix',
			[
				'label'     => __( 'Before', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'condition' => [
					'type!' => 'custom',
				],
			]
		);

		$repeater->add_control(
			'show_avatar',
			[
				'label'     => __( 'Avatar', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SWITCHER,
				'condition' => [
					'type' => 'author',
				],
			]
		);

		$repeater->add_responsive_control(
			'avatar_size',
			[
				'label'     => __( 'Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} {{CURRENT_ITEM}} .hfe-post-info-icon' => 'width: {{SIZE}}{{UNIT}}',
				],
				'condition' => [
					'show_avatar' => 'yes',
				],
			]
		);

		$repeater->add_control(
			'comments_custom_strings',
			[
				'label'     => __( 'Custom Format', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => false,
				'condition' => [
					'type' => 'comments',
				],
			]
		);

		$repeater->add_control(
			'string_no_comments',
			[
				'label'       => __( 'No Comments', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'No Comments', 'header-footer-elementor' ),
				'condition'   => [
					'comments_custom_strings' => 'yes',
					'type'                    => 'comments',
				],
			]
		);

		$repeater->add_control(
			'string_one_comment',
			[
				'label'       => __( 'One Comment', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => __( 'One Comment', 'header-footer-elementor' ),
				'condition'   => [
					'comments_custom_strings' => 'yes',
					'type'                    => 'comments',
				],
			]
		);

		$repeater->add_control(
			'string_comments',
			[
				'label'       => __( 'Comments', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				/* translators: %s: Number of comments. */
				'placeholder' => __( '%s Comments', 'header-footer-elementor' ),
				'condition'   => [
					'comments_custom_strings' => 'yes',
					'type'                    => 'comments',
				],
			]
		);

		$repeater->add_control(
			'custom_text',
			[
				'label'       => __( 'Custom', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				'dynamic'     => [
					'active' => true,
				],
				'label_block' => true,
				'condition'   => [
					'type' => 'custom',
				],
			]
		);

		$repeater->add_control(
			'link',
			[
				'label'     => __( 'Link', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'condition' => [
					'type!' => 'time',
				],
			]
		);

		$repeater->add_control(
			'custom_url',
			[
				'label'     => __( 'Custom URL', 'header-footer-elementor' ),
				'type'      => Controls_Manager::URL,
				'dynamic'   => [
					'active' => true,
				],
				'condition' => [
					'type' => 'custom',
				],
			]
		);

		$repeater->add_control(
			'show_icon',
			[
				'label'     => __( 'Icon', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => [
					'none'    => __( 'None', 'header-footer-elementor' ),
					'default' => __( 'Default', 'header-footer-elementor' ),
					'custom'  => __( 'Custom', 'header-footer-elementor' ),
				],
				'default'   => 'default',
				'condition' => [
					'show_avatar!' => 'yes',
				],
			]
		);

		$repeater->add_control(
			'selected_icon',
			[
				'label'     => __( 'Choose Icon', 'header-footer-elementor' ),
				'type'      => Controls_Manager::ICONS,
				'condition' => [
					'show_icon'    => 'custom',
					'show_avatar!' => 'yes',
				],
			]
		);

		$this->add_control(
			'icon_list',
			[
				'label'       => '',
				'type'        => Controls_Manager::REPEATER,
				'fields'      => $repeater->get_controls(),
				'default'     => [
					[
						'type'          => 'date',
						'selected_icon' => [
							'value'   => 'far fa-calendar-alt',
							'library' => 'fa-regular',
						],
					],
					[
						'type'          => 'author',
						'selected_icon' => [
							'value'   => 'far fa-user-circle',
							'library' => 'fa-regular',
						],
					],
					[
						'type'          => 'time',
						'selected_icon' => [
							'value'   => 'far fa-clock',
							'library' => 'fa-regular',
						],
					],
				],
				'title_field' => '{{{ elementor.helpers.renderIcon( this, selected_icon, {}, "i", "panel" ) || \'<i class="{{ icon }}" aria-hidden="true"></i>\' }}} <span style="text-transform: capitalize;">{{{ type }}}</span>',    // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register style Controls for list items.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_style_post_info_meta_controls() {
		$this->start_controls_section(
			'section_style_list_items',
			[
				'label' => __( 'List Items', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);
			$this->add_responsive_control(
				'space_between',
				[
					'label'     => __( 'Space Between', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'range'     => [
						'px' => [
							'max' => 50,
						],
					],
					'selectors' => [
						'{{WRAPPER}} .hfe-post-info-items:not(.hfe-post-info-inline) .hfe-post-info-item:not(:last-child)' => 'padding-bottom: calc({{SIZE}}{{UNIT}}/2)',
						'{{WRAPPER}} .hfe-post-info-items:not(.hfe-post-info-inline) .hfe-post-info-item:not(:first-child)' => 'margin-top: calc({{SIZE}}{{UNIT}}/2)',
						'{{WRAPPER}} .hfe-post-info-items.hfe-post-info-inline .hfe-post-info-item' => 'margin-right: calc({{SIZE}}{{UNIT}}/2); margin-left: calc({{SIZE}}{{UNIT}}/2)',
						'{{WRAPPER}} .hfe-post-info-items.hfe-post-info-inline' => 'margin-right: calc(-{{SIZE}}{{UNIT}}/2); margin-left: calc(-{{SIZE}}{{UNIT}}/2)',
						'{{WRAPPER}} .hfe-post-info-items.hfe-post-info-inline .hfe-post-info-item::after' => 'margin-left: {{SIZE}}{{UNIT}}; right:0;',
					],
				]
			);

			$this->add_responsive_control(
				'icon_align',
				[
					'label'     => __( 'Alignment', 'header-footer-elementor' ),
					'type'      => Controls_Manager::CHOOSE,
					'options'   => [
						'flex-start' => [
							'title' => __( 'Start', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-left',
						],
						'center'     => [
							'title' => __( 'Center', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-center',
						],
						'flex-end'   => [
							'title' => __( 'End', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-right',
						],
					],
					'selectors' => [
						'{{WRAPPER}} ul.hfe-post-info-inline.hfe-post-info-items, {{WRAPPER}}.hfe-post-info-layout-traditional .hfe-post-info-item' => 'justify-content:{{VALUE}};',
					],
				]
			);

			$this->add_control(
				'separator',
				[
					'label'     => __( 'Separator', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SWITCHER,
					'label_off' => __( 'Off', 'header-footer-elementor' ),
					'label_on'  => __( 'On', 'header-footer-elementor' ),
					'selectors' => [
						'{{WRAPPER}} .hfe-post-info-item:not(:last-child):after' => 'content: ""',
					],
					'separator' => 'before',
				]
			);

			$this->add_control(
				'separator_style',
				[
					'label'     => __( 'Style', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SELECT,
					'options'   => [
						'solid'  => __( 'Solid', 'header-footer-elementor' ),
						'double' => __( 'Double', 'header-footer-elementor' ),
						'dotted' => __( 'Dotted', 'header-footer-elementor' ),
						'dashed' => __( 'Dashed', 'header-footer-elementor' ),
					],
					'default'   => 'solid',
					'condition' => [
						'separator' => 'yes',
					],
					'selectors' => [
						'{{WRAPPER}} .hfe-post-info-items:not(.hfe-post-info-inline) .hfe-post-info-item:not(:last-child):after' => 'border-top-style: {{VALUE}};',
						'{{WRAPPER}} .hfe-post-info-items.hfe-post-info-inline .hfe-post-info-item:not(:last-child):after' => 'border-left-style: {{VALUE}}',
					],
				]
			);

			$this->add_control(
				'separator_weight',
				[
					'label'     => __( 'Weight', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'default'   => [
						'size' => 1,
					],
					'range'     => [
						'px' => [
							'min' => 1,
							'max' => 20,
						],
					],
					'condition' => [
						'separator' => 'yes',
					],
					'selectors' => [
						'{{WRAPPER}} .hfe-post-info-items:not(.hfe-post-info-inline) .hfe-post-info-item:not(:last-child):after' => 'border-top-width: {{SIZE}}{{UNIT}}',
						'{{WRAPPER}} .hfe-post-info-inline .hfe-post-info-item:not(:last-child):after' => 'border-left-width: {{SIZE}}{{UNIT}}',
					],
				]
			);

			$this->add_control(
				'separator_width',
				[
					'label'      => __( 'Width', 'header-footer-elementor' ),
					'type'       => Controls_Manager::SLIDER,
					'size_units' => [ '%', 'px' ],
					'default'    => [
						'unit' => '%',
					],
					'range'      => [
						'px' => [
							'min' => 1,
							'max' => 100,
						],
						'%'  => [
							'min' => 1,
							'max' => 100,
						],
					],
					'condition'  => [
						'separator' => 'yes',
						'view!'     => 'inline',
					],
					'selectors'  => [
						'{{WRAPPER}} .hfe-post-info-item:not(:last-child):after' => 'width: {{SIZE}}{{UNIT}}',
					],
				]
			);

			$this->add_control(
				'separator_height',
				[
					'label'      => __( 'Height', 'header-footer-elementor' ),
					'type'       => Controls_Manager::SLIDER,
					'size_units' => [ '%', 'px' ],
					'default'    => [
						'size' => 100,
						'unit' => '%',
					],
					'range'      => [
						'px' => [
							'min' => 1,
							'max' => 100,
						],
						'%'  => [
							'min' => 1,
							'max' => 100,
						],
					],
					'condition'  => [
						'separator' => 'yes',
						'view'      => 'inline',
					],
					'selectors'  => [
						'{{WRAPPER}} .hfe-post-info-item:not(:last-child):after' => 'height: {{SIZE}}{{UNIT}}',
					],
				]
			);

			$this->add_control(
				'separator_color',
				[
					'label'     => __( 'Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '#ddd',
					'condition' => [
						'separator' => 'yes',
					],
					'selectors' => [
						'{{WRAPPER}} .hfe-post-info-item:not(:last-child):after' => 'border-color: {{VALUE}};',
					],
				]
			);


		$this->end_controls_section();
	}

	/**
	 * Register style Controls for icon.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_style_post_info_icon_controls() {

		$this->start_controls_section(
			'section_style_icon',
			[
				'label' => __( 'Icon', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'icon_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-post-info-icon i'   => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-post-info-icon svg' => 'fill: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'icon_size',
			[
				'label'     => __( 'Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 14,
				],
				'range'     => [
					'px' => [
						'min' => 6,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-post-info-icon'     => 'width: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .hfe-post-info-icon i'   => 'font-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .hfe-post-info-icon svg' => '--e-icon-list-icon-size: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

	}

	/**
	 * Register style Controls for text.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_style_post_info_text_controls() {

		$this->start_controls_section(
			'section_style_text',
			[
				'label' => __( 'Text', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

			$this->add_control(
				'text_indent',
				[
					'label'     => __( 'Spacing between Icon & Text', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'range'     => [
						'px' => [
							'max' => 50,
						],
					],
					'default'   => [
						'size' => 10,
						'unit' => 'px',
					],
					'selectors' => [
						'body:not(.rtl) {{WRAPPER}} .hfe-post-info-text' => 'padding-left: {{SIZE}}{{UNIT}}',
						'body.rtl {{WRAPPER}} .hfe-post-info-text' => 'padding-right: {{SIZE}}{{UNIT}}',
					],
				]
			);

			$this->add_control(
				'text_color',
				[
					'label'     => __( 'Text Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .hfe-post-info-text, {{WRAPPER}} .hfe-post-info-text a' => 'color: {{VALUE}}',
					],
				]
			);

			$this->add_group_control(
				Group_Control_Typography::get_type(),
				[
					'name'     => 'icon_typography',
					'selector' => '{{WRAPPER}} .hfe-post-info-item',
				]
			);

		$this->end_controls_section();

	}

	/**
	 * Get taxonomies.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return array
	 */
	protected function get_taxonomies() {
		$taxonomies = get_taxonomies(
			[
				'show_in_nav_menus' => true,
			],
			'objects'
		);

		$options = [
			'' => esc_html__( 'Choose', 'header-footer-elementor' ),
		];

		foreach ( $taxonomies as $taxonomy ) {
			$options[ $taxonomy->name ] = $taxonomy->label;
		}

		return $options;
	}

	/**
	 * Render Post meta fields
	 * 
	 * @since x.x.x
	 * @access protected
	 * @param array $repeater_item An array of repeater item options for custom strings and link.
	 * @return array An array of rendered post meta fields.
	 */
	protected function get_meta_data( $repeater_item ) {

		$item_data = [];

		switch ( $repeater_item['type'] ) {

			case 'time':
				$item_data = $this->get_post_time_data( $repeater_item );
				break;

			case 'date':
				$item_data = $this->get_post_date_data( $repeater_item );
				break;

			case 'author':
				$item_data = $this->get_author_data( get_the_ID(), $repeater_item );
				break;

			case 'terms':
				$item_data = $this->get_post_terms_data( $repeater_item );
				break;

			case 'comments':
				$item_data = $this->get_post_comments_data( $repeater_item );
				break;

			case 'custom':
				$item_data = $this->get_custom_meta_data( $repeater_item );
				break;
		}

		$item_data['type'] = $repeater_item['type'];

		if ( ! empty( $repeater_item['text_prefix'] ) ) {
			$item_data['text_prefix'] = esc_html( $repeater_item['text_prefix'] );
		}

		return $item_data;

	}

	/**
	 * Get the terms data for a specific taxonomy of a post.
	 *
	 * @param array $repeaterItem  Repeater item options such as taxonomy and link option.
	 * @return array $termsData Modularized terms data with term names, links, and icons.
	 */
	function get_post_terms_data( $repeaterItem ) {
		// Default icon and icon library for terms.
		$termsData = [
			'selected_icon' => [
				'value'   => 'fas fa-tags',
				'library' => 'fa-solid',
			],
			'itemprop'      => 'about',
			'terms_list'    => [],
		];

		// Ensure taxonomy is set and valid.
		if ( empty( $repeaterItem['taxonomy'] ) ) {
			return $termsData; // Return default data if no taxonomy is defined.
		}

		$taxonomy = sanitize_text_field( $repeaterItem['taxonomy'] );
		$terms    = wp_get_post_terms( get_the_ID(), $taxonomy );

		// Loop through terms and collect term data.
		if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
			foreach ( $terms as $term ) {
				$termId                             = $term->term_id;
				$termsData['terms_list'][ $termId ] = [
					'text' => esc_html( $term->name ),
				];

				// Add term link if the option is enabled.
				if ( isset( $repeaterItem['link'] ) && 'yes' === $repeaterItem['link'] ) {
					$term_link = get_term_link( $term );
					if ( ! is_wp_error( $term_link ) ) {
						$termsData['terms_list'][ $termId ]['url'] = esc_url( $term_link );
					}
				}
			}
		}

		return $termsData;
	}

	/**
	 * Get custom data for a repeater item.
	 *
	 * @param array $repeaterItem  Repeater item options such as custom text, icon, and link option.
	 * @return array $customData Modularized custom data with text, icons, and optional URL.
	 */
	function get_custom_meta_data( $repeaterItem ) {
		// Default icon and icon library for custom data.
		$customData = [
			'text'          => ! empty( $repeaterItem['custom_text'] ) ? sanitize_text_field( $repeaterItem['custom_text'] ) : '',
			'selected_icon' => [
				'value'   => 'far fa-tags',
				'library' => 'fa-regular',
			],
		];

		// Add custom URL if the option is enabled and the URL is not empty.
		if ( isset( $repeaterItem['link'] ) && 'yes' === $repeaterItem['link'] && ! empty( $repeaterItem['custom_url'] ) ) {
			$customData['url'] = $repeaterItem['custom_url'];
		}

		return $customData;
	}

	/**
	 * Get the post comments data for a given post.
	 *
	 * @param array $repeaterItem  Repeater item options for custom strings and link.
	 * @return array $commentsData Modularized comments data with custom strings, icons, and optional link.
	 */
	function get_post_comments_data( $repeaterItem ) {

		if ( ! comments_open() ) {
			return [];
		}

		// Define default comment strings.
		$defaultStrings = apply_filters(
			'hfe_custom_comments_strings',
			[
				'stringNoComments' => __( 'No Comments', 'header-footer-elementor' ),
				'stringOneComment' => __( 'One Comment', 'header-footer-elementor' ),
				/* translators: %s: Number of comments. */
				'stringComments'   => __( '%s Comments', 'header-footer-elementor' ),
			]
		);

		// Check if custom strings are provided.
		if ( isset( $repeaterItem['comments_custom_strings'] ) && 'yes' === $repeaterItem['comments_custom_strings'] ) {
			$defaultStrings['stringNoComments'] = ! empty( $repeaterItem['string_no_comments'] ) ? $repeaterItem['string_no_comments'] : $defaultStrings['stringNoComments'];
			$defaultStrings['stringOneComment'] = ! empty( $repeaterItem['string_one_comment'] ) ? $repeaterItem['string_one_comment'] : $defaultStrings['stringOneComment'];
			$defaultStrings['stringComments']   = ! empty( $repeaterItem['string_comments'] ) ? $repeaterItem['string_comments'] : $defaultStrings['stringComments'];
		}

		// Get the number of comments.
		$numComments = (int) get_comments_number();

		// Choose appropriate comment text.
		if ( 0 === $numComments ) {
			$commentsText = $defaultStrings['stringNoComments'];
		} else {
			$commentsText = sprintf( 
				_n( '%s comment', '%s comments', $numComments, 'header-footer-elementor' ), 
				$numComments 
			);
		}

		// Set up comments data.
		$commentsData = [
			'text'          => $commentsText,
			'selected_icon' => [
				'value'   => 'far fa-comment-dots',
				'library' => 'fa-regular',
			],
			'itemprop'      => 'commentCount',
		];

		// Conditional link to comments.
		if ( isset( $repeaterItem['link'] ) && 'yes' === $repeaterItem['link'] ) {
			$commentsData['url'] = [
				'url' => get_comments_link(),
			];
		}

		return $commentsData;
	}

	/**
	 * Get the post time data for a given post.
	 *
	 * @param array $repeater_item  Repeater item options for time format.
	 * @return array $time_data     Modularized time data with format and icons.
	 */
	function get_post_time_data( $repeater_item ) {
		// Define default and custom time formats.
		$default_format     = 'g:i a';
		$custom_time_format = ! empty( $repeater_item['custom_time_format'] ) ? $repeater_item['custom_time_format'] : $default_format;

		// Available time formats.
		$format_options = apply_filters(
			'hfe_time_format_options',
			[
				'default' => $default_format,
				'0'       => 'g:i a',
				'1'       => 'g:i A',
				'2'       => 'H:i',
				'custom'  => $custom_time_format,
			]
		);

		// Select appropriate format or fallback to default.
		$selected_format = isset( $format_options[ $repeater_item['time_format'] ] ) ? $format_options[ $repeater_item['time_format'] ] : $default_format;

		// Set time and icons.
		$time_data = [
			'text'          => get_the_time( $selected_format ),
			'selected_icon' => [
				'value'   => 'far fa-clock',
				'library' => 'fa-regular',
			],
		];

		return $time_data;
	}


	/**
	 * Get the post date data for a given post.
	 *
	 * @param array $repeater_item  Repeater item options for date format and link.
	 * @return array $date_data     Modularized date data with format, icons, and optional link.
	 */
	function get_post_date_data( $repeater_item ) {
		// Define default and custom date formats.
		$default_format     = 'F j, Y';
		$custom_date_format = ! empty( $repeater_item['custom_date_format'] ) ? $repeater_item['custom_date_format'] : $default_format;

		// Available date formats.
		$format_options = apply_filters(
			'custom_date_format_options',
			[
				'default' => $default_format,
				'0'       => 'F j, Y',
				'1'       => 'd/m/Y',
				'2'       => 'Y-m-d',
				'3'       => 'm/d/Y',
				'custom'  => $custom_date_format,
			]
		);

		// Select appropriate format or fallback to default.
		$selected_format = isset( $format_options[ $repeater_item['date_format'] ] ) ? $format_options[ $repeater_item['date_format'] ] : $default_format;

		// Set date and icons.
		$date_data = [
			'text'          => get_the_time( $selected_format ),
			'selected_icon' => [
				'value'   => 'far fa-calendar-alt',
				'library' => 'fa-regular',
			],
			'itemprop'      => 'datePublished',
		];

		// Optional link to date archive.
		if ( isset( $repeater_item['link'] ) && 'yes' === $repeater_item['link'] ) {
			$date_data['url'] = [
				'url' => get_day_link( get_post_time( 'Y' ), get_post_time( 'm' ), get_post_time( 'j' ) ),
			];
		}

		return $date_data;
	}

	/**
	 * Get the author data for a given post ID.
	 *
	 * @param int   $post_id        Post ID to fetch the author details.
	 * @param array $repeater_item  Repeater item options for link and avatar.
	 * @return array $author_data   Modularized author data with icons, URLs, and avatar.
	 */
	protected function get_author_data( $post_id, $repeater_item ) {
		$user_id = get_post_field( 'post_author', $post_id );

		// Author Name and Default Icon.
		$author_data = [
			'text'          => get_the_author_meta( 'display_name', $user_id ),
			'selected_icon' => [
				'value'   => 'far fa-user-circle',
				'library' => 'fa-regular',
			],
			'itemprop'      => 'author',
		];

		// Conditional link to author posts.
		if ( isset( $repeater_item['link'] ) && 'yes' === $repeater_item['link'] ) {
			$author_data['url'] = [
				'url' => get_author_posts_url( $user_id ),
			];
		}

		// Conditional avatar inclusion.
		if ( isset( $repeater_item['show_avatar'] ) && 'yes' === $repeater_item['show_avatar'] ) {
			$author_data['image'] = get_avatar_url( $user_id, 96 );
		}

		return $author_data;
	}

	/**
	 * Render the individual items in the icon list.
	 *
	 * @param array $icon_list Repeater items from the settings.
	 * @return string The generated HTML for the items.
	 */
	protected function render_items( $icon_list ) {
		ob_start();
		foreach ( $icon_list as $repeater_item ) {
			$this->render_item( $repeater_item );
		}
		return ob_get_clean();
	}

	/**
	 * Render the individual item in the icon list.
	 *
	 * @param array $repeater_item Repeater item from the settings.
	 * @return void
	 */
	protected function render_item( $repeater_item ) {
		$item_data      = $this->get_meta_data( $repeater_item );
		$repeater_index = $repeater_item['_id'];
	
		// Bail early if both text and terms list are empty.
		if ( empty( $item_data['text'] ) && empty( $item_data['terms_list'] ) ) {
			return;
		}
	
		$item_key = 'item_' . $repeater_index;
		$link_key = 'link_' . $repeater_index;
		$has_link = false;
	
		// Add base classes to the list item.
		$this->add_render_attribute(
			$item_key,
			'class',
			[
				'hfe-post-info-item',
				'elementor-repeater-item-' . $repeater_item['_id'],
			]
		);
	
		// Check active settings for inline view.
		$active_settings = $this->get_active_settings();
		if ( 'inline' === $active_settings['view'] ) {
			$this->add_render_attribute( $item_key, 'class', 'hfe-post-info-inline-item' );
		}
	
		// Add itemprop attribute if available.
		if ( ! empty( $item_data['itemprop'] ) ) {
			$this->add_render_attribute( $item_key, 'itemprop', $item_data['itemprop'] );
		}
	
		// Check if the item has a link.
		if ( ! empty( $item_data['url']['url'] ) ) {
			$has_link = true;
			$this->add_link_attributes( $link_key, $item_data['url'] );
		}
	
		?>
		<li <?php echo $this->get_render_attribute_string( $item_key ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>> 
			<?php if ( $has_link ) : ?>
				<a <?php echo $this->get_render_attribute_string( $link_key ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php endif; ?>

			<?php
			$this->render_item_icon_or_image( $item_data, $repeater_item, $repeater_index );
			$this->render_item_text( $item_data, $repeater_index );
			?>

			<?php if ( $has_link ) : ?>
				</a>
			<?php endif; ?>
		</li>
		<?php
	}

	/**
	 * Render the text for the item in the icon list.
	 *
	 * @param array $item_data      The data for the item.
	 * @param array $repeater_item  The repeater item data.
	 * @param int   $repeater_index The index of the repeater item.
	 * @return void
	 */
	protected function render_item_icon_or_image( $item_data, $repeater_item, $repeater_index ) {
		// Determine icon or image settings.
		if ( 'custom' === $repeater_item['show_icon'] && ! empty( $repeater_item['selected_icon'] ) ) {
			$item_data['selected_icon'] = $repeater_item['selected_icon'];
		} elseif ( 'none' === $repeater_item['show_icon'] ) {
			$item_data['selected_icon'] = [];
		}
			
		if ( empty( $item_data['selected_icon'] ) && empty( $item_data['image'] ) ) {
			return; // No icon or image to render.
		}

		$show_icon = 'none' !== $repeater_item['show_icon'];
	
		if ( ! empty( $item_data['image'] ) || $show_icon ) {
			?>
			<span class="hfe-post-info-icon">
				<?php if ( ! empty( $item_data['image'] ) ) : ?>
					<img class="hfe-post-info-avatar" src="<?php echo esc_url( $item_data['image'] ); ?>" alt="<?php echo esc_attr( $item_data['text'] ); ?>">
				<?php elseif ( $show_icon && ! empty( $item_data['selected_icon'] ) ) : ?>
					<?php 
					Icons_Manager::render_icon( $item_data['selected_icon'], [ 'aria-hidden' => 'true' ] );
					?>
				<?php endif; ?>
			</span>
			<?php
		}
	}
	
	/**
	 * Render the text for the item in the icon list.
	 *
	 * @param array $item_data      The data for the item.
	 * @param int   $repeater_index The index of the repeater item.
	 * @return void
	 */
	protected function render_item_text( $item_data, $repeater_index ) {
		$repeater_setting_key = $this->get_repeater_setting_key( 'text', 'icon_list', $repeater_index );
	
		// Add classes for text attributes.
		$this->add_render_attribute( $repeater_setting_key, 'class', [ 'hfe-post-info-text', 'hfe-post-info__item', 'hfe-post-info__item--type-' . $item_data['type'] ] );
		if ( ! empty( $item['terms_list'] ) ) {
			$this->add_render_attribute( $repeater_setting_key, 'class', 'hfe-terms-list' );
		}
	
		?>
		<span <?php echo $this->get_render_attribute_string( $repeater_setting_key ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php if ( ! empty( $item_data['text_prefix'] ) ) : ?>
				<span class="hfe-post-info__item-prefix"><?php echo esc_html( $item_data['text_prefix'] ); ?></span>
			<?php endif; ?>

			<?php if ( ! empty( $item_data['terms_list'] ) ) : ?>
				<span class="hfe-post-info__terms-list">
					<?php
					$terms_list = array_map(
						function( $term ) {
							$term_text = esc_html( $term['text'] );
							return ! empty( $term['url'] ) ? '<a href="' . esc_url( $term['url'] ) . '" class="hfe-post-info__terms-list-item">' . $term_text . '</a>' : '<span class="hfe-post-info__terms-list-item">' . $term_text . '</span>';
						},
						$item_data['terms_list']
					);
					echo implode( ', ', $terms_list ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					?>
				</span>
			<?php else : ?>
				<?php
				echo wp_kses(
					$item_data['text'],
					[
						'a' => [
							'href'  => [],
							'title' => [],
							'rel'   => [],
						],
					]
				);
				?>
			<?php endif; ?>
		</span>
		<?php
	}
	

	/**
	 * Render Post Info widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();

		// Bail early if no icon list is available.
		if ( empty( $settings['icon_list'] ) ) {
			return;
		}

		// Start output buffering.
		$items_html = $this->render_items( $settings['icon_list'] );

		if ( empty( $items_html ) ) {
			return;
		}

		if ( 'inline' === $settings['view'] ) {
			$this->add_render_attribute( 'icon_list', 'class', 'hfe-post-info-inline' );
		}

		$this->add_render_attribute( 'icon_list', 'class', [ 'hfe-post-info-items', 'hfe-post-info' ] );
		?>
		<ul <?php echo $this->get_render_attribute_string( 'icon_list' ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<?php echo $items_html; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</ul>
		<?php
	}
}
