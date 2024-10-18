<?php
/**
 * WPML Compatibility for Header Footer Elementor.
 *
 * @package     HFE
 * @author      HFE
 * @copyright   Copyright (c) 2018, HFE
 * @link        http://brainstormforce.com/
 * @since       HFE 1.0.9
 */

defined( 'ABSPATH' ) || exit;

/**
 * Set up WPML Compatibiblity Class.
 */
class HFE_WPML_Compatibility {
	/**
	 * Instance of HFE_WPML_Compatibility.
	 *
	 * @since  1.0.9
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Setup actions and filters.
	 *
	 * @since  1.0.9
	 */
	private function __construct() {
		add_filter( 'hfe_get_settings_type_header', [ $this, 'get_wpml_object' ] );
		add_filter( 'hfe_get_settings_type_footer', [ $this, 'get_wpml_object' ] );
		add_filter( 'hfe_get_settings_type_before_footer', [ $this, 'get_wpml_object' ] );
		add_filter( 'hfe_render_template_id', [ $this, 'get_wpml_object' ] );
	}

	/**
	 * Get instance of HFE_WPML_Compatibility
	 *
	 * @since  1.0.9
	 * @return HFE_WPML_Compatibility
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Pass the final header and footer ID from the WPML's object filter to allow strings to be translated.
	 *
	 * @since  1.0.9
	 * @param  Int $id  Post ID of the template being rendered.
	 * @return Int $id  Post ID of the template being rendered, Passed through the `wpml_object_id` id.
	 */
	public function get_wpml_object( $id ) {
		$translated_id = apply_filters( 'wpml_object_id', $id );

		if ( defined( 'POLYLANG_BASENAME' ) ) {

			if ( $translated_id === null ) {

				// The current language is not defined yet or translation is not available.
				return $id;
			}

				// Return translated post ID.
				return $translated_id;

		}

		if ( $translated_id === null ) {
			$translated_id = '';
		}

		return $translated_id;
	}
}

/**
 * Initiate the class.
 */
HFE_WPML_Compatibility::instance();
