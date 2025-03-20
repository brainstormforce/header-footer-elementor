<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\BreadcrumbsWidget;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;
use Elementor\Utils;
use Elementor\Icons_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Modules\DynamicTags\Module as TagsModule;

use HFE\WidgetsManager\Widgets_Loader;
use HFE\WidgetsManager\Base\Common_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Site title widget
 *
 * HFE widget for site title
 *
 * @since 2.2.1
 */
class Breadcrumbs_Widget extends Common_Widget {

	/**
	 * Retrieve the widget name.
	 *
	 * @since 2.2.1
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return parent::get_widget_slug( 'Breadcrumbs_Widget' );
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 2.2.1
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return parent::get_widget_title( 'Breadcrumbs_Widget' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 2.2.1
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return parent::get_widget_icon( 'Breadcrumbs_Widget' );
	}

	/**
	 * Indicates if the widget's content is dynamic.
	 *
	 * This method returns true if the widget's output is dynamic and should not be cached,
	 * or false if the content is static and can be cached.
	 *
	 * @since 1.6.41
	 * @return bool True for dynamic content, false for static content.
	 */
	protected function is_dynamic_content(): bool { // phpcs:ignore
		return true;
	}

	/**
	 * Register site title controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	// phpcs:ignore
	protected function register_controls(): void {

		$this->register_general_breadcrumbs_controls();
		$this->register_separator_breadcrumbs_controls();
		$this->register_breadcrumbs_text_controls();

		$this->register_breadcrumbs_general_style_controls();
		$this->register_breadcrumbs_separator_style_controls();
		$this->register_breadcrumbs_current_style_controls();
	}

	

	/**
	 * Register general Controls.
	 *
	 * @since 2.2.1
	 * @access protected
	 * @return void
	 */
	protected function register_general_breadcrumbs_controls(): void {
		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'show_home',
			[
				'label'        => __( 'Show Home', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'On', 'header-footer-elementor' ),
				'label_off'    => __( 'Off', 'header-footer-elementor' ),
				'default'      => 'yes',
				'return_value' => 'yes',
			]
		);

		$this->add_control(
			'home_icon',
			[
				'label'       => __( 'Home Icon', 'header-footer-elementor' ),
				'type'        => Controls_Manager::ICONS,
				'label_block' => false,
				'skin'        => 'inline',
				'default'     => [
					'value'   => 'fas fa-home',
					'library' => 'fa-solid',
				],
				'condition'   => [
					'show_home' => 'yes',
				],
			]
		);

