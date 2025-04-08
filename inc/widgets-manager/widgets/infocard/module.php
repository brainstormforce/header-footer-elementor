<?php
/**
 * HFE Infocard Module.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\Infocard;

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
		return true;
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
		return 'infocard';
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
		return array(
			'Infocard',
		);
	}

	/**
	 * Constructor.
	 */
	public function __construct() { // phpcs:ignore Generic.CodeAnalysis.UselessOverridingMethod.Found
		parent::__construct();
	}
}
