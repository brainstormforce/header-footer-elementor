<?php
/**
 * HFE_Hello_Elementor_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Hello Elementor compatibility.
 */
class HFE_Hello_Elementor_Compat {

	/**
	 * Instance of HFE_Hello_Elementor_Compat.
	 *
	 * @var HFE_Hello_Elementor_Compat|null
	 */
	private static $instance = null;

	/**
	 *  Initiator
	 *
	 * @return HFE_Hello_Elementor_Compat
	 */
	// phpcs:ignore
	public static function instance(): HFE_Hello_Elementor_Compat {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_Hello_Elementor_Compat();

			if ( ! class_exists( 'HFE_Default_Compat' ) ) {
				require_once HFE_DIR . 'themes/default/class-hfe-default-compat.php';
			}
		}

		return self::$instance;
	}
}

HFE_Hello_Elementor_Compat::instance();
