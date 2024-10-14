<?php
/**
 * HFEConfig.
 *
 * @package header-footer-elementor
 */
namespace HFE\WidgetsManager\Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
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

		return self::$widget_list;
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

			if( is_plugin_active( 'ultimate-elementor/ultimate-elementor.php' ) ) {
				$options_url       = admin_url( 'options-general.php' );
				$integration_url   = add_query_arg(
					array(
						'page'   => 'uae',
						'action' => 'integration',
					),
					$options_url
				);
				$post_url          = add_query_arg(
					array(
						'page'   => 'uae',
						'action' => 'post',
					),
					$options_url
				);
			}

			self::$pro_widget_list =  array(
				'Advanced_Heading'    => array(
					'slug'      => 'uael-advanced-heading',
					'title'     => __( 'Advanced Heading', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'heading', 'advanced' ),
					'icon'      => 'uael-icon-advanced-heading',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/advanced-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '6',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'BaSlider'            => array(
					'slug'      => 'uael-ba-slider',
					'title'     => __( 'Before After Slider', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'slider', 'before', 'after' ),
					'icon'      => 'uael-icon-before-after-slider',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/before-after-slider/?utm_source=uael-pro-dashboard&utm_medium=uael-editor-screen&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Business_Hours'      => array(
					'slug'      => 'uael-business-hours',
					'title'     => __( 'Business Hours', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'business', 'hours', 'schedule' ),
					'icon'      => 'uael-icon-business-hour',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/business-hours/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Business_Reviews'    => array(
					'slug'         => 'uael-business-reviews',
					'keywords'     => array( 'uael', 'reviews', 'wp reviews', 'business', 'wp business', 'google', 'rating', 'social', 'yelp' ),
					'title'        => __( 'Business Reviews', 'header-footer-elementor' ),
					'icon'         => 'uael-icon-business-review',
					'title_url'    => '#',
					'default'      => true,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/business-reviews/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'is_pro'   	=> true,
					'category'     => 'seo',
				),
				'CfStyler'            => array(
					'slug'      => 'uael-cf7-styler',
					'title'     => __( 'Contact Form 7 Styler', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'form', 'cf7', 'contact', 'styler' ),
					'icon'      => 'uael-icon-contact-form-7',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/contact-form-7-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'form',
				),
				'ContentToggle'       => array(
					'slug'      => 'uael-content-toggle',
					'title'     => __( 'Content Toggle', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'toggle', 'content', 'show', 'hide' ),
					'icon'      => 'uael-icon-content-toggle',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/content-toggle/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Countdown'           => array(
					'slug'      => 'uael-countdown',
					'title'     => __( 'Countdown Timer', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'count', 'timer', 'countdown' ),
					'icon'      => 'uael-icon-countdown-timer',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/countdown-timer/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '6',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Dual_Heading'        => array(
					'slug'      => 'uael-dual-color-heading',
					'title'     => __( 'Dual Color Heading', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'dual', 'heading', 'color' ),
					'icon'      => 'uael-icon-dual-color-heading',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/dual-color-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-editor-screen&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Fancy_Heading'       => array(
					'slug'      => 'uael-fancy-heading',
					'title'     => __( 'Fancy Heading', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'fancy', 'heading', 'ticking', 'animate' ),
					'icon'      => 'uael-icon-fancy-heading',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/fancy-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'FAQ'                 => array(
					'slug'      => 'uael-faq',
					'title'     => __( 'FAQ Schema', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'faq', 'schema', 'question', 'answer', 'accordion', 'toggle' ),
					'icon'      => 'uael-icon-faq-schema',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/faq/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'seo',
				),
				'GoogleMap'           => array(
					'slug'         => 'uael-google-map',
					'title'        => __( 'Google Map', 'header-footer-elementor' ),
					'keywords'     => array( 'uael', 'google', 'map', 'location', 'address' ),
					'icon'         => 'uael-icon-google-map',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/google-maps/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'content',
					'is_pro'   	=> true,
				),
				'GfStyler'            => array(
					'slug'      => 'uael-gf-styler',
					'title'     => __( 'Gravity Form Styler', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'form', 'gravity', 'gf', 'styler' ),
					'icon'      => 'uael-icon-gravity-form-styler',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/gravity-form-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'form',
				),
				'Hotspot'             => array(
					'slug'      => 'uael-hotspot',
					'title'     => __( 'Hotspot', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'hotspot', 'tour' ),
					'icon'      => 'uael-icon-hotspot',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/hotspot/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'HowTo'               => array(
					'slug'      => 'uael-how-to',
					'title'     => __( 'How-to Schema', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'how-to', 'howto', 'schema', 'steps', 'supply', 'tools', 'steps', 'cost' ),
					'icon'      => 'uael-icon-how-to-schema',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/how-to-schema/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'seo',
				),
				'Image_Gallery'       => array(
					'slug'      => 'uael-image-gallery',
					'title'     => __( 'Image Gallery', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'image', 'gallery', 'carousel', 'slider', 'layout' ),
					'icon'      => 'uael-icon-image-gallery',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/image-gallery/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Infobox'             => array(
					'slug'      => 'uael-infobox',
					'title'     => __( 'Info Box', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'info', 'box', 'bar' ),
					'icon'      => 'uael-icon-info-box',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/info-box/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Instagram_Feed'      => array(
					'slug'         => 'uael-instagram-feed',
					'title'        => __( 'Instagram Feed', 'header-footer-elementor' ),
					'keywords'     => array( 'insta', 'instagram', 'feed', 'social' ),
					'icon'         => 'uael-icon-instagram-feed',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'setting_url'  => $integration_url,
					'is_pro'   	=> true,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/instagram-feed/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'creative',
					'is_pro'   	=> true,
				),
				'LoginForm'           => array(
					'slug'         => 'uael-login-form',
					'title'        => __( 'Login Form', 'header-footer-elementor' ),
					'keywords'     => array( 'uael', 'form', 'login', 'facebook', 'google', 'user', 'fblogin' ),
					'icon'         => 'uael-icon-login-form',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/login-form/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'is_pro'   	=> true,
					'category'     => 'form',
				),
				'Marketing_Button'    => array(
					'slug'      => 'uael-marketing-button',
					'title'     => __( 'Marketing Button', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'button', 'marketing', 'call to action', 'cta' ),
					'icon'      => 'uael-icon-marketing-button',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/marketing-button/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Modal_Popup'         => array(
					'slug'      => 'uael-modal-popup',
					'title'     => __( 'Modal Popup', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'modal', 'popup', 'lighbox' ),
					'icon'      => 'uael-icon-modal-popup',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/modal-popup/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Buttons'             => array(
					'slug'      => 'uael-buttons',
					'title'     => __( 'Multi Buttons', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'buttons', 'multi', 'call to action', 'cta' ),
					'icon'      => 'uael-icon-multi-button',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/multi-buttons/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '3',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Nav_Menu'            => array(
					'slug'      => 'uael-nav-menu',
					'title'     => __( 'Navigation Menu', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'menu', 'nav', 'navigation', 'mega' ),
					'icon'      => 'uael-icon-navigation-menu',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/navigation-menu/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Offcanvas'           => array(
					'slug'      => 'uael-offcanvas',
					'title'     => __( 'Off - Canvas', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'off', 'offcanvas', 'off-canvas', 'canvas', 'template', 'floating' ),
					'icon'      => 'uael-icon-off-canvas',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/off-canvas/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Posts'               => array(
					'slug'         => 'uael-posts',
					'title'        => __( 'Posts', 'header-footer-elementor' ),
					'keywords'     => array( 'uael', 'post', 'grid', 'masonry', 'carousel', 'content grid', 'content' ),
					'icon'         => 'uael-icon-posts',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $post_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/posts/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'content',
					'is_pro'   	=> true,
				),
				'Price_Table'         => array(
					'slug'      => 'uael-price-table',
					'title'     => __( 'Price Box', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'price', 'table', 'box', 'pricing' ),
					'icon'      => 'uael-icon-price-box',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/price-box/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Price_List'          => array(
					'slug'      => 'uael-price-list',
					'title'     => __( 'Price List', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'price', 'list', 'pricing' ),
					'icon'      => 'uael-icon-price-list',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/price-list/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Retina_Image'        => array(
					'slug'      => 'uael-retina-image',
					'title'     => __( 'Retina Image', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'retina', 'image', '2ximage' ),
					'icon'      => 'uael-icon-retina-image',
					'title_url' => '#',
					'default'   => true,

					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/retina-image/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'SocialShare'         => array(
					'slug'         => 'uael-social-share',
					'title'        => __( 'Social Share', 'header-footer-elementor' ),
					'keywords'     => array( 'uael', 'sharing', 'social', 'icon', 'button', 'like' ),
					'icon'         => 'uael-icon-social-share',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'setting_url'  => admin_url( 'options-general.php?page=uae&action=integration' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/social-share/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'is_pro'   	=> true,
					'category'     => 'creative',
				),
				'Table'               => array(
					'slug'      => 'uael-table',
					'title'     => __( 'Table', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'table', 'sort', 'search' ),
					'icon'      => 'uael-icon-table',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/table/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Table_of_Contents'   => array(
					'slug'      => 'uael-table-of-contents',
					'title'     => __( 'Table of Contents', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'table of contents', 'content', 'list', 'toc', 'index' ),
					'icon'      => 'uael-icon-table-of-content',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/table-of-contents/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'seo',
				),
				'Team_Member'         => array(
					'slug'      => 'uael-team-member',
					'title'     => __( 'Team Member', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'team', 'member' ),
					'icon'      => 'uael-icon-team-member',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/team-member/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Timeline'            => array(
					'slug'      => 'uael-timeline',
					'title'     => __( 'Timeline', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'timeline', 'history', 'scroll', 'post', 'content timeline' ),
					'icon'      => 'uael-icon-timeline',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/timeline/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'    => '5',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Twitter'             => array(
					'slug'         => 'uael-twitter',
					'title'        => __( 'Twitter Feed', 'header-footer-elementor' ),
					'keywords'     => array( 'uael', 'twitter' ),
					'icon'         => 'uael-icon-twitter-feed-icon',
					'title_url'    => '#',
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'default'      => true,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/twitter-feed/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'creative',
					'is_pro'   	=> true,
				),
				'RegistrationForm'    => array(
					'slug'         => 'uael-registration-form',
					'title'        => __( 'User Registration Form', 'header-footer-elementor' ),
					'keywords'     => array( 'uael', 'form', 'register', 'registration', 'user' ),
					'icon'         => 'uael-icon-registration-form',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/user-registration-form/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'is_pro'   	=> true,
					'category'     => 'form',
				),
				'Video'               => array(
					'slug'      => 'uael-video',
					'title'     => __( 'Video', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'video', 'youtube', 'vimeo', 'wistia', 'sticky', 'drag', 'float', 'subscribe' ),
					'icon'      => 'uael-icon-video',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/video/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Video_Gallery'       => array(
					'slug'      => 'uael-video-gallery',
					'title'     => __( 'Video Gallery', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'video', 'youtube', 'wistia', 'gallery', 'vimeo' ),
					'icon'      => 'uael-icon-video-gallery',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/video-gallery/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'content',
				),
				'Welcome_Music'       => array(
					'slug'      => 'uael-welcome-music',
					'title'     => __( 'Welcome Music', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'christmas', 'music', 'background', 'audio', 'welcome' ),
					'icon'      => 'uael-icon-welcome-music',
					'title_url' => '#',
					'default'   => false,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/welcome-music/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'creative',
				),
				'Woo_Add_To_Cart'     => array(
					'slug'      => 'uael-woo-add-to-cart',
					'title'     => __( 'Woo - Add To Cart', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'woo', 'cart', 'add to cart', 'products' ),
					'icon'      => 'uael-icon-woo-add-to-cart',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/woo-add-to-cart/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'woo',
				),
				'Woo_Categories'      => array(
					'slug'      => 'uael-woo-categories',
					'title'     => __( 'Woo - Categories', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'woo', 'categories', 'taxomonies', 'products' ),
					'icon'      => 'uael-icon-woo-category',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/woo-categories/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'woo',
				),
				'Woo_Checkout'        => array(
					'slug'      => 'uael-woo-checkout',
					'title'     => __( 'Woo - Checkout', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'woo', 'checkout', 'page', 'check' ),
					'icon'      => 'uael-icon-woo-checkout-1',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/woo-checkout/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'woo',
				),
				'Woo_Mini_Cart'       => array(
					'slug'      => 'uael-mini-cart',
					'title'     => __( 'Woo - Mini Cart', 'header-footer-elementor' ),
					'keywords'  => array( 'woo', 'woocommerce', 'cart', 'mini', 'minicart' ),
					'icon'      => 'uael-icon-woo-mini-cart',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/woo-mini-cart/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'woo',
				),
				'Woo_Products'        => array(
					'slug'      => 'uael-woo-products',
					'title'     => __( 'Woo - Products', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'woo', 'products' ),
					'icon'      => 'uael-icon-woo-product',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/woo-products/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'woo',
				),
				'FfStyler'            => array(
					'slug'      => 'uael-ff-styler',
					'title'     => __( 'WP Fluent Forms Styler', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'fluent', 'forms', 'wp' ),
					'icon'      => 'uael-icon-fluent-form-styler',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/wp-fluent-forms-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'form',
				),
				'WpfStyler'           => array(
					'slug'      => 'uael-wpf-styler',
					'title'     => __( 'WPForms Styler', 'header-footer-elementor' ),
					'keywords'  => array( 'uael', 'form', 'wp', 'wpform', 'styler' ),
					'icon'      => 'uael-icon-wp-form-styler',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/wpforms-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'form',
				),
				'DisplayConditions'   => array(
					'slug'         => 'uael-display-conditions',
					'title'        => __( 'Display Conditions', 'header-footer-elementor' ),
					'keywords'     => array(),
					'icon'         => '',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/display-conditions/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'extension',
					'is_pro'   	=> true,
				),
				'Particles'           => array(
					'slug'      => 'uael-particles',
					'title'     => __( 'Particles Background', 'header-footer-elementor' ),
					'keywords'  => array(),
					'icon'      => '',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/particles-background-extension/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'extension',
				),
				'PartyPropzExtension' => array(
					'slug'      => 'uael-party-propz-extension',
					'title'     => __( 'Party Propz', 'header-footer-elementor' ),
					'keywords'  => array(),
					'icon'      => '',
					'title_url' => '#',
					'default'   => false,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/party-propz-extensions/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'extension',
				),
				'SectionDivider'      => array(
					'slug'      => 'uael-section-divider',
					'title'     => __( 'Shape Divider', 'header-footer-elementor' ),
					'keywords'  => array(),
					'icon'      => '',
					'title_url' => '#',
					'default'   => false,
					'doc_url'   => HFE_DOMAIN . 'docs-category/widgets/uae-shape-dividers/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'extension',
				),
				'Cross_Domain'        => array(
					'slug'      => 'uael-cross-domain-copy-paste',
					'title'     => __( 'Cross-Site Copy Paste', 'header-footer-elementor' ),
					'keywords'  => array(),
					'icon'      => '',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/features/cross-site-copy-paste/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'feature',
				),
				'Presets'             => array(
					'slug'      => 'uael-presets',
					'title'     => __( 'Presets', 'header-footer-elementor' ),
					'keywords'  => array(),
					'icon'      => '',
					'title_url' => '#',
					'default'   => true,
					'doc_url'   => HFE_DOMAIN . 'docs-category/features/presets/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'is_pro'   	=> true,
					'category'  => 'feature',
				),
			);
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

		$theme_name = ! empty( $white_labels['astra']['name'] ) ? $white_labels['astra']['name'] : 'Astra';

		return [
			'theme_name'  => $theme_name,
			/* translators: %s: theme name */
			'description' => ! empty( $white_labels['astra']['description'] ) ? $white_labels['astra']['description'] : esc_html( sprintf( __( 'Powering over 1+ Million websites, %s is loved for the fast performance and ease of use it offers. It is suitable for all kinds of websites like blogs, portfolios, business, and WooCommerce stores.', 'header-footer-elementor' ), esc_html( $theme_name ) ) ),
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
				'desc'    => __( 'Free & Fastest WordPress Theme', 'header-footer-elementor' ),
				'wporg'   => 'https://wordpress.org/themes/astra/',
				'url'     => 'https://downloads.wordpress.org/theme/astra.zip',
				'siteurl' => $white_labels['author_url'],
				'slug'    => 'astra',
				'isFree'  => true,
				'status'  => self::get_theme_status( 'astra' ),
			],

			'astra-sites/astra-sites.php'               => [
				'icon'    => $images_url . 'plugin-st.png',
				'type'    => 'plugin',
				'name'    => esc_html__( 'Starter Templates', 'header-footer-elementor' ),
				'desc'    => esc_html__( 'Build you dream website in minutes with AI.', 'header-footer-elementor' ),
				'wporg'   => 'https://wordpress.org/plugins/astra-sites/',
				'url'     => 'https://downloads.wordpress.org/plugin/astra-sites.zip',
				'siteurl' => 'https://startertemplates.com/',
				'slug'    => 'astra-sites',
				'status'  => self::get_plugin_status( 'astra-sites/astra-sites.php' ),
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
                return 'Installed'; // Theme is installed but not active
            }
        } else {
            return 'Not Installed'; // Theme is not installed at all
        }
    }


}
