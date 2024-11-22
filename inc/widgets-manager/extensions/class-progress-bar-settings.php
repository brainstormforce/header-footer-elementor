<?php
/**
 * Scroll to top settings
 *
 * @since x.x.x
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
 * HFE Progress Bar extension
 *
 * @since x.x.x
 */
class Progress_Bar_Settings extends Tab_Base {

    /**
	 * Get Elementor Tab ID
	 */
	public function get_id() {
		return 'hfe-progress-bar-settings';
	}

	public function get_title() {
		return __( 'Reading Progress Bar', 'header-footer-elementor' );
	}

	public function get_icon() {
		return 'eicon-v-align-top';
	}

	public function get_help_url() {
		return '';
	}

	public function get_group() {
		return 'settings';
	}

    protected function register_tab_controls() {

        $this->start_controls_section(
			'hfe_progress_bar_kit_section',
			[
				'tab'   => 'hfe-progress-bar-kit-settings',
				'label' => __( 'Reading Progress Bar', 'header-footer-elementor' ),
			]
		);

        $this->add_control(
			'hfe_progress_bar_enable',
			[
				'label'        => __( 'Enable', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'default'      => 'no',
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
                'frontend_available' => true,
				'render_type' => 'template',
                'selectors_dictionary' => [
					''    => 'visibility: hidden; opacity: 0;',
					'yes' => 'visibility: visible; opacity: 1;',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-progress-bar' => '{{VALUE}}',
				],
			]
		);

        $this->add_control(
            'hfe_progress_bar_apply_globally',
            [
                'label' => __('Apply Setting', 'header-footer-elementor'),
                'type' => Controls_Manager::SELECT,
                'default' => 'globally',
                'options' => [
                    'globally' => __('Global', 'header-footer-elementor'),
                    'individually' => __('Individual', 'header-footer-elementor'),
                ],
                'frontend_available' => true,
				'render_type' => 'template',
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'hfe_progress_bar_global_display_condition',
            [
                'label' => __('Display On', 'header-footer-elementor'),
                'type' => Controls_Manager::SELECT2,
                'default' => ['post'],
                'options' => $this->query_post_types(),
                'multiple' => true,
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_apply_globally' => 'globally',
                ],
            ]
        );

        $this->add_control(
            'hfe_progress_bar_individually_notice',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => '<div style="color: #444;">'.__('Note: Please go to page settings and configure the feature settings individually.', 'header-footer-elementor').'</div>',
                'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_apply_globally' => 'individually',
                ],
            ]
        );

