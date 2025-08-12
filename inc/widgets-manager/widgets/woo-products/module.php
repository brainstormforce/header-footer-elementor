<?php
/**
 * HFE Woo Products Module.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\WooProducts;

use HFE\WidgetsManager\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Module.
 */
class Module extends Module_Base {

	/**
	 * Module should load or not.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return bool true|false.
	 */
	public static function is_enable() {
		return class_exists( 'WooCommerce' );
	}

	/**
	 * Get Module Name.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Module name.
	 */
	public function get_name() {
		return 'woo-products';
	}

	/**
	 * Get Widgets.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array Widgets.
	 */
	public function get_widgets() {
		return [
			'Woo_Products',
		];
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		parent::__construct();
	}
}
