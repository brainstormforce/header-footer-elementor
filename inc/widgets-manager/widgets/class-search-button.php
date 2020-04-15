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
use Elementor\Scheme_Typography;
use Elementor\Widget_Base;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Border;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Search Button.
 *
 * HFE widget for Search Button.
 *
 * @since x.x.x
 */
class Search_Button extends Widget_Base {
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
		return 'hfe-search-button';
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
		return __( 'Search', 'header-footer-elementor' );
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
	 * Retrieve the list of scripts the navigation menu depended on.
	 *
	 * Used to set scripts dependencies required to run the widget.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @return array Widget scripts dependencies.
	 */
	public function get_script_depends() {
		return [ 'hfe-nav-menu' ];
	}

	/**
	 * Register Search Button controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_general_content_controls();
		$this->register_search_style_controls();
	}
	/**
	 * Register Archive Title General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_general_content_controls() {
		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Search Box', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'layout',
			[
				'label'        => __( 'Layout', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SELECT,
				'default'      => 'text',
				'options'      => [
					'text'      => __( 'Input Box', 'header-footer-elementor' ),
					'icon'      => __( 'Icon', 'header-footer-elementor' ),
					'icon_text' => __( 'Input Box With Button', 'header-footer-elementor' ),
				],
				'prefix_class' => 'hfe-search-layout-',
				'render_type'  => 'template',
			]
		);

		$this->add_control(
			'placeholder',
			[
				'label'     => __( 'Placeholder', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Type & Hit Enter', 'header-footer-elementor' ) . '...',
				'condition' => [
					'layout!' => 'icon',
				],
			]
		);

		$this->add_control(
			'size',
			[
				'label'     => __( 'Button Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
				'size' => 50,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-search-form__container' => 'min-height: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .hfe-search-submit'      => 'min-width: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .hfe-search-form__input' => 'padding-left: calc({{SIZE}}{{UNIT}} / 5); padding-right: calc({{SIZE}}{{UNIT}} / 5)',
				],
				'condition' => [
					'layout!' => 'icon',
				],
			]
		);

		$this->add_responsive_control(
			'button_align',
			[
				'label'       => __( 'Alignment', 'header-footer-elementor' ),
				'type'        => Controls_Manager::CHOOSE,
				'label_block' => false,
				'default'     => 'center',
				'options'     => [
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
				'selectors'   => [
					'{{WRAPPER}} .hfe-search-button-wrapper' => 'text-align: {{VALUE}}',
				],
				'condition'   => [
					'layout' => 'icon',
				],
			]
		);

		$this->end_controls_section();
	}
	/**
	 * Register Archive Title Style Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_search_style_controls() {
		$this->start_controls_section(
			'section_input_style',
			[
				'label' => __( 'Input', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'input_typography',
				'selector' => '{{WRAPPER}} input[type="search"].hfe-search-form__input',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
			]
		);

		$this->start_controls_tabs( 'tabs_input_colors' );

		$this->start_controls_tab(
			'tab_input_normal',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'input_text_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-search-form__input' => 'color: {{VALUE}}',
				],
				'condition' => [
					'layout!' => 'icon',
				],
			]
		);

		$this->add_control(
			'input_placeholder_color',
			[
				'label'     => __( 'Placeholder Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-search-form__input::placeholder' => 'color: {{VALUE}}',
				],
				'condition' => [
					'layout!' => 'icon',
				],
			]
		);

		$this->add_control(
			'input_background_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#ededed',
				'selectors' => [
					'{{WRAPPER}} .hfe-search-form__input' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'layout!' => 'icon',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'input_box_shadow',
				'selector' => '{{WRAPPER}} .hfe-search-form__container,{{WRAPPER}} input.hfe-search-form__input',
			]
		);
		$this->add_control(
			'border_style',
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
				'selectors'   => [
					'{{WRAPPER}} .hfe-search-form__container ,{{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input' => 'border-style: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'border_color',
			[
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				],
				'condition' => [
					'border_style!' => 'none',
				],
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-search-form__container, {{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'border_width',
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
					'border_style!' => 'none',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-search-form__container, {{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'border_radius',
			[
				'label'     => __( 'Border Radius', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 200,
					],
				],
				'default'   => [
					'size' => 3,
					'unit' => 'px',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-search-form__container, {{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input' => 'border-radius: {{SIZE}}{{UNIT}}',
				],
				'separator' => 'before',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_input_focus',
			[
				'label' => __( 'Focus', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'input_text_color_focus',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__input:focus,
					{{WRAPPER}} .hfe-search-button-wrapper input[type=search]:focus' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'input_placeholder_hover_color',
			[
				'label'     => __( 'Placeholder Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-search-form__input:focus::placeholder' => 'color: {{VALUE}}',
				],
				'condition' => [
					'layout!' => 'icon',
				],
			]
		);

		$this->add_control(
			'input_background_color_focus',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__input:focus,
					{{WRAPPER}}.hfe-search-layout-icon .hfe-search-icon-toggle .hfe-search-form__input' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'layout!' => 'icon',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'           => 'input_box_shadow_focus',
				'selector'       =>
				'{{WRAPPER}} .hfe-search-button-wrapper.hfe-input-focus .hfe-search-form__container,
				 {{WRAPPER}} .hfe-search-button-wrapper.hfe-input-focus input.hfe-search-form__input',
				'fields_options' => [
					'box_shadow_type' => [
						'separator' => 'default',
					],
				],
			]
		);

		$this->add_control(
			'input_border_color_focus',
			[
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-input-focus .hfe-search-form__container,
					 {{WRAPPER}} .hfe-input-focus .hfe-search-icon-toggle .hfe-search-form__input' => 'border-color: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_button_style',
			[
				'label'     => __( 'Button', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'layout' => 'icon_text',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_button_colors' );

		$this->start_controls_tab(
			'tab_button_normal',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'button_icon_color',
			[
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#fff',
				'selectors' => [
					'{{WRAPPER}} button.hfe-search-submit' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'button_background_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#818a91',
				'selectors' => [
					'{{WRAPPER}} .hfe-search-submit' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_button_hover',
			[
				'label' => __( 'Hover', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'button_text_color_hover',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-search-submit:hover' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'button_background_color_hover',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-search-submit:hover' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_responsive_control(
			'icon_size',
			[
				'label'     => __( 'Icon Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-search-submit' => 'font-size: {{SIZE}}{{UNIT}}',
				],
				'condition' => [
					'layout!' => 'icon',
				],
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'button_width',
			[
				'label'     => __( 'Width', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'max'  => 500,
						'step' => 5,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-search-form__container .hfe-search-submit' => 'width: {{SIZE}}{{UNIT}}',
				],
				'condition' => [
					'layout' => 'icon_text',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_toggle_style',
			[
				'label'     => __( 'Icon', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'layout' => 'icon',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_toggle_color' );

		$this->start_controls_tab(
			'tab_toggle_normal',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'toggle_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-search-icon-toggle' => 'color: {{VALUE}}; border-color: {{VALUE}}; fill: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'toggle_background_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-search-icon-toggle .hfe-search-form__input' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_toggle_hover',
			[
				'label' => __( 'Hover', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'toggle_color_hover',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-search-icon-toggle:hover' => 'color: {{VALUE}}; border-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'toggle_background_color_hover',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-search-icon-toggle:hover .hfe-search-form__input' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'toggle_icon_size',
			[
				'label'     => __( 'Icon Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 33,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-search-icon-toggle i' => 'margin-top: {{SIZE}}{{UNIT}}; margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .hfe-search-icon-toggle input[type=search]' => 'height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}}; padding: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .hfe-search-icon-toggle input[type=search]:focus' => 'width: calc( {{SIZE}}{{UNIT}} * 8 );padding-left: calc( {{SIZE}}{{UNIT}} + 15{{UNIT}} );',
<<<<<<< HEAD
					'{{WRAPPER}} .hfe-search-icon-toggle i:before' => 'font-size: {{SIZE}}{{UNIT}}',
=======
					'{{WRAPPER}} .hfe-search-icon-toggle i:before' => 'font-size: {{SIZE}}{{UNIT}};',
>>>>>>> 9b01d757870fb6b8d674c93d8272161ef0d9687a
				],
				'condition' => [
					'layout' => 'icon',
				],
				'separator' => 'before',
			]
		);

		$this->end_controls_section();

	}
	/**
	 * Render Search button output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();

		$this->add_render_attribute(
			'input',
			[
				'placeholder' => $settings['placeholder'],
				'class'       => 'hfe-search-form__input',
				'type'        => 'search',
				'name'        => 's',
				'title'       => __( 'Search', 'header-footer-elementor' ),
				'value'       => get_search_query(),
			]
		);

		?>
		<form class="hfe-search-button-wrapper" role="search" action="<?php echo home_url(); ?>" method="get">
			<?php if ( 'icon' === $settings['layout'] ) { ?>
			<div class = "hfe-search-icon-toggle">
				<i class="fas fa-search" aria-hidden="true"></i>
				<input <?php echo $this->get_render_attribute_string( 'input' ); ?>>
			</div>
			<?php } else { ?>
			<div class="hfe-search-form__container">
				<?php if ( 'text' === $settings['layout'] ) { ?>
					<input <?php echo $this->get_render_attribute_string( 'input' ); ?> >
				<?php } else { ?>
					<input <?php echo $this->get_render_attribute_string( 'input' ); ?>>
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