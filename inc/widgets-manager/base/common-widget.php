<?php
/**
 * HFECommon Widget.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Base;

use Elementor\Widget_Base;
use HFE\WidgetsManager\Base\HFE_Helper;
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
		return [ 'hfe-widgets' ];
	}

	/**
	 * Get widget slug
	 *
	 * @param string $slug Module slug.
	 * @since 0.0.1
	 */
	public function get_widget_slug( $slug = '' ) {
		return HFE_Helper::get_widget_slug( $slug );
	}

	/**
	 * Get widget title
	 *
	 * @param string $slug Module slug.
	 * @since 0.0.1
	 */
	public function get_widget_title( $slug = '' ) {
		return HFE_Helper::get_widget_title( $slug );
	}

	/**
	 * Get widget icon
	 *
	 * @param string $slug Module slug.
	 * @since 0.0.1
	 */
	public function get_widget_icon( $slug = '' ) {
		return HFE_Helper::get_widget_icon( $slug );
	}

	/**
	 * Get widget keywords
	 *
	 * @param string $slug Module slug.
	 * @since 1.5.1
	 */
	public function get_widget_keywords( $slug = '' ) {
		return HFE_Helper::get_widget_keywords( $slug );
	}

	/**
	 * Is internal link
	 *
	 * @since 1.0.0
	 */
	public function is_internal_links() {
		return HFE_Helper::is_internal_links();
	}
}
