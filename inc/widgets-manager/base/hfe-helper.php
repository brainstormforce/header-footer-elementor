<?php
/**
 * HFEHelper.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use Elementor\Plugin;
use Elementor\Utils;
use Elementor\Widget_Base;
use HFE\WidgetsManager\Base\Widgets_Config;

/**
 * Class HFE_Helper.
 */
class HFE_Helper {

	/**
	 * Widget Options
	 *
	 * @var widget_options
	 */
	private static $widget_options = null;

	/**
	 * Widget List
	 *
	 * @var widget_list
	 */
	private static $widget_list = null;

	/**
	 * Widget List
	 *
	 * @var widget_list
	 */
	private static $all_widget_list = null;

	/**
	 * Provide General settings array().
	 *
	 * @since 0.0.1
	 * @return array()
	 */
	public static function get_widget_list() {

		if ( ! isset( self::$widget_list ) ) {
			self::$widget_list = Widgets_Config::get_widget_list();
		}

		return apply_filters( 'hfe_widget_list', self::$widget_list );
	}

	/**
	 * Provide General settings array().
	 *
	 * @since 0.0.1
	 * @return array()
	 */
	public static function get_all_widgets_list() {
		if ( ! isset( self::$all_widgets_list ) ) {
			self::$all_widgets_list = Widgets_Config::get_all_widgets();
		}
		return apply_filters( 'hfe_all_widgets_list', self::$all_widgets_list );
	}

	/**
	 * Provide Widget Name
	 *
	 * @param string $slug Module slug.
	 * @return string
	 * @since 0.0.1
	 */
	public static function get_widget_slug( $slug = '' ) {

		if ( ! isset( self::$widget_list ) ) {
			self::$widget_list = self::get_widget_list();
		}

		$widget_slug = '';

		if ( isset( self::$widget_list[ $slug ] ) ) {
			$widget_slug = self::$widget_list[ $slug ]['slug'];
		}

		return apply_filters( 'hfe_widget_slug', $widget_slug );
	}

	/**
	 * Provide Widget Name
	 *
	 * @param string $slug Module slug.
	 * @return string
	 * @since 0.0.1
	 */
	public static function get_widget_title( $slug = '' ) {

		if ( ! isset( self::$widget_list ) ) {
			self::$widget_list = self::get_widget_list();
		}

		$widget_name = '';

		if ( isset( self::$widget_list[ $slug ] ) ) {
			$widget_name = self::$widget_list[ $slug ]['title'];
		}

		return apply_filters( 'hfe_widget_name', $widget_name );
	}

	/**
	 * Provide Widget Name
	 *
	 * @param string $slug Module slug.
	 * @return string
	 * @since 0.0.1
	 */
	public static function get_widget_icon( $slug = '' ) {

		if ( ! isset( self::$widget_list ) ) {
			self::$widget_list = self::get_widget_list();
		}

		$widget_icon = '';

		if ( isset( self::$widget_list[ $slug ] ) ) {
			$widget_icon = self::$widget_list[ $slug ]['icon'];
		}

		return apply_filters( 'hfe_widget_icon', $widget_icon );
	}

	/**
	 * Provide Widget Keywords
	 *
	 * @param string $slug Module slug.
	 * @return string
	 * @since 1.5.1
	 */
	public static function get_widget_keywords( $slug = '' ) {

		if ( ! isset( self::$widget_list ) ) {
			self::$widget_list = self::get_widget_list();
		}

		$widget_keywords = '';

		if ( isset( self::$widget_list[ $slug ] ) && isset( self::$widget_list[ $slug ]['keywords'] ) ) {
			$widget_keywords = self::$widget_list[ $slug ]['keywords'];
		}

		return apply_filters( 'hfe_widget_keywords', $widget_keywords );
	}

	/**
	 * Provide Widget settings.
	 *
	 * @return array()
	 * @since 0.0.1
	 */
	public static function get_widget_options() {

		if ( null === self::$widget_options ) {

			if ( ! isset( self::$widget_list ) ) {
				$widgets = self::get_widget_list();
			} else {
				$widgets = self::$widget_list;
			}

			$saved_widgets = self::get_admin_settings_option( '_hfe_widgets' );

			if ( is_array( $widgets ) ) {

				foreach ( $widgets as $slug => $data ) {

					if ( isset( $saved_widgets[ $slug ] ) ) {

						if ( 'disabled' === $saved_widgets[ $slug ] ) {
							$widgets[ $slug ]['is_activate'] = false;
						} else {
							$widgets[ $slug ]['is_activate'] = true;
						}
					} else {
						$widgets[ $slug ]['is_activate'] = ( isset( $data['default'] ) ) ? $data['default'] : false;
					}
				}
			}

			self::$widget_options = $widgets;
		}
		return apply_filters( 'hfe_enabled_widgets', self::$widget_options );
	}

	/**
	 * Returns an option from the database for
	 * the admin settings page.
	 *
	 * @param  string  $key     The option key.
	 * @param  mixed   $default Option default value if option is not available.
	 * @param  boolean $network_override Whether to allow the network admin setting to be overridden on subsites.
	 * @return string           Return the option value
	 */
	public static function get_admin_settings_option( $key, $default = false, $network_override = false ) {

		// Get the site-wide option if we're in the network admin.
		if ( $network_override && is_multisite() ) {
			$value = get_site_option( $key, $default );
		} else {
			$value = get_option( $key, $default );
		}

		return $value;
	}

	/**
	 * Widget Active.
	 *
	 * @param string $slug Module slug.
	 * @return string
	 * @since 0.0.1
	 */
	public static function is_widget_active( $slug = '' ) {

		$widgets     = self::get_widget_options();
		$is_activate = false;

		if ( isset( $widgets[ $slug ] ) ) {
			$is_activate = $widgets[ $slug ]['is_activate'];
		}

		return $is_activate;
	}

}