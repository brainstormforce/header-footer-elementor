<?php
/**
 * HFEConfig.
 *
 * @package header-footer-elementor
 */
namespace HFE\WidgetsManager\Base;


use HFE\WidgetsManager\Base\Widgets_Config;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Include the necessary file to use get_plugins() function
if ( ! function_exists( 'get_plugins' ) ) {
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

/**
 * Class Widgets_Config.
 */
class Widgets_Config {

	/**
	 * Widget List
	 *
	 * @var widget_list
	 */
	public static $widget_list = null;

	/**
	 * Widget List
	 *
	 * @var widget_list
	 */
	public static $pro_widget_list = null;

	/**
	 * Get Widget List.
	 *
	 * @since 0.0.1
	 *
	 * @return array The Widget List.
	 */
	public static function get_widget_list() {

		self::$widget_list = array(
			'Retina'    => array(
				'slug'      => 'retina',
				'title'     => __( 'Retina Image', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'retina', 'image', 'logo' ),
				'icon'      => 'hfe-icon-retina-image',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   	=> false
			),
			'Cart'    => array(
				'slug'      => 'hfe-cart',
				'title'     => __( 'Cart', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'cart', 'shop', 'bag' ),
				'icon'      => 'hfe-icon-menu-cart',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   => false
			),
			'Copyright'    => array(
				'slug'      => 'copyright',
				'title'     => __( 'Copyright', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'copyright', 'date' ),
				'icon'      => 'hfe-icon-copyright-widget',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   => false
			),
			'Navigation_Menu'    => array(
				'slug'      => 'navigation-menu',
				'title'     => __( 'Navigation Menu', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'navigation', 'menu', 'nav' ),
				'icon'      => 'hfe-icon-navigation-menu',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   => false
			),
			'Page_Title'    => array(
				'slug'      => 'page-title',
				'title'     => __( 'Page Title', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'title', 'dynamic' ),
				'icon'      => 'hfe-icon-page-title',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   => false
			),
			'Search_Button'    => array(
				'slug'      => 'hfe-search-button',
				'title'     => __( 'Search', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'title', 'dynamic' ),
				'icon'      => 'hfe-icon-search',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   => false
			),
			'Site_Logo'    => array(
				'slug'      => 'site-logo',
				'title'     => __( 'Site Logo', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'site', 'logo', 'image' ),
				'icon'      => 'hfe-icon-site-logo',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   => false
			),
			'Site_Tagline'    => array(
				'slug'      => 'hfe-site-tagline',
				'title'     => __( 'Site Tagline', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'site', 'tagline', 'tag' ),
				'icon'      => 'hfe-icon-site-tagline',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   => false
			),
			'Site_Title'    => array(
				'slug'      => 'hfe-site-title',
				'title'     => __( 'Site Title', 'header-footer-elementor' ),
				'keywords'  => array( 'uael', 'site', 'title', 'tag' ),
				'icon'      => 'hfe-icon-site-title',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
				'is_pro'   => false
			),
		);

		return apply_filters( 'hfe_widgets_data', self::$widget_list );
	}

	/**
	 * Get Widget List.
	 *
	 * @since 0.0.1
	 *
	 * @return array The Widget List.
	 */
	public static function get_pro_widget_list() {

		if ( null === self::$pro_widget_list ) {

			$integration_url = '';
			$post_url = '';

			self::$pro_widget_list =  array(
				'Advanced_Heading'    => array(
					'slug'        => 'uael-advanced-heading',
					'title'       => __( 'Advanced Heading', 'uael' ),
					'description' => __( 'Create engaging and customizable headings for your pages.', 'uael' ),
					'keywords'    => array( 'uael', 'heading', 'advanced' ),
					'icon'        => 'uael-icon-advanced-heading',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/advanced-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '6',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/advanced-heading/',
				),
				'BaSlider'            => array(
					'slug'        => 'uael-ba-slider',
					'title'       => __( 'Before After Slider', 'uael' ),
					'description' => __( 'Display the before and after versions of an image.', 'uael' ),
					'keywords'    => array( 'uael', 'slider', 'before', 'after' ),
					'icon'        => 'uael-icon-before-after-slider',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/before-after-slider/?utm_source=uael-pro-dashboard&utm_medium=uael-editor-screen&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/before-after-slider/',
				),
				'Business_Hours'      => array(
					'slug'        => 'uael-business-hours',
					'title'       => __( 'Business Hours', 'uael' ),
					'description' => __( 'Customize and display your business hours stylishly.', 'uael' ),
					'keywords'    => array( 'uael', 'business', 'hours', 'schedule' ),
					'icon'        => 'uael-icon-business-hour',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/business-hours/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/business-hours/',
				),
				'Business_Reviews'    => array(
					'slug'         => 'uael-business-reviews',
					'keywords'     => array( 'uael', 'reviews', 'wp reviews', 'business', 'wp business', 'google', 'rating', 'social', 'yelp' ),
					'title'        => __( 'Business Reviews', 'uael' ),
					'description'  => __( 'Display verified reviews from Google and Yelp directly.', 'uael' ),
					'icon'         => 'uael-icon-business-review',
					'title_url'    => '#',
					'default'      => true,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/business-reviews/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'uael' ),
					'category'     => 'seo',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/business-reviews/',
				),
				'CfStyler'            => array(
					'slug'        => 'uael-cf7-styler',
					'title'       => __( 'Contact Form 7 Styler', 'uael' ),
					'description' => __( 'Style and enhance Contact Form 7 to fit your site.', 'uael' ),
					'keywords'    => array( 'uael', 'form', 'cf7', 'contact', 'styler' ),
					'icon'        => 'uael-icon-contact-form-7',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/contact-form-7-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'form',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/contact-form-7/',
				),
				'ContentToggle'       => array(
					'slug'        => 'uael-content-toggle',
					'title'       => __( 'Content Toggle', 'uael' ),
					'description' => __( 'Let users easily switch between two types of content.', 'uael' ),
					'keywords'    => array( 'uael', 'toggle', 'content', 'show', 'hide' ),
					'icon'        => 'uael-icon-content-toggle',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/content-toggle/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/content-toggle/',
				),
				'Countdown'           => array(
					'slug'        => 'uael-countdown',
					'title'       => __( 'Countdown Timer', 'uael' ),
					'description' => __( 'Create urgency with fixed or recurring countdowns.', 'uael' ),
					'keywords'    => array( 'uael', 'count', 'timer', 'countdown' ),
					'icon'        => 'uael-icon-countdown-timer',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/countdown-timer/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '6',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/countdown-timer/',
				),
				'Dual_Heading'        => array(
					'slug'        => 'uael-dual-color-heading',
					'title'       => __( 'Dual Color Heading', 'uael' ),
					'description' => __( 'Style headings with dual colours and customizable typography.', 'uael' ),
					'keywords'    => array( 'uael', 'dual', 'heading', 'color' ),
					'icon'        => 'uael-icon-dual-color-heading',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/dual-color-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-editor-screen&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/dual-color-heading/',
				),
				'Fancy_Heading'       => array(
					'slug'        => 'uael-fancy-heading',
					'title'       => __( 'Fancy Heading', 'uael' ),
					'description' => __( 'Add animated text for more engaging page titles.', 'uael' ),
					'keywords'    => array( 'uael', 'fancy', 'heading', 'ticking', 'animate' ),
					'icon'        => 'uael-icon-fancy-heading',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/fancy-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/fancy-heading/',
				),
				'FAQ'                 => array(
					'slug'        => 'uael-faq',
					'title'       => __( 'FAQ Schema', 'uael' ),
					'description' => __( 'Add SEO-friendly FAQ sections to pages.', 'uael' ),
					'keywords'    => array( 'uael', 'faq', 'schema', 'question', 'answer', 'accordion', 'toggle' ),
					'icon'        => 'uael-icon-faq-schema',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/faq/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'seo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/faq/',
				),
				'GoogleMap'           => array(
					'slug'         => 'uael-google-map',
					'title'        => __( 'Google Map', 'uael' ),
					'description'  => __( 'Add customizable, multi-location maps with custom markers.', 'uael' ),
					'keywords'     => array( 'uael', 'google', 'map', 'location', 'address' ),
					'icon'         => 'uael-icon-google-map',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'uael' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/google-maps/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'content',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/google-maps/',
				),
				'GfStyler'            => array(
					'slug'        => 'uael-gf-styler',
					'title'       => __( 'Gravity Form Styler', 'uael' ),
					'description' => __( 'Customize Gravity Forms with advanced styling options.', 'uael' ),
					'keywords'    => array( 'uael', 'form', 'gravity', 'gf', 'styler' ),
					'icon'        => 'uael-icon-gravity-form-styler',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/gravity-form-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'form',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/gravity-form-styler/',
				),
				'Hotspot'             => array(
					'slug'        => 'uael-hotspot',
					'title'       => __( 'Hotspot', 'uael' ),
					'description' => __( 'Add interactive points on images for detailed visual tours.', 'uael' ),
					'keywords'    => array( 'uael', 'hotspot', 'tour' ),
					'icon'        => 'uael-icon-hotspot',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/hotspot/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/hotspots/',
				),
				'HowTo'               => array(
					'slug'        => 'uael-how-to',
					'title'       => __( 'How-to Schema', 'uael' ),
					'description' => __( 'Create structured how-to pages with automatic schema markup.', 'uael' ),
					'keywords'    => array( 'uael', 'how-to', 'howto', 'schema', 'steps', 'supply', 'tools', 'steps', 'cost' ),
					'icon'        => 'uael-icon-how-to-schema',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/how-to-schema/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'seo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/how-to-schema/',
				),
				'Image_Gallery'       => array(
					'slug'        => 'uael-image-gallery',
					'title'       => __( 'Image Gallery', 'uael' ),
					'description' => __( 'Build attractive, feature-rich galleries with advanced options.', 'uael' ),
					'keywords'    => array( 'uael', 'image', 'gallery', 'carousel', 'slider', 'layout' ),
					'icon'        => 'uael-icon-image-gallery',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/image-gallery/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/image-gallery/',
				),
				'Infobox'             => array(
					'slug'        => 'uael-infobox',
					'title'       => __( 'Info Box', 'uael' ),
					'description' => __( 'Add headings, icons, and descriptions in one flexible widget.', 'uael' ),
					'keywords'    => array( 'uael', 'info', 'box', 'bar' ),
					'icon'        => 'uael-icon-info-box',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/info-box/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/info-box/',
				),
				'Instagram_Feed'      => array(
					'slug'         => 'uael-instagram-feed',
					'title'        => __( 'Instagram Feed', 'uael' ),
					'description'  => __( 'Display an attractive, customizable Instagram feed.', 'uael' ),
					'keywords'     => array( 'insta', 'instagram', 'feed', 'social' ),
					'icon'         => 'uael-icon-instagram-feed',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'uael' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/instagram-feed/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'creative',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/instagram-feed/',
				),
				'LoginForm'           => array(
					'slug'         => 'uael-login-form',
					'title'        => __( 'Login Form', 'uael' ),
					'description'  => __( 'Design beautiful, customizable WordPress login forms.', 'uael' ),
					'keywords'     => array( 'uael', 'form', 'login', 'facebook', 'google', 'user', 'fblogin' ),
					'icon'         => 'uael-icon-login-form',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'uael' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/login-form/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'category'     => 'form',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/login-form/',
				),
				'Marketing_Button'    => array(
					'slug'        => 'uael-marketing-button',
					'title'       => __( 'Marketing Button', 'uael' ),
					'description' => __( 'Create High-impact, customizable CTA for promotions and conversions.', 'uael' ),
					'keywords'    => array( 'uael', 'button', 'marketing', 'call to action', 'cta' ),
					'icon'        => 'uael-icon-marketing-button',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/marketing-button/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/marketing-button/',
				),
				'Modal_Popup'         => array(
					'slug'        => 'uael-modal-popup',
					'title'       => __( 'Modal Popup', 'uael' ),
					'description' => __( 'Design engaging popups with interactive animations and content.', 'uael' ),
					'keywords'    => array( 'uael', 'modal', 'popup', 'lighbox' ),
					'icon'        => 'uael-icon-modal-popup',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/modal-popup/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/modal-popup/',
				),
				'Buttons'             => array(
					'slug'        => 'uael-buttons',
					'title'       => __( 'Multi Buttons', 'uael' ),
					'description' => __( 'Create a versatile dual-button setup for navigation and interactive web elements.', 'uael' ),
					'keywords'    => array( 'uael', 'buttons', 'multi', 'call to action', 'cta' ),
					'icon'        => 'uael-icon-multi-button',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/multi-buttons/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '3',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/multi-buttons/',
				),
				'Nav_Menu'            => array(
					'slug'        => 'uael-nav-menu',
					'title'       => __( 'Navigation Menu', 'uael' ),
					'description' => __( 'Build easy-to-navigate, visually appealing site menus.', 'uael' ),
					'keywords'    => array( 'uael', 'menu', 'nav', 'navigation', 'mega' ),
					'icon'        => 'uael-icon-navigation-menu',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/navigation-menu/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/navigation-menu/',
				),
				'Offcanvas'           => array(
					'slug'        => 'uael-offcanvas',
					'title'       => __( 'Off - Canvas', 'uael' ),
					'description' => __( 'Create sliding panels for navigation or extra content.', 'uael' ),
					'keywords'    => array( 'uael', 'off', 'offcanvas', 'off-canvas', 'canvas', 'template', 'floating' ),
					'icon'        => 'uael-icon-off-canvas',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/off-canvas/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/off-canvas/',
				),
				'Posts'               => array(
					'slug'         => 'uael-posts',
					'title'        => __( 'Posts', 'uael' ),
					'description'  => __( 'Display and customize blog posts beautifully on your site.', 'uael' ),
					'keywords'     => array( 'uael', 'post', 'grid', 'masonry', 'carousel', 'content grid', 'content' ),
					'icon'         => 'uael-icon-posts',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $post_url,
					'setting_text' => __( 'Settings', 'uael' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/posts/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'content',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/posts/',
				),
				'Price_Table'         => array(
					'slug'        => 'uael-price-table',
					'title'       => __( 'Price Box', 'uael' ),
					'description' => __( 'Showcase prices and features in customizable layouts.', 'uael' ),
					'keywords'    => array( 'uael', 'price', 'table', 'box', 'pricing' ),
					'icon'        => 'uael-icon-price-box',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/price-box/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/price-box/',
				),
				'Price_List'          => array(
					'slug'        => 'uael-price-list',
					'title'       => __( 'Price List', 'uael' ),
					'description' => __( 'Create elegant, customizable lists for menus or product catalogues.', 'uael' ),
					'keywords'    => array( 'uael', 'price', 'list', 'pricing' ),
					'icon'        => 'uael-icon-price-list',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/price-list/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/price-list/',
				),
				'Retina_Image'        => array(
					'slug'        => 'uael-retina-image',
					'title'       => __( 'Advanced Retina Image', 'uael' ),
					'description' => __( 'Ensure images look crisp on high-resolution screens.', 'uael' ),
					'keywords'    => array( 'uael', 'retina', 'image', '2ximage' ),
					'icon'        => 'uael-icon-retina-image',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/retina-image/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/retina-image/',
				),
				'SocialShare'         => array(
					'slug'         => 'uael-social-share',
					'title'        => __( 'Social Share', 'uael' ),
					'description'  => __( 'Enable quick content sharing with social media buttons.', 'uael' ),
					'keywords'     => array( 'uael', 'sharing', 'social', 'icon', 'button', 'like' ),
					'icon'         => 'uael-icon-social-share',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'uael' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/social-share/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'category'     => 'creative',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/social-share/',
				),
				'Table'               => array(
					'slug'        => 'uael-table',
					'title'       => __( 'Table', 'uael' ),
					'description' => __( 'Build responsive, styled tables to display data.', 'uael' ),
					'keywords'    => array( 'uael', 'table', 'sort', 'search' ),
					'icon'        => 'uael-icon-table',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/table/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/table/',
				),
				'Table_of_Contents'   => array(
					'slug'        => 'uael-table-of-contents',
					'title'       => __( 'Table of Contents', 'uael' ),
					'description' => __( 'Improve page readability with automatic, customizable TOCs.', 'uael' ),
					'keywords'    => array( 'uael', 'table of contents', 'content', 'list', 'toc', 'index' ),
					'icon'        => 'uael-icon-table-of-content',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/table-of-contents/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'seo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/table-of-contents/',
				),
				'Team_Member'         => array(
					'slug'        => 'uael-team-member',
					'title'       => __( 'Team Member', 'uael' ),
					'description' => __( 'Highlight team members with customizable layouts.', 'uael' ),
					'keywords'    => array( 'uael', 'team', 'member' ),
					'icon'        => 'uael-icon-team-member',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/team-member/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/team-member/',
				),
				'Timeline'            => array(
					'slug'        => 'uael-timeline',
					'title'       => __( 'Timeline', 'uael' ),
					'description' => __( 'Display timelines or roadmaps with advanced styling options.', 'uael' ),
					'keywords'    => array( 'uael', 'timeline', 'history', 'scroll', 'post', 'content timeline' ),
					'icon'        => 'uael-icon-timeline',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/timeline/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/timeline/',
				),
				'Twitter'             => array(
					'slug'         => 'uael-twitter',
					'title'        => __( 'Twitter Feed', 'uael' ),
					'description'  => __( 'Embed Twitter feeds to show real-time content updates.', 'uael' ),
					'keywords'     => array( 'uael', 'twitter' ),
					'icon'         => 'uael-icon-twitter-feed-icon',
					'title_url'    => '#',
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'uael' ),
					'default'      => true,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/twitter-feed/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'creative',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/twitter-feed/',
				),
				'RegistrationForm'    => array(
					'slug'         => 'uael-registration-form',
					'title'        => __( 'User Registration Form', 'uael' ),
					'description'  => __( 'Create beautiful, custom registration forms for users.', 'uael' ),
					'keywords'     => array( 'uael', 'form', 'register', 'registration', 'user' ),
					'icon'         => 'uael-icon-registration-form',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'uael' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/user-registration-form/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'category'     => 'form',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/user-registration-form/',
				),
				'Video'               => array(
					'slug'        => 'uael-video',
					'title'       => __( 'Video', 'uael' ),
					'description' => __( 'Embed optimized videos with customizable thumbnails and play buttons.', 'uael' ),
					'keywords'    => array( 'uael', 'video', 'youtube', 'vimeo', 'wistia', 'sticky', 'drag', 'float', 'subscribe' ),
					'icon'        => 'uael-icon-video',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/video/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/video/',
				),
				'Video_Gallery'       => array(
					'slug'        => 'uael-video-gallery',
					'title'       => __( 'Video Gallery', 'uael' ),
					'description' => __( 'Showcase multiple videos without impacting load times.', 'uael' ),
					'keywords'    => array( 'uael', 'video', 'youtube', 'wistia', 'gallery', 'vimeo' ),
					'icon'        => 'uael-icon-video-gallery',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/video-gallery/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/video-gallery/',
				),
				'Welcome_Music'       => array(
					'slug'        => 'uael-welcome-music',
					'title'       => __( 'Welcome Music', 'uael' ),
					'description' => __( 'Play background audio to engage visitors upon page load.', 'uael' ),
					'keywords'    => array( 'uael', 'christmas', 'music', 'background', 'audio', 'welcome' ),
					'icon'        => 'uael-icon-welcome-music',
					'title_url'   => '#',
					'default'     => false,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/welcome-music/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/welcome-music/',
				),
				'Woo_Add_To_Cart'     => array(
					'slug'        => 'uael-woo-add-to-cart',
					'title'       => __( 'Woo - Add To Cart', 'uael' ),
					'description' => __( 'Let users add items to cart with one click.', 'uael' ),
					'keywords'    => array( 'uael', 'woo', 'cart', 'add to cart', 'products' ),
					'icon'        => 'uael-icon-woo-add-to-cart',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-add-to-cart/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-add-to-cart/',
				),
				'Woo_Categories'      => array(
					'slug'        => 'uael-woo-categories',
					'title'       => __( 'Woo - Categories', 'uael' ),
					'description' => __( 'Display product categories beautifully.', 'uael' ),
					'keywords'    => array( 'uael', 'woo', 'categories', 'taxomonies', 'products' ),
					'icon'        => 'uael-icon-woo-category',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-categories/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-categories/',
				),
				'Woo_Checkout'        => array(
					'slug'        => 'uael-woo-checkout',
					'title'       => __( 'Woo - Checkout', 'uael' ),
					'description' => __( 'Design optimized checkout pages for better conversions.', 'uael' ),
					'keywords'    => array( 'uael', 'woo', 'checkout', 'page', 'check' ),
					'icon'        => 'uael-icon-woo-checkout-1',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-checkout/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-checkout/',
				),
				'Woo_Mini_Cart'       => array(
					'slug'        => 'uael-mini-cart',
					'title'       => __( 'Woo - Mini Cart', 'uael' ),
					'description' => __( 'Show a mini-cart for seamless shopping experiences.', 'uael' ),
					'keywords'    => array( 'woo', 'woocommerce', 'cart', 'mini', 'minicart' ),
					'icon'        => 'uael-icon-woo-mini-cart',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-mini-cart/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-mini-cart/',
				),
				'Woo_Products'        => array(
					'slug'        => 'uael-woo-products',
					'title'       => __( 'Woo - Products', 'uael' ),
					'description' => __( 'Present products with detailed, customizable layouts.', 'uael' ),
					'keywords'    => array( 'uael', 'woo', 'products' ),
					'icon'        => 'uael-icon-woo-product',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-products/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-products/',
				),
				'FfStyler'            => array(
					'slug'        => 'uael-ff-styler',
					'title'       => __( 'WP Fluent Forms Styler', 'uael' ),
					'description' => __( 'Style WP Fluent Forms for an attractive, cohesive look.', 'uael' ),
					'keywords'    => array( 'uael', 'fluent', 'forms', 'wp' ),
					'icon'        => 'uael-icon-fluent-form-styler',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/wp-fluent-forms-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'form',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/wp-fluent-forms-styler/',
				),
				'WpfStyler'           => array(
					'slug'        => 'uael-wpf-styler',
					'title'       => __( 'WPForms Styler', 'uael' ),
					'description' => __( 'Upgrade WPForms with customizable design and layout options.', 'uael' ),
					'keywords'    => array( 'uael', 'form', 'wp', 'wpform', 'styler' ),
					'icon'        => 'uael-icon-wp-form-styler',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/wpforms-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'form',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/wpforms-styler/',
				),
				'DisplayConditions'   => array(
					'slug'         => 'uael-display-conditions',
					'title'        => __( 'Display Conditions', 'uael' ),
					'description'  => __( 'Show or hide content based on user interactions.', 'uael' ),
					'keywords'     => array(),
					'icon'         => 'uael-icon-display-conditions',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'uael' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/display-conditions/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'extension',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/display-conditions/',
				),
				'Particles'           => array(
					'slug'        => 'uael-particles',
					'title'       => __( 'Particle Backgrounds', 'uael' ),
					'description' => __( 'Add dynamic, animated backgrounds to sections and columns.', 'uael' ),
					'keywords'    => array(),
					'icon'        => 'uael-icon-particles',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/particles-background-extension/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'extension',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/particle-backgrounds/',
				),
				'PartyPropzExtension' => array(
					'slug'        => 'uael-party-propz-extension',
					'title'       => __( 'Party Propz', 'uael' ),
					'description' => __( 'Decorate your site with festive seasonal elements easily.', 'uael' ),
					'keywords'    => array(),
					'icon'        => 'uael-icon-party-propz',
					'title_url'   => '#',
					'default'     => false,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/party-propz-extensions/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'extension',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/party-propz/',
				),
				'SectionDivider'      => array(
					'slug'        => 'uael-section-divider',
					'title'       => __( 'Shape Divider', 'uael' ),
					'description' => __( 'Add new attractive shape dividers to Elementor sections.', 'uael' ),
					'keywords'    => array(),
					'icon'        => 'uael-icon-shape-divider',
					'title_url'   => '#',
					'default'     => false,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/uae-shape-dividers/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'extension',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/uae-shape-dividers/',
				),
				'Cross_Domain'        => array(
					'slug'        => 'uael-cross-domain-copy-paste',
					'title'       => __( 'Cross-Site Copy Paste', 'uael' ),
					'description' => __( 'Copy and paste Elementor content between websites.', 'uael' ),
					'keywords'    => array(),
					'icon'        => 'uael-icon-cdcp',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/features/cross-site-copy-paste/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'feature',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/cross-site-copy-paste/',
				),
				'Presets'             => array(
					'slug'        => 'uael-presets',
					'title'       => __( 'Presets', 'uael' ),
					'description' => __( 'Use pre-made widget templates to accelerate your design process.', 'uael' ),
					'keywords'    => array(),
					'icon'        => 'uael-icon-presets',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/features/presets/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'feature',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/presets/',
				),
			);

			if ( class_exists( 'Caldera_Forms' ) || class_exists( 'Caldera_Forms_Forms' ) ) {
				$forms = \Caldera_Forms_Forms::get_forms( true );
				if ( ! empty( $forms ) ) {
					$caldera = array(
						'CafStyler' => array(
							'slug'        => 'uael-caf-styler',
							'title'       => __( 'Caldera Form Styler', 'uael' ),
							'description' => __( 'Style and enhance Caldera Forms to fit your site.', 'uael' ),
							'keywords'    => array( 'uael', 'caldera', 'form', 'styler' ),
							'icon'        => 'uael-icon-wp-form-styler',
							'title_url'   => '#',
							'default'     => true,
							'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/caldera-form-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
							'category'    => 'form',
							'is_pro'      => true,
						),
					);
	
					self::$pro_widget_list = array_merge_recursive( self::$pro_widget_list, $caldera );
				}
			}
		}

		return self::$pro_widget_list;
	}

	/**
     * Get All Widgets.
     *
     * @since 0.0.1
     *
     * @return array The combined Widget List.
     */
    public static function get_all_widgets() {
        return self::get_widget_list() + self::get_pro_widget_list(); // Use + operator to merge associative arrays
   }

   
	/**
	 * Function for Astra Pro white labels with defaults.
	 *
	 * @since x.x.x
	 * @return array
	 */
	public static function get_white_label() {
		$white_labels = is_callable( 'Astra_Admin_Helper::get_admin_settings_option' ) ? \Astra_Admin_Helper::get_admin_settings_option( '_astra_ext_white_label', true ) : [];

		$theme_name = ! empty( $white_labels['astra']['name'] ) ? $white_labels['astra']['name'] : 'Astra Theme';

		return [
			'theme_name'  => $theme_name,
			/* translators: %s: theme name */
			'description' => ! empty( $white_labels['astra']['description'] ) ? $white_labels['astra']['description'] : esc_html( sprintf( __( 'Free & Fastest WordPress Theme.', 'header-footer-elementor' ), esc_html( $theme_name ) ) ),
			'theme_icon'  => ! empty( $white_labels['astra']['icon'] ) ? $white_labels['astra']['icon'] : '',
			'author_url'  => ! empty( $white_labels['astra']['author_url'] ) ? $white_labels['astra']['author_url'] : 'https://wpastra.com/',
		];
	}

	/**
	 * List of plugins that we propose to install.
	 *
	 * @since 1.6.0
	 *
	 * @return array
	 */
	public static function get_bsf_plugins() {

		$white_labels = self::get_white_label();

		$images_url = HFE_URL . 'assets/images/settings/';

		return [

			'astra'                                     => [
				'icon'    => ! empty( $white_labels['theme_icon'] ) ? $white_labels['theme_icon'] : $images_url . 'plugin-astra.png',
				'type'    => 'theme',
				'name'    => $white_labels['theme_name'],
				'desc'    => esc_html__( 'Free and Fastest WordPress Theme', 'header-footer-elementor' ),
				'wporg'   => 'https://wordpress.org/themes/astra/',
				'url'     => 'https://downloads.wordpress.org/theme/astra.zip',
				'siteurl' => $white_labels['author_url'],
				'slug'    => 'astra',
				'isFree'  => true,
				'status'  => self::get_theme_status( 'astra' ),
			],

			'astra-sites/astra-sites.php'               => [
				'icon'    => $images_url . 'stemplates.png',
				'type'    => 'plugin',
				'name'    => esc_html__( 'Starter Templates', 'header-footer-elementor' ),
				'desc'    => esc_html__( 'Build you dream website in minutes with AI.', 'header-footer-elementor' ),
				'wporg'   => 'https://wordpress.org/plugins/astra-sites/',
				'url'     => 'https://downloads.wordpress.org/plugin/astra-sites.zip',
				'siteurl' => 'https://startertemplates.com/',
				'slug'    => 'astra-sites',
				'isFree'  => true,
				'status'  => self::get_plugin_status( 'astra-sites/astra-sites.php' ),
			],

			'surecart/surecart.php'               => [
				'icon'    => $images_url . 'surecart.png',
				'type'    => 'plugin',
				'name'    => esc_html__( 'Surecart', 'header-footer-elementor' ),
				'desc'    => esc_html__( 'The new way to sell on WordPress.', 'header-footer-elementor' ),
				'wporg'   => 'https://wordpress.org/plugins/surecart/',
				'url'     => 'https://downloads.wordpress.org/plugin/surecart.zip',
				'siteurl' => 'https://surecart.com/',
				'isFree'  => true,
				'slug'    => 'surecart',
				'status'  => self::get_plugin_status( 'surecart/surecart.php' ),
			],

			'presto-player/presto-player.php'               => [
				'icon'    => $images_url . 'pplayer.png',
				'type'    => 'plugin',
				'name'    => esc_html__( 'Presto Player', 'header-footer-elementor' ),
				'desc'    => esc_html__( 'Automate your WordPress setup with Presto Player.', 'header-footer-elementor' ),
				'wporg'   => 'https://wordpress.org/plugins/presto-player/',
				'url'     => 'https://downloads.wordpress.org/plugin/presto-player.zip',
				'siteurl' => 'https://prestoplayer.com/',
				'slug'    => 'presto-player',
				'isFree'  => true,
				'status'  => self::get_plugin_status( 'presto-player/presto-player.php' ),
			],

		];
	}

	/**
	 * Get plugin status
	 *
	 * @since 0.0.1
	 *
	 * @param  string $plugin_init_file Plugin init file.
	 * @return string
	 */
	public static function get_plugin_status( $plugin_init_file ) {

		$installed_plugins = get_plugins();

		if ( ! isset( $installed_plugins[ $plugin_init_file ] ) ) {
			return 'Install';
		} elseif ( is_plugin_active( $plugin_init_file ) ) {
			return 'Activated';
		} else {
			return 'Installed';
		}
	}

	/**
	 * Get theme status
	 *
	 * @since 0.0.1
	 *
	 * @param  string $plugin_init_file Plugin init file.
	 * @return string
	 */
	public static function get_theme_status( $theme_slug ) {
        $installed_themes = wp_get_themes();
        
        // Check if the theme is installed
        if ( isset( $installed_themes[ $theme_slug ] ) ) {
            $current_theme = wp_get_theme();
            
            // Check if the current theme slug matches the provided theme slug
            if ( $current_theme->get_stylesheet() === $theme_slug ) {
                return 'Activated'; // Theme is active
            } else {
                return 'Activate'; // Theme is installed but not active
            }
        } else {
            return 'Install'; // Theme is not installed at all
        }
    }


}
