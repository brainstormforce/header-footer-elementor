<?php
/**
 * Calling copyright shortcode.
 *
 * @package Copyright
 * @author Brainstorm Force
 */

namespace HFE\WidgetsManager\Widgets;

/**
 * Exit if accessed directly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Helper class for the Copyright.
 *
 * @since 1.2.0
 */
class Copyright_Shortcode {

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
	 * @return array | string | void $hfe_current_year Get Current Year Details.
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
	 * @return string | void.
	 */
	public function display_site_title() {

		$hfe_site_title = get_bloginfo( 'name' );

		if ( ! empty( $hfe_site_title ) ) {
			return $hfe_site_title;
		}
	}
}

new Copyright_Shortcode();
