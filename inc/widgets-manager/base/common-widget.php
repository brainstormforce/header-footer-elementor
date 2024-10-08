<?php
/**
 * UAEL Common Widget.
 *
 * @package UAEL
 */

namespace HFE\WidgetsManager\Base;

use Elementor\Widget_Base;
use UltimateElementor\Classes\UAEL_Helper;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Common Widget
 *
 * @since 0.0.1
 */
abstract class Common_Widget extends Widget_Base {

	/**
	 * Get categories
	 *
	 * @since 0.0.1
	 */
	public function get_categories() {
		return array( 'ultimate-elements' );
	}

	/**
	 * Get widget slug
	 *
	 * @param string $slug Module slug.
	 * @since 0.0.1
	 */
	public function get_widget_slug( $slug = '' ) {
		return UAEL_Helper::get_widget_slug( $slug );
	}

	/**
	 * Get widget title
	 *
	 * @param string $slug Module slug.
	 * @since 0.0.1
	 */
	public function get_widget_title( $slug = '' ) {
		return UAEL_Helper::get_widget_title( $slug );
	}

	/**
	 * Get widget icon
	 *
	 * @param string $slug Module slug.
	 * @since 0.0.1
	 */
	public function get_widget_icon( $slug = '' ) {
		return UAEL_Helper::get_widget_icon( $slug );
	}

	/**
	 * Get widget keywords
	 *
	 * @param string $slug Module slug.
	 * @since 1.5.1
	 */
	public function get_widget_keywords( $slug = '' ) {
		return UAEL_Helper::get_widget_keywords( $slug );
	}

	/**
	 * Is internal link
	 *
	 * @since 1.0.0
	 */
	public function is_internal_links() {
		return UAEL_Helper::is_internal_links();
	}

	/**
	 * Presets control
	 *
	 * @param string $slug Widget slug.
	 * @param string $widget Widget name.
	 * @since 1.33.0
	 */
	public function register_presets_control( $slug, $widget ) {

		if ( UAEL_Helper::is_widget_active( 'Presets' ) ) {

			$options       = array();
			$options['']   = __( 'Default', 'uael' );
			$presets_count = UAEL_Helper::get_widget_presets( $slug );

			for ( $i = 1; $i <= $presets_count; $i++ ) {
				// translators: %d Preset number.
				$options[ 'preset-' . $i ] = sprintf( __( 'Preset %d', 'uael' ), $i );
			}

			$widget->start_controls_section(
				'section_presets',
				array(
					'label' => __( 'Presets', 'uael' ),
					'tab'   => Controls_Manager::TAB_CONTENT,
				)
			);

			$widget->add_control(
				'presets_options',
				array(
					'label'   => __( 'Choose Preset', 'uael' ),
					'type'    => 'uael-presets-select',
					'options' => $options,
				)
			);

			$widget->add_control(
				'default_preset_note',
				array(
					'type'            => Controls_Manager::RAW_HTML,
					'raw'             => sprintf(
						/* translators: 1: <b> 2: </b> 3: </br> */
						__( '%1$sNote:%2$s %3$s 1. Choosing a preset will reset all Style settings for this widget. %3$s 2. Choosing \'default\' option after switching between preset options will change the default view of the widget.', 'uael' ),
						'<b>',
						'</b>',
						'</br>'
					),
					'content_classes' => 'uael-editor-doc',
				)
			);

			$widget->end_controls_section();
		}
	}
}
