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

		//Showing Pro Widgets
		add_filter('elementor/editor/localize_settings', [$this, 'uae_promote_pro_elements']);

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
		$category = ( defined( 'UAEL_PLUGIN_SHORT_NAME' ) && (UAEL_PLUGIN_SHORT_NAME !== 'UAE') ) ? UAEL_PLUGIN_SHORT_NAME : __( 'Ultimate Addons', 'header-footer-elementor' );

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
	 * @since 2.2.1
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
	 * List pro widgets
	 *
	 * @since v3.1.4
	 */
	public function uae_promote_pro_elements( $config ) {

		if(defined( 'UAEL_VER' )){
			return $config;
		}
		

		$promotion_widgets = [];

		if ( isset( $config['promotionWidgets'] ) ) {
			$promotion_widgets = $config['promotionWidgets'];
		}
		$combine_array = array_merge( $promotion_widgets, 
		
		[
			[ 'name' => 'uael-advanced-heading', 'title' => __( 'Advanced Heading', 'header-footer-elementor' ), 'icon' => 'hfe-icon-advanced-heading', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-modal-popup', 'title' => __( 'Modal Popup', 'header-footer-elementor' ), 'icon' => 'hfe-icon-modal-popup', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-content-toggle', 'title' => __( 'Content Toggle', 'header-footer-elementor' ), 'icon' => 'hfe-icon-content-toggle', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-ba-slider', 'title' => __( 'Before After Slider', 'header-footer-elementor' ), 'icon' => 'hfe-icon-before-after-slider', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-business-hours', 'title' => __( 'Business Hours', 'header-footer-elementor' ), 'icon' => 'hfe-icon-business-hour', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-business-reviews', 'title' => __( 'Business Reviews', 'header-footer-elementor' ), 'icon' => 'hfe-icon-business-review', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-cf7-styler', 'title' => __( 'Contact Form 7 Styler', 'header-footer-elementor' ), 'icon' => 'hfe-icon-contact-form-7', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-countdown', 'title' => __( 'Countdown Timer', 'header-footer-elementor' ), 'icon' => 'hfe-icon-countdown-timer', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-dual-color-heading', 'title' => __( 'Dual Color Heading', 'header-footer-elementor' ), 'icon' => 'hfe-icon-dual-color-heading', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-fancy-heading', 'title' => __( 'Fancy Heading', 'header-footer-elementor' ), 'icon' => 'hfe-icon-fancy-heading', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-faq', 'title' => __( 'FAQ Schema', 'header-footer-elementor' ), 'icon' => 'hfe-icon-faq-schema', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-google-map', 'title' => __( 'Google Map', 'header-footer-elementor' ), 'icon' => 'hfe-icon-google-map', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-gf-styler', 'title' => __( 'Gravity Form Styler', 'header-footer-elementor' ), 'icon' => 'hfe-icon-gravity-form-styler', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-hotspot', 'title' => __( 'Hotspot', 'header-footer-elementor' ), 'icon' => 'hfe-icon-hotspot', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-how-to', 'title' => __( 'How-to Schema', 'header-footer-elementor' ), 'icon' => 'hfe-icon-how-to-schema', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-image-gallery', 'title' => __( 'Image Gallery', 'header-footer-elementor' ), 'icon' => 'hfe-icon-image-gallery', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-infobox', 'title' => __( 'Info Box', 'header-footer-elementor' ), 'icon' => 'hfe-icon-info-box', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-instagram-feed', 'title' => __( 'Instagram Feed', 'header-footer-elementor' ), 'icon' => 'hfe-icon-instagram-feed', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-login-form', 'title' => __( 'Login Form', 'header-footer-elementor' ), 'icon' => 'hfe-icon-login-form', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-marketing-button', 'title' => __( 'Marketing Button', 'header-footer-elementor' ), 'icon' => 'hfe-icon-marketing-button', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-buttons', 'title' => __( 'Multi Buttons', 'header-footer-elementor' ), 'icon' => 'hfe-icon-multi-button', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-nav-menu', 'title' => __( 'Navigation Menu', 'header-footer-elementor' ), 'icon' => 'hfe-icon-navigation-menu', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-offcanvas', 'title' => __( 'Off - Canvas', 'header-footer-elementor' ), 'icon' => 'hfe-icon-off-canvas', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-posts', 'title' => __( 'Posts', 'header-footer-elementor' ), 'icon' => 'hfe-icon-posts', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-price-table', 'title' => __( 'Price Box', 'header-footer-elementor' ), 'icon' => 'hfe-icon-price-box', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-price-list', 'title' => __( 'Price List', 'header-footer-elementor' ), 'icon' => 'hfe-icon-price-list', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-retina-image', 'title' => __( 'Retina Image', 'header-footer-elementor' ), 'icon' => 'hfe-icon-retina-image', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-social-share', 'title' => __( 'Social Share', 'header-footer-elementor' ), 'icon' => 'hfe-icon-social-share', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-table', 'title' => __( 'Table', 'header-footer-elementor' ), 'icon' => 'hfe-icon-table', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-table-of-contents', 'title' => __( 'Table of Contents', 'header-footer-elementor' ), 'icon' => 'hfe-icon-table-of-content', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-team-member', 'title' => __( 'Team Member', 'header-footer-elementor' ), 'icon' => 'hfe-icon-team-member', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-timeline', 'title' => __( 'Timeline', 'header-footer-elementor' ), 'icon' => 'hfe-icon-timeline', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-twitter', 'title' => __( 'Twitter Feed', 'header-footer-elementor' ), 'icon' => 'hfe-icon-twitter-feed-icon', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-registration-form', 'title' => __( 'User Registration Form', 'header-footer-elementor' ), 'icon' => 'hfe-icon-registration-form', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-video', 'title' => __( 'Video', 'header-footer-elementor' ), 'icon' => 'hfe-icon-video', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-video-gallery', 'title' => __( 'Video Gallery', 'header-footer-elementor' ), 'icon' => 'hfe-icon-video-gallery', 'categories' => '["hfe-widgets"]' ],
			[ 'name' => 'uael-welcome-music', 'title' => __( 'Welcome Music', 'header-footer-elementor' ), 'icon' => 'hfe-icon-welcome-music', 'categories' => '["hfe-widgets"]' ],
		]
		);

		$config['promotionWidgets'] = $combine_array;

		return $config;
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

		$fragments['span.elementor-button-icon[data-counter]'] = '<span class="elementor-button-icon" data-counter="' . $cart_badge_count . '" aria-label="' . esc_attr__( 'Cart', 'header-footer-elementor' ) . '"><i class="eicon" aria-hidden="true"></i></span>';

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
