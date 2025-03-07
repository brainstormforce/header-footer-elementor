<?php
/**
 * Extensions loader for Header Footer Elementor.
 *
 * @package     HFE
 * @author      HFE
 * @copyright   Copyright (c) 2018, HFE
 * @link        http://brainstormforce.com/
 * @since       HFE 2.2.1
 */

namespace HFE\WidgetsManager;

use Elementor\Plugin;
use HFE\WidgetsManager\Base\HFE_Helper;

defined( 'ABSPATH' ) || exit;

/**
 * Set up Extensions Loader class
 */
class Extensions_Loader {

	/**
	 * Instance of Extensions_Loader.
	 *
	 * @since  2.2.1
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Get instance of Extensions_Loader
	 *
	 * @since  2.2.1
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
	 * @since  2.2.1
	 * @access private
	 */
	private function __construct() {

		add_action( 'elementor/init', [ $this, 'elementor_init' ] );

	}

	/**
	 * Elementor Init.
	 *
	 * @since 2.2.1
	 */
	public function elementor_init() {

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
			'Scroll_To_Top' => 'scroll-to-top',
		];

		return $extensions_list;
	}

	/**
	 * Include Extensions files
	 *
	 * Load Extensions files
	 *
	 * @since 2.2.1
	 * @access public
	 * @return void
	 */
	public function include_extensions_files() {
		$extensions_list = $this->get_extensions_list();

		if ( ! empty( $extensions_list ) ) {
			foreach ( $extensions_list as $handle => $data ) {
				if ( HFE_Helper::is_widget_active( $handle ) ) {
					require_once HFE_DIR . '/inc/widgets-manager/extensions/class-' . $data . '.php';
				}
			}
		}
	}

}

/**
 * Initiate the class.
 */
Extensions_Loader::instance();
