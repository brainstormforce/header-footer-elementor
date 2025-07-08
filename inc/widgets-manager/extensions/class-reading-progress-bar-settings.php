<?php
/**
 * Reading Progress Bar settings
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Extensions;

use Elementor\Controls_Manager;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
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
	 * Get help URL
	 *
	 * Retrieve the help URL for the Reading Progress Bar extension.
	 *
	 * @since 2.4.4
	 * @access public
	 *
	 * @return string The complete URL to the help page for the extension.
	 */
	public function get_custom_help_url() {
		return 'https://ultimateelementor.com/docs/reading-progress-bar-extension/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation';
	}

	/**
	 * Help url
	 */
	public function get_help_url() {
		return $this->get_custom_help_url();
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

		 // Get all public post types
		$post_types = get_post_types(
			[
				'public' => true,
			],
			'objects'
		);

		$post_type_options = [
			'all' => __( 'Entire Website', 'header-footer-elementor' ),
		];

		foreach ( $post_types as $post_type ) {
			// Skip attachment post type
			if ( $post_type->name !== 'attachment' ) {
				$post_type_options[ $post_type->name ] = html_entity_decode( $post_type->label );
			}
		}

		$this->add_control(
			'hfe_reading_progress_display_on',
			[
				'label'       => __( 'Display On', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT2,
				'default'     => 'all',
				'options'     => $post_type_options,
				'multiple'    => true,
				'label_block' => true,
				'condition'   => [
					'hfe_reading_progress_enable' => 'yes',
				],
				'description' => __( 'Select "All Pages" or choose specific post types. If "All Pages" is selected along with specific post types, the progress bar will appear on all pages.', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'hfe_reading_progress_position',
			[
				'label'     => __( 'Position', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'top',
				'options'   => [
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
				'default'   => '#6A21A7',
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
				'default'    => [
					'unit' => 'px',
					'size' => 4,
				],
				'selectors'  => [
					'.hfe-reading-progress-bar' => 'height: {{SIZE}}{{UNIT}}',
				],
				'condition'  => [
					'hfe_reading_progress_enable' => 'yes',
				],
			]
		);

		$this->add_control(
			'hfe_reading_progress_offset_top',
			[
				'label'       => __( 'Offset', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SLIDER,
				'size_units'  => [ 'px' ],
				'range'       => [
					'px' => [
						'min'  => 0,
						'max'  => 50,
						'step' => 1,
					],
				],
				'default'     => [
					'unit' => 'px',
					'size' => 0,
				],
				'selectors'   => [
					'.hfe-reading-progress' => 'top: {{SIZE}}{{UNIT}}',
				],
				'condition'   => [
					'hfe_reading_progress_enable'   => 'yes',
					'hfe_reading_progress_position' => 'top',
				],
				'description' => __( 'Set offset value to 0 or greater to ensure the progress bar is visible.', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'hfe_reading_progress_offset_bottom',
			[
				'label'       => __( 'Offset', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SLIDER,
				'size_units'  => [ 'px' ],
				'range'       => [
					'px' => [
						'min'  => 0,
						'max'  => 50,
						'step' => 1,
					],
				],
				'default'     => [
					'unit' => 'px',
					'size' => 0,
				],
				'selectors'   => [
					'.hfe-reading-progress' => 'bottom: {{SIZE}}{{UNIT}}',
				],
				'condition'   => [
					'hfe_reading_progress_enable'   => 'yes',
					'hfe_reading_progress_position' => 'bottom',
				],
				'description' => __( 'Set offset value to 0 or greater to ensure the progress bar is visible.', 'header-footer-elementor' ),
			]
		);

	   

		$this->end_controls_section();
	}
}
