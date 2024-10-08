<?php
/**
 * UAEL Config.
 *
 * @package UAEL
 */
namespace HFE\WidgetsManager\Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Widgets_Config.
 */
class Widgets_Config {

	/**
	 * Widget List
	 *
	 * @var widget_list
	 */
	public static $widget_list = null;

	/**
	 * Get Widget List.
	 *
	 * @since 0.0.1
	 *
	 * @return array The Widget List.
	 */
	public static function get_widget_list() {

		self::$widget_list = array(
			'Retina'    => array(
				'slug'      => 'retina',
				'title'     => __( 'Retina Image', 'uael' ),
				'keywords'  => array( 'uael', 'heading', 'advanced' ),
				'icon'      => 'hfe-icon-retina-image',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			// 'Copyright'    => array(
			// 	'slug'      => 'copyright',
			// 	'title'     => __( 'Copyright', 'uael' ),
			// 	'keywords'  => array( 'uael', 'copyright', 'advanced' ),
			// 	'icon'      => 'hfe-icon-copyright-widget',
			// 	'title_url' => '#',
			// 	'default'   => true,
			// 	'doc_url'   => '',
			// ),
		);

		return self::$widget_list;
	}

}
