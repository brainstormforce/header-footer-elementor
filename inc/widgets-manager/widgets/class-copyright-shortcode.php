<?php
/**
 * Calling copy right shortcode.
 *
 * @package CopyRight
 * @author Brainstorm Force
 */

/**
 * Exit if accessed directly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Helper class for the Copy Right.
 *
 * @since x.x.x
 */
class CopyRight_Shortcode {

	/**
	 * The unique instance of the copy right shortcode.
	 *
	 * @var Instance variable
	 */
	private static $instance;

	/**
	 * Gets an instance of our copy right shortcode.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {

		add_shortcode( 'hfe_current_year', [ $this, 'display_current_year' ] );
		add_shortcode( 'hfe_site_title', [ $this, 'display_site_title' ] );
	}

	/**
	 * Get the hfe_current_year Details.
	 *
	 * @return array $hfe_current_year Get Current Year Details.
	 */
	public function display_current_year() {

		$hfe_current_year = gmdate( 'Y' );
		$hfe_current_year = do_shortcode( shortcode_unautop( $hfe_current_year ) );
		if ( ! empty( $hfe_current_year ) ) {
			return $hfe_current_year;
		}
	}

	/**
	 * Get site title of Site.
	 *
	 * @return string.
	 */
	public function display_site_title() {

		$hfe_site_title = get_bloginfo( 'name' );

		if ( ! empty( $hfe_site_title ) ) {
			return $hfe_site_title;
		}
	}

}

$copyright_shortcode = CopyRight_Shortcode::get_instance();
