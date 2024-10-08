<?php
/**
 * UAEL Module Manager.
 *
 * @package UAEL
 */

namespace HFE\WidgetsManager;

use HFE\WidgetsManager\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Modules_Manager.
 */

#[\AllowDynamicProperties]
class Modules_Manager {

	/**
	 * Member Variable
	 *
	 * @var modules.
	 */
	private $_modules = array(); // phpcs:ignore PSR2.Classes.PropertyDeclaration.Underscore

	/**
	 * Constructor.
	 */
	public function __construct() {

		$this->require_files();
		$this->register_modules();
	}

	/**
	 * Returns Script array.
	 *
	 * @return array()
	 * @since 1.3.0
	 */
	public function register_modules() {
		$all_modules = [
			'retina',
			// 'copyright',
			// 'copyright-shortcode',
			// 'navigation-menu',
			// 'menu-walker',
			// 'site-title',
			// 'page-title',
			// 'site-tagline',
			// 'site-logo',
			// 'cart',
			// 'search-button',
		];

		foreach ( $all_modules as $module_name ) {
			$class_name = str_replace( '-', ' ', $module_name );

			$class_name = str_replace( ' ', '', ucwords( $class_name ) );

			$class_name = __NAMESPACE__ . '\\Widgets\\' . $class_name . '\Module';

			if ( class_exists($class_name) && $class_name::is_enable() ) {
				$this->_modules[ $module_name ] = $class_name::instance();
			}
		}
	}

	/**
	 * Get Modules.
	 *
	 * @param string $module_name Module Name.
	 *
	 * @since 0.0.1
	 *
	 * @return Module_Base|Module_Base[]
	 */
	public function get_modules( $module_name = null ) {
		if ( $module_name ) {
			if ( isset( $this->modules[ $module_name ] ) ) {
				return $this->modules[ $module_name ];
			}
			return null;
		}

		return $this->_modules;
	}

	/**
	 * Required Files.
	 *
	 * @since 0.0.1
	 */
	// private function register_modules() {
	// 	$_modules = $this->get_widget_list();

	// 	if ( ! empty( $_modules ) ) {
	// 		foreach ( $_modules as $handle => $data ) {
	// 			require_once HFE_DIR . '/inc/widgets-manager/widgets/class-' . $data . '.php';
	// 		}
	// 	}

	// }

	/**
	 * Required Files.
	 *
	 * @since 0.0.1
	 */
	private function require_files() {
		require HFE_DIR . 'inc/widgets-manager/base/module-base.php';
	}

}
