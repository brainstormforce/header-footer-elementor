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
use Elementor\Core\Kits\Documents\Kit;
use Elementor\Utils;
use Elementor\Core\Files\File_Types\Svg;

defined( 'ABSPATH' ) || exit;

/**
 * Set up Widgets Loader class
 */
class Extensions_Loader {

	/**
	 * Instance of Extensions_Loader.
	 *
	 * @since  1.2.0
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Get instance of Extensions_Loader
	 *
	 * @since  1.2.0
	 * @return Extensions_Loader
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
	 * @access private
	 */
	private function __construct() {

		// Register widgets.
		add_action( 'elementor/kit/register_tabs', [ $this, 'register_extensions' ] );

		// Register widgets script.
		// add_action( 'elementor/frontend/after_register_scripts', [ $this, 'register_widget_scripts' ] );

	}

	/**
	 * Register Widgets
	 *
	 * Register new Elementor widgets.
	 *
	 * @since 1.2.0
	 * @access public
	 * @return void
	 */
	public function register_extensions() {
		// Its is now safe to include extensions files.
		$this->include_extensions_files();
		// Register Widgets.
		Kit::instance()->register_tab( 'hfe-scroll-to-top', new Extensions\Scroll_To_Top() );
	}

	/**
	 * Returns Script array.
	 *
	 * @return array()
	 * @since 1.3.0
	 */
	public static function get_extensions_list() {
		$extensions_list = [
			'scroll-to-top',
		];

		return $extensions_list;
	}

	/**
	 * Include Widgets files
	 *
	 * Load widgets files
	 *
	 * @since 1.2.0
	 * @access public
	 * @return void
	 */
	public function include_extensions_files() {
		$extensions_list = $this->get_extensions_list();

		if ( ! empty( $extensions_list ) ) {
			foreach ( $extensions_list as $handle => $data ) {
				require_once HFE_DIR . '/inc/widgets-manager/extensions/' . $data . '/module.php';
			}
		}
	}

	/**
	 * Include Widgets JS files
	 *
	 * Load widgets JS files
	 *
	 * @since x.x.x
	 * @access public
	 * @return void
	 */
	public function include_js_files() {
		$js_files = $this->get_widget_script();

		if ( ! empty( $js_files ) ) {
			foreach ( $js_files as $handle => $data ) {
				wp_register_script( $handle, HFE_URL . $data['path'], $data['dep'], HFE_VER, $data['in_footer'] );
			}
		}

		$tag_validation = [ 'article', 'aside', 'div', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'main', 'nav', 'p', 'section', 'span' ];

		wp_localize_script(
			'elementor-editor',
			'HfeWidgetsData',
			[
				'allowed_tags' => $tag_validation,
			]
		);

		// Emqueue the widgets style.
		wp_enqueue_style( 'hfe-widgets-style', HFE_URL . 'inc/widgets-css/frontend.css', [], HFE_VER );
	}


	/**
	 * Register module required js on elementor's action.
	 *
	 * @since 0.0.1
	 * @access public
	 * @return void
	 */
	public function register_widget_scripts() {
		$this->include_js_files();
	}

	
	/**
	 * Returns Script array.
	 *
	 * @return array()
	 * @since 1.3.0
	 */
	public static function get_widget_script() {
		$js_files = [
			'hfe-frontend-js' => [
				'path'      => 'inc/js/frontend.js',
				'dep'       => [ 'jquery' ],
				'in_footer' => true,
			],
		];

		return $js_files;
	}

}

/**
 * Initiate the class.
 */
Extensions_Loader::instance();
