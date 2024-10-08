<?php
/**
 * UAEL Module Manager.
 *
 * @package UAEL
 */

namespace HFE\WidgetsManager\Base;

use HFE\WidgetsManager\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Module_Manager.
 */

#[\AllowDynamicProperties]
class Module_Manager {

	/**
	 * Member Variable
	 *
	 * @var modules.
	 */
	private $widget_list = array(); // phpcs:ignore PSR2.Classes.PropertyDeclaration.Underscore

	/**
	 * Returns Script array.
	 *
	 * @return array()
	 * @since 1.3.0
	 */
	public static function get_widget_list() {
		$widget_list = [
			'retina',
			'copyright',
			'copyright-shortcode',
			'navigation-menu',
			'menu-walker',
			'site-title',
			'page-title',
			'site-tagline',
			'site-logo',
			'cart',
			'search-button',
		];

		return $widget_list;
	}

	/**
	 * Required Files.
	 *
	 * @since 0.0.1
	 */
	private function require_files() {
		$widget_list = $this->get_widget_list();

		if ( ! empty( $widget_list ) ) {
			foreach ( $widget_list as $handle => $data ) {
				require_once HFE_DIR . '/inc/widgets-manager/widgets/class-' . $data . '.php';
			}
		}

	}

	/**
	 * Required Files.
	 *
	 * @since 0.0.1
	 */
	private function register_modules() {
		require HFE_DIR . 'inc/widgets-manager/base/module-base.php';
	}


	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->require_files();
		$this->register_modules();
	}
}
