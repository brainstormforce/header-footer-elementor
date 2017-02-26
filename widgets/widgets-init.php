<?php
/**
 * Entry point for the plugin. Checks if Elementor is installed and activated and loads it's own files and actions.
 *
 * @package  header-footer-elementor
 */

defined( 'ABSPATH' ) or exit;

/**
 * HFE_Widgets_Init setup
 *
 * @since 1.0
 */
class HFE_Widgets_Init {

	/**
	 * Instance of HFE_Widgets_Init
	 *
	 * @var HFE_Widgets_Init
	 */
	private static $_instance = null;

	/**
	 * Instance of HFE_Widgets_Init
	 *
	 * @return HFE_Widgets_Init Instance of HFE_Widgets_Init
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self;
		}

		return self::$_instance;
	}

	/**
	 * Constructor
	 */
	private function __construct() {
		// Load the new elemennts.
		add_action( 'elementor/widgets/widgets_registered', array( $this, 'load_elements' ) );

		// Register new category.
		add_action( 'elementor/init', array ( $this,  'hfe_elementor_init' ) );
	}

	public function load_elements() {
		require_once 'menu.php';
	}

	public function hfe_elementor_init() {
		Elementor\Plugin::instance()->elements_manager->add_category(
	        'hfe-eae',
	        [
	            'title'  => 'Elementor Header Footer',
	            'icon' => 'font'
	        ],
	        1
	    );
	}

}

HFE_Widgets_Init::instance();