		$this->add_responsive_control(
			'align',
			[
				'label'     => __( 'Alignment', 'header-footer-elementor' ),
				'type'      => Controls_Manager::CHOOSE,
				'default'   => '',
				'options'   => [
					'left'   => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-center',
					],
					'right'  => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-right',
					],
				],
				'separator' => 'before',
				'selectors' => [
					'{{WRAPPER}}' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Separator Controls.
	 *
	 * @since 2.2.1
	 * @access protected
	 * @return void
	 */
	protected function register_separator_breadcrumbs_controls(): void {
		$this->start_controls_section(
			'section_separator',
			[
				'label' => __( 'Separator', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'separator_type',
			[
				'label'   => __( 'Separator Type', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'text',
				'options' => [
					'text' => __( 'Text', 'header-footer-elementor' ),
					'icon' => __( 'Icon', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'separator_text',
			[
				'label'     => __( 'Separator', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( '»', 'header-footer-elementor' ),
				'condition' => [
					'separator_type' => 'text',
				],
			]
		);

		$this->add_control(
			'separator_icon',
			[
				'label'       => __( 'Separator', 'header-footer-elementor' ),
				'type'        => Controls_Manager::ICONS,
				'label_block' => false,
				'skin'        => 'inline',
				'default'     => [
					'value'   => 'fas fa-angle-right',
					'library' => 'fa-solid',
				],
				'recommended' => [
					'fa-solid' => [
						'greater-than',
						'minus',
						'angle-right',
						'angle-double-right',
						'caret-right',
						'chevron-right',
						'genderless',
						'grip-lines',
						'grip-lines-vertical',
					],
				],
				'condition'   => [
					'separator_type' => 'icon',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Separator Controls.
	 *
	 * @since 2.2.1
	 * @access protected
	 * @return void
	 */
	protected function register_breadcrumbs_text_controls(): void {
		$this->start_controls_section(
			'section_text',
			[
				'label' => __( 'Display Text', 'header-footer-elementor' ),
			]
		);

			$this->add_control(
				'home_text',
				[
					'label'   => __( 'Home Page', 'header-footer-elementor' ),
					'type'    => Controls_Manager::TEXT,
					'default' => __( 'Home', 'header-footer-elementor' ),
					'dynamic' => [
						'active'     => true,
						'categories' => [ TagsModule::POST_META_CATEGORY ],
					],
				]
			);

			$this->add_control(
				'search_text',
				[
					'label'   => __( 'Search', 'header-footer-elementor' ),
					'type'    => Controls_Manager::TEXT,
					'default' => __( 'Search results for:', 'header-footer-elementor' ),
					'dynamic' => [
						'active'     => true,
						'categories' => [ TagsModule::POST_META_CATEGORY ],
					],
				]
			);

			$this->add_control(
				'error_text',
				[
					'label'   => __( '404 Page', 'header-footer-elementor' ),
					'type'    => Controls_Manager::TEXT,
					'default' => __( 'Error 404: Page not found', 'header-footer-elementor' ),
					'dynamic' => [
						'active'     => true,
						'categories' => [ TagsModule::POST_META_CATEGORY ],
					],
				]
			);

		
		$this->end_controls_section();

	}

	/**
	 * Register General Controls.
	 *
	 * @since 2.2.1
	 * @access protected
	 * @return void
	 */
	protected function register_breadcrumbs_general_style_controls(): void {
		$this->start_controls_section(
			'section_general_style',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'spacing_between_items',
			[
				'label'     => __( 'Spacing between Items', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 10,
				],
				'range'     => [
					'px' => [
						'max' => 50,
					],
				],
				'selectors' => [
					'{{WRAPPER}} ul.hfe-breadcrumbs li' => 'margin-right: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'breadcrumbs_padding',
			[
				'label'      => __( 'Padding', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'separator'  => 'after',
				'selectors'  => [
					'{{WRAPPER}} .hfe-breadcrumbs-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->start_controls_tabs( 'breadcrumbs_style_tabs' );

			$this->start_controls_tab(
				'breadcrumbs_normal_tab',
				[
					'label' => __( 'Normal', 'header-footer-elementor' ),
				]
			);

				$this->add_control(
					'breadcrumbs_color',
					[
						'label'     => __( 'Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'selectors' => [
							'{{WRAPPER}} .hfe-breadcrumbs, {{WRAPPER}} .hfe-breadcrumbs .hfe-breadcrumbs-text' => 'color: {{VALUE}}',
							'{{WRAPPER}} .hfe-breadcrumbs svg' => 'fill: {{VALUE}}',
						],
					]
				);

				$this->add_control(
					'breadcrumbs_background_color',
					[
						'label'     => __( 'Background Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'selectors' => [
							'{{WRAPPER}} .hfe-breadcrumbs-item' => 'background-color: {{VALUE}}',
						],
					]
				);

				$this->add_group_control(
					Group_Control_Typography::get_type(),
					[
						'name'     => 'breadcrumbs_typography',
						'label'    => __( 'Typography', 'header-footer-elementor' ),
						'selector' => '{{WRAPPER}} .hfe-breadcrumbs-item',
					]
				);

				$this->add_group_control(
					Group_Control_Border::get_type(),
					[
						'name'        => 'breadcrumbs_border',
						'label'       => __( 'Border', 'header-footer-elementor' ),
						'placeholder' => '1px',
						'default'     => '1px',
						'selector'    => '{{WRAPPER}} .hfe-breadcrumbs-item',
					]
				);

				$this->add_control(
					'breadcrumbs_border_radius',
					[
						'label'      => __( 'Border Radius', 'header-footer-elementor' ),
						'type'       => Controls_Manager::DIMENSIONS,
						'size_units' => [ 'px', '%', 'em' ],
						'selectors'  => [
							'{{WRAPPER}} .hfe-breadcrumbs-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
						],
					]
				);

			$this->end_controls_tab();

			$this->start_controls_tab(
				'breadcrumbs_hover_tab',
				[
					'label' => __( 'Hover', 'header-footer-elementor' ),
				]
			);

				$this->add_control(
					'breadcrumbs_color_hover',
					[
						'label'     => __( 'Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'selectors' => [
							'{{WRAPPER}} .hfe-breadcrumbs-item:hover a, {{WRAPPER}} .hfe-breadcrumbs-item:hover .hfe-breadcrumbs-text' => 'color: {{VALUE}}',
							'{{WRAPPER}} .hfe-breadcrumbs-first:hover .hfe-breadcrumbs-home-icon svg' => 'fill: {{VALUE}}',
						],
					]
				);

				$this->add_control(
					'breadcrumbs_background_color_hover',
					[
						'label'     => __( 'Background Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'selectors' => [
							'{{WRAPPER}} .hfe-breadcrumbs-item:hover' => 'background-color: {{VALUE}}',
						],
					]
				);

				$this->add_control(
					'breadcrumbs_border_color_hover',
					[
						'label'     => __( 'Border Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'selectors' => [
							'{{WRAPPER}} .hfe-breadcrumbs-item:hover' => 'border-color: {{VALUE}}',
						],
					]
				);

			$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Register Separator Controls.
	 *
	 * @since 2.2.1
	 * @access protected
	 * @return void
	 */
	protected function register_breadcrumbs_separator_style_controls(): void {
		$this->start_controls_section(
			'section_separator_style',
			[
				'label' => __( 'Separator', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'separator_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-breadcrumbs-separator .hfe-breadcrumbs-separator-text' => 'color: {{VALUE}}',
					'{{WRAPPER}} .hfe-breadcrumbs-separator-icon svg' => 'fill: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'separator_icon_size',
			[
				'label'     => __( 'Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'max' => 250,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-breadcrumbs-separator-icon' => 'font-size: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'separator_type' => 'icon',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'separator_typography',
				'label'     => __( 'Typography', 'header-footer-elementor' ),
				'selector'  => '{{WRAPPER}} .hfe-breadcrumbs-separator .hfe-breadcrumbs-separator-text',
				'condition' => [
					'separator_type' => 'text',
				],
			]
		);

		$this->end_controls_section();

	}

	/**
	 * Register current Controls.
	 *
	 * @since 2.2.1
	 * @access protected
	 * @return void
	 */
	protected function register_breadcrumbs_current_style_controls(): void {
		$this->start_controls_section(
			'section_current_style',
			[
				'label' => __( 'Current Item', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

			$this->add_control(
				'current_item_color',
				[
					'label'     => __( 'Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .hfe-breadcrumbs-last .hfe-breadcrumbs-text, {{WRAPPER}} .hfe-breadcrumbs-last svg' => 'color: {{VALUE}}',
					],
				]
			);

			$this->add_control(
				'current_item_background_color',
				[
					'label'     => __( 'Background Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .hfe-breadcrumbs-last' => 'background-color: {{VALUE}}',
					],
				]
			);

			$this->add_group_control(
				Group_Control_Typography::get_type(),
				[
					'name'     => 'current_item_typography',
					'label'    => __( 'Typography', 'header-footer-elementor' ),
					'selector' => '{{WRAPPER}} .hfe-breadcrumbs-last .hfe-breadcrumbs-text, {{WRAPPER}} .hfe-breadcrumbs-last svg',
				]
			);

			$this->add_group_control(
				Group_Control_Border::get_type(),
				[
					'name'        => 'current_item_border',
					'label'       => __( 'Border', 'header-footer-elementor' ),
					'placeholder' => '1px',
					'default'     => '1px',
					'selector'    => '{{WRAPPER}} .hfe-breadcrumbs-last',
				]
			);

			$this->add_control(
				'current_item_border_radius',
				[
					'label'      => __( 'Border Radius', 'header-footer-elementor' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => [ 'px', '%', 'em' ],
					'selectors'  => [
						'{{WRAPPER}} .hfe-breadcrumbs-last' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					],
				]
			);

			$this->add_responsive_control(
				'current_item_padding',
				[
					'label'      => __( 'Padding', 'header-footer-elementor' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => [ 'px', '%' ],
					'separator'  => 'after',
					'selectors'  => [
						'{{WRAPPER}} .hfe-breadcrumbs-last' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					],
				]
			);

		$this->end_controls_section();

	}

	/**
	 * Render Heading output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 2.2.1
	 * @access protected
	 *
	 * // phpcs:ignore
	 * @return void
	 */
	// phpcs:ignore
	protected function render():void {
		$settings = $this->get_settings_for_display();
	
		$delimiter = 'text' === $settings['separator_type'] ? $settings['separator_text'] : '';
	
		if ( 'icon' === $settings['separator_type'] ) {
			ob_start();
			Icons_Manager::render_icon( $settings['separator_icon'], [ 'aria-hidden' => 'true' ] );
			$delimiter = ob_get_clean(); // Store the icon output as delimiter.
		}
	
		// Define breadcrumb defaults.
		$defaults = [
			'home'         => isset( $settings['home_text'] ) ? $settings['home_text'] : __( 'Home', 'header-footer-elementor' ),
			'delimiter'    => $delimiter,
			'echo'         => true,
			'404_title'    => isset( $settings['error_text'] ) ? $settings['error_text'] : __( 'Error 404: Page not found', 'header-footer-elementor' ),
			'search_title' => isset( $settings['search_text'] ) ? $settings['search_text'] : __( 'Search results for: ', 'header-footer-elementor' ),
		];
	
		// Start the breadcrumbs array.
		$breadcrumbs = [];

		if ( 'yes' === $settings['show_home'] ) {
			// Add the Home link to the breadcrumbs.
			$breadcrumbs[] = [
				'title' => $defaults['home'],
				'url'   => esc_url( home_url() ),
				'class' => 'hfe-breadcrumbs-first',
			];
		}
	
		// Add the current page details to breadcrumbs based on conditions.
		if ( ! is_front_page() ) {
			if ( is_home() && 'yes' === $settings['show_home'] ) {
				$breadcrumbs[] = [
					'title' => get_the_title( get_option( 'page_for_posts' ) ),
					'url'   => '',
					'class' => '',
				];
	
			} elseif ( is_single() ) {

				$category = get_the_category();
				if ( $category ) {
					$parent_cats = get_ancestors( $category[0]->term_id, 'category' ); // Get the ancestors of the category.
					$parent_cats = array_reverse( $parent_cats ); // Reverse the array to get the correct hierarchy.

					// Loop through each ancestor and add to breadcrumbs.
					foreach ( $parent_cats as $cat_id ) {
						$cat           = get_category( $cat_id );
						$breadcrumbs[] = [
							'title' => $cat->name,
							'url'   => esc_url( get_category_link( $cat_id ) ),
							'class' => '',
						];
					}

					// Add the current category.
					$breadcrumbs[] = [
						'title' => $category[0]->name,
						'url'   => esc_url( get_category_link( $category[0]->term_id ) ),
						'class' => '',
					];
				}

				// Finally, add the current page title (without a URL).
				$breadcrumbs[] = [
					'title' => get_the_title(), // Get the current page title.
					'url'   => '',              // No URL for the current page.
					'class' => 'hfe-breadcrumbs-last', // Optional class for styling the last breadcrumb.
				];
	
			} elseif ( is_page() && ! is_front_page() ) {
				$parents = get_post_ancestors( get_the_ID() );
				foreach ( array_reverse( $parents ) as $parent ) {
					$breadcrumbs[] = [
						'title' => get_the_title( $parent ),
						'url'   => esc_url( get_permalink( $parent ) ),
						'class' => '',
					];
				}
				$breadcrumbs[] = [
					'title' => get_the_title(),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last',
				];
	
			} elseif ( is_category() ) {
				$breadcrumbs[] = [
					'title' => single_cat_title( '', false ),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last',
				];
	
			} elseif ( is_tag() ) {
				$breadcrumbs[] = [
					'title' => single_tag_title( '', false ),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last',
				];
	
			} elseif ( is_author() ) {
				$breadcrumbs[] = [
					'title' => get_the_author(),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last',
				];
	
			} elseif ( is_search() ) {
				$breadcrumbs[] = [
					'title' => $defaults['search_title'] . get_search_query(),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last',
				];
	
			} elseif ( is_404() ) {
				$breadcrumbs[] = [
					'title' => $defaults['404_title'],
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last',
				];
	
			} elseif ( is_archive() ) {
				$breadcrumbs[] = [
					'title' => post_type_archive_title( '', false ),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last',
				];
			}
		}

		$home_class = ( 'yes' === $settings['show_home'] ) ? 'hfe-breadcrumbs-show-home' : '';
	
		// Build the breadcrumb output.
		$output = '<nav aria-label="Breadcrumb"><ul class="hfe-breadcrumbs ' . esc_attr( $home_class ) . '">';

		foreach ( $breadcrumbs as $index => $breadcrumb ) {
			// Open the breadcrumb item.
			$output .= '<li class="hfe-breadcrumbs-item ' . esc_attr( $breadcrumb['class'] ) . '">';

			if ( 'yes' === $settings['show_home'] && 0 === $index ) {
				$home_icon = $this->home_icon_html( 'hfe-breadcrumbs-home-icon', $settings['home_icon'] );
				$output   .= $home_icon;
			}

			if ( $breadcrumb['url'] ) {
				$output .= '<a href="' . esc_url( $breadcrumb['url'] ) . '"><span class="hfe-breadcrumbs-text">' . wp_kses_post( $breadcrumb['title'] ) . '</span></a>';
			} else {
				$output .= '<span class="hfe-breadcrumbs-text" aria-current="page">' . wp_kses_post( $breadcrumb['title'] ) . '</span>';
			}
			$output .= '</li>';

			// Add the separator except for the last item.
			if ( $index < count( $breadcrumbs ) - 1 ) {
				$output .= '<li class="hfe-breadcrumbs-separator">';
				if ( 'icon' === $settings['separator_type'] ) {
					// Render the icon.
					$output .= '<span class="hfe-breadcrumbs-separator-icon">';
					$output .= $delimiter;
					$output .= '</span>';
				} else {
					// Use text as separator.
					$output .= '<span class="hfe-breadcrumbs-separator-text">' . wp_kses_post( $defaults['delimiter'] ) . '</span>';
				}
				$output .= '</li>';
			}
		}
		$output .= '</ul></nav>';
		
		echo $output; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- If escaped the icons are not rendering on frontend.

	}

	/**
	 * Sets the home icon.
	 *
	 * @access public
	 * @param string $home_class home icon class.
	 * @param string $home_icon home icon.
	 * @return string
	 */
	public function home_icon_html( $home_class = '', $home_icon = [] ) {
		$home_icon_html = '<span class="' . esc_attr( $home_class ) . '">';
		ob_start();
		Icons_Manager::render_icon( $home_icon, [ 'aria-hidden' => 'true' ] );
		$home_icon_html .= ob_get_clean(); // Store the icon output as delimiter.
		$home_icon_html .= '</span>';
		return $home_icon_html;
	}

	/**
	 * Render site title output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 2.2.1
	 * @access protected
	 * @return void
	 */
	protected function content_template() {
	}
}
