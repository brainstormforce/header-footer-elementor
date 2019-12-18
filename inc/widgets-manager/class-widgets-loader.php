<?php
/**
 * Widgets loader for Header Footer Elementor.
 *
 * @package     HFE
 * @author      HFE
 * @copyright   Copyright (c) 2018, HFE
 * @link        http://brainstormforce.com/
 * @since       HFE 1.2.0
 */

namespace HFE\WidgetsManager;

use Elementor\Plugin;

defined( 'ABSPATH' ) or exit;

/**
 * Set up Widgets Loader class
 */
class Widgets_Loader {

	/**
	 * Instance of Widgets_Loader.
	 *
	 * @since  1.2.0
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Get instance of Widgets_Loader
	 *
	 * @since  1.2.0
	 * @return Widgets_Loader
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Setup actions and filters.
	 *
	 * @since  1.2.0
	 */
	private function __construct() {

		// Register category.
		add_action( 'elementor/elements/categories_registered', [ $this, 'register_widget_category' ] );

		// Register widgets.
		add_action( 'elementor/widgets/widgets_registered', [ $this, 'register_widgets' ] );

		// Add svg support.
		add_filter( 'upload_mimes', [ $this, 'hfe_svg_mime_types' ] );
	}


	/**
	 * Include Widgets files
	 *
	 * Load widgets files
	 *
	 * @since 1.2.0
	 * @access public
	 */
	public function include_widgets_files() {
		require_once HFE_DIR . '/inc/widgets-manager/widgets/class-retina.php';
		require_once HFE_DIR . '/inc/widgets-manager/widgets/class-copyright.php';
		require_once HFE_DIR . '/inc/widgets-manager/widgets/class-copyright-shortcode.php';
	}

	/**
	 * Provide the SVG support for Retina Logo widget.
	 *
	 * @param array $mimes which return mime type.
	 *
	 * @since  1.2.0
	 * @return $mimes.
	 */
	public function hfe_svg_mime_types( $mimes ) {

		// New allowed mime types.
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}

	/**
	 * Register Category
	 *
	 * @since 1.2.0
	 * @param object $this_cat class.
	 */
	public function register_widget_category( $this_cat ) {
		$category = __( 'Header, Footer & Blocks', 'header-footer-elementor' );

		$this_cat->add_category(
			'hfe-widgets',
			[
				'title' => $category,
				'icon'  => 'eicon-font',
			]
		);

		return $this_cat;
	}

	/**
	 * Register Widgets
	 *
	 * Register new Elementor widgets.
	 *
	 * @since 1.2.0
	 * @access public
	 */
	public function register_widgets() {

		// Its is now safe to include Widgets files.
		$this->include_widgets_files();
		// Register Widgets.
		Plugin::instance()->widgets_manager->register_widget_type( new Widgets\Retina() );
		Plugin::instance()->widgets_manager->register_widget_type( new Widgets\Copyright() );
	}

}

/**
 * Initiate the class.
 */
Widgets_Loader::instance();
