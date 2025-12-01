<?php
/**
 * Infocard.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\Infocard;

// Elementor Classes.
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Group_Control_Background;

use HFE\WidgetsManager\Base\Common_Widget;
use HFE\WidgetsManager\Widgets_Loader;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

// phpcs:disable WordPress.WhiteSpace.PrecisionAlignment.Found

/**
 * Class Infocard.
 */
class Infocard extends Common_Widget {

	/**
	 * Retrieve Infocard Widget name.
	 *
	 * @since 2.3.0
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return parent::get_widget_slug( 'Infocard' );
	}

	/**
	 * Retrieve Infocard Widget title.
	 *
	 * @since 2.3.0
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return parent::get_widget_title( 'Infocard' );
	}

	/**
	 * Retrieve Infocard Widget icon.
	 *
	 * @since 2.3.0
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return parent::get_widget_icon( 'Infocard' );
	}

	/**
	 * Retrieve Widget Keywords.
	 *
	 * @since 2.3.0
	 * @access public
	 *
	 * @return string Widget keywords.
	 */
	public function get_keywords() {
		return parent::get_widget_keywords( 'Infocard' );
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
			'condition'    => ! defined( 'UAEL_VER' ),
			'image'        => esc_url( HFE_URL . 'assets/images/upgrade-pro.png' ),
			'image_alt'    => esc_attr__( 'Upgrade', 'header-footer-elementor' ),
			'title'        => esc_html__( 'Upgrade your Info Card widget', 'header-footer-elementor' ),
			'description'  => esc_html__( 'Get the Info Box widget in UAE Pro and unlock advanced layouts, icons, and styling for better content display.', 'header-footer-elementor' ),
			'upgrade_url'  => esc_url( 'https://ultimateelementor.com/pricing/?utm_source=UAE-Infocard&utm_medium=editor&utm_campaign=static-promotion' ),
			'upgrade_text' => esc_html__( 'Upgrade Now', 'header-footer-elementor' ),
		];
	}

	/**
	 * Indicates if the widget's content is dynamic.
	 *
	 * This method returns true if the widget's output is dynamic and should not be cached,
	 * or false if the content is static and can be cached.
	 *
	 * @since 2.3.0
	 * @return bool True for dynamic content, false for static content.
	 */
	protected function is_dynamic_content(): bool { // phpcs:ignore
		return false;
	}

	/**
	 * Register Infocard controls.
	 *
	 * @since 2.3.0
	 * @access protected
	 */
	protected function register_controls() {

		$this->register_general_content_controls();
		$this->register_icon_content_controls();
		$this->register_cta_content_controls();
		$this->register_typo_content_controls();
		$this->register_margin_content_controls();
	}

	/**
	 * Register Infocard General Controls.
	 *
	 * @since 2.3.0
	 * @access protected
	 */
	protected function register_general_content_controls() {
		$this->start_controls_section(
			'section_general_field',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'infocard_title',
			[
				'label'    => __( 'Title', 'header-footer-elementor' ),
				'type'     => Controls_Manager::TEXT,
				'selector' => '{{WRAPPER}} .hfe-infocard-title',
				'dynamic'  => [
					'active' => true,
				],
				'default'  => __( 'Info Card', 'header-footer-elementor' ),
			]
		);
		$this->add_control(
			'infocard_description',
			[
				'label'    => __( 'Description', 'header-footer-elementor' ),
				'type'     => Controls_Manager::TEXTAREA,
				'selector' => '{{WRAPPER}} .hfe-infocard-text',
				'dynamic'  => [
					'active' => true,
				],
				'default'  => __( 'Enter description text here.Lorem ipsum dolor sit amet, consectetur adipiscing. Quo incidunt ullamco.', 'header-footer-elementor' ),
			]
		);

		$this->add_responsive_control(
			'infocard_overall_align',
			[
				'label'     => __( 'Overall Alignment', 'header-footer-elementor' ),
				'type'      => Controls_Manager::CHOOSE,
				'default'   => 'center',
				'options'   => [
					'left'   => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-center',
					],
					'right'  => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-right',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-infocard' => 'text-align: {{VALUE}};',
				],
			]
		);


		$this->end_controls_section();
	}

	/**
	 * Register Infocard Icon Controls.
	 *
	 * @since 2.3.0
	 * @access protected
	 */
	protected function register_icon_content_controls() {
		$this->start_controls_section(
			'section_icon_field',
			[
				'label' => __( 'Icon', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'infocard_select_icon',
			[
				'label'       => __( 'Select Icon', 'header-footer-elementor' ),
				'type'        => Controls_Manager::ICONS,
				'default'     => [
					'value'   => '',
					'library' => 'fa-solid',
				],
				'render_type' => 'template',
			]
		);

		$this->add_responsive_control(
			'infocard_icon_size',
			[
				'label'      => __( 'Size', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', 'rem' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					],
					'%'  => [
						'min' => 0,
						'max' => 100,
					],
					'em' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'default'    => [
					'size' => 40,
					'unit' => 'px',
				],
				'condition'  => [
					'infocard_select_icon[value]!' => '',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-icon-wrap .hfe-icon i' => 'font-size: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};line-height: {{SIZE}}{{UNIT}}; text-align: center;',
					'{{WRAPPER}} .hfe-icon-wrap .hfe-icon' => 'height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}}; line-height: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'infocard_icon_bgsize',
			[
				'label'      => __( 'Background Size', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', 'rem' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					],
					'%'  => [
						'min' => 0,
						'max' => 100,
					],
					'em' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'default'    => [
					'size' => 0,
					'unit' => 'px',
				],
				'condition'  => [
					'infocard_select_icon[value]!' => '',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-icon-wrap .hfe-icon' => 'padding: {{SIZE}}{{UNIT}}; display:inline-block; box-sizing:content-box;',
				],
			]
		);

		$this->start_controls_tabs( 'infocard_tabs_icon_style' );

			$this->start_controls_tab(
				'infocard_icon_normal',
				[
					'label'     => __( 'Normal', 'header-footer-elementor' ),
					'condition' => [
						'infocard_select_icon[value]!' => '',
					],
				]
			);
			$this->add_control(
				'infocard_icon_color',
				[
					'label'     => __( 'Icon Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'global'    => [
						'default' => Global_Colors::COLOR_PRIMARY,
					],
					'condition' => [
						'infocard_select_icon[value]!' => '',
					],
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .hfe-icon-wrap .hfe-icon i' => 'color: {{VALUE}};',
						'{{WRAPPER}} .hfe-icon-wrap .hfe-icon svg' => 'fill: {{VALUE}};',
					],
				]
			);

			$this->add_control(
				'infocard_icon_bgcolor',
				[
					'label'     => __( 'Background Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'global'    => [
						'default' => '',
					],
					'condition' => [
						'infocard_select_icon[value]!' => '',
					],
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .hfe-infocard .hfe-icon-wrap .hfe-icon' => 'background-color: {{VALUE}};',
					],
				]
			);

			$this->add_control(
				'infocard_icon_border',
				[
					'label'       => __( 'Border Style', 'header-footer-elementor' ),
					'type'        => Controls_Manager::SELECT,
					'default'     => 'none',
					'label_block' => false,
					'options'     => [
						'none'   => __( 'None', 'header-footer-elementor' ),
						'solid'  => __( 'Solid', 'header-footer-elementor' ),
						'double' => __( 'Double', 'header-footer-elementor' ),
						'dotted' => __( 'Dotted', 'header-footer-elementor' ),
						'dashed' => __( 'Dashed', 'header-footer-elementor' ),
					],
					'condition'   => [
						'infocard_select_icon[value]!' => '',
					],
					'selectors'   => [
						'{{WRAPPER}} .hfe-icon-wrap .hfe-icon' => 'border-style: {{VALUE}};',
					],
				]
			);
			$this->add_control(
				'infocard_icon_border_color',
				[
					'label'     => __( 'Border Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'global'    => [
						'default' => Global_Colors::COLOR_PRIMARY,
					],
					'condition' => [
						'infocard_icon_border!'        => 'none',
						'infocard_select_icon[value]!' => '',
					],
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .hfe-icon-wrap .hfe-icon' => 'border-color: {{VALUE}};',
					],
				]
			);
			$this->add_control(
				'infocard_icon_border_size',
				[
					'label'      => __( 'Border Width', 'header-footer-elementor' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => [ 'px' ],
					'default'    => [
						'top'    => '1',
						'bottom' => '1',
						'left'   => '1',
						'right'  => '1',
						'unit'   => 'px',
					],
					'condition'  => [
						'infocard_icon_border!'        => 'none',
						'infocard_select_icon[value]!' => '',
					],
					'selectors'  => [
						'{{WRAPPER}} .hfe-icon-wrap .hfe-icon' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; box-sizing:content-box;',
					],
				]
			);

			$this->add_responsive_control(
				'infocard_icon_border_radius',
				[
					'label'      => __( 'Rounded Corners', 'header-footer-elementor' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => [ 'px', '%' ],
					'default'    => [
						'top'    => '5',
						'bottom' => '5',
						'left'   => '5',
						'right'  => '5',
						'unit'   => 'px',
					],
					'condition'  => [
						'infocard_select_icon[value]!' => '',
					],
					'selectors'  => [
						'{{WRAPPER}} .hfe-icon-wrap .hfe-icon' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};  box-sizing:content-box;',
					],
				]
			);

			$this->end_controls_tab();

			$this->start_controls_tab(
				'infocard_icon_hover',
				[
					'label'     => __( 'Hover', 'header-footer-elementor' ),
					'condition' => [
						'infocard_select_icon[value]!' => '',
					],
					
				]
			);
				$this->add_control(
					'infocard_icon_hover_color',
					[
						'label'     => __( 'Icon Hover Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'condition' => [
							'infocard_select_icon[value]!' => '',
						],
						'selectors' => [
							'{{WRAPPER}} .hfe-icon-wrap .hfe-icon:hover > i' => 'color: {{VALUE}};',
							'{{WRAPPER}} .hfe-icon-wrap .hfe-icon:hover > svg' => 'fill: {{VALUE}};',
						],
					]
				);

				$this->add_control(
					'infocard_icon_hover_bgcolor',
					[
						'label'     => __( 'Background Hover Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'condition' => [
							'infocard_select_icon[value]!' => '',
						],
						'selectors' => [
							'{{WRAPPER}} .hfe-icon-wrap .hfe-icon:hover' => 'background-color: {{VALUE}};',
						],
					]
				);

				$this->add_control(
					'infocard_icon_hover_border',
					[
						'label'     => __( 'Border Hover Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'condition' => [
							'infocard_icon_border!'        => 'none',
							'infocard_select_icon[value]!' => '',
						],
						'default'   => '',
						'selectors' => [
							'{{WRAPPER}} .hfe-icon-wrap .hfe-icon:hover' => 'border-color: {{VALUE}};',
						],
					]
				);

			$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Register Infocard CTA Controls.
	 *
	 * @since 2.3.0
	 * @access protected
	 */
	protected function register_cta_content_controls() {
		$this->start_controls_section(
			'section_cta_field',
			[
				'label' => __( 'Call To Action', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'infocard_cta_type',
			[
				'label'       => __( 'Type', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'button',
				'label_block' => false,
				'options'     => [
					'none'   => __( 'None', 'header-footer-elementor' ),
					'link'   => __( 'Text', 'header-footer-elementor' ),
					'button' => __( 'Button', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'infocard_link_text',
			[
				'label'     => __( 'Text', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Read More', 'header-footer-elementor' ),
				'dynamic'   => [
					'active' => true,
				],
				'condition' => [
					'infocard_cta_type' => 'link',
				],
			]
		);

		$this->add_control(
			'infocard_button_text',
			[
				'label'     => __( 'Text', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Click Here', 'header-footer-elementor' ),
				'dynamic'   => [
					'active' => true,
				],
				'condition' => [
					'infocard_cta_type' => 'button',
				],
			]
		);

		$this->add_control(
			'infocard_text_link',
			[
				'label'         => __( 'Link', 'header-footer-elementor' ),
				'type'          => Controls_Manager::URL,
				'default'       => [
					'url'         => '#',
					'is_external' => '',
				],
				'dynamic'       => [
					'active' => true,
				],
				'show_external' => true, // Show the 'open in new tab' button.
				'condition'     => [
					'infocard_cta_type!' => 'none',
				],
			]
		);

		$this->add_control(
			'infocard_button_size',
			[
				'label'     => __( 'Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'sm',
				'options'   => [
					'xs' => __( 'Extra Small', 'header-footer-elementor' ),
					'sm' => __( 'Small', 'header-footer-elementor' ),
					'md' => __( 'Medium', 'header-footer-elementor' ),
					'lg' => __( 'Large', 'header-footer-elementor' ),
					'xl' => __( 'Extra Large', 'header-footer-elementor' ),
				],
				'condition' => [
					'infocard_cta_type' => 'button',
				],
			]
		);

		$this->add_control(
			'infocard_button_colors',
			[
				'label'     => __( 'Colors', 'header-footer-elementor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'infocard_cta_type' => 'button',
				],
			]
		);

		$this->start_controls_tabs( 'infocard_tabs_button_style' );

			$this->start_controls_tab(
				'infocard_button_normal',
				[
					'label'     => __( 'Normal', 'header-footer-elementor' ),
					'condition' => [
						'infocard_cta_type' => 'button',
					],
				]
			);
			$this->add_control(
				'infocard_button_text_color',
				[
					'label'     => __( 'Text Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '',
					'condition' => [
						'infocard_cta_type' => 'button',
					],
					'selectors' => [
						'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'color: {{VALUE}};',
					],
				]
			);
			$this->add_group_control(
				Group_Control_Background::get_type(),
				[
					'name'           => 'btn_background_color',
					'label'          => __( 'Background Color', 'header-footer-elementor' ),
					'types'          => [ 'classic', 'gradient' ],
					'selector'       => '{{WRAPPER}} .elementor-button',
					'condition'      => [
						'infocard_cta_type' => 'button',
					],
					'fields_options' => [
						'color' => [
							'global' => [
								'default' => Global_Colors::COLOR_ACCENT,
							],
						],
					],
				]
			);

			$this->add_control(
				'infocard_button_border',
				[
					'label'       => __( 'Border Style', 'header-footer-elementor' ),
					'type'        => Controls_Manager::SELECT,
					'default'     => 'none',
					'label_block' => false,
					'options'     => [
						'none'    => __( 'None', 'header-footer-elementor' ),
						'default' => __( 'Default', 'header-footer-elementor' ),
						'solid'   => __( 'Solid', 'header-footer-elementor' ),
						'double'  => __( 'Double', 'header-footer-elementor' ),
						'dotted'  => __( 'Dotted', 'header-footer-elementor' ),
						'dashed'  => __( 'Dashed', 'header-footer-elementor' ),
					],
					'condition'   => [
						'infocard_cta_type' => 'button',
					],
					'selectors'   => [
						'{{WRAPPER}} .elementor-button' => 'border-style: {{VALUE}};',
					],
				]
			);
			$this->add_control(
				'infocard_button_border_color',
				[
					'label'     => __( 'Border Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => [
						'infocard_cta_type'       => 'button',
						'infocard_button_border!' => [ 'none', 'default' ],
					],
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .elementor-button' => 'border-color: {{VALUE}};',
					],
				]
			);
			$this->add_control(
				'infocard_button_border_size',
				[
					'label'      => __( 'Border Width', 'header-footer-elementor' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => [ 'px' ],
					'default'    => [
						'top'    => '1',
						'bottom' => '1',
						'left'   => '1',
						'right'  => '1',
						'unit'   => 'px',
					],
					'condition'  => [
						'infocard_cta_type'       => 'button',
						'infocard_button_border!' => [ 'none', 'default' ],
					],
					'selectors'  => [
						'{{WRAPPER}} .elementor-button' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					],
				]
			);

			$this->add_control(
				'infocard_button_radius',
				[
					'label'      => __( 'Rounded Corners', 'header-footer-elementor' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => [ 'px', '%' ],
					'default'    => [
						'top'    => '',
						'bottom' => '',
						'left'   => '',
						'right'  => '',
						'unit'   => 'px',
					],
					'selectors'  => [
						'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					],
					'condition'  => [
						'infocard_cta_type' => 'button',
					],
				]
			);

			$this->add_responsive_control(
				'infocard_button_custom_padding',
				[
					'label'      => __( 'Padding', 'header-footer-elementor' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => [ 'px', 'em', '%' ],
					'selectors'  => [
						'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					],
					'condition'  => [
						'infocard_cta_type' => 'button',
					],
				]
			);

			$this->end_controls_tab();

			$this->start_controls_tab(
				'infocard_button_hover',
				[
					'label'     => __( 'Hover', 'header-footer-elementor' ),
					'condition' => [
						'infocard_cta_type' => 'button',
					],
				]
			);
			$this->add_control(
				'infocard_button_hover_color',
				[
					'label'     => __( 'Text Hover Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => [
						'infocard_cta_type' => 'button',
					],
					'selectors' => [
						'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'color: {{VALUE}};',
					],
				]
			);
			$this->add_group_control(
				Group_Control_Background::get_type(),
				[
					'name'           => 'infocard_button_hover_bgcolor',
					'label'          => __( 'Background Hover Color', 'header-footer-elementor' ),
					'types'          => [ 'classic', 'gradient' ],
					'selector'       => '{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover',
					'condition'      => [
						'infocard_cta_type' => 'button',
					],
					'fields_options' => [
						'color' => [
							'global' => [
								'default' => Global_Colors::COLOR_ACCENT,
							],
						],
					],
				]
			);

			$this->add_control(
				'infocard_button_border_hover_color',
				[
					'label'     => __( 'Border Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => [
						'infocard_cta_type'       => 'button',
						'infocard_button_border!' => 'none',
					],
					'selectors' => [
						'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'border-color: {{VALUE}};',
					],
				]
			);

			$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Register Infocard Typography Controls.
	 *
	 * @since 2.3.0
	 * @access protected
	 */
	protected function register_typo_content_controls() {
		$this->start_controls_section(
			'section_typography_field',
			[
				'label' => __( 'Typography', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'infocard_title_typo',
			[
				'label'     => __( 'Title', 'header-footer-elementor' ),
				'type'      => Controls_Manager::HEADING,
				'condition' => [
					'infocard_title!' => '',
				],
			]
		);
		$this->add_control(
			'infocard_title_tag',
			[
				'label'     => __( 'Title Tag', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => [
					'h1'  => __( 'H1', 'header-footer-elementor' ),
					'h2'  => __( 'H2', 'header-footer-elementor' ),
					'h3'  => __( 'H3', 'header-footer-elementor' ),
					'h4'  => __( 'H4', 'header-footer-elementor' ),
					'h5'  => __( 'H5', 'header-footer-elementor' ),
					'h6'  => __( 'H6', 'header-footer-elementor' ),
					'div' => __( 'div', 'header-footer-elementor' ),
					'p'   => __( 'p', 'header-footer-elementor' ),
				],
				'default'   => 'h3',
				'condition' => [
					'infocard_title!' => '',
				],
			]
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'title_typography',
				'global'    => [
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				],
				'selector'  => '{{WRAPPER}} .hfe-infocard-title',
				'condition' => [
					'infocard_title!' => '',
				],
			]
		);
		$this->add_control(
			'infocard_title_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_PRIMARY,
				],
				'default'   => '',
				'condition' => [
					'infocard_title!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-infocard-title' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'infocard_desc_typo',
			[
				'label'     => __( 'Description', 'header-footer-elementor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'infocard_description!' => '',
				],
			]
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'desc_typography',
				'global'    => [
					'default' => Global_Typography::TYPOGRAPHY_TEXT,
				],
				'selector'  => '{{WRAPPER}} .hfe-infocard-text',
				'condition' => [
					'infocard_description!' => '',
				],
			]
		);
		$this->add_control(
			'infocard_desc_color',
			[
				'label'     => __( 'Description Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_TEXT,
				],
				'default'   => '',
				'condition' => [
					'infocard_description!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-infocard-text' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'infocard_link_typo',
			[
				'label'     => __( 'CTA Link Text', 'header-footer-elementor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'infocard_cta_type' => 'link',
				],
			]
		);

		$this->add_control(
			'infocard_button_typo',
			[
				'label'     => __( 'CTA Button Text', 'header-footer-elementor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'infocard_cta_type' => 'button',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'cta_typography',
				'global'    => [
					'default' => Global_Typography::TYPOGRAPHY_SECONDARY,
				],
				'selector'  => '{{WRAPPER}} .hfe-infocard-cta-link, {{WRAPPER}} .elementor-button, {{WRAPPER}} a.elementor-button',
				'condition' => [
					'infocard_cta_type' => [ 'link', 'button' ],
				],
			]
		);
		$this->add_control(
			'infocard_cta_color',
			[
				'label'     => __( 'Link Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_ACCENT,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-infocard-cta-link' => 'color: {{VALUE}};',
				],
				'condition' => [
					'infocard_cta_type' => 'link',
				],
			]
		);

		$this->add_control(
			'infocard_cta_hover_color',
			[
				'label'     => __( 'Link Hover Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-infocard-cta-link:hover' => 'color: {{VALUE}};',
				],
				'condition' => [
					'infocard_cta_type' => 'link',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Infocard Margin Controls.
	 *
	 * @since 2.3.0
	 * @access protected
	 */
	protected function register_margin_content_controls() {
		$this->start_controls_section(
			'section_margin_field',
			[
				'label' => __( 'Margins', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'infocard_responsive_icon_margin',
			[
				'label'      => __( 'Icon Margin', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'default'    => [
					'top'      => '0',
					'bottom'   => '10',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'condition'  => [
					'infocard_select_icon[value]!' => '',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-icon-wrap' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'infocard_title_margin',
			[
				'label'      => __( 'Title Margin', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'default'    => [
					'top'      => '0',
					'bottom'   => '10',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-infocard-title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition'  => [
					'infocard_title!' => '',
				],
			]
		);

		$this->add_responsive_control(
			'infocard_desc_margin',
			[
				'label'      => __( 'Description Margins', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'default'    => [
					'top'      => '0',
					'bottom'   => '0',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'condition'  => [
					'infocard_description!' => '',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-infocard-text' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'infocard_cta_margin',
			[
				'label'      => __( 'CTA Margin', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'default'    => [
					'top'      => '10',
					'bottom'   => '0',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-infocard-cta-link-style, {{WRAPPER}} .hfe-button-wrapper' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'condition'  => [
					'infocard_cta_type' => [ 'link', 'button' ],
				],
			]
		);
		$this->end_controls_section();
	}

	/**
	 * Display Icon.
	 *
	 * @since 2.3.0
	 * @access public
	 * @param object $settings for settings.
	 */
	public function render_icon( $settings ) {
		if ( '' !== $settings['infocard_select_icon']['value'] ) { ?>
			<div class="hfe-icon-wrap">
				<span class="hfe-icon">
					<?php \Elementor\Icons_Manager::render_icon( $settings['infocard_select_icon'], [ 'aria-hidden' => 'true' ] ); ?>
				</span>
			</div>
			<?php
		}
	}

	/**
	 * Display Title.
	 *
	 * @since 2.3.0
	 * @access public
	 * @param object $settings for settings.
	 */
	public function render_title( $settings ) {
			
		if ( ! empty( $settings['infocard_title'] ) ) {
			?>
			<div class="hfe-infocard-title-wrap">
				<?php 
					$heading_size_tag = Widgets_Loader::validate_html_tag( $settings['infocard_title_tag'] );
					echo '<' . esc_attr( $heading_size_tag ) . ' class="hfe-infocard-title elementor-inline-editing" data-elementor-setting-key="infocard_title" data-elementor-inline-editing-toolbar="basic" >';
					echo wp_kses_post( $settings['infocard_title'] );
					echo '</' . esc_attr( $heading_size_tag ) . '>'; 
				?>
			</div>
			<?php
		}
	}


	/**
	 * Display CTA.
	 *
	 * @since 2.3.0
	 * @access public
	 * @param object $settings for settings.
	 */
	public function render_link( $settings ) {
			
		if ( 'link' === $settings['infocard_cta_type'] ) {
			if ( ! empty( $settings['infocard_text_link']['url'] ) ) {
				$this->add_link_attributes( 'cta_link', $settings['infocard_text_link'] );
			}

			$this->add_render_attribute( 'cta_link', 'class', 'hfe-infocard-cta-link' );
			?>
			<div class="hfe-infocard-cta-link-style">
				<a <?php echo wp_kses_post( $this->get_render_attribute_string( 'cta_link' ) ); ?>> <?php //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span class="elementor-inline-editing" data-elementor-setting-key="infocard_link_text" data-elementor-inline-editing-toolbar="basic"><?php echo wp_kses_post( $settings['infocard_link_text'] ); ?></span>
				</a>
			</div>
			<?php
		} elseif ( 'button' === $settings['infocard_cta_type'] ) {
			$this->add_render_attribute( 'wrapper', 'class', 'hfe-button-wrapper elementor-widget-button' );
			$this->add_render_attribute( 'text', 'class', 'elementor-button-text elementor-inline-editing' );

			if ( ! empty( $settings['infocard_text_link']['url'] ) ) {

				$this->add_link_attributes( 'button', $settings['infocard_text_link'] );
				$this->add_render_attribute( 'button', 'class', 'elementor-button-link' );
			}
			$this->add_render_attribute( 'button', 'class', 'elementor-button' );

			if ( ! empty( $settings['infocard_button_size'] ) ) {
				$this->add_render_attribute( 'button', 'class', 'elementor-size-' . $settings['infocard_button_size'] );
			}
			?>
			<div <?php echo wp_kses_post( $this->get_render_attribute_string( 'wrapper' ) ); ?>>
				<a <?php echo wp_kses_post( $this->get_render_attribute_string( 'button' ) ); ?>>
					<span <?php echo wp_kses_post( $this->get_render_attribute_string( 'text' ) ); ?>  data-elementor-setting-key="infocard_button_text" data-elementor-inline-editing-toolbar="none"><?php echo wp_kses_post( $settings['infocard_button_text'] ); ?></span>
				</a>
			</div>
			<?php
		}
	}

	/**
	 * Render Info Card output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 2.3.0
	 * @access protected
	 */
	protected function render() {
		$html     = '';
		$settings = $this->get_settings_for_display();
		?>

		<div class="hfe-infocard">
			<?php $this->render_icon( $settings ); ?>
			<?php $this->render_title( $settings ); ?>
			<div class="hfe-infocard-text-wrap">
				<div class="hfe-infocard-text elementor-inline-editing" data-elementor-setting-key="infocard_description" data-elementor-inline-editing-toolbar="advanced">
					<?php echo wp_kses_post( $settings['infocard_description'] ); ?>
				</div>
				<?php $this->render_link( $settings ); ?>
			</div>
		</div>

		<?php
		
	}
	/**
	 * Render Info Card widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 2.3.0
	 * @access protected
	 */
	protected function content_template() {

		?>
		<?php // phpcs:disable WordPressVIPMinimum.Security.Mustache.OutputNotation -- JavaScript template syntax, not PHP output. ?>
		<#
		var iconHTML = elementor.helpers.renderIcon( view, settings.infocard_select_icon, { 'aria-hidden': true }, 'i' , 'object' );

		var headingSizeTag = elementor.helpers.validateHTMLTag( settings.infocard_title_tag );

		if ( typeof elementor.helpers.validateHTMLTag === "function" ) { 
			headingSizeTag = elementor.helpers.validateHTMLTag( settings.infocard_title_tag );
		} else if( HfeWidgetsData.allowed_tags ) {
			headingSizeTag = HfeWidgetsData.allowed_tags.includes( headingSizeTag.toLowerCase() ) ? headingSizeTag : 'div';
		}
		#>
		
		<#
		function render_link() {

			if ( 'link' == settings.infocard_cta_type ) {
				var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^www\.[^\s/$.?#].[^\s]*$/;
				var text_link_url = _.escape( settings.infocard_text_link.url );
				if ( urlPattern.test( text_link_url ) ){
					view.addRenderAttribute( 'link', 'href', text_link_url  );
				}#>
				<div class="hfe-infocard-cta-link-style">
					<a {{{ view.getRenderAttributeString( 'link' ) }}} class="hfe-infocard-cta-link"> <?php //phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
						<span class="elementor-inline-editing" data-elementor-setting-key="infocard_link_text" data-elementor-inline-editing-toolbar="basic">{{ elementor.helpers.sanitize( settings.infocard_link_text ) }}</span>
					</a>
				</div>
			<# }
			else if ( 'button' == settings.infocard_cta_type ) {

				view.addRenderAttribute( 'wrapper', 'class', 'hfe-button-wrapper elementor-widget-button' );
				if ( '' != settings.infocard_text_link.url ) {
					var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^www\.[^\s/$.?#].[^\s]*$/;
					var btn_link_url = _.escape( settings.infocard_text_link.url );
					if( urlPattern.test( btn_link_url ) ){
						view.addRenderAttribute( 'button', 'href', btn_link_url  );
					}
					view.addRenderAttribute( 'button', 'class', 'elementor-button-link' );
				}
				view.addRenderAttribute( 'button', 'class', 'elementor-button' );

				if ( '' != settings.infocard_button_size ) {
					view.addRenderAttribute( 'button', 'class', 'elementor-size-' + settings.infocard_button_size );
				} #>
				<div {{{ view.getRenderAttributeString( 'wrapper' ) }}}> <?php //phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
					<a  {{{ view.getRenderAttributeString( 'button' ) }}}> <?php //phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
						<#
						view.addRenderAttribute( 'content-wrapper', 'class', 'elementor-button-content-wrapper' );

						view.addRenderAttribute( 'text', 'class', 'elementor-button-text' );

						view.addRenderAttribute( 'text', 'class', 'elementor-inline-editing' );

						#>
						<span {{{ view.getRenderAttributeString( 'content-wrapper' ) }}}> <?php //phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
							<span {{{ view.getRenderAttributeString( 'text' ) }}} data-elementor-setting-key="infocard_button_text" data-elementor-inline-editing-toolbar="none">{{ elementor.helpers.sanitize( settings.infocard_button_text ) }}</span> <?php //phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
						</span>
					</a>
				</div>
			<#
			}
		}
		#>
		<div class="hfe-infocard">
			<# if( '' != settings.infocard_select_icon.value ){ #>
				<div class="hfe-icon-wrap">
					<span class="hfe-icon">
						{{{iconHTML.value}}}
					</span>
				</div>
			<# } #>
				<# if ( '' != settings.infocard_title ) {
					var infocard_title = elementor.helpers.sanitize( settings.infocard_title ); #>
					<div class="hfe-infocard-title-wrap">
						<{{ headingSizeTag }} class="hfe-infocard-title">{{{ infocard_title }}}</{{ headingSizeTag }}>
					</div>
				<# } #>
			<div class="hfe-infocard-text-wrap">
				<# if ( '' != settings.infocard_description ) {
					var infocard_description = elementor.helpers.sanitize( settings.infocard_description ); #>
					<div class="hfe-infocard-text elementor-inline-editing" data-elementor-setting-key="infocard_description" data-elementor-inline-editing-toolbar="advanced">{{{ infocard_description }}}</div>
				<# } #>
				<# render_link(); #>
			</div>
		</div>
		<?php // phpcs:enable WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
		<?php
	}
}
