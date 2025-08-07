<?php
/**
 * HFE Basic Posts Module.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\BasicPosts;

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
		// Security check - ensure user has basic read capabilities
		if ( ! current_user_can( 'read' ) ) {
			return false;
		}
		
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
		return 'hfe-basic-posts';
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
			'Basic_Posts',
		];
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		parent::__construct();
	}
}
