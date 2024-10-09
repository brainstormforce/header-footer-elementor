<?php
/**
 * UAEL Config.
 *
 * @package UAEL
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
				'title'     => __( 'Retina Image', 'uael' ),
				'keywords'  => array( 'uael', 'retina', 'image', 'logo' ),
				'icon'      => 'hfe-icon-retina-image',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			'Cart'    => array(
				'slug'      => 'hfe-cart',
				'title'     => __( 'Cart', 'uael' ),
				'keywords'  => array( 'uael', 'cart', 'shop', 'bag' ),
				'icon'      => 'hfe-icon-menu-cart',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			'Copyright'    => array(
				'slug'      => 'copyright',
				'title'     => __( 'Copyright', 'uael' ),
				'keywords'  => array( 'uael', 'copyright', 'date' ),
				'icon'      => 'hfe-icon-copyright-widget',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			'Navigation_Menu'    => array(
				'slug'      => 'navigation-menu',
				'title'     => __( 'Navigation Menu', 'uael' ),
				'keywords'  => array( 'uael', 'navigation', 'menu', 'nav' ),
				'icon'      => 'hfe-icon-navigation-menu',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			'Page_Title'    => array(
				'slug'      => 'page-title',
				'title'     => __( 'Page Title', 'uael' ),
				'keywords'  => array( 'uael', 'title', 'dynamic' ),
				'icon'      => 'hfe-icon-page-title',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			'Search_Button'    => array(
				'slug'      => 'hfe-search-button',
				'title'     => __( 'Search', 'uael' ),
				'keywords'  => array( 'uael', 'title', 'dynamic' ),
				'icon'      => 'hfe-icon-search',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			'Site_Logo'    => array(
				'slug'      => 'site-logo',
				'title'     => __( 'Site Logo', 'uael' ),
				'keywords'  => array( 'uael', 'site', 'logo', 'image' ),
				'icon'      => 'hfe-icon-site-logo',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			'Site_Tagline'    => array(
				'slug'      => 'hfe-site-tagline',
				'title'     => __( 'Site Tagline', 'uael' ),
				'keywords'  => array( 'uael', 'site', 'tagline', 'tag' ),
				'icon'      => 'hfe-icon-site-tagline',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
			'Site_Title'    => array(
				'slug'      => 'hfe-site-title',
				'title'     => __( 'Site Title', 'uael' ),
				'keywords'  => array( 'uael', 'site', 'title', 'tag' ),
				'icon'      => 'hfe-icon-site-title',
				'title_url' => '#',
				'default'   => true,
				'doc_url'   => '',
			),
		);

		return self::$widget_list;
	}

}
