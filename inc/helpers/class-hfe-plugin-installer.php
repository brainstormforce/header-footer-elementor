<?php

namespace HFE\Helpers;

// defined( 'ABSPATH' ) or exit;

if ( ! class_exists( 'WP_Upgrader_Skin' ) ) {
	/** WP_Upgrader_Skin class */
	require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader-skin.php';
}

/**
 * Class HFEPluginInstaller.
 *
 *
 * @since x.x.x
 */
class HFE_Plugin_Installer extends \WP_Upgrader_Skin {

	/**
	 * Empty out the header of its HTML content and only check to see if it has
	 * been performed or not.
	 *
	 * @since x.x.x
	 */
	public function header() {
	}

	/**
	 * Empty out the footer of its HTML contents.
	 *
	 * @since x.x.x
	 */
	public function footer() {
	}

	/**
	 * Instead of outputting HTML for errors, just return them.
	 * Ajax request will just ignore it.
	 *
	 * @since x.x.x
	 *
	 * @param array $errors Array of errors with the install process.
	 *
	 * @return array
	 */
	public function error( $errors ) {
		return $errors;
	}

	/**
	 * Empty out JavaScript output that calls function to decrement the update counts.
	 *
	 * @since x.x.x
	 *
	 * @param string $type Type of update count to decrement.
	 */
	public function decrement_update_count( $type ) {
	}
}
