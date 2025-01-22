<?php
/**
 * HFE PostInfo Module.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\PostInfo;

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
	 * @since 1.15.0
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
	 * @since 1.15.0
	 * @access public
	 *
	 * @return string Module name.
	 */
	public function get_name() {
		return 'post-info-widget';
	}

	/**
	 * Get Widgets.
	 *
	 * @since 1.15.0
	 * @access public
	 *
	 * @return array Widgets.
	 */
	public function get_widgets() {
		return [
			'Post_Info',
		];
	}

	/**
	 * Constructor.
	 */
	public function __construct() { // phpcs:ignore Generic.CodeAnalysis.UselessOverridingMethod.Found
		parent::__construct();
	}
}
