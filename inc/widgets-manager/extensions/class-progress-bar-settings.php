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
				'tab'   => 'hfe-progress-bar-settings',
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
                'default' => ['post', 'page'],
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
					'{{WRAPPER}} .hfe-progress-bar-container' => '{{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
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
                    '{{WRAPPER}} .hfe-progress-bar-container' => 'height: {{SIZE}}{{UNIT}};',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
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
                    '{{WRAPPER}} .hfe-progress-bar-container' => 'top: {{SIZE}}{{UNIT}};',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
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
                    '{{WRAPPER}} .hfe-progress-bar-container' => 'bottom: {{SIZE}}{{UNIT}};',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_horizontal_position' => 'bottom',
                ],
			]
        );

		$this->add_control(
			'hfe_progress_bar_horizontal_fill_heading',
			[
				'label' => __( 'Fill Color', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
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
				'selector' => '{{WRAPPER}} .hfe-progress-bar-container .hfe-progress-bar',
                'condition' => [
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
			'hfe_progress_bar_horizontal_bar_heading',
			[
				'label' => __( 'Bar Color', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                ],
			]
		);
        $this->add_control(
			'hfe_progress_bar_horizontal_bg_color',
			[
				'label' => __('Background Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-progress-bar-container' => 'background-color: {{VALUE}}',
				],
                'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                ],
			]
		); 
		
		$this->add_control(
			'hfe_progress_bar_horizontal_percentage_heading',
			[
				'label' => __( 'Percentage Tool Tip', 'header-footer-elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'after',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
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
					'{{WRAPPER}} .hfe-progress-bar .hfe-progress-bar .hfe-tool-tip' => '{{VALUE}}',
				],
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                ],
			]
		);
		$this->add_control(
			'hfe_progress_bar_horizontal_percentage_text_color',
			[
				'label' => __('Color', 'header-footer-elementor'),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-progress-bar-container .hfe-progress-bar .hfe-tool-tip' => 'color: {{VALUE}}'
				],
                'condition' => [
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
					'{{WRAPPER}} .hfe-progress-bar-container .hfe-progress-bar .hfe-tool-tip' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .hfe-progress-bar-container .hfe-progress-bar .hfe-tool-tip-top:after' => 'border-color: transparent transparent {{VALUE}} transparent;',
					'{{WRAPPER}} .hfe-progress-bar-container .hfe-progress-bar .hfe-tool-tip-bottom:after' => 'border-color: {{VALUE}} transparent transparent transparent',
				],
                'condition' => [
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
				'selector' => '{{WRAPPER}} .hfe-progress-bar-container .hfe-progress-bar .hfe-tool-tip',
				'condition' => [
                    'hfe_progress_bar_enable' => 'yes',
                    'hfe_progress_bar_enable_horizontal_percentage' => 'yes',
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