<?php
/**
 * Scroll to top settings
 *
 * @package header-footer-elementor
 * @since 2.2.1
 */

namespace HFE\WidgetsManager\Extensions;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Core\Kits\Documents\Tabs\Tab_Base;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;

/**
 * HFE Scroll to top extension
 *
 * @since 2.2.1
 */
class Scroll_To_Top_Settings extends Tab_Base {

	/**
	 * Retrieve the widget name.
	 *
	 * @since 2.2.1
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_id() {
		return 'hfe-scroll-to-top-settings';
	}

	/**
	 * Retrieves the widget name title.
	 *
	 * @since 2.2.1
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Scroll to Top', 'header-footer-elementor' );
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
		return 'hfe-icon-scroll-to-top';
	}

	/**
	 * Get help URL
	 *
	 * Retrieve the help URL for the Scroll to Top extension.
	 *
	 * @since 2.4.4
	 * @access public
	 *
	 * @return string The complete URL to the help page for the extension.
	 */
	public function get_custom_help_url() {
		return 'https://ultimateelementor.com/docs/scroll-to-top-extension/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation';
	}

	/**
	 * Retrieves the help URL.
	 * 
	 * @since 2.2.1
	 *
	 * @access public
	 *
	 * @return string The complete URL to the help page for the widget.
	 */
	public function get_help_url() {
		return $this->get_custom_help_url();
	}

	/**
	 * Retrieves the widget keywords.
	 * 
	 * @since 2.2.1
	 *
	 * @access public
	 *
	 * @return string The keywords for the widget.
	 */
	public function get_group() {
		return 'settings';
	}

