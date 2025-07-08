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
use Elementor\Modules\Usage\Module as Usage_Module;

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
	private static $pro_widget_list = null;

	/**
	 * Widget List
	 *
	 * @var widget_list
	 */
	private static $all_widgets_list = null;

	/**
	 * Plugins List
	 *
	 * @var get_bsf_plugins_list
	 */
	private static $get_bsf_plugins_list = null;

	/**
	 * Check if UAE Pro is active.
	 *
	 * @since 2.2.1
	 * @return bool
	 */
	public static function is_pro_active() {
		if ( is_plugin_active( 'ultimate-elementor/ultimate-elementor.php' ) && defined( 'UAEL_PRO' ) && UAEL_PRO ) {
			return true;
		}
		return false;
	}

	/**
	 * Provide General settings array().
	 *
	 * @since 2.2.1
	 * @return array()
	 */
	public static function premium_starter_templates_status() {

		$st_pro_status = Widgets_Config::get_plugin_status( 'astra-pro-sites/astra-pro-sites.php' );

		return $st_pro_status;
	}

	/**
	 * Provide General settings array().
	 *
	 * @since 2.2.1
	 * @return array()
	 */
	public static function free_starter_templates_status() {
		$free_status = Widgets_Config::get_plugin_status( 'astra-sites/astra-sites.php' );
		return $free_status;
	}

	/**
	 * Provide General settings array().
	 *
	 * @since 2.2.1
	 * @return array()
	 */
	public static function starter_templates_status() {

		$st_pro_status = self::premium_starter_templates_status();
		$free_status   = self::free_starter_templates_status();

		if ( 'Activated' !== $free_status && ( 'Installed' === $st_pro_status || 'Activated' === $st_pro_status ) ) {
			return $st_pro_status;
		}

		return $free_status;
	}

	/**
	 * Provide General settings array().
	 *
	 * @since 2.2.1
	 * @return array()
	 */
	public static function starter_templates_link() {

		if ( is_plugin_active( 'astra-sites/astra-sites.php' ) || is_plugin_active( 'astra-pro-sites/astra-pro-sites.php' ) ) {
			return admin_url( 'themes.php?page=starter-templates' );
		}

		return '';
	}

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

		return apply_filters( 'hfe_widgets_list', self::$widget_list );
	}
	
	/**
	 * Provide General settings array().
	 *
	 * @since 0.0.1
	 * @return array()
	 */
	public static function get_pro_widget_list() {

		if ( ! isset( self::$pro_widget_list ) ) {
			self::$pro_widget_list = Widgets_Config::get_pro_widget_list();
		}

		return apply_filters( 'hfe_pro_widgets_list', self::$pro_widget_list );
	}

	/**
	 * Provide General settings array().
	 *
	 * @since 0.0.1
	 * @return array()
	 */
	public static function get_all_widgets_list() {
		if ( ! isset( self::$all_widgets_list ) ) {
			self::$all_widgets_list = self::get_widget_options() + self::get_pro_widget_list();
		}
		return apply_filters( 'hfe_all_widgets_list', self::$all_widgets_list );
	}

	/**
	 * Provide General settings array().
	 *
	 * @since 2.2.1
	 * @return array()
	 */
	public static function get_bsf_plugins_list() {

		if ( ! isset( self::$get_bsf_plugins_list ) ) {
			self::$get_bsf_plugins_list = Widgets_Config::get_bsf_plugins();
		}

		return apply_filters( 'uael_plugins_list', self::$get_bsf_plugins_list );
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
	 * Updates an option from the admin settings page.
	 *
	 * @param string $key       The option key.
	 * @param mixed  $value     The value to update.
	 * @param bool   $network   Whether to allow the network admin setting to be overridden on subsites.
	 * @return mixed
	 */
	public static function update_admin_settings_option( $key, $value, $network = false ) {

		// Update the site-wide option since we're in the network admin.
		if ( $network && is_multisite() ) {
			update_site_option( $key, $value );
		} else {
			update_option( $key, $value );
		}

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

	/**
	 * Get Rollback versions.
	 *
	 * @since 1.23.0
	 * @return array
	 * @access public
	 */
	public static function get_rollback_versions_options() {

		$rollback_versions = self::get_rollback_versions();

		$rollback_versions_options = [];

		foreach ( $rollback_versions as $version ) {

			$version = [
				'label' => $version,
				'value' => $version,

			];

			$rollback_versions_options[] = $version;
		}

		return $rollback_versions_options;
	}

	/**
	 * Get Rollback versions.
	 *
	 * @since 2.2.1
	 * @return array
	 * @access public
	 */
	public static function get_rollback_versions() {

		$rollback_versions = get_transient( 'hfe_rollback_versions_' . HFE_VER );

		if ( empty( $rollback_versions ) ) {

			$max_versions = 10;

			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';

			$plugin_information = plugins_api(
				'plugin_information',
				[
					'slug' => 'header-footer-elementor',
				]
			);

			if ( empty( $plugin_information->versions ) || ! is_array( $plugin_information->versions ) ) {
				return [];
			}

			krsort( $plugin_information->versions );

			$rollback_versions = [];

			foreach ( $plugin_information->versions as $version => $download_link ) {

				$lowercase_version = strtolower( $version );

				$is_valid_rollback_version = ! preg_match( '/(trunk|beta|rc|dev)/i', $lowercase_version );

				if ( ! $is_valid_rollback_version ) {
					continue;
				}

				if ( version_compare( $version, HFE_VER, '>=' ) ) {
					continue;
				}

				$rollback_versions[] = $version;
			}

			usort(
				$rollback_versions,
				function( $prev, $next ) {
					if ( version_compare( $prev, $next, '==' ) ) {
						return 0;
					}
		
					if ( version_compare( $prev, $next, '>' ) ) {
						return -1;
					}
		
					return 1;
				} 
			);

			$rollback_versions = array_slice( $rollback_versions, 0, $max_versions, true );

			set_transient( 'hfe_rollback_versions_' . HFE_VER, $rollback_versions, WEEK_IN_SECONDS );
		}

		return $rollback_versions;
	}

	/**
	 * Get Unused Widgets.
	 *
	 * @since 2.4.2
	 * @return array
	 * @access public
	 */
	public static function get_used_widget() {
		/** @var Usage_Module $usage_module */
		$usage_module = Usage_Module::instance();
		$usage_module->recalc_usage();

		$widgets_usage = [];

		foreach ( $usage_module->get_formatted_usage( 'raw' ) as $data ) {
			foreach ( $data['elements'] as $element => $count ) {
				$widgets_usage[ $element ] = isset( $widgets_usage[ $element ] ) ? $widgets_usage[ $element ] + $count : $count;
			}
		}

		$allowed_widgets = [
			'hfe-breadcrumbs-widget',
			'hfe-cart',
			'copyright',
			'navigation-menu',
			'page-title',
			'post-info-widget',
			'retina',
			'hfe-search-button',
			'site-logo',
			'hfe-site-tagline',
			'hfe-site-title',
			'hfe-infocard',
		];

		// Filter widgets usage to include only allowed widgets
		$filtered_widgets_usage = array_filter(
			$widgets_usage,
			function ( $key ) use ( $allowed_widgets ) {
				return in_array( $key, $allowed_widgets, true );
			},
			ARRAY_FILTER_USE_KEY
		);

		return $filtered_widgets_usage;
	}

	/**
	 * Get widget help URL
	 *
	 * Retrieve the help URL for a specific widget.
	 *
	 * @since 2.4.3
	 * @access public
	 *
	 * @param string $widget_name Widget name.
	 * @return string Widget help URL.
	 */
	public static function get_widget_help_url( $widget_name = '' ) {
		if ( empty( $widget_name ) ) {
			return '';
		}

		if ( ! isset( self::$widget_list ) ) {
			self::$widget_list = self::get_widget_list();
		}

		// Convert widget name to config key format
		$widget_key = '';
		foreach ( self::$widget_list as $key => $widget_data ) {
			if ( isset( $widget_data['slug'] ) && $widget_data['slug'] === $widget_name ) {
				$widget_key = $key;
				break;
			}
		}

		if ( empty( $widget_key ) || ! isset( self::$widget_list[ $widget_key ]['doc_url'] ) ) {
			return '';
		}

		$help_url = self::$widget_list[ $widget_key ]['doc_url'];

		// Ensure we have a valid URL
		$help_url = empty( $help_url ) ? '' : $help_url;

		return apply_filters( 'hfe_widget_help_url', $help_url, $widget_name );
	}

}
