<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Background;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Widget_Base;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Group_Control_Border;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Search Button.
 *
 * HFE widget for Search Button.
 *
 * @since 1.5.0
 */
class Search_Button extends Widget_Base {
	/**
	 * Retrieve the widget name.
	 *
	 * @since 1.5.0
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'hfe-search-button';
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 1.5.0
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Search', 'header-footer-elementor' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 1.5.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'hfe-icon-search';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since 1.5.0
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return array( 'hfe-widgets' );
	}

	/**
	 * Retrieve the list of scripts the navigation menu depended on.
	 *
	 * Used to set scripts dependencies required to run the widget.
	 *
	 * @since 1.5.0
	 * @access public
	 *
	 * @return array Widget scripts dependencies.
	 */
	public function get_script_depends() {
		return array( 'hfe-frontend-js' );
	}

	/**
	 * Register Search Button controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	protected function register_controls(): void {
		$this->register_general_content_controls();
		$this->register_search_style_controls();
	}
	/**
	 * Register Search General Controls.
	 *
	 * @since 1.5.0
	 * @access protected
	 * @return void
	 */
	protected function register_general_content_controls(): void {
		$this->start_controls_section(
			'section_general_fields',
			array(
				'label' => __( 'Search Box', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'layout',
			array(
				'label'        => __( 'Layout', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SELECT,
				'default'      => 'text',
				'options'      => array(
					'text'      => __( 'Input Box', 'header-footer-elementor' ),
					'icon'      => __( 'Icon', 'header-footer-elementor' ),
					'icon_text' => __( 'Input Box With Button', 'header-footer-elementor' ),
				),
				'prefix_class' => 'hfe-search-layout-',
				'render_type'  => 'template',
			)
		);

		$this->add_control(
			'placeholder',
			array(
				'label'     => __( 'Placeholder', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Type & Hit Enter', 'header-footer-elementor' ) . '...',
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_responsive_control(
			'size',
			array(
				'label'              => __( 'Size', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'default'            => array(
					'size' => 50,
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-search-form__container' => 'min-height: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .hfe-search-submit'      => 'min-width: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .hfe-search-form__input' => 'padding-left: calc({{SIZE}}{{UNIT}} / 5); padding-right: calc({{SIZE}}{{UNIT}} / 5)',
				),
				'condition'          => array(
					'layout!' => 'icon',
				),
				'render_type'        => 'template',
				'frontend_available' => true,
			)
		);

		$this->end_controls_section();
	}
	/**
	 * Register Search Style Controls.
	 *
	 * @since 1.5.0
	 * @access protected
	 * @return void
	 */
	protected function register_search_style_controls(): void {
		$this->start_controls_section(
			'section_input_style',
			array(
				'label' => __( 'Input', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'input_typography',
				'selector' => '{{WRAPPER}} input[type="search"].hfe-search-form__input,{{WRAPPER}} .hfe-search-icon-toggle',
				'global'   => array(
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				),
			)
		);

		$this->add_responsive_control(
			'input_icon_size',
			array(
				'label'              => __( 'Width', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'default'            => array(
					'size' => 250,
				),
				'range'              => array(
					'px' => array(
						'min' => 0,
						'max' => 1500,
					),
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle input[type=search]' => 'width: {{SIZE}}{{UNIT}};',
				),
				'condition'          => array(
					'layout' => 'icon',
				),
				'frontend_available' => true,
			)
		);

		$this->start_controls_tabs( 'tabs_input_colors' );

		$this->start_controls_tab(
			'tab_input_normal',
			array(
				'label'     => __( 'Normal', 'header-footer-elementor' ),
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_control(
			'input_text_color',
			array(
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_TEXT,
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-form__input' => 'color: {{VALUE}}',
				),
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_control(
			'input_placeholder_color',
			array(
				'label'     => __( 'Placeholder Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_TEXT,
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-form__input::placeholder' => 'color: {{VALUE}}',
				),
				'default'   => '#7A7A7A6B',
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_control(
			'input_background_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#ededed',
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-form__input, {{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input' => 'background-color: transparent;',
				),
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'      => 'input_box_shadow',
				'selector'  => '{{WRAPPER}} .hfe-search-form__container,{{WRAPPER}} input.hfe-search-form__input',
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);
		$this->add_control(
			'border_style',
			array(
				'label'       => __( 'Border Style', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'none',
				'label_block' => false,
				'options'     => array(
					'none'   => __( 'None', 'header-footer-elementor' ),
					'solid'  => __( 'Solid', 'header-footer-elementor' ),
					'double' => __( 'Double', 'header-footer-elementor' ),
					'dotted' => __( 'Dotted', 'header-footer-elementor' ),
					'dashed' => __( 'Dashed', 'header-footer-elementor' ),
				),
				'selectors'   => array(
					'{{WRAPPER}} .hfe-search-form__container ,{{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input,{{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-style: {{VALUE}};',
				),
				'condition'   => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_control(
			'border_color',
			array(
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_PRIMARY,
				),
				'condition' => array(
					'border_style!' => 'none',
					'layout!'       => 'icon',
				),
				'default'   => '',
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-form__container, {{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input,{{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'border_width',
			array(
				'label'      => __( 'Border Width', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'default'    => array(
					'top'    => '1',
					'bottom' => '1',
					'left'   => '1',
					'right'  => '1',
					'unit'   => 'px',
				),
				'condition'  => array(
					'border_style!' => 'none',
					'layout!'       => 'icon',
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-search-form__container, {{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input,{{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'border_radius',
			array(
				'label'     => __( 'Border Radius', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'min' => 0,
						'max' => 200,
					),
				),
				'default'   => array(
					'size' => 3,
					'unit' => 'px',
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-form__container, {{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input,{{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-radius: {{SIZE}}{{UNIT}}',
				),
				'separator' => 'before',
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_input_focus',
			array(
				'label'     => __( 'Focus', 'header-footer-elementor' ),
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_control(
			'input_text_color_focus',
			array(
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__input:focus,
					{{WRAPPER}} .hfe-search-button-wrapper input[type=search]:focus' => 'color: {{VALUE}}',
				),
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_control(
			'input_placeholder_hover_color',
			array(
				'label'     => __( 'Placeholder Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_TEXT,
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-form__input:focus::placeholder' => 'color: {{VALUE}}',
				),
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_control(
			'input_background_color_focus',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__input:focus,
					{{WRAPPER}}.hfe-search-layout-icon .hfe-search-icon-toggle .hfe-search-form__input' => 'background-color: {{VALUE}}',
				),
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'           => 'input_box_shadow_focus',
				'selector'       =>
				'{{WRAPPER}} .hfe-search-button-wrapper.hfe-input-focus .hfe-search-form__container,
				 {{WRAPPER}} .hfe-search-button-wrapper.hfe-input-focus input.hfe-search-form__input',
				'fields_options' => array(
					'box_shadow_type' => array(
						'separator' => 'default',
					),
				),
				'condition'      => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_control(
			'input_border_color_focus',
			array(
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__container,
					 {{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-color: {{VALUE}}',
				),
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'icon_text_color_focus',
			array(
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__input:focus' => 'color: {{VALUE}}',
				),
				'condition' => array(
					'layout' => 'icon',
				),
				'separator' => 'before',
			)
		);

		$this->add_control(
			'icon_text_background_color_focus',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#ededed',
				'selectors' => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__input:focus' => 'background-color: {{VALUE}}',
				),
				'condition' => array(
					'layout' => 'icon',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'           => 'icon_box_shadow_focus',
				'selector'       =>
				'{{WRAPPER}} .hfe-search-button-wrapper.hfe-input-focus .hfe-search-form__container,
				 {{WRAPPER}} .hfe-search-button-wrapper.hfe-input-focus input.hfe-search-form__input',
				'fields_options' => array(
					'box_shadow_type' => array(
						'separator' => 'default',
					),
				),
				'condition'      => array(
					'layout' => 'icon',
				),
			)
		);

		$this->add_control(
			'icon_border_style',
			array(
				'label'       => __( 'Border Style', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'none',
				'label_block' => false,
				'options'     => array(
					'none'   => __( 'None', 'header-footer-elementor' ),
					'solid'  => __( 'Solid', 'header-footer-elementor' ),
					'double' => __( 'Double', 'header-footer-elementor' ),
					'dotted' => __( 'Dotted', 'header-footer-elementor' ),
					'dashed' => __( 'Dashed', 'header-footer-elementor' ),
				),
				'selectors'   => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-style: {{VALUE}};',
				),
				'condition'   => array(
					'layout' => 'icon',
				),
			)
		);

		$this->add_control(
			'icon_border_color_focus',
			array(
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__container,
					 {{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-color: {{VALUE}}',
				),
				'condition' => array(
					'layout'             => 'icon',
					'icon_border_style!' => 'none',
				),
			)
		);

		$this->add_control(
			'icon_border_width',
			array(
				'label'      => __( 'Border Width', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'default'    => array(
					'top'    => '1',
					'bottom' => '1',
					'left'   => '1',
					'right'  => '1',
					'unit'   => 'px',
				),
				'condition'  => array(
					'icon_border_style!' => 'none',
					'layout'             => 'icon',
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'icon_focus_border_radius',
			array(
				'label'     => __( 'Border Radius', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'min' => 0,
						'max' => 200,
					),
				),
				'default'   => array(
					'size' => 3,
					'unit' => 'px',
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-radius: {{SIZE}}{{UNIT}}',
				),
				'condition' => array(
					'layout' => 'icon',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_button_style',
			array(
				'label'     => __( 'Button', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'layout' => 'icon_text',
				),
			)
		);

		$this->start_controls_tabs( 'tabs_button_colors' );

		$this->start_controls_tab(
			'tab_button_normal',
			array(
				'label' => __( 'Normal', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'button_icon_color',
			array(
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#fff',
				'selectors' => array(
					'{{WRAPPER}} button.hfe-search-submit' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			array(
				'name'           => 'button_background',
				'label'          => __( 'Background', 'header-footer-elementor' ),
				'types'          => array( 'classic', 'gradient' ),
				'exclude'        => array( 'image' ),
				'selector'       => '{{WRAPPER}} .hfe-search-submit',
				'fields_options' => array(
					'background' => array(
						'default' => 'classic',
					),
					'color'      => array(
						'default' => '#818a91',
					),
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_button_hover',
			array(
				'label' => __( 'Hover', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'button_text_color_hover',
			array(
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-submit:hover' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'button_background_color_hover',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-submit:hover' => 'background-color: {{VALUE}}',
				),
				'condition' => array(
					'button_background_color_hover!' => '',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			array(
				'name'      => 'button_background_hover',
				'label'     => __( 'Background', 'header-footer-elementor' ),
				'types'     => array( 'classic', 'gradient' ),
				'exclude'   => array( 'image' ),
				'selector'  => '{{WRAPPER}} .hfe-search-submit:hover',
				'condition' => array(
					'button_background_color_hover' => '',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_responsive_control(
			'icon_size',
			array(
				'label'              => __( 'Icon Size', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'range'              => array(
					'px' => array(
						'min' => 0,
						'max' => 100,
					),
				),
				'default'            => array(
					'size' => '16',
					'unit' => 'px',
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-search-submit' => 'font-size: {{SIZE}}{{UNIT}}',
				),
				'condition'          => array(
					'layout!' => 'icon',
				),
				'separator'          => 'before',
				'render_type'        => 'template',
				'frontend_available' => true,
			)
		);

		$this->add_responsive_control(
			'button_width',
			array(
				'label'              => __( 'Width', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'range'              => array(
					'px' => array(
						'max'  => 500,
						'step' => 5,
					),
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-search-form__container .hfe-search-submit' => 'width: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .hfe-close-icon-yes button#clear_with_button' => 'right: {{SIZE}}{{UNIT}}',
				),
				'condition'          => array(
					'layout' => 'icon_text',
				),
				'render_type'        => 'template',
				'frontend_available' => true,
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_toggle_style',
			array(
				'label'     => __( 'Icon', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'layout' => 'icon',
				),
			)
		);

		$this->start_controls_tabs( 'tabs_toggle_color' );

		$this->start_controls_tab(
			'tab_toggle_normal',
			array(
				'label' => __( 'Normal', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'toggle_color',
			array(
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-icon-toggle i' => 'color: {{VALUE}}; border-color: {{VALUE}}; fill: {{VALUE}};',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_toggle_hover',
			array(
				'label' => __( 'Hover', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'toggle_color_hover',
			array(
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-icon-toggle i:hover' => 'color: {{VALUE}}; border-color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_responsive_control(
			'toggle_icon_size',
			array(
				'label'              => __( 'Icon Size', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'default'            => array(
					'size' => 15,
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-search-icon-toggle input[type=search]' => 'padding: 0 calc( {{SIZE}}{{UNIT}} / 2);',
					'{{WRAPPER}} .hfe-search-icon-toggle i.fa-search:before' => 'font-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .hfe-search-icon-toggle i.fa-search, {{WRAPPER}} .hfe-search-icon-toggle' => 'width: {{SIZE}}{{UNIT}};',

				),
				'condition'          => array(
					'layout' => 'icon',
				),
				'separator'          => 'before',
				'render_type'        => 'template',
				'frontend_available' => true,
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_close_icon',
			array(
				'label'     => __( 'Close Icon', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'layout!' => 'icon',
				),
			)
		);

		$this->add_responsive_control(
			'close_icon_size',
			array(
				'label'              => __( 'Size', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'range'              => array(
					'px' => array(
						'min' => 0,
						'max' => 50,
					),
				),
				'default'            => array(
					'size' => '20',
					'unit' => 'px',
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-search-form__container button#clear i:before,
					{{WRAPPER}} .hfe-search-icon-toggle button#clear i:before,
				{{WRAPPER}} .hfe-search-form__container button#clear-with-button i:before' => 'font-size: {{SIZE}}{{UNIT}};',
				),
				'frontend_available' => true,

			)
		);

		$this->start_controls_tabs( 'close_icon_normal' );

		$this->start_controls_tab(
			'normal_close_button',
			array(
				'label' => __( 'Normal', 'header-footer-elementor' ),
			)
		);
		$this->add_control(
			'text_color',
			array(
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_TEXT,
				),
				'default'   => '#7a7a7a',
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-form__container button#clear-with-button,
					{{WRAPPER}} .hfe-search-form__container button#clear,
					{{WRAPPER}} .hfe-search-icon-toggle button#clear' => 'color: {{VALUE}}',
				),
			)
		);
		$this->end_controls_tab();

		$this->start_controls_tab(
			'hover_close_icon',
			array(
				'label' => __( 'Hover', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'hover_close_icon_text',
			array(
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-search-form__container button#clear-with-button:hover,
					{{WRAPPER}} .hfe-search-form__container button#clear:hover,
					{{WRAPPER}} .hfe-search-icon-toggle button#clear:hover' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}
	/**
	 * Render Search button output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.5.0
	 * @access protected
	 * @return void
	 */
	protected function render(): void {
		$settings = $this->get_settings_for_display();

		$this->add_render_attribute(
			'input',
			array(
				'placeholder' => $settings['placeholder'],
				'class'       => 'hfe-search-form__input',
				'type'        => 'search',
				'name'        => 's',
				'title'       => __( 'Search', 'header-footer-elementor' ),
				'value'       => get_search_query(),

			)
		);

		$this->add_render_attribute(
			'container',
			array(
				'class' => array( 'hfe-search-form__container' ),
				'role'  => 'tablist',
			)
		);

		/** Check if Polylang fucntion is active with Search widget */

		if ( function_exists( 'pll_the_languages' ) ) {
			$default_language = pll_default_language();
			$current_lang     = pll_current_language();
			$action_url       = $current_lang === $default_language ? home_url( '/' ) : home_url( '/' ) . $current_lang . '/';
		} else {
			$action_url = home_url( '/' );
		}
		?>
		<form class="hfe-search-button-wrapper" role="search" action="<?php echo esc_url( $action_url ); ?>" method="get">

			<?php if ( 'icon' === $settings['layout'] ) { ?>
			<div class = "hfe-search-icon-toggle">
				<input <?php $this->print_render_attribute_string( 'input' ); ?>>
				<i class="fas fa-search" aria-hidden="true"></i>
			</div>
			<?php } else { ?>
			<div <?php $this->print_render_attribute_string( 'container' ); ?>>
				<?php if ( 'text' === $settings['layout'] ) { ?>
					<input <?php $this->print_render_attribute_string( 'input' ); ?>>
						<button id="clear" type="reset">
							<i class="fas fa-times clearable__clear" aria-hidden="true"></i>
						</button>
				<?php } else { ?>
					<input <?php $this->print_render_attribute_string( 'input' ); ?>>
					<button id="clear-with-button" type="reset">
						<i class="fas fa-times" aria-hidden="true"></i>
					</button>
					<button class="hfe-search-submit" type="submit">
						<i class="fas fa-search" aria-hidden="true"></i>
					</button>
				<?php } ?>
			</div>
		<?php } ?>
		</form>
		<?php
	}
}