	/**
	 * Register tab controls
	 *
	 * @since 2.2.1
	 * @access protected
	 * @return void
	 */
	protected function register_tab_controls() {
		$this->start_controls_section(
			'hfe_scroll_to_top_section',
			[
				'tab'   => 'hfe-scroll-to-top-settings',
				'label' => __( 'Scroll to Top', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_global',
			[
				'type'      => Controls_Manager::SWITCHER,
				'label'     => __( 'Enable Scroll To Top', 'header-footer-elementor' ),
				'default'   => '',
				'label_on'  => __( 'Yes', 'header-footer-elementor' ),
				'label_off' => __( 'No', 'header-footer-elementor' ),
			]
		);

		// TODO: For Pro 3.6.0, convert this to the breakpoints utility method introduced in core 3.5.0.
		$breakpoints    = \Elementor\Plugin::instance()->breakpoints->get_active_breakpoints();
		$device_default = [];
		foreach ( $breakpoints as $breakpoint_key => $breakpoint ) {
			$device_default[ $breakpoint_key . '_default' ] = 'yes';
		}
		$device_default['desktop_default'] = 'yes';
		$this->add_responsive_control(
			'hfe_scroll_to_top_responsive_visibility',
			array_merge(
				[
					'type'                 => Controls_Manager::SWITCHER,
					'label'                => __( 'Responsive Support', 'header-footer-elementor' ),
					'default'              => 'yes',
					'return_value'         => 'yes',
					'label_on'             => __( 'Show', 'header-footer-elementor' ),
					'label_off'            => __( 'Hide', 'header-footer-elementor' ),
					'selectors_dictionary' => [
						''    => 'visibility: hidden; opacity: 0;',
						'yes' => 'visibility: visible; opacity: 1;',
					],
					'selectors'            => [
						'body[data-elementor-device-mode="widescreen"] .hfe-scroll-to-top-wrap,
						body[data-elementor-device-mode="widescreen"] .hfe-scroll-to-top-wrap.edit-mode,
						body[data-elementor-device-mode="widescreen"] .hfe-scroll-to-top-wrap.single-page-off' => '{{VALUE}}',

						'body[data-elementor-device-mode="desktop"] .hfe-scroll-to-top-wrap,
						body[data-elementor-device-mode="desktop"] .hfe-scroll-to-top-wrap.edit-mode,
						body[data-elementor-device-mode="desktop"] .hfe-scroll-to-top-wrap.single-page-off' => '{{VALUE}}',

						'body[data-elementor-device-mode="laptop"] .hfe-scroll-to-top-wrap,
						body[data-elementor-device-mode="laptop"] .hfe-scroll-to-top-wrap.edit-mode,
						body[data-elementor-device-mode="laptop"] .hfe-scroll-to-top-wrap.single-page-off' => '{{VALUE}}',

						'body[data-elementor-device-mode="tablet_extra"] .hfe-scroll-to-top-wrap,
						body[data-elementor-device-mode="tablet_extra"] .hfe-scroll-to-top-wrap.edit-mode,
						body[data-elementor-device-mode="tablet_extra"] .hfe-scroll-to-top-wrap.single-page-off' => '{{VALUE}}',

						'body[data-elementor-device-mode="tablet"] .hfe-scroll-to-top-wrap,
						body[data-elementor-device-mode="tablet"] .hfe-scroll-to-top-wrap.edit-mode,
						body[data-elementor-device-mode="tablet"] .hfe-scroll-to-top-wrap.single-page-off' => '{{VALUE}}',

						'body[data-elementor-device-mode="mobile_extra"] .hfe-scroll-to-top-wrap,
						body[data-elementor-device-mode="mobile_extra"] .hfe-scroll-to-top-wrap.edit-mode,
						body[data-elementor-device-mode="mobile_extra"] .hfe-scroll-to-top-wrap.single-page-off' => '{{VALUE}}',

						'body[data-elementor-device-mode="mobile"] .hfe-scroll-to-top-wrap,
						body[data-elementor-device-mode="mobile"] .hfe-scroll-to-top-wrap.edit-mode,
						body[data-elementor-device-mode="mobile"] .hfe-scroll-to-top-wrap.single-page-off' => '{{VALUE}}',
					],
					'condition'            => [
						'hfe_scroll_to_top_global' => 'yes',
					],
				],
				$device_default
			)
		);

		$this->add_control(
			'hfe_scroll_to_top_position_text',
			[
				'label'       => esc_html__( 'Position', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'bottom-right',
				'label_block' => false,
				'options'     => [
					'bottom-left'  => esc_html__( 'Bottom Left', 'header-footer-elementor' ),
					'bottom-right' => esc_html__( 'Bottom Right', 'header-footer-elementor' ),
				],
				'separator'   => 'before',
				'condition'   => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_position_bottom',
			[
				'label'      => __( 'Bottom', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', '%' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					],
					'em' => [
						'min'  => 0,
						'max'  => 50,
						'step' => 1,
					],
					'%'  => [
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					],
				],
				'selectors'  => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'bottom: {{SIZE}}{{UNIT}}',
				],
				'condition'  => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_position_left',
			[
				'label'      => __( 'Left', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', '%' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					],
					'em' => [
						'min'  => 0,
						'max'  => 50,
						'step' => 1,
					],
					'%'  => [
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					],
				],
				'selectors'  => [
					'.hfe-scroll-to-top-button' => 'left: 15px',
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'left: {{SIZE}}{{UNIT}}',
				],
				'condition'  => [
					'hfe_scroll_to_top_global'        => 'yes',
					'hfe_scroll_to_top_position_text' => 'bottom-left',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_position_right',
			[
				'label'      => __( 'Right', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', '%' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					],
					'em' => [
						'min'  => 0,
						'max'  => 50,
						'step' => 1,
					],
					'%'  => [
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					],
				],
				'selectors'  => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'right: {{SIZE}}{{UNIT}}',
				],
				'condition'  => [
					'hfe_scroll_to_top_global'        => 'yes',
					'hfe_scroll_to_top_position_text' => 'bottom-right',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_height',
			[
				'label'      => __( 'Height', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					],
				],
				'separator'  => 'before',
				'selectors'  => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'height: {{SIZE}}{{UNIT}};',
				],
				'condition'  => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_width',
			[
				'label'      => __( 'Width', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 1000,
						'step' => 1,
					],
				],
				'selectors'  => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'width: {{SIZE}}{{UNIT}};',
				],
				'condition'  => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_z_index',
			[
				'label'      => __( 'Z Index', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 9999,
						'step' => 10,
					],
				],
				'selectors'  => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'z-index: {{SIZE}}',
				],
				'condition'  => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_opacity',
			[
				'label'     => __( 'Opacity', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min'  => 0,
						'max'  => 1,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'opacity: {{SIZE}};',
				],
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_media_type',
			[
				'label'          => __( 'Media Type', 'header-footer-elementor' ),
				'type'           => Controls_Manager::CHOOSE,
				'label_block'    => false,
				'options'        => [
					'icon'  => [
						'title' => __( 'Icon', 'header-footer-elementor' ),
						'icon'  => 'eicon-star',
					],
					'image' => [
						'title' => __( 'Image', 'header-footer-elementor' ),
						'icon'  => 'eicon-image',
					],
					'text'  => [
						'title' => __( 'Text', 'header-footer-elementor' ),
						'icon'  => 'eicon-animation-text',
					],
				],
				'default'        => 'icon',
				'separator'      => 'before',
				'toggle'         => false,
				'style_transfer' => true,
				'condition'      => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_icon',
			[
				'label'      => esc_html__( 'Icon', 'header-footer-elementor' ),
				'type'       => Controls_Manager::ICONS,
				'show_label' => false,
				'default'    => [
					'value'   => 'fas fa-chevron-up',
					'library' => 'fa-solid',
				],
				'condition'  => [
					'hfe_scroll_to_top_global'     => 'yes',
					'hfe_scroll_to_top_media_type' => 'icon',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_image',
			[
				'label'      => __( 'Image', 'header-footer-elementor' ),
				'type'       => Controls_Manager::MEDIA,
				'show_label' => false,
				'dynamic'    => [
					'active' => true,
				],
				'condition'  => [
					'hfe_scroll_to_top_global'     => 'yes',
					'hfe_scroll_to_top_media_type' => 'image',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_text',
			[
				'label'       => __( 'Text', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				'show_label'  => false,
				'label_block' => true,
				'default'     => 'Up',
				'condition'   => [
					'hfe_scroll_to_top_global'     => 'yes',
					'hfe_scroll_to_top_media_type' => 'text',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_icon_size',
			[
				'label'      => __( 'Size', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px' ],
				'range'      => [
					'px' => [
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					],
				],
				'selectors'  => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button i' => 'font-size: {{SIZE}}{{UNIT}};',
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button img' => 'height: {{SIZE}}{{UNIT}};width: {{SIZE}}{{UNIT}};',
				],
				'condition'  => [
					'hfe_scroll_to_top_global'      => 'yes',
					'hfe_scroll_to_top_media_type!' => 'text',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'hfe_scroll_to_top_button_text_typo',
				'global'    => [
					'default' => Global_Typography::TYPOGRAPHY_TEXT,
				],
				'selector'  => '.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button span',
				'condition' => [
					'hfe_scroll_to_top_global'     => 'yes',
					'hfe_scroll_to_top_media_type' => 'text',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'      => 'hfe_scroll_to_top_button_border',
				'exclude'   => [ 'color' ], // remove border color.
				'selector'  => '{{WRAPPER}} .hfe-scroll-to-top-wrap .hfe-scroll-to-top-button',
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->start_controls_tabs(
			'hfe_scroll_to_top_tabs',
			[
				'separator' => 'before',
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->start_controls_tab(
			'hfe_scroll_to_top_tab_normal',
			[
				'label'     => __( 'Normal', 'header-footer-elementor' ),
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_icon_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button i' => 'color: {{VALUE}}',
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button span' => 'color: {{VALUE}}',
				],
				'condition' => [
					'hfe_scroll_to_top_global'      => 'yes',
					'hfe_scroll_to_top_media_type!' => 'image',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'      => 'hfe_scroll_to_top_button_bg_color',
				'types'     => [ 'classic', 'gradient' ],
				'exclude'   => [ 'image' ],
				'selector'  => '.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button',
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_border_color',
			[
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'border-color: {{VALUE}}',
				],
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
					'hfe_scroll_to_top_button_border_border!' => '',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'hfe_scroll_to_top_tab_hover',
			[
				'label'     => __( 'Hover', 'header-footer-elementor' ),
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_icon_hvr_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button:hover i' => 'color: {{VALUE}}',
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button:hover span' => 'color: {{VALUE}}',
				],
				'condition' => [
					'hfe_scroll_to_top_global'      => 'yes',
					'hfe_scroll_to_top_media_type!' => 'image',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'      => 'hfe_scroll_to_top_button_bg_hvr_color',
				'types'     => [ 'classic', 'gradient' ],
				'exclude'   => [ 'image' ],
				'selector'  => '.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button:hover',
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_scroll_to_top_button_hvr_border_color',
			[
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button:hover' => 'border-color: {{VALUE}}',
				],
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
					'hfe_scroll_to_top_button_border_border!' => '',
				],
			]
		);

		$this->end_controls_tab();
		$this->end_controls_tabs();

		$this->add_control(
			'hfe_scroll_to_top_button_border_radius',
			[
				'label'      => __( 'Border Radius', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'selectors'  => [
					'.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator'  => 'before',
				'condition'  => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'      => 'hfe_scroll_to_top_button_box_shadow',
				'exclude'   => [
					'box_shadow_position',
				],
				'selector'  => '.hfe-scroll-to-top-wrap .hfe-scroll-to-top-button',
				'condition' => [
					'hfe_scroll_to_top_global' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}
}
