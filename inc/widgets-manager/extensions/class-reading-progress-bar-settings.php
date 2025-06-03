<?php
/**
 * Reading Progress Bar settings
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Extensions;

use Elementor\Controls_Manager;
use Elementor\Core\Kits\Documents\Tabs\Tab_Base;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * HFE Reading Progress Bar extension settings
 */
class Reading_Progress_Bar_Settings extends Tab_Base {

    /**
     * Retrieve tab id
     *
     * @return string
     */
    public function get_id() {
        return 'hfe-reading-progress-bar';
    }

    /**
     * Retrieve tab title
     *
     * @return string
     */
    public function get_title() {
        return __( 'Reading Progress Bar', 'header-footer-elementor' );
    }

    /**
     * Retrieve tab icon
     *
     * @return string
     */
    public function get_icon() {
        return 'hfe-icon-progress-bar';
    }

    /**
     * Help url
     */
    public function get_help_url() {
        return '';
    }

    /**
     * Group name
     *
     * @return string
     */
    public function get_group() {
        return 'settings';
    }

    /**
     * Register controls
     */
    protected function register_tab_controls() {
        $this->start_controls_section(
            'hfe_reading_progress_section',
            [
                'tab'   => 'hfe-reading-progress-bar',
                'label' => __( 'Reading Progress Bar', 'header-footer-elementor' ),
            ]
        );

        $this->add_control(
            'hfe_reading_progress_enable',
            [
                'type'      => Controls_Manager::SWITCHER,
                'label'     => __( 'Enable Reading Progress Bar', 'header-footer-elementor' ),
                'default'   => '',
                'label_on'  => __( 'Yes', 'header-footer-elementor' ),
                'label_off' => __( 'No', 'header-footer-elementor' ),
            ]
        );

        $this->add_control(
            'hfe_reading_progress_position',
            [
                'label'   => __( 'Position', 'header-footer-elementor' ),
                'type'    => Controls_Manager::SELECT,
                'default' => 'top',
                'options' => [
                    'top'    => __( 'Top', 'header-footer-elementor' ),
                    'bottom' => __( 'Bottom', 'header-footer-elementor' ),
                ],
                'condition' => [
                    'hfe_reading_progress_enable' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'hfe_reading_progress_color',
            [
                'label'     => __( 'Color', 'header-footer-elementor' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '.hfe-reading-progress-bar' => 'background-color: {{VALUE}}',
                ],
                'condition' => [
                    'hfe_reading_progress_enable' => 'yes',
                ],
            ]
        );

        $this->add_control(
            'hfe_reading_progress_height',
            [
                'label'      => __( 'Height', 'header-footer-elementor' ),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => [ 'px' ],
                'range'      => [
                    'px' => [
                        'min'  => 1,
                        'max'  => 50,
                        'step' => 1,
                    ],
                ],
                'selectors'  => [
                    '.hfe-reading-progress-bar' => 'height: {{SIZE}}{{UNIT}}',
                ],
                'condition'  => [
                    'hfe_reading_progress_enable' => 'yes',
                ],
            ]
        );

        $this->end_controls_section();
    }
}
