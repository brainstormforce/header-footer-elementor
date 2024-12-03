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
use Elementor\Utils;
use Elementor\Core\Files\File_Types\Svg;

defined( 'ABSPATH' ) || exit;

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
	 * Instance of Widgets_Loader.
	 *
	 * @since  1.2.0
	 * @var null
	 */
	private static $widgets_data = null;

	/**
	 * Member Variable
	 *
	 * @var Modules Manager
	 */
	public $modules_manager;

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
	 * @access private
	 */
	private function __construct() {

		spl_autoload_register( [ $this, 'autoload' ] );

		$this->includes();

		$this->setup_actions_filters();
	}

	/**
	 * AutoLoad
	 *
	 * @since 0.0.1
	 * @param string $class class.
	 */
	public function autoload( $class ) {

		if ( 0 !== strpos( $class, __NAMESPACE__ ) ) {
			return;
		}

		$class_to_load = str_replace( __NAMESPACE__ . '\\', '', $class );

		if ( ! class_exists( $class_to_load ) && ! class_exists( $class ) ) {
			$filename = strtolower(
				preg_replace(
					[ '/([a-z])([A-Z])/', '/_/', '/\\\/' ],
					[ '$1-$2', '-', DIRECTORY_SEPARATOR ],
					$class_to_load
				)
			);
			
			$filename = HFE_DIR . 'inc/widgets-manager/' . $filename . '.php'; // Adjusted path.

			if ( is_readable( $filename ) ) {
				include $filename;
			}
		}
	}

	/**
	 * Includes.
	 *
	 * @since 0.0.1
	 */
	private function includes() {
		require HFE_DIR . 'inc/widgets-manager/modules-manager.php';
	}

	/**
	 * Setup Actions Filters.
	 *
	 * @since 0.0.1
	 */
	private function setup_actions_filters() {

		add_action( 'elementor/init', [ $this, 'elementor_init' ] );

		// Register category.
		add_action( 'elementor/elements/categories_registered', [ $this, 'register_widget_category' ] );

		// Register widgets script.
		add_action( 'elementor/frontend/after_register_scripts', [ $this, 'register_widget_scripts' ] );

		// Add svg support.
		add_filter( 'upload_mimes', [ $this, 'hfe_svg_mime_types' ] ); // PHPCS:Ignore WordPressVIPMinimum.Hooks.RestrictedHooks.upload_mimes

		// Add filter to sanitize uploaded SVG files.
		add_filter( 'wp_handle_upload_prefilter', [ $this, 'sanitize_uploaded_svg' ] );

		// Refresh the cart fragments.
		if ( class_exists( 'woocommerce' ) ) {

			add_filter( 'woocommerce_add_to_cart_fragments', [ $this, 'wc_refresh_mini_cart_count' ] );
		}

	}

	/**
	 * Elementor Init.
	 *
	 * @since 0.0.1
	 */
	public function elementor_init() {

		$this->modules_manager = new Modules_Manager();

		$this->init_category();

		do_action( 'header_footer_elementor/init' );    //phpcs:ignore WordPress.NamingConventions.ValidHookName.UseUnderscores
	}

	/**
	 * Sections init
	 *
	 * @since 0.0.1
	 *
	 * @access private
	 */
	private function init_category() {
		$category = defined( 'UAEL_PLUGIN_SHORT_NAME' ) ? UAEL_PLUGIN_SHORT_NAME : __( 'UAE', 'header-footer-elementor' );

		if ( version_compare( ELEMENTOR_VERSION, '2.0.0' ) < 0 ) {

			\Elementor\Plugin::instance()->elements_manager->add_category(
				'hfe-widgets',
				[
					'title' => $category,
				],
				1
			);
		}
	}

	/**
	 * Register Category
	 *
	 * @since 1.2.0
	 * @param object $this_cat class.
	 * @return object $this_cat class.
	 */
	public function register_widget_category( $this_cat ) {
		$category = defined( 'UAEL_PLUGIN_SHORT_NAME' ) ? UAEL_PLUGIN_SHORT_NAME : __( 'UAE', 'header-footer-elementor' );

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
	 * Provide the SVG support for Retina Logo widget.
	 *
	 * @param array $mimes which return mime type.
	 *
	 * @since  1.2.0
	 * @return array $mimes.
	 */
	public function hfe_svg_mime_types( $mimes ) {
		// New allowed mime types.
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}

	/**
	 * Sanitize uploaded SVG files before they are saved.
	 *
	 * @param array $file Array of uploaded file information.
	 * @return array Modified array of uploaded file information.
	 */
	public function sanitize_uploaded_svg( $file ) {
		if ( 'image/svg+xml' === $file['type'] ) {

			/**
			 * SVG Handler instance.
			 *
			 * @var object $svg_handler;
			 */
			$svg_handler = Plugin::instance()->assets_manager->get_asset( 'svg-handler' );

			if ( Svg::file_sanitizer_can_run() && ! $svg_handler->sanitize_svg( $file['tmp_name'] ) ) {

				$file['error'] = esc_html__( 'Invalid SVG Format, file not uploaded for security reasons!', 'header-footer-elementor' );
			}
		}

		return $file;
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
	 * Cart Fragments.
	 *
	 * Refresh the cart fragments.
	 *
	 * @since 1.5.0
	 * @param array $fragments Array of fragments.
	 * @access public
	 * @return array $fragments Array of fragments.
	 */
	public function wc_refresh_mini_cart_count( $fragments ) {

		$has_cart = is_a( WC()->cart, 'WC_Cart' );

		if ( ! $has_cart ) {
			return $fragments;
		}

		$cart_badge_count = ( null !== WC()->cart ) ? WC()->cart->get_cart_contents_count() : '';

		if ( null !== WC()->cart ) {

			$fragments['span.hfe-cart-count'] = '<span class="hfe-cart-count">' . WC()->cart->get_cart_contents_count() . '</span>';

			$fragments['span.elementor-button-text.hfe-subtotal'] = '<span class="elementor-button-text hfe-subtotal">' . WC()->cart->get_cart_subtotal() . '</span>';
		}

		$fragments['span.elementor-button-icon[data-counter]'] = '<span class="elementor-button-icon" data-counter="' . $cart_badge_count . '"><i class="eicon" aria-hidden="true"></i><span class="elementor-screen-only">' . __( 'Cart', 'header-footer-elementor' ) . '</span></span>';

		return $fragments;
	}

	/**
	 * Validate an HTML tag against a safe allowed list.
	 *
	 * @since 1.5.8
	 * @param string $tag specifies the HTML Tag.
	 * @access public
	 * @return string $tag specifies the HTML Tag.
	 */
	public static function validate_html_tag( $tag ) {

		// Check if Elementor method exists, else we will run custom validation code.
		if ( method_exists( 'Elementor\Utils', 'validate_html_tag' ) ) {
			return Utils::validate_html_tag( $tag );
		} else {
			$allowed_tags = [ 'article', 'aside', 'div', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'main', 'nav', 'p', 'section', 'span' ];
			return in_array( strtolower( $tag ), $allowed_tags ) ? $tag : 'div';
		}
	}
}

/**
 * Initiate the class.
 */
Widgets_Loader::instance();