        $this->add_control(
            'hfe_progress_bar_type',
            [
                'label' => __('Type', 'header-footer-elementor'),
                'type' => Controls_Manager::SELECT,
                'default' => 'horizontal',
                'options' => [
                    'horizontal' => __('Horizontal', 'header-footer-elementor'),
                    'vertical' => __('Vertical', 'header-footer-elementor'),
                    'circle' => __('Circle', 'header-footer-elementor'),
                ],
                'frontend_available' => true,
				'render_type' => 'template',
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                ],
            ]
        );      

        // Start circle
		$this->add_control(
            'hfe_progress_bar_circle_position',
            [
                'label' => __('Position', 'header-footer-elementor'),
                'type' => Controls_Manager::SELECT,
                'default' => 'top-right',
                'options' => [
                    'top-right' => __('Top Right', 'header-footer-elementor'),
                    'top-left' => __('Top Left', 'header-footer-elementor'),
                    'bottom-right' => __('Bottom Right', 'header-footer-elementor'),
                    'bottom-left' => __('Bottom Left', 'header-footer-elementor'),
                ],
                'frontend_available' => true,
				'render_type' => 'template',
				'selectors_dictionary' => [
					'top-right' => 'top: 20px; right:20px; bottom: unset; left:unset',
					'top-left' => 'top: 20px; right: unset; bottom: unset; left:20px;',
					'bottom-right' => 'top: unset; right: 20px; bottom: 20px; left:unset;',
					'bottom-left' => 'top: unset; right: unset; bottom: 20px; left:20px;',
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => '{{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                ],
            ]
        );

		$this->add_responsive_control(
            'hfe_progress_bar_circle_size',
            [
				'label' => __( 'Size', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
                'frontend_available' => true,
				'size_units' => [ 'px' ],
				'desktop_default' => [
					'unit' => 'px'
				],
				'tablet_default' => [
					'unit' => 'px',
					'size' => 60
				],
				'mobile_default' => [
					'unit' => 'px',
					'size' => 60
				],
				'range' => [
					'px' => [
						'min' => 30,
						'max' => 150,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 60,
				],
				'selectors' => [
                    '{{WRAPPER}} .hm-crp-wrapper, {{WRAPPER}} .hm-circular-progress' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                ],
			]
        );

		$this->add_control(
			'hfe_progress_bar_circle_offset_heading',
			[
				'label' => __( 'Offset', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
                // 'separator' => 'before',
				'content_classes' => 'ha-rpb-circle-offset-heading',
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                ],
			]
		);
		// Start offset adjust
		$this->add_responsive_control(
			'hfe_progress_bar_circle_offset_x_tr',
			[
				'label' => __( 'Horizontal', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'separator' => 'before',
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 500,
						'step' => 1,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => 'right: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
					'hfe_progress_bar_circle_position' => 'top-right',
				]
			]
		);

		$this->add_responsive_control(
			'hfe_progress_bar_circle_offset_y_tr',
			[
				'label' => __( 'Vertical', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 500,
						'step' => 1
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => 'top: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                    'hfe_progress_bar_circle_position' => 'top-right',
				]
			]
		); //end top-right

        $this->add_responsive_control(
			'hfe_progress_bar_circle_offset_x_tl',
			[
				'label' => __( 'Horizontal', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'separator' => 'before',
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 500,
						'step' => 1,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => 'left: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
					'hfe_progress_bar_circle_position' => 'top-left',
				]
			]
		);

		$this->add_responsive_control(
			'hfe_progress_bar_circle_offset_y_tl',
			[
				'label' => __( 'Vertical', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 500,
						'step' => 1
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => 'top: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                    'hfe_progress_bar_circle_position' => 'top-left',
				]
			]
		); // end top-left
        
        $this->add_responsive_control(
			'hfe_progress_bar_circle_offset_x_br',
			[
				'label' => __( 'Horizontal', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'separator' => 'before',
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 500,
						'step' => 1,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => 'right: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
					'hfe_progress_bar_circle_position' => 'bottom-right',
				]
			]
		);

		$this->add_responsive_control(
			'hfe_progress_bar_circle_offset_y_br',
			[
				'label' => __( 'Vertical', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 500,
						'step' => 1
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => 'bottom: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                    'hfe_progress_bar_circle_position' => 'bottom-right',
				]
			]
		); // end bottom-right
        
        $this->add_responsive_control(
			'hfe_progress_bar_circle_offset_x_bl',
			[
				'label' => __( 'Horizontal', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'separator' => 'before',
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 500,
						'step' => 1,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => 'left: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
					'hfe_progress_bar_circle_position' => 'bottom-left',
				]
			]
		);

		$this->add_responsive_control(
			'hfe_progress_bar_circle_offset_y_bl',
			[
				'label' => __( 'Vertical', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => ['px'],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 500,
						'step' => 1
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 20,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper' => 'bottom: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                    'hfe_progress_bar_circle_position' => 'bottom-left',
				]
			]
		); // end bottom-left
		// End offset adjust

		$this->add_control(
			'hfe_progress_bar_circle_bg_color',
			[
				'label' => __('Circle Inner Background ', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
                'separator' => 'before',
				'default' => '',
				'selectors' => [
					'{{WRAPPER}} .hm-circular-progress' => 'background-color: {{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_type' => 'circle',
                    'hfe_progress_bar_enable' => 'yes',
                ],
			]
		);
		$this->add_control(
			'hfe_progress_bar_circle_fill_color',
			[
				'label' => __('Circle Fill Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'default' => '#e2498a',
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper .hm-circular-progress .hm-progress-circle' => 'stroke: {{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_type' => 'circle',
                    'hfe_progress_bar_enable' => 'yes',
                ],
			]
		);
		$this->add_responsive_control(
            'hfe_progress_bar_circle_fill_width',
            [
				'label' => __( 'Circle Fill Width', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
                'frontend_available' => true,
				'size_units' => [ 'px' ],
				'desktop_default' => [
					'unit' => 'px'
				],
				'tablet_default' => [
					'unit' => 'px',
					'size' => 5
				],
				'mobile_default' => [
					'unit' => 'px',
					'size' => 5
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 25,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 5,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper .hm-circular-progress .hm-progress-circle' => 'stroke-width: {{SIZE}}{{UNIT}}',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                ],
			]
        );
		$this->add_control(
			'hfe_progress_bar_circle_tracker_color',
			[
				'label' => __('Circle Bar Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'default' => '#e6e6e6',
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper .hm-circular-progress .hm-progress-background' => 'stroke: {{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_type' => 'circle',
                    'hfe_progress_bar_enable' => 'yes',
                ],
			]
		);
		$this->add_responsive_control(
            'hfe_progress_bar_circle_tracker_width',
            [
				'label' => __( 'Circle Bar Width', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
                'frontend_available' => true,
				'size_units' => [ 'px' ],
				'desktop_default' => [
					'unit' => 'px'
				],
				'tablet_default' => [
					'unit' => 'px',
					'size' => 5
				],
				'mobile_default' => [
					'unit' => 'px',
					'size' => 5
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 25,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 5,
				],
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper .hm-circular-progress .hm-progress-background' => 'stroke-width: {{SIZE}}{{UNIT}}',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                ],
			]
        );

		$this->add_control(
			'hm_rpb_percentage_heading',
			[
				'label' => __( 'Percentage', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                ],
			]
		);
		$this->add_control(
			'hfe_progress_bar_enable_circle_percentage',
			[
				'label'        => __( 'Disable Percentage', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'default'      => 'yes',
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
                'frontend_available' => true,
				'selectors_dictionary' => [
					''    => 'visibility: hidden; opacity: 0;',
					'yes' => 'visibility: visible; opacity: 1;',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-progress-bar .hm-progress-percent-text' => '{{VALUE}}',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                ],
			]
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'hm_rpb_circle_percentage_typography',
				'label' => __('Typography', 'header-footer-elementor'),
				'selector' => '{{WRAPPER}} .hm-crp-wrapper .hm-progress-percent-text',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
                    'hfe_progress_bar_enable_circle_percentage' => 'yes',
                ],
			]
		);
		$this->add_control(
			'chm_rpb_percentage_typography_color',
			[
				'label' => __('Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'default' => '#000000',
				'selectors' => [
					'{{WRAPPER}} .hm-crp-wrapper .hm-progress-percent-text' => 'color: {{VALUE}}',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'circle',
					'hfe_progress_bar_enable_circle_percentage' => 'yes',
                ],
			]
		);
        //End circle control

        // Start horizontal
        $this->add_control(
            'hfe_progress_bar_horizontal_position',
            [
                'label' => __('Position', 'header-footer-elementor'),
                'type' => Controls_Manager::SELECT,
                'default' => 'top',
                'options' => [
                    'top' => __('Top', 'header-footer-elementor'),
                    'bottom' => __('Bottom', 'header-footer-elementor'),
                ],
                'frontend_available' => true,
				'render_type' => 'template',
				'selectors_dictionary' => [
					'top' => 'top: 0; bottom: unset;',
					'bottom' => 'bottom: 0; top: unset;',
				],
				'selectors' => [
					'{{WRAPPER}} .hm-hrp-bar-container' => '{{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'horizontal',
                ],
            ]
        );

		$this->add_responsive_control(
            'hfe_progress_bar_horizontal_height',
            [
				'label' => __( 'Height', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
                'frontend_available' => true,
				'size_units' => [ 'px' ],
				'desktop_default' => [
					'unit' => 'px'
				],
				'tablet_default' => [
					'unit' => 'px',
					'size' => 8
				],
				'mobile_default' => [
					'unit' => 'px',
					'size' => 8
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 8,
				],
				'selectors' => [
                    '{{WRAPPER}} .hm-hrp-bar-container' => 'height: {{SIZE}}{{UNIT}};',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'horizontal',
                ],
			]
        );
		
		$this->add_responsive_control(
            'hfe_progress_bar_horizontal_offset_top',
            [
				'label' => __( 'Top Offset', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
                'frontend_available' => true,
				'size_units' => [ 'px' ],
				'desktop_default' => [
					'unit' => 'px'
				],
				'tablet_default' => [
					'unit' => 'px',
					'size' => 0
				],
				'mobile_default' => [
					'unit' => 'px',
					'size' => 0
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 500,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 0,
				],
				'selectors' => [
                    '{{WRAPPER}} .hm-hrp-bar-container' => 'top: {{SIZE}}{{UNIT}};',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'horizontal',
                    'hfe_progress_bar_horizontal_position' => 'top',
                ],
			]
        );
		$this->add_responsive_control(
            'hfe_progress_bar_horizontal_offset_bottom',
            [
				'label' => __( 'Bottom Offset', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
                'frontend_available' => true,
				'size_units' => [ 'px' ],
				'desktop_default' => [
					'unit' => 'px'
				],
				'tablet_default' => [
					'unit' => 'px',
					'size' => 0
				],
				'mobile_default' => [
					'unit' => 'px',
					'size' => 0
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 500,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 0,
				],
				'selectors' => [
                    '{{WRAPPER}} .hm-hrp-bar-container' => 'bottom: {{SIZE}}{{UNIT}};',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'horizontal',
                    'hfe_progress_bar_horizontal_position' => 'bottom',
                ],
			]
        );

		$this->add_control(
			'hm_rpb_horizontal_fill_heading',
			[
				'label' => __( 'Fill Color', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'horizontal',
                ],
			]
		);
		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name' => 'hfe_progress_bar_horizontal_fill_color',
				'label' => __('Fill Color', 'header-footer-elementor'),
				'types' => [ 'classic', 'gradient' ],
				'exclude' => ['image'],
				'selector' => '{{WRAPPER}} .hm-hrp-bar-container .hm-hrp-bar',
                'condition' => [
                    'hfe_progress_bar_type' => 'horizontal',
                    'hfe_progress_bar_enable' => 'yes',
                ],
				'fields_options' => [
					'background' => [
						'default' => 'classic',
					],
					'color' => [
						'default' => '#e2498a',
					],
					'gradient' => [
						'default' => [
							'color' => '#ff0000',
							'color_b' => '#00ff00',
							'type' => 'linear',
							'angle' => 180,
						],
					],
				],
			]
		);

		$this->add_control(
			'hm_rpb_horizontal_bar_heading',
			[
				'label' => __( 'Bar Color', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'horizontal',
                ],
			]
		);
        $this->add_control(
			'hfe_progress_bar_horizontal_bg_color',
			[
				'label' => __('Background Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hm-hrp-bar-container' => 'background-color: {{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_type' => 'horizontal',
                    'hfe_progress_bar_enable' => 'yes',
                ],
			]
		); 
		
		$this->add_control(
			'hm_rpb_horizontal_percentage_heading',
			[
				'label' => __( 'Percentage Tool Tip', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'horizontal',
                ],
			]
		);
		$this->add_control(
			'hfe_progress_bar_enable_horizontal_percentage',
			[
				'label'        => __( 'Disable Percentage Tool Tip', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'default'      => 'yes',
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
                'frontend_available' => true,
				'selectors_dictionary' => [
					''    => 'visibility: hidden; opacity: 0;',
					'yes' => 'visibility: visible; opacity: 1;',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-progress-bar .hm-hrp-bar .hm-tool-tip' => '{{VALUE}}',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'horizontal',
                ],
			]
		);
		$this->add_control(
			'hfe_progress_bar_horizontal_percentage_text_color',
			[
				'label' => __('Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hm-hrp-bar-container .hm-hrp-bar .hm-tool-tip' => 'color: {{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_type' => 'horizontal',
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_enable_horizontal_percentage' => 'yes',
                ],
			]
		);
		$this->add_control(
			'hfe_progress_bar_horizontal_percentage_bg_color',
			[
				'label' => __('Background Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hm-hrp-bar-container .hm-hrp-bar .hm-tool-tip' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .hm-hrp-bar-container .hm-hrp-bar .hm-tool-tip-top:after' => 'border-color: transparent transparent {{VALUE}} transparent;',
					'{{WRAPPER}} .hm-hrp-bar-container .hm-hrp-bar .hm-tool-tip-bottom:after' => 'border-color: {{VALUE}} transparent transparent transparent',
				],
                'condition' => [
                    'hfe_progress_bar_type' => 'horizontal',
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_enable_horizontal_percentage' => 'yes',
                ],
			]
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'hfe_progress_bar_horizontal_percentage_typography',
				'label' => __('Typography', 'header-footer-elementor'),
				'selector' => '{{WRAPPER}} .hm-hrp-bar-container .hm-hrp-bar .hm-tool-tip',
				'condition' => [
                    'hfe_progress_bar_type' => 'horizontal',
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_enable_horizontal_percentage' => 'yes',
                ],
			]
		);
		// End Horizontal

        
        // Start vertical
		$this->add_control(
            'hfe_progress_bar_vertical_position',
            [
                'label' => __('Position', 'header-footer-elementor'),
                'type' => Controls_Manager::SELECT,
                'default' => 'right',
                'options' => [
                    'right' => __('Right', 'header-footer-elementor'),
                    'left' => __('Left', 'header-footer-elementor'),
                ],
                'frontend_available' => true,
				'selectors_dictionary' => [
					'right' => 'right: 0; top:0; left: unset;',
					'left' => 'left: 0; top:0; right: unset;',
				],
				'selectors' => [
					'{{WRAPPER}} .hm-vrp-bar-container' => '{{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'vertical',
                ],
            ]
        );
		$this->add_responsive_control(
            'hfe_progress_bar_vertical_width',
            [
				'label' => __( 'Width', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
                'frontend_available' => true,
				'size_units' => [ 'px' ],
				'desktop_default' => [
					'unit' => 'px'
				],
				'tablet_default' => [
					'unit' => 'px',
					'size' => 8
				],
				'mobile_default' => [
					'unit' => 'px',
					'size' => 8
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
                'default' => [
					'unit' => 'px',
					'size' => 8,
				],
				'selectors' => [
                    '{{WRAPPER}} .hm-vrp-bar-container' => 'width: {{SIZE}}{{UNIT}};',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'vertical',
                ],
			]
        );
		$this->add_control(
			'hm_rpb_vertical_fill_heading',
			[
				'label' => __( 'Fill Color', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'vertical',
                ],
			]
		);
		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name' => 'hfe_progress_bar_vertical_fill_color',
				'label' => __('Fill Color', 'header-footer-elementor'),
				'types' => [ 'classic', 'gradient' ],
				'exclude' => ['image'],
				'selector' => '{{WRAPPER}} .hm-vrp-bar-container .hm-vrp-bar',
                'condition' => [
					'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'vertical',
                ],
				'fields_options' => [
					'background' => [
						'default' => 'classic',
					],
					'color' => [
						'default' => '#e2498a',
					],
					'gradient' => [
						'default' => [
							'color' => '#ff0000',
							'color_b' => '#00ff00',
							'type' => 'linear',
							'angle' => 180,
						],
					],
				],
			]
		);

		$this->add_control(
			'hm_rpb_vertical_bar_heading',
			[
				'label' => __( 'Bar Color', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'vertical',
                ],
			]
		);
        $this->add_control(
			'hfe_progress_bar_vertical_bg_color',
			[
				'label' => __('Background Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hm-vrp-bar-container' => 'background-color: {{VALUE}}',
				],
                'condition' => [
					'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_type' => 'vertical',
                ],
			]
		);

		$this->end_controls_section();
    }

    private function query_post_types () {
        $post_types = get_post_types( [ 'public' => true ], 'objects' );
        $options = [];

        foreach ( $post_types as $post_type ) {
			if($post_type->name == 'post' || $post_type->name == 'page') {
				$options[ $post_type->name ] = $post_type->label;
			}
        }
	
		return $options;
    }

}