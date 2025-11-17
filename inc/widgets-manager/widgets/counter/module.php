<?php
/**
 * HFE Counter Module.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\Counter;

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
	 * @since 2.7.0
	 * @access public
	 *
	 * @return bool true|false.
	 */
	public static function is_enable() {
		return true;
	}

	/**
	 * Get Module Name.
	 *
	 * @since 2.7.0
	 * @access public
	 *
	 * @return string Module name.
	 */
	public function get_name() {
		return 'hfe-counter';
	}

	/**
	 * Get Widgets.
	 *
	 * @since 2.7.0
	 * @access public
	 *
	 * @return array Widgets.
	 */
	public function get_widgets() {
		return [
			'Counter',
		];
	}

	/**
	 * Constructor.
	 */
	public function __construct() { // phpcs:ignore Generic.CodeAnalysis.UselessOverridingMethod.Found
		parent::__construct();
	}
}