<?php
/**
 * HFE Woo Products Module.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\WooProductGrid;

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
	 * @since 2.6.0
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
	 * @since 2.6.0
	 * @access public
	 *
	 * @return string Module name.
	 */
	public function get_name() {
		return 'woo-product-grid';
	}

	/**
	 * Get Widgets.
	 *
	 * @since 2.6.0
	 * @access public
	 *
	 * @return array Widgets.
	 */
	public function get_widgets() {
		return [
			'Woo_Product_Grid',
		];
	}

	/**
	 * Constructor.
	 *
	 * @since 2.6.0
	 * @access public
	 */
	public function __construct() {
		parent::__construct();
	}
}
