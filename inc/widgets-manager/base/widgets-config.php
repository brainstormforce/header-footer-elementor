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

// Include the necessary file to use get_plugins() function.
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

		self::$widget_list = [
			
				'Retina'               => [
				'slug'        => 'retina',
				'title'       => __( 'Retina Logo', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'retina', 'image', 'logo' ],
				'icon'        => 'hfe-icon-retina-logo',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/retina-logo-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'description' => __( 'Add a high-quality logo that looks sharp on any screen.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/retina-logo/',
				'category'    => 'content',
			],
				'Page_Title'           => [
				'slug'        => 'page-title',
				'title'       => __( 'Page Title', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'title', 'dynamic' ],
				'icon'        => 'hfe-icon-page-title',
				'title_url'   => '#',
				'default'     => true,
				'is_pro'      => false,
				'doc_url'     => 'https://ultimateelementor.com/docs/page-title-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'description' => __( 'Display the title of the current page dynamically.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/page-title/',
				'category'    => 'content',
			],
			'Site_Tagline'         => [
				'slug'        => 'hfe-site-tagline',
				'title'       => __( 'Site Tagline', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'site', 'tagline', 'tag' ],
				'icon'        => 'hfe-icon-site-tagline',
				'title_url'   => '#',
				'default'     => true,
				'is_pro'      => false,
				'doc_url'     => 'https://ultimateelementor.com/docs/site-tagline-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'description' => __( 'Display your site\'s tagline to enhance brand identity.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/site-tagline/',
				'category'    => 'content',
			],
			'Site_Title'           => [
				'slug'        => 'hfe-site-title',
				'title'       => __( 'Site Title', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'site', 'title', 'tag' ],
				'icon'        => 'hfe-icon-site-title',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/site-title-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'description' => __( 'Show your site’s name in a customizable style.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/site-title/',
				'category'    => 'content',
			],
			'Post_Info'            => [
				'slug'        => 'post-info-widget',
				'title'       => __( 'Post Info', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'post', 'info', 'meta', 'author', 'comments' ],
				'icon'        => 'hfe-icon-post-info',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/post-info-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'is_new'      => true,
				'description' => __( 'Show author, dates, and reading time with customizable styles.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/post-info/',
				'category'    => 'content',
			],
			'Basic_Posts'          => [
				'slug'        => 'hfe-basic-posts',
				'title'       => __( 'Basic Posts', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'posts', 'blog', 'grid', 'cards', 'basic', 'fast' ],
				'icon'        => 'hfe-icon-posts',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/basic-posts/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'is_new'      => true,
				'description' => __( 'Display posts in a fast, lightweight card layout with basic styling options.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/basic-posts/',
				'category'    => 'content',
			],
			'Breadcrumbs_Widget'   => [
				'slug'        => 'hfe-breadcrumbs-widget',
				'title'       => __( 'Breadcrumbs', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'breadcrumbs', 'links', 'path' ],
				'icon'        => 'hfe-icon-breadcrumbs',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/breadcrumbs-widgets/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'is_new'      => true,
				'description' => __( 'Add navigation links to guide visitors across your site.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/breadcrumbs/',
				'category'    => 'content',
			],
			'Scroll_To_Top'        => [
				'slug'        => 'scroll-to-top',
				'title'       => __( 'Scroll to Top', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'scroll', 'top', 'extension' ],
				'icon'        => 'hfe-icon-scroll-to-top',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/scroll-to-top-extension/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'is_new'      => true,
				'description' => __( 'Add a customizable button for quick, one-click top scrolling.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/scroll-to-top/',
				'category'    => 'extension',
			],
			'Cart'                 => [
				'slug'        => 'hfe-cart',
				'title'       => __( 'Cart', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'cart', 'shop', 'bag' ],
				'icon'        => 'hfe-icon-menu-cart',
				'title_url'   => '#',
				'default'     => true,
				'is_pro'      => false,
				'doc_url'     => 'https://ultimateelementor.com/docs/cart-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'description' => __( 'Show cart for seamless shopping experiences.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/cart/',
				'category'    => 'content',
			],
			'Copyright'            => [
				'slug'        => 'copyright',
				'title'       => __( 'Copyright', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'copyright', 'date' ],
				'icon'        => 'hfe-icon-copyright-widget',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/copyright-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'description' => __( 'Display customizable copyright text for your site\'s footer.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/copyright/',
				'category'    => 'content',
			],
			'Reading_Progress_Bar' => [
				'slug'        => 'reading-progress-bar',
				'title'       => __( 'Reading Progress Bar', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'reading', 'progress', 'extension' ],
				'icon'        => 'hfe-icon-progress-bar',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/reading-progress-bar-extension/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'is_new'      => true,
				'description' => __( 'Display a progress indicator as users read your content.', 'header-footer-elementor' ),
				'demo_url'    => '',
				'category'    => 'extension',
			],
			'Navigation_Menu'      => [
				'slug'        => 'navigation-menu',
				'title'       => __( 'Navigation Menu', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'navigation', 'menu', 'nav' ],
				'icon'        => 'hfe-icon-navigation-menu',
				'title_url'   => '#',
				'default'     => true,
				'doc_url'     => 'https://ultimateelementor.com/docs/navigation-menu/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'is_pro'      => false,
				'description' => __( 'Add stylish and functional menus for seamless site navigation.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/navigation/',
				'category'    => 'content',
			],
				'Site_Logo'            => [
				'slug'        => 'site-logo',
				'title'       => __( 'Site Logo', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'site', 'logo', 'image' ],
				'icon'        => 'hfe-icon-site-logo',
				'title_url'   => '#',
				'default'     => true,
				'is_pro'      => false,
				'doc_url'     => 'https://ultimateelementor.com/docs/site-logo-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'description' => __( 'Add your site\'s primary logo with flexible customization options.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/site-logo/',
				'category'    => 'content',
			],
				'Infocard'             => [
				'slug'        => 'hfe-infocard',
				'title'       => __( 'Info Card', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'icon', 'dynamic', 'box', 'card', 'cta' ],
				'icon'        => 'hfe-icon-infocard',
				'title_url'   => '#',
				'default'     => true,
				'is_pro'      => false,
				'doc_url'     => 'https://ultimateelementor.com/docs/info-card-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'description' => __( 'Add icon, heading, description & button/link — all in one widget.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/info-card/',
				'category'    => 'content',
			],
				'Search_Button'        => [
				'slug'        => 'hfe-search-button',
				'title'       => __( 'Search', 'header-footer-elementor' ),
				'keywords'    => [ 'uael', 'title', 'dynamic' ],
				'icon'        => 'hfe-icon-search',
				'title_url'   => '#',
				'default'     => true,
				'is_pro'      => false,
				'doc_url'     => 'https://ultimateelementor.com/docs/search-widget/?utm_source=plugin-editor&utm_medium=need-help-button&utm_campaign=uae-documentation',
				'description' => __( 'Add a search bar to help visitors find content easily.', 'header-footer-elementor' ),
				'demo_url'    => 'https://ultimateelementor.com/widgets/search/',
				'category'    => 'content',
				],
		];

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
			$post_url        = '';

			self::$pro_widget_list = [
				
				'Advanced_Heading'    => [
					'slug'        => 'uael-advanced-heading',
					'title'       => __( 'Advanced Heading', 'header-footer-elementor' ),
					'description' => __( 'Create engaging and customizable headings for your pages.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'heading', 'advanced' ],
					'icon'        => 'hfe-icon-advanced-heading',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/advanced-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '6',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/advanced-heading/',
				],
				'Modal_Popup'         => [
					'slug'        => 'uael-modal-popup',
					'title'       => __( 'Modal Popup', 'header-footer-elementor' ),
					'description' => __( 'Design engaging popups with interactive animations and content.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'modal', 'popup', 'lighbox' ],
					'icon'        => 'hfe-icon-modal-popup',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/modal-popup/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/modal-popup/',
				],
				'Infobox'             => [
					'slug'        => 'uael-infobox',
					'title'       => __( 'Info Box', 'header-footer-elementor' ),
					'description' => __( 'Add headings, icons, and descriptions in one flexible widget.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'info', 'box', 'bar' ],
					'icon'        => 'hfe-icon-info-box',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/info-box/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/info-box/',
				],
				'Posts'               => [
					'slug'         => 'uael-posts',
					'title'        => __( 'Posts', 'header-footer-elementor' ),
					'description'  => __( 'Display and customize blog posts beautifully on your site.', 'header-footer-elementor' ),
					'keywords'     => [ 'uael', 'post', 'grid', 'masonry', 'carousel', 'content grid', 'content' ],
					'icon'         => 'hfe-icon-posts',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $post_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/posts/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'content',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/posts/',
				],
				'ContentToggle'       => [
					'slug'        => 'uael-content-toggle',
					'title'       => __( 'Content Toggle', 'header-footer-elementor' ),
					'description' => __( 'Let users easily switch between two types of content.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'toggle', 'content', 'show', 'hide' ],
					'icon'        => 'hfe-icon-content-toggle',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/content-toggle/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/content-toggle/',
				],
				'BaSlider'            => [
					'slug'        => 'uael-ba-slider',
					'title'       => __( 'Before After Slider', 'header-footer-elementor' ),
					'description' => __( 'Display the before and after versions of an image.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'slider', 'before', 'after' ],
					'icon'        => 'hfe-icon-before-after-slider',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/before-after-slider/?utm_source=uael-pro-dashboard&utm_medium=uael-editor-screen&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/before-after-slider/',
				],
				'Business_Hours'      => [
					'slug'        => 'uael-business-hours',
					'title'       => __( 'Business Hours', 'header-footer-elementor' ),
					'description' => __( 'Customize and display your business hours stylishly.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'business', 'hours', 'schedule' ],
					'icon'        => 'hfe-icon-business-hour',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/business-hours/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/business-hours/',
				],
				'Business_Reviews'    => [
					'slug'         => 'uael-business-reviews',
					'keywords'     => [ 'uael', 'reviews', 'wp reviews', 'business', 'wp business', 'google', 'rating', 'social', 'yelp' ],
					'title'        => __( 'Business Reviews', 'header-footer-elementor' ),
					'description'  => __( 'Display verified reviews from Google and Yelp directly.', 'header-footer-elementor' ),
					'icon'         => 'hfe-icon-business-review',
					'title_url'    => '#',
					'default'      => true,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/business-reviews/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'category'     => 'seo',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/business-reviews/',
				],
				'CfStyler'            => [
					'slug'        => 'uael-cf7-styler',
					'title'       => __( 'Contact Form 7 Styler', 'header-footer-elementor' ),
					'description' => __( 'Style and enhance Contact Form 7 to fit your site.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'form', 'cf7', 'contact', 'styler' ],
					'icon'        => 'hfe-icon-contact-form-7',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/contact-form-7-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'form',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/contact-form-7/',
				],
				'Countdown'           => [
					'slug'        => 'uael-countdown',
					'title'       => __( 'Countdown Timer', 'header-footer-elementor' ),
					'description' => __( 'Create urgency with fixed or recurring countdowns.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'count', 'timer', 'countdown' ],
					'icon'        => 'hfe-icon-countdown-timer',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/countdown-timer/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '6',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/countdown-timer/',
				],
				'Dual_Heading'        => [
					'slug'        => 'uael-dual-color-heading',
					'title'       => __( 'Dual Color Heading', 'header-footer-elementor' ),
					'description' => __( 'Style headings with dual colours and customizable typography.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'dual', 'heading', 'color' ],
					'icon'        => 'hfe-icon-dual-color-heading',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/dual-color-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-editor-screen&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/dual-color-heading/',
				],
				'Fancy_Heading'       => [
					'slug'        => 'uael-fancy-heading',
					'title'       => __( 'Fancy Heading', 'header-footer-elementor' ),
					'description' => __( 'Add animated text for more engaging page titles.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'fancy', 'heading', 'ticking', 'animate' ],
					'icon'        => 'hfe-icon-fancy-heading',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/fancy-heading/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/fancy-heading/',
				],
				'FAQ'                 => [
					'slug'        => 'uael-faq',
					'title'       => __( 'FAQ Schema', 'header-footer-elementor' ),
					'description' => __( 'Add SEO-friendly FAQ sections to pages.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'faq', 'schema', 'question', 'answer', 'accordion', 'toggle' ],
					'icon'        => 'hfe-icon-faq-schema',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/faq/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'seo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/faq/',
				],
				'GoogleMap'           => [
					'slug'         => 'uael-google-map',
					'title'        => __( 'Google Map', 'header-footer-elementor' ),
					'description'  => __( 'Add customizable, multi-location maps with custom markers.', 'header-footer-elementor' ),
					'keywords'     => [ 'uael', 'google', 'map', 'location', 'address' ],
					'icon'         => 'hfe-icon-google-map',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/google-maps/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'content',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/google-maps/',
				],
				'GfStyler'            => [
					'slug'        => 'uael-gf-styler',
					'title'       => __( 'Gravity Form Styler', 'header-footer-elementor' ),
					'description' => __( 'Customize Gravity Forms with advanced styling options.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'form', 'gravity', 'gf', 'styler' ],
					'icon'        => 'hfe-icon-gravity-form-styler',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/gravity-form-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'form',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/gravity-form-styler/',
				],
				'Hotspot'             => [
					'slug'        => 'uael-hotspot',
					'title'       => __( 'Hotspot', 'header-footer-elementor' ),
					'description' => __( 'Add interactive points on images for detailed visual tours.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'hotspot', 'tour' ],
					'icon'        => 'hfe-icon-hotspot',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/hotspot/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/hotspots/',
				],
				'HowTo'               => [
					'slug'        => 'uael-how-to',
					'title'       => __( 'How-to Schema', 'header-footer-elementor' ),
					'description' => __( 'Create structured how-to pages with automatic schema markup.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'how-to', 'howto', 'schema', 'steps', 'supply', 'tools', 'steps', 'cost' ],
					'icon'        => 'hfe-icon-how-to-schema',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/how-to-schema/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'seo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/how-to-schema/',
				],
				'Image_Gallery'       => [
					'slug'        => 'uael-image-gallery',
					'title'       => __( 'Image Gallery', 'header-footer-elementor' ),
					'description' => __( 'Build attractive, feature-rich galleries with advanced options.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'image', 'gallery', 'carousel', 'slider', 'layout' ],
					'icon'        => 'hfe-icon-image-gallery',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/image-gallery/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/image-gallery/',
				],
				'Instagram_Feed'      => [
					'slug'         => 'uael-instagram-feed',
					'title'        => __( 'Instagram Feed', 'header-footer-elementor' ),
					'description'  => __( 'Display an attractive, customizable Instagram feed.', 'header-footer-elementor' ),
					'keywords'     => [ 'insta', 'instagram', 'feed', 'social' ],
					'icon'         => 'hfe-icon-instagram-feed',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/instagram-feed/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'creative',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/instagram-feed/',
				],
				'LoginForm'           => [
					'slug'         => 'uael-login-form',
					'title'        => __( 'Login Form', 'header-footer-elementor' ),
					'description'  => __( 'Design beautiful, customizable WordPress login forms.', 'header-footer-elementor' ),
					'keywords'     => [ 'uael', 'form', 'login', 'facebook', 'google', 'user', 'fblogin' ],
					'icon'         => 'hfe-icon-login-form',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/login-form/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'category'     => 'form',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/login-form/',
				],
				'Marketing_Button'    => [
					'slug'        => 'uael-marketing-button',
					'title'       => __( 'Marketing Button', 'header-footer-elementor' ),
					'description' => __( 'Create High-impact, customizable CTA for promotions and conversions.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'button', 'marketing', 'call to action', 'cta' ],
					'icon'        => 'hfe-icon-marketing-button',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/marketing-button/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/marketing-button/',
				],
				'Buttons'             => [
					'slug'        => 'uael-buttons',
					'title'       => __( 'Multi Buttons', 'header-footer-elementor' ),
					'description' => __( 'Create a versatile dual-button setup for navigation and interactive web elements.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'buttons', 'multi', 'call to action', 'cta' ],
					'icon'        => 'hfe-icon-multi-button',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/multi-buttons/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '3',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/multi-buttons/',
				],
				'Nav_Menu'            => [
					'slug'        => 'uael-nav-menu',
					'title'       => __( 'Navigation Menu', 'header-footer-elementor' ),
					'description' => __( 'Build easy-to-navigate, visually appealing site menus.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'menu', 'nav', 'navigation', 'mega' ],
					'icon'        => 'hfe-icon-navigation-menu',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/navigation-menu/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/navigation-menu/',
				],
				'Offcanvas'           => [
					'slug'        => 'uael-offcanvas',
					'title'       => __( 'Off - Canvas', 'header-footer-elementor' ),
					'description' => __( 'Create sliding panels for navigation or extra content.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'off', 'offcanvas', 'off-canvas', 'canvas', 'template', 'floating' ],
					'icon'        => 'hfe-icon-off-canvas',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/off-canvas/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/off-canvas/',
				],
				'Price_Table'         => [
					'slug'        => 'uael-price-table',
					'title'       => __( 'Price Box', 'header-footer-elementor' ),
					'description' => __( 'Showcase prices and features in customizable layouts.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'price', 'table', 'box', 'pricing' ],
					'icon'        => 'hfe-icon-price-box',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/price-box/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/price-box/',
				],
				'Price_List'          => [
					'slug'        => 'uael-price-list',
					'title'       => __( 'Price List', 'header-footer-elementor' ),
					'description' => __( 'Create elegant, customizable lists for menus or product catalogues.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'price', 'list', 'pricing' ],
					'icon'        => 'hfe-icon-price-list',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/price-list/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/price-list/',
				],
				'Retina_Image'        => [
					'slug'        => 'uael-retina-image',
					'title'       => __( 'Retina Image', 'header-footer-elementor' ),
					'description' => __( 'Ensure images look crisp on high-resolution screens.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'retina', 'image', '2ximage' ],
					'icon'        => 'hfe-icon-retina-image',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/retina-image/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/retina-image/',
				],
				'SocialShare'         => [
					'slug'         => 'uael-social-share',
					'title'        => __( 'Social Share', 'header-footer-elementor' ),
					'description'  => __( 'Enable quick content sharing with social media buttons.', 'header-footer-elementor' ),
					'keywords'     => [ 'uael', 'sharing', 'social', 'icon', 'button', 'like' ],
					'icon'         => 'hfe-icon-social-share',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/social-share/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'category'     => 'creative',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/social-share/',
				],
				'Table'               => [
					'slug'        => 'uael-table',
					'title'       => __( 'Table', 'header-footer-elementor' ),
					'description' => __( 'Build responsive, styled tables to display data.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'table', 'sort', 'search' ],
					'icon'        => 'hfe-icon-table',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/table/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/table/',
				],
				'Table_of_Contents'   => [
					'slug'        => 'uael-table-of-contents',
					'title'       => __( 'Table of Contents', 'header-footer-elementor' ),
					'description' => __( 'Improve page readability with automatic, customizable TOCs.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'table of contents', 'content', 'list', 'toc', 'index' ],
					'icon'        => 'hfe-icon-table-of-content',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/table-of-contents/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'seo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/table-of-contents/',
				],
				'Team_Member'         => [
					'slug'        => 'uael-team-member',
					'title'       => __( 'Team Member', 'header-footer-elementor' ),
					'description' => __( 'Highlight team members with customizable layouts.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'team', 'member' ],
					'icon'        => 'hfe-icon-team-member',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/team-member/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/team-member/',
				],
				'Timeline'            => [
					'slug'        => 'uael-timeline',
					'title'       => __( 'Timeline', 'header-footer-elementor' ),
					'description' => __( 'Display timelines or roadmaps with advanced styling options.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'timeline', 'history', 'scroll', 'post', 'content timeline' ],
					'icon'        => 'hfe-icon-timeline',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/timeline/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'      => '5',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/timeline/',
				],
				'Twitter'             => [
					'slug'         => 'uael-twitter',
					'title'        => __( 'Twitter Feed', 'header-footer-elementor' ),
					'description'  => __( 'Embed Twitter feeds to show real-time content updates.', 'header-footer-elementor' ),
					'keywords'     => [ 'uael', 'twitter' ],
					'icon'         => 'hfe-icon-twitter-feed-icon',
					'title_url'    => '#',
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'default'      => true,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/twitter-feed/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'creative',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/twitter-feed/',
				],
				'RegistrationForm'    => [
					'slug'         => 'uael-registration-form',
					'title'        => __( 'User Registration Form', 'header-footer-elementor' ),
					'description'  => __( 'Create beautiful, custom registration forms for users.', 'header-footer-elementor' ),
					'keywords'     => [ 'uael', 'form', 'register', 'registration', 'user' ],
					'icon'         => 'hfe-icon-registration-form',
					'title_url'    => '#',
					'default'      => true,
					'setting_url'  => $integration_url,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/user-registration-form/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'preset'       => '5',
					'category'     => 'form',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/user-registration-form/',
				],
				'Video'               => [
					'slug'        => 'uael-video',
					'title'       => __( 'Video', 'header-footer-elementor' ),
					'description' => __( 'Embed optimized videos with customizable thumbnails and play buttons.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'video', 'youtube', 'vimeo', 'wistia', 'sticky', 'drag', 'float', 'subscribe' ],
					'icon'        => 'hfe-icon-video',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/video/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/video/',
				],
				'Video_Gallery'       => [
					'slug'        => 'uael-video-gallery',
					'title'       => __( 'Video Gallery', 'header-footer-elementor' ),
					'description' => __( 'Showcase multiple videos without impacting load times.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'video', 'youtube', 'wistia', 'gallery', 'vimeo' ],
					'icon'        => 'hfe-icon-video-gallery',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/video-gallery/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'content',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/video-gallery/',
				],
				'Welcome_Music'       => [
					'slug'        => 'uael-welcome-music',
					'title'       => __( 'Welcome Music', 'header-footer-elementor' ),
					'description' => __( 'Play background audio to engage visitors upon page load.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'christmas', 'music', 'background', 'audio', 'welcome' ],
					'icon'        => 'hfe-icon-welcome-music',
					'title_url'   => '#',
					'default'     => false,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/welcome-music/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'creative',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/welcome-music/',
				],
				'Woo_Add_To_Cart'     => [
					'slug'        => 'uael-woo-add-to-cart',
					'title'       => __( 'Woo - Add To Cart', 'header-footer-elementor' ),
					'description' => __( 'Let users add items to cart with one click.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'woo', 'cart', 'add to cart', 'products' ],
					'icon'        => 'hfe-icon-woo-add-to-cart',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-add-to-cart/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-add-to-cart/',
				],
				'Woo_Categories'      => [
					'slug'        => 'uael-woo-categories',
					'title'       => __( 'Woo - Categories', 'header-footer-elementor' ),
					'description' => __( 'Display product categories beautifully.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'woo', 'categories', 'taxomonies', 'products' ],
					'icon'        => 'hfe-icon-woo-category',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-categories/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-categories/',
				],
				'Woo_Checkout'        => [
					'slug'        => 'uael-woo-checkout',
					'title'       => __( 'Woo - Checkout', 'header-footer-elementor' ),
					'description' => __( 'Design optimized checkout pages for better conversions.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'woo', 'checkout', 'page', 'check' ],
					'icon'        => 'hfe-icon-woo-checkout-1',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-checkout/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-checkout/',
				],
				'Woo_Mini_Cart'       => [
					'slug'        => 'uael-mini-cart',
					'title'       => __( 'Woo - Mini Cart', 'header-footer-elementor' ),
					'description' => __( 'Show a mini-cart for seamless shopping experiences.', 'header-footer-elementor' ),
					'keywords'    => [ 'woo', 'woocommerce', 'cart', 'mini', 'minicart' ],
					'icon'        => 'hfe-icon-woo-mini-cart',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-mini-cart/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-mini-cart/',
				],
				'Woo_Products'        => [
					'slug'        => 'uael-woo-products',
					'title'       => __( 'Woo - Products', 'header-footer-elementor' ),
					'description' => __( 'Present products with detailed, customizable layouts.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'woo', 'products' ],
					'icon'        => 'hfe-icon-woo-product',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/woo-products/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'woo',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/woo-products/',
				],
				'FfStyler'            => [
					'slug'        => 'uael-ff-styler',
					'title'       => __( 'WP Fluent Forms Styler', 'header-footer-elementor' ),
					'description' => __( 'Style WP Fluent Forms for an attractive, cohesive look.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'fluent', 'forms', 'wp' ],
					'icon'        => 'hfe-icon-fluent-form-styler',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/wp-fluent-forms-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'form',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/wp-fluent-forms-styler/',
				],
				'WpfStyler'           => [
					'slug'        => 'uael-wpf-styler',
					'title'       => __( 'WPForms Styler', 'header-footer-elementor' ),
					'description' => __( 'Upgrade WPForms with customizable design and layout options.', 'header-footer-elementor' ),
					'keywords'    => [ 'uael', 'form', 'wp', 'wpform', 'styler' ],
					'icon'        => 'hfe-icon-wp-form-styler',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/wpforms-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'form',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/wpforms-styler/',
				],
				'DisplayConditions'   => [
					'slug'         => 'uael-display-conditions',
					'title'        => __( 'Display Conditions', 'header-footer-elementor' ),
					'description'  => __( 'Show or hide content based on user interactions.', 'header-footer-elementor' ),
					'keywords'     => [],
					'icon'         => 'hfe-icon-display-conditions',
					'title_url'    => '#',
					'default'      => true,
					'setting_text' => __( 'Settings', 'header-footer-elementor' ),
					'setting_url'  => $integration_url,
					'doc_url'      => HFE_DOMAIN . 'docs-category/widgets/display-conditions/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'     => 'extension',
					'is_pro'       => true,
					'demo_url'     => HFE_DOMAIN . 'widgets/display-conditions/',
				],
				'Particles'           => [
					'slug'        => 'uael-particles',
					'title'       => __( 'Particle Backgrounds', 'header-footer-elementor' ),
					'description' => __( 'Add dynamic, animated backgrounds to sections and columns.', 'header-footer-elementor' ),
					'keywords'    => [],
					'icon'        => 'hfe-icon-particles',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/particles-background-extension/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'extension',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/particle-backgrounds/',
				],
				'PartyPropzExtension' => [
					'slug'        => 'uael-party-propz-extension',
					'title'       => __( 'Party Propz', 'header-footer-elementor' ),
					'description' => __( 'Decorate your site with festive seasonal elements easily.', 'header-footer-elementor' ),
					'keywords'    => [],
					'icon'        => 'hfe-icon-party-propz',
					'title_url'   => '#',
					'default'     => false,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/party-propz-extensions/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'extension',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/party-propz/',
				],
				'SectionDivider'      => [
					'slug'        => 'uael-section-divider',
					'title'       => __( 'Shape Divider', 'header-footer-elementor' ),
					'description' => __( 'Add new attractive shape dividers to Elementor sections.', 'header-footer-elementor' ),
					'keywords'    => [],
					'icon'        => 'hfe-icon-shape-divider',
					'title_url'   => '#',
					'default'     => false,
					'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/uae-shape-dividers/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'extension',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/uae-shape-dividers/',
				],
				'Cross_Domain'        => [
					'slug'        => 'uael-cross-domain-copy-paste',
					'title'       => __( 'Cross-Site Copy Paste', 'header-footer-elementor' ),
					'description' => __( 'Copy and paste Elementor content between websites.', 'header-footer-elementor' ),
					'keywords'    => [],
					'icon'        => 'hfe-icon-cdcp',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/features/cross-site-copy-paste/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'feature',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/cross-site-copy-paste/',
				],
				'Presets'             => [
					'slug'        => 'uael-presets',
					'title'       => __( 'Presets', 'header-footer-elementor' ),
					'description' => __( 'Use pre-made widget templates to accelerate your design process.', 'header-footer-elementor' ),
					'keywords'    => [],
					'icon'        => 'hfe-icon-presets',
					'title_url'   => '#',
					'default'     => true,
					'doc_url'     => HFE_DOMAIN . 'docs-category/features/presets/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
					'category'    => 'feature',
					'is_pro'      => true,
					'demo_url'    => HFE_DOMAIN . 'widgets/presets/',
				],
			];

			if ( class_exists( 'Caldera_Forms' ) || class_exists( 'Caldera_Forms_Forms' ) ) {
				$forms = \Caldera_Forms_Forms::get_forms( true );
				if ( ! empty( $forms ) ) {
					$caldera = [
						'CafStyler' => [
							'slug'        => 'uael-caf-styler',
							'title'       => __( 'Caldera Form Styler', 'header-footer-elementor' ),
							'description' => __( 'Style and enhance Caldera Forms to fit your site.', 'header-footer-elementor' ),
							'keywords'    => [ 'uael', 'caldera', 'form', 'styler' ],
							'icon'        => 'hfe-icon-wp-form-styler',
							'title_url'   => '#',
							'default'     => true,
							'doc_url'     => HFE_DOMAIN . 'docs-category/widgets/caldera-form-styler/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
							'category'    => 'form',
							'is_pro'      => true,
						],
					];
	
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
		return self::get_widget_list() + self::get_pro_widget_list(); // Use + operator to merge associative arrays.
	}

   
	/**
	 * Function for Astra Pro white labels with defaults.
	 *
	 * @since 2.2.1
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

		$plugins = [

				'surerank/surerank.php'                        => [
				'icon'         => $images_url . 'surerank.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'Boost Your Traffic with Easy SEO Optimization!', 'header-footer-elementor' ),
				'desc'         => esc_html__( 'Rank higher with effortless SEO optimization. SureRank offers a simple, clutter-free interface with lightweight code, minimal setup, clear meta and schema settings, and smart content optimization that actually makes sense, helping you grow your traffic easily.', 'header-footer-elementor' ),
				'wporg'        => 'https://wordpress.org/plugins/surerank/',
				'url'          => 'https://downloads.wordpress.org/plugin/surerank.zip',
				'siteurl'      => 'https://surerank.com/',
				'isFree'       => true,
				'slug'         => 'surerank',
				'status'       => self::get_plugin_status( 'surerank/surerank.php' ),
				'settings_url' => admin_url( 'admin.php?page=surerank_onboarding' ),
			],
			'surecart/surecart.php'                        => [
				'icon'         => $images_url . 'surecart.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'Sell Products Effortlessly with SureCart!', 'header-footer-elementor' ),
				'desc'         => esc_html__( 'Sell your products effortlessly with a modern, flexible eCommerce system. SureCart makes it easy to set up one-click checkout, manage subscriptions, recover abandoned carts, and collect secure payments, helping you launch and grow your online store confidently.', 'header-footer-elementor' ),
				'wporg'        => 'https://wordpress.org/plugins/surecart/',
				'url'          => 'https://downloads.wordpress.org/plugin/surecart.zip',
				'siteurl'      => 'https://surecart.com/',
				'isFree'       => true,
				'slug'         => 'surecart',
				'status'       => self::get_plugin_status( 'surecart/surecart.php' ),
				'settings_url' => admin_url( 'admin.php?page=sc-getting-started' ),
			],
			'sureforms/sureforms.php'                      => [
				'icon'         => $images_url . 'sureforms.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'Build Powerful Forms in Minutes with SureForms!', 'header-footer-elementor' ),
				'desc'         => esc_html__( 'Build powerful forms in minutes without complexity. SureForms lets you create contact forms, payment forms, and surveys using an AI-assisted, clean interface with conversational layouts, conditional logic, payment collection, and mobile optimization for a seamless experience.', 'header-footer-elementor' ),
				'wporg'        => 'https://wordpress.org/plugins/sureforms/',
				'url'          => 'https://downloads.wordpress.org/plugin/sureforms.zip',
				'siteurl'      => 'https://sureforms.com/',
				'slug'         => 'sureforms',
				'isFree'       => true,
				'status'       => self::get_plugin_status( 'sureforms/sureforms.php' ),
				'settings_url' => admin_url( 'admin.php?page=sureforms_menu' ),
			],
			'presto-player/presto-player.php'              => [
				'icon'         => $images_url . 'pplayer.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'Add Engaging Videos Seamlessly with Presto Player!', 'header-footer-elementor' ),
				'desc'         => html_entity_decode( esc_html__( 'Add engaging videos seamlessly in minutes without complexity. Presto Player lets you enhance your website with videos using branding, chapters, and call-to-actions while providing fast load times, detailed analytics, and user-friendly controls for a seamless viewing experience.', 'header-footer-elementor' ) ),
				'wporg'        => 'https://wordpress.org/plugins/presto-player/',
				'url'          => 'https://downloads.wordpress.org/plugin/presto-player.zip',
				'siteurl'      => 'https://prestoplayer.com/',
				'slug'         => 'presto-player',
				'isFree'       => true,
				'status'       => self::get_plugin_status( 'presto-player/presto-player.php' ),
				'settings_url' => admin_url( 'edit.php?post_type=pp_video_block' ),
			],
			'suretriggers/suretriggers.php'                => [
				'icon'         => $images_url . 'OttoKit-Symbol-Primary.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'Automate Your Workflows Easily with Ottokit!', 'header-footer-elementor' ),
				'desc'         => esc_html__( 'Automate workflows effortlessly in minutes without complexity. Ottokit lets you connect your WordPress site with web apps to automate tasks, sync data, and run actions using a clean visual builder with scheduling, filters, conditions, and webhooks for a seamless experience.', 'header-footer-elementor' ),
				'wporg'        => 'https://wordpress.org/plugins/suretriggers/',
				'url'          => 'https://downloads.wordpress.org/plugin/suretriggers.zip',
				'siteurl'      => 'https://ottokit.com/',
				'slug'         => 'suretriggers',
				'isFree'       => true,
				'status'       => self::get_plugin_status( 'suretriggers/suretriggers.php' ),
				'settings_url' => admin_url( 'admin.php?page=suretriggers' ),
			],

		];

		foreach ( $plugins as $key => $plugin ) {
			// Check if it's a plugin and is active.
			if ( 'plugin' === $plugin['type'] && is_plugin_active( $key ) ) {
				unset( $plugins[ $key ] );
			}

			if ( 'plugin' === $plugin['type'] && 'astra-sites/astra-sites.php' === $key ) {
				$st_pro_status = self::get_plugin_status( 'astra-pro-sites/astra-pro-sites.php' );
				if ( 'Installed' === $st_pro_status || 'Activated' === $st_pro_status ) {
					unset( $plugins[ $key ] );
				}
			}

			if ( 'theme' === $plugin['type'] ) {
				$current_theme = wp_get_theme();
				if ( $current_theme->get_stylesheet() === $plugin['slug'] ) {
					unset( $plugins[ $key ] );
				}
			}
		}

		return $plugins;
	}

	/**
	 * List of plugins that we propose to install.
	 *
	 * @since 1.6.0
	 *
	 * @return array
	 */
	public static function get_recommended_bsf_plugins() {

		$white_labels = self::get_white_label();

		$images_url = HFE_URL . 'assets/images/settings/';

		$recommended_plugins = [


				'astra-sites/astra-sites.php'                  => [
				'icon'         => $images_url . 'stemplates.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'Starter Templates', 'header-footer-elementor' ),
				'desc'         => esc_html__( 'Quickly launch websites with 300+ professionally designed Elementor templates.', 'header-footer-elementor' ),
				'wporg'        => 'https://wordpress.org/plugins/astra-sites/',
				'url'          => 'https://downloads.wordpress.org/plugin/astra-sites.zip',
				'siteurl'      => 'https://startertemplates.com/',
				'slug'         => 'astra-sites',
				'isFree'       => true,
				'status'       => self::get_plugin_status( 'astra-sites/astra-sites.php' ),
				'settings_url' => admin_url( 'admin.php?page=starter-templates' ),
			],
			'surerank/surerank.php'                        => [
				'icon'         => $images_url . 'surerank_extend.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'SureRank', 'header-footer-elementor' ),
				'desc'         => esc_html__( 'Powerful, lightweight SEO plugin to manage search and social previews', 'header-footer-elementor' ),
				'wporg'        => 'https://wordpress.org/plugins/surerank/',
				'url'          => 'https://downloads.wordpress.org/plugin/surerank.zip',
				'siteurl'      => 'https://surerank.com/',
				'isFree'       => true,
				'slug'         => 'surerank',
				'status'       => self::get_plugin_status( 'surerank/surerank.php' ),
				'settings_url' => admin_url( 'admin.php?page=surerank_onboarding' ),
			],
			'sureforms/sureforms.php'                      => [
				'icon'         => $images_url . 'sureforms_extend.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'SureForms', 'header-footer-elementor' ),
				'desc'         => esc_html__( 'Create high-converting forms with ease.', 'header-footer-elementor' ),
				'wporg'        => 'https://wordpress.org/plugins/sureforms/',
				'url'          => 'https://downloads.wordpress.org/plugin/sureforms.zip',
				'siteurl'      => 'https://sureforms.com/',
				'slug'         => 'sureforms',
				'isFree'       => true,
				'status'       => self::get_plugin_status( 'sureforms/sureforms.php' ),
				'settings_url' => admin_url( 'admin.php?page=sureforms_menu' ),
			],
			'suretriggers/suretriggers.php'                => [
				'icon'         => $images_url . 'ottokit.svg',
				'type'         => 'plugin',
				'name'         => esc_html__( 'OttoKit (Formerly SureTriggers)', 'header-footer-elementor' ),
				'desc'         => esc_html__( 'Automate WordPress tasks effortlessly.', 'header-footer-elementor' ),
				'wporg'        => 'https://wordpress.org/plugins/suretriggers/',
				'url'          => 'https://downloads.wordpress.org/plugin/suretriggers.zip',
				'siteurl'      => 'https://ottokit.com/',
				'slug'         => 'suretriggers',
				'isFree'       => true,
				'status'       => self::get_plugin_status( 'suretriggers/suretriggers.php' ),
				'settings_url' => admin_url( 'admin.php?page=suretriggers' ),
			],

		];

		foreach ( $recommended_plugins as $key => $plugin ) {
			// Check if it's a plugin and is active.
			if ( 'plugin' === $plugin['type'] && is_plugin_active( $key ) ) {
				unset( $recommended_plugins[ $key ] );
			}

			if ( 'plugin' === $plugin['type'] && 'astra-sites/astra-sites.php' === $key ) {
				$st_pro_status = self::get_plugin_status( 'astra-pro-sites/astra-pro-sites.php' );
				if ( 'Installed' === $st_pro_status || 'Activated' === $st_pro_status ) {
					unset( $recommended_plugins[ $key ] );
				}
			}

			if ( 'theme' === $plugin['type'] ) {
				$current_theme = wp_get_theme();
				if ( $current_theme->get_stylesheet() === $plugin['slug'] ) {
					unset( $recommended_plugins[ $key ] );
				}
			}
		}

		return $recommended_plugins;
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
	 * Get the status of a theme.
	 *
	 * @param string $theme_slug The slug of the theme.
	 * @return string The theme status: 'Activated', 'Installed', or 'Install'.
	 *
	 * @since 0.0.1
	 */
	public static function get_theme_status( $theme_slug ) {
		$installed_themes = wp_get_themes();
	
		// Check if the theme is installed.
		if ( isset( $installed_themes[ $theme_slug ] ) ) {
			$current_theme = wp_get_theme();
		
			// Check if the current theme slug matches the provided theme slug.
			if ( $current_theme->get_stylesheet() === $theme_slug ) {
				return 'Activated'; // Theme is active.
			} else {
				return 'Installed'; // Theme is installed but not active.
			}
		} else {
			return 'Install'; // Theme is not installed at all.
		}
	}



}
