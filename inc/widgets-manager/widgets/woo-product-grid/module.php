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
	 * @since x.x.x
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
	 * @since x.x.x
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
	 * @since x.x.x
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
	 * @since x.x.x
	 * @access public
	 */
	public function __construct() {
		parent::__construct();
	}
}
