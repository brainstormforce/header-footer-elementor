<?php
/**
 * Extensions loader for Header Footer Elementor.
 *
 * @package     HFE
 * @author      HFE
 * @copyright   Copyright (c) 2018, HFE
 * @link        http://brainstormforce.com/
 * @since       HFE 1.2.0
 */

namespace HFE\WidgetsManager;

use Elementor\Plugin;

defined( 'ABSPATH' ) || exit;

/**
 * Set up Extensions Loader class
 */
class Extensions_Loader {

	/**
	 * Instance of Extensions_Loader.
	 *
	 * @since  1.2.0
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Get instance of Extensions_Loader
	 *
	 * @since  1.2.0
	 * @return Extensions_Loader
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Setup actions and filters.
	 *
	 * @since  1.2.0
	 * @access private
	 */
	private function __construct() {

		$this->include_extensions_files();

	}


	/**
	 * Returns Script array.
	 *
	 * @return array()
	 * @since 1.3.0
	 */
	public static function get_extensions_list() {
		$extensions_list = [
			'scroll-to-top',
		];

		return $extensions_list;
	}

	/**
	 * Include Extensions files
	 *
	 * Load Extensions files
	 *
	 * @since 1.2.0
	 * @access public
	 * @return void
	 */
	public function include_extensions_files() {
		$extensions_list = $this->get_extensions_list();

		if ( ! empty( $extensions_list ) ) {
			foreach ( $extensions_list as $handle => $data ) {
				require_once HFE_DIR . '/inc/widgets-manager/extensions/class-' . $data . '.php';
			}
		}
	}

}

/**
 * Initiate the class.
 */
Extensions_Loader::instance();
