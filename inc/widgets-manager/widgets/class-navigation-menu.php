<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

// Elementor Classes.
use Elementor\Controls_Manager;
use Elementor\Utils;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Background;
use Elementor\Widget_Base;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * Class Nav Menu.
 */
class Navigation_Menu extends Widget_Base {


	/**
	 * Menu index.
	 *
	 * @access protected
	 * @var int $nav_menu_index
	 */
	protected int $nav_menu_index = 1;

	/**
	 * Retrieve the widget name.
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'navigation-menu';
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Navigation Menu', 'header-footer-elementor' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'hfe-icon-navigation-menu';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return array( 'hfe-widgets' );
	}

	/**
	 * Retrieve the list of scripts the navigation menu depended on.
	 *
	 * Used to set scripts dependencies required to run the widget.
	 *
	 * @since 1.3.0
	 * @access public
	 *
	 * @return array Widget scripts dependencies.
	 */
	public function get_script_depends() {
		return array( 'hfe-frontend-js' );
	}

	/**
	 * Retrieve the menu index.
	 *
	 * Used to get index of nav menu.
	 *
	 * @since 1.3.0
	 * @access protected
	 *
	 * @return int nav index.
	 */
	protected function get_nav_menu_index() {
		return $this->nav_menu_index++;
	}

	/**
	 * Retrieve the list of available menus.
	 *
	 * Used to get the list of available menus.
	 *
	 * @since 1.3.0
	 * @access private
	 *
	 * @return array get WordPress menus list.
	 */
	private function get_available_menus() {

		$menus = wp_get_nav_menus();

		$options = array();

		foreach ( $menus as $menu ) {
			$options[ $menu->slug ] = $menu->name;
		}

		return $options;
	}

	/**
	 * Check if the Elementor is updated.
	 *
	 * @since 1.3.0
	 *
	 * @return boolean if Elementor updated.
	 */
	public static function is_elementor_updated() {
		if ( class_exists( 'Elementor\Icons_Manager' ) ) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Register Nav Menu controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	protected function register_controls() {

		$this->register_general_content_controls();
		$this->register_style_content_controls();
		$this->register_dropdown_content_controls();
	}

	/**
	 * Register Nav Menu General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_menu',
			array(
				'label' => __( 'Menu', 'header-footer-elementor' ),
			)
		);

		$menus = $this->get_available_menus();

		if ( ! empty( $menus ) ) {
			$this->add_control(
				'menu',
				array(
					'label'        => __( 'Menu', 'header-footer-elementor' ),
					'type'         => Controls_Manager::SELECT,
					'options'      => $menus,
					'default'      => array_keys( $menus )[0],
					'save_default' => true,
					/* translators: %s Nav menu URL */
					'description'  => sprintf( __( 'Go to the <a href="%s" target="_blank">Menus screen</a> to manage your menus.', 'header-footer-elementor' ), admin_url( 'nav-menus.php' ) ),
				)
			);
		} else {
			$this->add_control(
				'menu',
				array(
					'type'            => Controls_Manager::RAW_HTML,
					/* translators: %s Nav menu URL */
					'raw'             => sprintf( __( '<strong>There are no menus in your site.</strong><br>Go to the <a href="%s" target="_blank">Menus screen</a> to create one.', 'header-footer-elementor' ), admin_url( 'nav-menus.php?action=edit&menu=0' ) ),
					'content_classes' => 'elementor-panel-alert elementor-panel-alert-info',
				)
			);
		}

		$this->add_control(
			'menu_last_item',
			array(
				'label'     => __( 'Last Menu Item', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'none' => __( 'Default', 'header-footer-elementor' ),
					'cta'  => __( 'Button', 'header-footer-elementor' ),
				),
				'default'   => 'none',
				'condition' => array(
					'layout!' => 'expandible',
				),
			)
		);

		$this->add_control(
			'schema_support',
			array(
				'label'        => __( 'Enable Schema Support', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'no',
				'render_type'  => 'template',
				'separator'    => 'before',
			)
		);

		$current_theme = wp_get_theme();

		if ( 'Twenty Twenty-One' === $current_theme->get( 'Name' ) ) {
			$this->add_control(
				'hide_theme_icons',
				array(
					'label'        => __( 'Hide + & - Sign', 'header-footer-elementor' ),
					'type'         => Controls_Manager::SWITCHER,
					'label_on'     => __( 'Yes', 'header-footer-elementor' ),
					'label_off'    => __( 'No', 'header-footer-elementor' ),
					'return_value' => 'yes',
					'default'      => 'no',
					'prefix_class' => 'hfe-nav-menu__theme-icon-',
				)
			);
		}

		$this->end_controls_section();

			$this->start_controls_section(
				'section_layout',
				array(
					'label' => __( 'Layout', 'header-footer-elementor' ),
				)
			);

			$this->add_control(
				'layout',
				array(
					'label'   => __( 'Layout', 'header-footer-elementor' ),
					'type'    => Controls_Manager::SELECT,
					'default' => 'horizontal',
					'options' => array(
						'horizontal' => __( 'Horizontal', 'header-footer-elementor' ),
						'vertical'   => __( 'Vertical', 'header-footer-elementor' ),
						'expandible' => __( 'Expanded', 'header-footer-elementor' ),
						'flyout'     => __( 'Flyout', 'header-footer-elementor' ),
					),
				)
			);

			$this->add_control(
				'navmenu_align',
				array(
					'label'        => __( 'Alignment', 'header-footer-elementor' ),
					'type'         => Controls_Manager::CHOOSE,
					'options'      => array(
						'left'    => array(
							'title' => __( 'Left', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-left',
						),
						'center'  => array(
							'title' => __( 'Center', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-center',
						),
						'right'   => array(
							'title' => __( 'Right', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-right',
						),
						'justify' => array(
							'title' => __( 'Justify', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-stretch',
						),
					),
					'default'      => 'left',
					'condition'    => array(
						'layout' => array( 'horizontal', 'vertical' ),
					),
					'prefix_class' => 'hfe-nav-menu__align-',
				)
			);

			$this->add_control(
				'flyout_layout',
				array(
					'label'     => __( 'Flyout Orientation', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SELECT,
					'default'   => 'left',
					'options'   => array(
						'left'  => __( 'Left', 'header-footer-elementor' ),
						'right' => __( 'Right', 'header-footer-elementor' ),
					),
					'condition' => array(
						'layout' => 'flyout',
					),
				)
			);

			$this->add_control(
				'flyout_type',
				array(
					'label'       => __( 'Appear Effect', 'header-footer-elementor' ),
					'type'        => Controls_Manager::SELECT,
					'default'     => 'normal',
					'label_block' => false,
					'options'     => array(
						'normal' => __( 'Slide', 'header-footer-elementor' ),
						'push'   => __( 'Push', 'header-footer-elementor' ),
					),
					'render_type' => 'template',
					'condition'   => array(
						'layout' => 'flyout',
					),
				)
			);

			$this->add_responsive_control(
				'hamburger_align',
				array(
					'label'                => __( 'Hamburger Align', 'header-footer-elementor' ),
					'type'                 => Controls_Manager::CHOOSE,
					'default'              => 'center',
					'options'              => array(
						'left'   => array(
							'title' => __( 'Left', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-left',
						),
						'center' => array(
							'title' => __( 'Center', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-center',
						),
						'right'  => array(
							'title' => __( 'Right', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-right',
						),
					),
					'selectors_dictionary' => array(
						'left'   => 'margin-right: auto',
						'center' => 'margin: 0 auto',
						'right'  => 'margin-left: auto',
					),
					'selectors'            => array(
						'{{WRAPPER}} .hfe-nav-menu__toggle,
						{{WRAPPER}} .hfe-nav-menu-icon' => '{{VALUE}}',
					),
					'condition'            => array(
						'layout' => array( 'expandible', 'flyout' ),
					),
					'label_block'          => false,
					'frontend_available'   => true,
				)
			);

			$this->add_responsive_control(
				'hamburger_menu_align',
				array(
					'label'              => __( 'Menu Items Align', 'header-footer-elementor' ),
					'type'               => Controls_Manager::CHOOSE,
					'options'            => array(
						'flex-start'    => array(
							'title' => __( 'Left', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-left',
						),
						'center'        => array(
							'title' => __( 'Center', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-center',
						),
						'flex-end'      => array(
							'title' => __( 'Right', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-right',
						),
						'space-between' => array(
							'title' => __( 'Justify', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-stretch',
						),
					),
					'default'            => 'space-between',
					'condition'          => array(
						'layout' => array( 'expandible', 'flyout' ),
					),
					'selectors'          => array(
						'{{WRAPPER}} li.menu-item a' => 'justify-content: {{VALUE}};',
						'{{WRAPPER}} li .elementor-button-wrapper' => 'text-align: {{VALUE}};',
						'{{WRAPPER}}.hfe-menu-item-flex-end li .elementor-button-wrapper' => 'text-align: right;',
					),
					'prefix_class'       => 'hfe-menu-item-',
					'frontend_available' => true,
				)
			);

			$this->add_control(
				'submenu_icon',
				array(
					'label'        => __( 'Submenu Icon', 'header-footer-elementor' ),
					'type'         => Controls_Manager::SELECT,
					'default'      => 'arrow',
					'options'      => array(
						'arrow'   => __( 'Arrows', 'header-footer-elementor' ),
						'plus'    => __( 'Plus Sign', 'header-footer-elementor' ),
						'classic' => __( 'Classic', 'header-footer-elementor' ),
					),
					'prefix_class' => 'hfe-submenu-icon-',
				)
			);

			$this->add_control(
				'submenu_animation',
				array(
					'label'        => __( 'Submenu Animation', 'header-footer-elementor' ),
					'type'         => Controls_Manager::SELECT,
					'default'      => 'none',
					'options'      => array(
						'none'     => __( 'Default', 'header-footer-elementor' ),
						'slide_up' => __( 'Slide Up', 'header-footer-elementor' ),
					),
					'prefix_class' => 'hfe-submenu-animation-',
					'condition'    => array(
						'layout' => 'horizontal',
					),
				)
			);

			$this->add_control(
				'link_redirect',
				array(
					'label'        => __( 'Action On Menu Click', 'header-footer-elementor' ),
					'type'         => Controls_Manager::SELECT,
					'default'      => 'child',
					'description'  => __( 'For Horizontal layout, this will affect on the selected breakpoint', 'header-footer-elementor' ),
					'options'      => array(
						'child'     => __( 'Open Submenu', 'header-footer-elementor' ),
						'self_link' => __( 'Redirect To Self Link', 'header-footer-elementor' ),
					),
					'prefix_class' => 'hfe-link-redirect-',
				)
			);

			$this->add_control(
				'heading_responsive',
				array(
					'type'      => Controls_Manager::HEADING,
					'label'     => __( 'Responsive', 'header-footer-elementor' ),
					'separator' => 'before',
					'condition' => array(
						'layout' => array( 'horizontal', 'vertical' ),
					),
				)
			);

		$this->add_control(
			'dropdown',
			array(
				'label'        => __( 'Breakpoint', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SELECT,
				'default'      => 'tablet',
				'options'      => array(
					'mobile' => __( 'Mobile (768px >)', 'header-footer-elementor' ),
					'tablet' => __( 'Tablet (1025px >)', 'header-footer-elementor' ),
					'none'   => __( 'None', 'header-footer-elementor' ),
				),
				'prefix_class' => 'hfe-nav-menu__breakpoint-',
				'condition'    => array(
					'layout' => array( 'horizontal', 'vertical' ),
				),
				'render_type'  => 'template',
			)
		);

		$this->add_control(
			'resp_align',
			array(
				'label'                => __( 'Alignment', 'header-footer-elementor' ),
				'type'                 => Controls_Manager::CHOOSE,
				'options'              => array(
					'left'   => array(
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-left',
					),
					'center' => array(
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-center',
					),
					'right'  => array(
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-right',
					),
				),
				'default'              => 'center',
				'description'          => __( 'This is the alignement of menu icon on selected responsive breakpoints.', 'header-footer-elementor' ),
				'condition'            => array(
					'layout'    => array( 'horizontal', 'vertical' ),
					'dropdown!' => 'none',
				),
				'selectors_dictionary' => array(
					'left'   => 'margin-right: auto',
					'center' => 'margin: 0 auto',
					'right'  => 'margin-left: auto',
				),
				'selectors'            => array(
					'{{WRAPPER}} .hfe-nav-menu__toggle' => '{{VALUE}}',
				),
			)
		);

		$this->add_control(
			'full_width_dropdown',
			array(
				'label'        => __( 'Full Width', 'header-footer-elementor' ),
				'description'  => __( 'Enable this option to stretch the Sub Menu to Full Width.', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
				'condition'    => array(
					'dropdown!' => 'none',
					'layout!'   => 'flyout',
				),
				'render_type'  => 'template',
			)
		);

		if ( $this->is_elementor_updated() ) {
			$this->add_control(
				'dropdown_icon',
				array(
					'label'       => __( 'Menu Icon', 'header-footer-elementor' ),
					'type'        => Controls_Manager::ICONS,
					'label_block' => 'true',
					'default'     => array(
						'value'   => 'fas fa-align-justify',
						'library' => 'fa-solid',
					),
					'condition'   => array(
						'dropdown!' => 'none',
					),
				)
			);
		} else {
			$this->add_control(
				'dropdown_icon',
				array(
					'label'       => __( 'Icon', 'header-footer-elementor' ),
					'type'        => Controls_Manager::ICON,
					'label_block' => 'true',
					'default'     => 'fa fa-align-justify',
					'condition'   => array(
						'dropdown!' => 'none',
					),
				)
			);
		}

		if ( $this->is_elementor_updated() ) {
			$this->add_control(
				'dropdown_close_icon',
				array(
					'label'       => __( 'Close Icon', 'header-footer-elementor' ),
					'type'        => Controls_Manager::ICONS,
					'label_block' => 'true',
					'default'     => array(
						'value'   => 'far fa-window-close',
						'library' => 'fa-regular',
					),
					'condition'   => array(
						'dropdown!' => 'none',
					),
				)
			);
		} else {
			$this->add_control(
				'dropdown_close_icon',
				array(
					'label'       => __( 'Close Icon', 'header-footer-elementor' ),
					'type'        => Controls_Manager::ICON,
					'label_block' => 'true',
					'default'     => 'fa fa-close',
					'condition'   => array(
						'dropdown!' => 'none',
					),
				)
			);
		}

		$this->end_controls_section();
	}

	/**
	 * Register Nav Menu General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_style_content_controls() {

		$this->start_controls_section(
			'section_style_main-menu',
			array(
				'label'     => __( 'Main Menu', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'layout!' => 'expandible',
				),
			)
		);

		$this->add_responsive_control(
			'width_flyout_menu_item',
			array(
				'label'              => __( 'Flyout Box Width', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'range'              => array(
					'px' => array(
						'max' => 500,
						'min' => 100,
					),
				),
				'default'            => array(
					'size' => 300,
					'unit' => 'px',
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-flyout-wrapper .hfe-side' => 'width: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .hfe-flyout-open.left'  => 'left: -{{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .hfe-flyout-open.right' => 'right: -{{SIZE}}{{UNIT}}',
				),
				'condition'          => array(
					'layout' => 'flyout',
				),
				'render_type'        => 'template',
				'frontend_available' => true,
			)
		);

			$this->add_responsive_control(
				'padding_flyout_menu_item',
				array(
					'label'              => __( 'Flyout Box Padding', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'range'              => array(
						'px' => array(
							'max' => 50,
						),
					),
					'default'            => array(
						'size' => 30,
						'unit' => 'px',
					),
					'selectors'          => array(
						'{{WRAPPER}} .hfe-flyout-content' => 'padding: {{SIZE}}{{UNIT}}',
					),
					'condition'          => array(
						'layout' => 'flyout',
					),
					'frontend_available' => true,
				)
			);

			$this->add_responsive_control(
				'padding_horizontal_menu_item',
				array(
					'label'              => __( 'Horizontal Padding', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'size_units'         => array( 'px' ),
					'range'              => array(
						'px' => array(
							'max' => 50,
						),
					),
					'default'            => array(
						'size' => 15,
						'unit' => 'px',
					),
					'selectors'          => array(
						'{{WRAPPER}} .menu-item a.hfe-menu-item' => 'padding-left: {{SIZE}}{{UNIT}}; padding-right: {{SIZE}}{{UNIT}}',
						'{{WRAPPER}} .menu-item a.hfe-sub-menu-item' => 'padding-left: calc( {{SIZE}}{{UNIT}} + 20px );padding-right: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}} .hfe-nav-menu__layout-vertical .menu-item ul ul a.hfe-sub-menu-item' => 'padding-left: calc( {{SIZE}}{{UNIT}} + 40px );padding-right: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}} .hfe-nav-menu__layout-vertical .menu-item ul ul ul a.hfe-sub-menu-item' => 'padding-left: calc( {{SIZE}}{{UNIT}} + 60px );padding-right: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}} .hfe-nav-menu__layout-vertical .menu-item ul ul ul ul a.hfe-sub-menu-item' => 'padding-left: calc( {{SIZE}}{{UNIT}} + 80px );padding-right: {{SIZE}}{{UNIT}};',
					),
					'frontend_available' => true,
				)
			);

			$this->add_responsive_control(
				'padding_vertical_menu_item',
				array(
					'label'              => __( 'Vertical Padding', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'size_units'         => array( 'px' ),
					'range'              => array(
						'px' => array(
							'max' => 50,
						),
					),
					'default'            => array(
						'size' => 15,
						'unit' => 'px',
					),
					'selectors'          => array(
						'{{WRAPPER}} .menu-item a.hfe-menu-item, {{WRAPPER}} .menu-item a.hfe-sub-menu-item' => 'padding-top: {{SIZE}}{{UNIT}}; padding-bottom: {{SIZE}}{{UNIT}};',
					),
					'frontend_available' => true,
				)
			);

			$this->add_responsive_control(
				'menu_space_between',
				array(
					'label'              => __( 'Space Between', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'size_units'         => array( 'px' ),
					'range'              => array(
						'px' => array(
							'max' => 100,
						),
					),
					'selectors'          => array(
						'body:not(.rtl) {{WRAPPER}} .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item:not(:last-child)' => 'margin-right: {{SIZE}}{{UNIT}}',
						'body.rtl {{WRAPPER}} .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item:not(:last-child)' => 'margin-left: {{SIZE}}{{UNIT}}',
						'{{WRAPPER}} nav:not(.hfe-nav-menu__layout-horizontal) .hfe-nav-menu > li.menu-item:not(:last-child)' => 'margin-bottom: {{SIZE}}{{UNIT}}',
						'(tablet)body:not(.rtl) {{WRAPPER}}.hfe-nav-menu__breakpoint-tablet .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item:not(:last-child)' => 'margin-right: 0px',
						'(mobile)body:not(.rtl) {{WRAPPER}}.hfe-nav-menu__breakpoint-mobile .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item:not(:last-child)' => 'margin-right: 0px',
						'(tablet)body {{WRAPPER}} nav.hfe-nav-menu__layout-vertical .hfe-nav-menu > li.menu-item:not(:last-child)' => 'margin-bottom: 0px',
						'(mobile)body {{WRAPPER}} nav.hfe-nav-menu__layout-vertical .hfe-nav-menu > li.menu-item:not(:last-child)' => 'margin-bottom: 0px',
					),
					'condition'          => array(
						'layout!' => 'expandible',
					),
					'frontend_available' => true,
				)
			);

			$this->add_responsive_control(
				'menu_row_space',
				array(
					'label'              => __( 'Row Spacing', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'size_units'         => array( 'px' ),
					'range'              => array(
						'px' => array(
							'max' => 100,
						),
					),
					'selectors'          => array(
						'body:not(.rtl) {{WRAPPER}} .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item' => 'margin-bottom: {{SIZE}}{{UNIT}}',
					),
					'condition'          => array(
						'layout' => 'horizontal',
					),
					'frontend_available' => true,
				)
			);

			$this->add_responsive_control(
				'menu_top_space',
				array(
					'label'              => __( 'Menu Item Top Spacing', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'size_units'         => array( 'px', '%' ),
					'range'              => array(
						'px' => array(
							'max' => 100,
						),
					),
					'selectors'          => array(
						'{{WRAPPER}} .hfe-flyout-wrapper .hfe-nav-menu > li.menu-item:first-child' => 'margin-top: {{SIZE}}{{UNIT}}',
					),
					'condition'          => array(
						'layout' => 'flyout',
					),
					'frontend_available' => true,
				)
			);

			$this->add_control(
				'bg_color_flyout',
				array(
					'label'     => __( 'Background Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '#FFFFFF',
					'selectors' => array(
						'{{WRAPPER}} .hfe-flyout-content' => 'background-color: {{VALUE}}',
					),
					'condition' => array(
						'layout' => 'flyout',
					),
				)
			);

			$this->add_control(
				'pointer',
				array(
					'label'     => __( 'Link Hover Effect', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SELECT,
					'default'   => 'none',
					'options'   => array(
						'none'        => __( 'None', 'header-footer-elementor' ),
						'underline'   => __( 'Underline', 'header-footer-elementor' ),
						'overline'    => __( 'Overline', 'header-footer-elementor' ),
						'double-line' => __( 'Double Line', 'header-footer-elementor' ),
						'framed'      => __( 'Framed', 'header-footer-elementor' ),
						'text'        => __( 'Text', 'header-footer-elementor' ),
					),
					'condition' => array(
						'layout' => array( 'horizontal' ),
					),
				)
			);

		$this->add_control(
			'animation_line',
			array(
				'label'     => __( 'Animation', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'fade',
				'options'   => array(
					'fade'     => 'Fade',
					'slide'    => 'Slide',
					'grow'     => 'Grow',
					'drop-in'  => 'Drop In',
					'drop-out' => 'Drop Out',
					'none'     => 'None',
				),
				'condition' => array(
					'layout'  => array( 'horizontal' ),
					'pointer' => array( 'underline', 'overline', 'double-line' ),
				),
			)
		);

		$this->add_control(
			'animation_framed',
			array(
				'label'     => __( 'Frame Animation', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'fade',
				'options'   => array(
					'fade'    => 'Fade',
					'grow'    => 'Grow',
					'shrink'  => 'Shrink',
					'draw'    => 'Draw',
					'corners' => 'Corners',
					'none'    => 'None',
				),
				'condition' => array(
					'layout'  => array( 'horizontal' ),
					'pointer' => 'framed',
				),
			)
		);

		$this->add_control(
			'animation_text',
			array(
				'label'     => __( 'Animation', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'grow',
				'options'   => array(
					'grow'   => 'Grow',
					'shrink' => 'Shrink',
					'sink'   => 'Sink',
					'float'  => 'Float',
					'skew'   => 'Skew',
					'rotate' => 'Rotate',
					'none'   => 'None',
				),
				'condition' => array(
					'layout'  => array( 'horizontal' ),
					'pointer' => 'text',
				),
			)
		);

		$this->add_control(
			'style_divider',
			array(
				'type' => Controls_Manager::DIVIDER,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'menu_typography',
				'global'    => array(
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				),
				'separator' => 'before',
				'selector'  => '{{WRAPPER}} a.hfe-menu-item, {{WRAPPER}} a.hfe-sub-menu-item',
			)
		);

		$this->start_controls_tabs( 'tabs_menu_item_style' );

				$this->start_controls_tab(
					'tab_menu_item_normal',
					array(
						'label' => __( 'Normal', 'header-footer-elementor' ),
					)
				);

					$this->add_control(
						'color_menu_item',
						array(
							'label'     => __( 'Text Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'global'    => array(
								'default' => Global_Colors::COLOR_TEXT,
							),
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .menu-item a.hfe-menu-item, {{WRAPPER}} .sub-menu a.hfe-sub-menu-item' => 'color: {{VALUE}}',
							),
						)
					);

					$this->add_control(
						'bg_color_menu_item',
						array(
							'label'     => __( 'Background Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .menu-item a.hfe-menu-item, {{WRAPPER}} .sub-menu, {{WRAPPER}} nav.hfe-dropdown, {{WRAPPER}} .hfe-dropdown-expandible' => 'background-color: {{VALUE}}',
							),
							'condition' => array(
								'layout!' => 'flyout',
							),
						)
					);

				$this->end_controls_tab();

				$this->start_controls_tab(
					'tab_menu_item_hover',
					array(
						'label' => __( 'Hover', 'header-footer-elementor' ),
					)
				);

					$this->add_control(
						'color_menu_item_hover',
						array(
							'label'     => __( 'Text Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'global'    => array(
								'default' => Global_Colors::COLOR_ACCENT,
							),
							'selectors' => array(
								'{{WRAPPER}} .menu-item a.hfe-menu-item:hover,
								{{WRAPPER}} .sub-menu a.hfe-sub-menu-item:hover,
								{{WRAPPER}} .menu-item.current-menu-item a.hfe-menu-item,
								{{WRAPPER}} .menu-item a.hfe-menu-item.highlighted,
								{{WRAPPER}} .menu-item a.hfe-menu-item:focus' => 'color: {{VALUE}}',
							),
						)
					);

					$this->add_control(
						'bg_color_menu_item_hover',
						array(
							'label'     => __( 'Background Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'selectors' => array(
								'{{WRAPPER}} .menu-item a.hfe-menu-item:hover,
								{{WRAPPER}} .sub-menu a.hfe-sub-menu-item:hover,
								{{WRAPPER}} .menu-item.current-menu-item a.hfe-menu-item,
								{{WRAPPER}} .menu-item a.hfe-menu-item.highlighted,
								{{WRAPPER}} .menu-item a.hfe-menu-item:focus' => 'background-color: {{VALUE}}',
							),
							'condition' => array(
								'layout!' => 'flyout',
							),
						)
					);

					$this->add_control(
						'pointer_color_menu_item_hover',
						array(
							'label'     => __( 'Link Hover Effect Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'global'    => array(
								'default' => Global_Colors::COLOR_ACCENT,
							),
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .hfe-nav-menu-layout:not(.hfe-pointer__framed) .menu-item.parent a.hfe-menu-item:before,
								{{WRAPPER}} .hfe-nav-menu-layout:not(.hfe-pointer__framed) .menu-item.parent a.hfe-menu-item:after' => 'background-color: {{VALUE}}',
								'{{WRAPPER}} .hfe-nav-menu-layout:not(.hfe-pointer__framed) .menu-item.parent .sub-menu .hfe-has-submenu-container a:after' => 'background-color: unset',
								'{{WRAPPER}} .hfe-pointer__framed .menu-item.parent a.hfe-menu-item:before,
								{{WRAPPER}} .hfe-pointer__framed .menu-item.parent a.hfe-menu-item:after' => 'border-color: {{VALUE}}',
							),
							'condition' => array(
								'pointer!' => array( 'none', 'text' ),
								'layout!'  => 'flyout',
							),
						)
					);

				$this->end_controls_tab();

				$this->start_controls_tab(
					'tab_menu_item_active',
					array(
						'label' => __( 'Active', 'header-footer-elementor' ),
					)
				);

					$this->add_control(
						'color_menu_item_active',
						array(
							'label'     => __( 'Text Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .menu-item.current-menu-item a.hfe-menu-item,
								{{WRAPPER}} .menu-item.current-menu-ancestor a.hfe-menu-item' => 'color: {{VALUE}}',
							),
						)
					);

					$this->add_control(
						'bg_color_menu_item_active',
						array(
							'label'     => __( 'Background Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .menu-item.current-menu-item a.hfe-menu-item,
								{{WRAPPER}} .menu-item.current-menu-ancestor a.hfe-menu-item' => 'background-color: {{VALUE}}',
							),
							'condition' => array(
								'layout!' => 'flyout',
							),
						)
					);

					$this->add_control(
						'pointer_color_menu_item_active',
						array(
							'label'     => __( 'Link Hover Effect Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .hfe-nav-menu-layout:not(.hfe-pointer__framed) .menu-item.parent.current-menu-item a.hfe-menu-item:before,
								{{WRAPPER}} .hfe-nav-menu-layout:not(.hfe-pointer__framed) .menu-item.parent.current-menu-item a.hfe-menu-item:after' => 'background-color: {{VALUE}}',
								'{{WRAPPER}} .hfe-nav-menu:not(.hfe-pointer__framed) .menu-item.parent .sub-menu .hfe-has-submenu-container a.current-menu-item:after' => 'background-color: unset',
								'{{WRAPPER}} .hfe-pointer__framed .menu-item.parent.current-menu-item a.hfe-menu-item:before,
								{{WRAPPER}} .hfe-pointer__framed .menu-item.parent.current-menu-item a.hfe-menu-item:after' => 'border-color: {{VALUE}}',
							),
							'condition' => array(
								'pointer!' => array( 'none', 'text' ),
								'layout!'  => 'flyout',
							),
						)
					);

				$this->end_controls_tab();

			$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Register Nav Menu General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_dropdown_content_controls() {

		$this->start_controls_section(
			'section_style_dropdown',
			array(
				'label' => __( 'Dropdown', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

			$this->add_control(
				'dropdown_description',
				array(
					'raw'             => __( '<b>Note:</b> On desktop, below style options will apply to the submenu. On mobile, this will apply to the entire menu.', 'header-footer-elementor' ),
					'type'            => Controls_Manager::RAW_HTML,
					'content_classes' => 'elementor-descriptor',
					'condition'       => array(
						'layout!' => array(
							'expandible',
							'flyout',
						),
					),
				)
			);

			$this->start_controls_tabs( 'tabs_dropdown_item_style' );

				$this->start_controls_tab(
					'tab_dropdown_item_normal',
					array(
						'label' => __( 'Normal', 'header-footer-elementor' ),
					)
				);

					$this->add_control(
						'color_dropdown_item',
						array(
							'label'     => __( 'Text Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .sub-menu a.hfe-sub-menu-item,
								{{WRAPPER}} .elementor-menu-toggle,
								{{WRAPPER}} nav.hfe-dropdown li a.hfe-menu-item,
								{{WRAPPER}} nav.hfe-dropdown li a.hfe-sub-menu-item,
								{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-menu-item,
								{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-sub-menu-item' => 'color: {{VALUE}}',
							),
						)
					);

					$this->add_control(
						'background_color_dropdown_item',
						array(
							'label'     => __( 'Background Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '#fff',
							'selectors' => array(
								'{{WRAPPER}} .sub-menu,
								{{WRAPPER}} nav.hfe-dropdown,
								{{WRAPPER}} nav.hfe-dropdown-expandible,
								{{WRAPPER}} nav.hfe-dropdown .menu-item a.hfe-menu-item,
								{{WRAPPER}} nav.hfe-dropdown .menu-item a.hfe-sub-menu-item' => 'background-color: {{VALUE}}',
							),
							'separator' => 'after',
						)
					);

				$this->end_controls_tab();

				$this->start_controls_tab(
					'tab_dropdown_item_hover',
					array(
						'label' => __( 'Hover', 'header-footer-elementor' ),
					)
				);

					$this->add_control(
						'color_dropdown_item_hover',
						array(
							'label'     => __( 'Text Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .sub-menu a.hfe-sub-menu-item:hover,
								{{WRAPPER}} .elementor-menu-toggle:hover,
								{{WRAPPER}} nav.hfe-dropdown li a.hfe-menu-item:hover,
								{{WRAPPER}} nav.hfe-dropdown li a.hfe-sub-menu-item:hover,
								{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-menu-item:hover,
								{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-sub-menu-item:hover' => 'color: {{VALUE}}',
							),
						)
					);

					$this->add_control(
						'background_color_dropdown_item_hover',
						array(
							'label'     => __( 'Background Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .sub-menu a.hfe-sub-menu-item:hover,
								{{WRAPPER}} nav.hfe-dropdown li a.hfe-menu-item:hover,
								{{WRAPPER}} nav.hfe-dropdown li a.hfe-sub-menu-item:hover,
								{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-menu-item:hover,
								{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-sub-menu-item:hover' => 'background-color: {{VALUE}}',
							),
							'separator' => 'after',
						)
					);

				$this->end_controls_tab();

				$this->start_controls_tab(
					'tab_dropdown_item_active',
					array(
						'label' => __( 'Active', 'header-footer-elementor' ),
					)
				);

				$this->add_control(
					'color_dropdown_item_active',
					array(
						'label'     => __( 'Text Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'selectors' => array(
							'{{WRAPPER}} .sub-menu .menu-item.current-menu-item a.hfe-sub-menu-item.hfe-sub-menu-item-active,
							{{WRAPPER}} nav.hfe-dropdown .menu-item.current-menu-item a.hfe-menu-item,
							{{WRAPPER}} nav.hfe-dropdown .menu-item.current-menu-ancestor a.hfe-menu-item,
							{{WRAPPER}} nav.hfe-dropdown .sub-menu .menu-item.current-menu-item a.hfe-sub-menu-item.hfe-sub-menu-item-active
							' => 'color: {{VALUE}}',

						),
					)
				);

				$this->add_control(
					'background_color_dropdown_item_active',
					array(
						'label'     => __( 'Background Color', 'header-footer-elementor' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'selectors' => array(
							'{{WRAPPER}} .sub-menu .menu-item.current-menu-item a.hfe-sub-menu-item.hfe-sub-menu-item-active,
							{{WRAPPER}} nav.hfe-dropdown .menu-item.current-menu-item a.hfe-menu-item,
							{{WRAPPER}} nav.hfe-dropdown .menu-item.current-menu-ancestor a.hfe-menu-item,
							{{WRAPPER}} nav.hfe-dropdown .sub-menu .menu-item.current-menu-item a.hfe-sub-menu-item.hfe-sub-menu-item-active' => 'background-color: {{VALUE}}',
						),
						'separator' => 'after',
					)
				);

				$this->end_controls_tabs();

			$this->end_controls_tabs();

			$this->add_group_control(
				Group_Control_Typography::get_type(),
				array(
					'name'      => 'dropdown_typography',
					'global'    => array(
						'default' => Global_Typography::TYPOGRAPHY_ACCENT,
					),
					'separator' => 'before',
					'selector'  => '
							{{WRAPPER}} .sub-menu li a.hfe-sub-menu-item,
							{{WRAPPER}} nav.hfe-dropdown li a.hfe-sub-menu-item,
							{{WRAPPER}} nav.hfe-dropdown li a.hfe-menu-item,
							{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-menu-item,
							{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-sub-menu-item',
				)
			);

			$this->add_group_control(
				Group_Control_Border::get_type(),
				array(
					'name'     => 'dropdown_border',
					'selector' => '{{WRAPPER}} nav.hfe-nav-menu__layout-horizontal .sub-menu,
							{{WRAPPER}} nav:not(.hfe-nav-menu__layout-horizontal) .sub-menu.sub-menu-open,
							{{WRAPPER}} nav.hfe-dropdown .hfe-nav-menu,
						 	{{WRAPPER}} nav.hfe-dropdown-expandible .hfe-nav-menu',
				)
			);

			$this->add_responsive_control(
				'dropdown_border_radius',
				array(
					'label'              => __( 'Border Radius', 'header-footer-elementor' ),
					'type'               => Controls_Manager::DIMENSIONS,
					'size_units'         => array( 'px', '%' ),
					'selectors'          => array(
						'{{WRAPPER}} .sub-menu'        => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
						'{{WRAPPER}} .sub-menu li.menu-item:first-child' => 'border-top-left-radius: {{TOP}}{{UNIT}}; border-top-right-radius: {{RIGHT}}{{UNIT}};overflow:hidden;',
						'{{WRAPPER}} .sub-menu li.menu-item:last-child' => 'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}; border-bottom-left-radius: {{LEFT}}{{UNIT}};overflow:hidden',
						'{{WRAPPER}} nav.hfe-dropdown' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
						'{{WRAPPER}} nav.hfe-dropdown li.menu-item:first-child' => 'border-top-left-radius: {{TOP}}{{UNIT}}; border-top-right-radius: {{RIGHT}}{{UNIT}};overflow:hidden',
						'{{WRAPPER}} nav.hfe-dropdown li.menu-item:last-child' => 'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}; border-bottom-left-radius: {{LEFT}}{{UNIT}};overflow:hidden',
						'{{WRAPPER}} nav.hfe-dropdown-expandible' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
						'{{WRAPPER}} nav.hfe-dropdown-expandible li.menu-item:first-child' => 'border-top-left-radius: {{TOP}}{{UNIT}}; border-top-right-radius: {{RIGHT}}{{UNIT}};overflow:hidden',
						'{{WRAPPER}} nav.hfe-dropdown-expandible li.menu-item:last-child' => 'border-bottom-right-radius: {{BOTTOM}}{{UNIT}}; border-bottom-left-radius: {{LEFT}}{{UNIT}};overflow:hidden',
					),
					'frontend_available' => true,
				)
			);

			$this->add_group_control(
				Group_Control_Box_Shadow::get_type(),
				array(
					'name'      => 'dropdown_box_shadow',
					'exclude'   => array(
						'box_shadow_position',
					),
					'selector'  => '{{WRAPPER}} .hfe-nav-menu .sub-menu,
								{{WRAPPER}} nav.hfe-dropdown,
						 		{{WRAPPER}} nav.hfe-dropdown-expandible',
					'separator' => 'after',
				)
			);

			$this->add_responsive_control(
				'width_dropdown_item',
				array(
					'label'              => __( 'Dropdown Width (px)', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'range'              => array(
						'px' => array(
							'min' => 0,
							'max' => 500,
						),
					),
					'default'            => array(
						'size' => '220',
						'unit' => 'px',
					),
					'selectors'          => array(
						'{{WRAPPER}} ul.sub-menu' => 'width: {{SIZE}}{{UNIT}}',
					),
					'condition'          => array(
						'layout' => 'horizontal',
					),
					'frontend_available' => true,
				)
			);

			$this->add_responsive_control(
				'padding_horizontal_dropdown_item',
				array(
					'label'              => __( 'Horizontal Padding', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'size_units'         => array( 'px' ),
					'selectors'          => array(
						'{{WRAPPER}} .sub-menu li a.hfe-sub-menu-item,
						{{WRAPPER}} nav.hfe-dropdown li a.hfe-menu-item,
						{{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-menu-item' => 'padding-left: {{SIZE}}{{UNIT}}; padding-right: {{SIZE}}{{UNIT}}',
						'{{WRAPPER}} nav.hfe-dropdown-expandible a.hfe-sub-menu-item,
						{{WRAPPER}} nav.hfe-dropdown li a.hfe-sub-menu-item' => 'padding-left: calc( {{SIZE}}{{UNIT}} + 20px );padding-right: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}} .hfe-dropdown .menu-item ul ul a.hfe-sub-menu-item,
						{{WRAPPER}} .hfe-dropdown-expandible .menu-item ul ul a.hfe-sub-menu-item' => 'padding-left: calc( {{SIZE}}{{UNIT}} + 40px );padding-right: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}} .hfe-dropdown .menu-item ul ul ul a.hfe-sub-menu-item,
						{{WRAPPER}} .hfe-dropdown-expandible .menu-item ul ul ul a.hfe-sub-menu-item' => 'padding-left: calc( {{SIZE}}{{UNIT}} + 60px );padding-right: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}} .hfe-dropdown .menu-item ul ul ul ul a.hfe-sub-menu-item,
						{{WRAPPER}} .hfe-dropdown-expandible .menu-item ul ul ul ul a.hfe-sub-menu-item' => 'padding-left: calc( {{SIZE}}{{UNIT}} + 80px );padding-right: {{SIZE}}{{UNIT}};',
					),
					'frontend_available' => true,
				)
			);

			$this->add_responsive_control(
				'padding_vertical_dropdown_item',
				array(
					'label'              => __( 'Vertical Padding', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'size_units'         => array( 'px' ),
					'default'            => array(
						'size' => 15,
						'unit' => 'px',
					),
					'range'              => array(
						'px' => array(
							'max' => 50,
						),
					),
					'selectors'          => array(
						'{{WRAPPER}} .sub-menu a.hfe-sub-menu-item,
						 {{WRAPPER}} nav.hfe-dropdown li a.hfe-menu-item,
						 {{WRAPPER}} nav.hfe-dropdown li a.hfe-sub-menu-item,
						 {{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-menu-item,
						 {{WRAPPER}} nav.hfe-dropdown-expandible li a.hfe-sub-menu-item' => 'padding-top: {{SIZE}}{{UNIT}}; padding-bottom: {{SIZE}}{{UNIT}}',
					),
					'frontend_available' => true,
				)
			);

			$this->add_responsive_control(
				'distance_from_menu',
				array(
					'label'              => __( 'Top Distance', 'header-footer-elementor' ),
					'type'               => Controls_Manager::SLIDER,
					'range'              => array(
						'px' => array(
							'min' => -100,
							'max' => 100,
						),
					),
					'selectors'          => array(
						'{{WRAPPER}} nav.hfe-nav-menu__layout-horizontal:not(.hfe-dropdown) ul.sub-menu, {{WRAPPER}} nav.hfe-nav-menu__layout-expandible.menu-is-active, {{WRAPPER}} nav.hfe-nav-menu__layout-vertical:not(.hfe-dropdown) ul.sub-menu' => 'margin-top: {{SIZE}}px;',
						'{{WRAPPER}} .hfe-dropdown.menu-is-active' => 'margin-top: {{SIZE}}px;',
					),
					'condition'          => array(
						'layout' => array( 'horizontal', 'vertical', 'expandible' ),
					),
					'frontend_available' => true,
				)
			);

			$this->add_control(
				'heading_dropdown_divider',
				array(
					'label'     => __( 'Divider', 'header-footer-elementor' ),
					'type'      => Controls_Manager::HEADING,
					'separator' => 'before',
				)
			);

			$this->add_control(
				'dropdown_divider_border',
				array(
					'label'       => __( 'Border Style', 'header-footer-elementor' ),
					'type'        => Controls_Manager::SELECT,
					'default'     => 'solid',
					'label_block' => false,
					'options'     => array(
						'none'   => __( 'None', 'header-footer-elementor' ),
						'solid'  => __( 'Solid', 'header-footer-elementor' ),
						'double' => __( 'Double', 'header-footer-elementor' ),
						'dotted' => __( 'Dotted', 'header-footer-elementor' ),
						'dashed' => __( 'Dashed', 'header-footer-elementor' ),
					),
					'selectors'   => array(
						'{{WRAPPER}} .sub-menu li.menu-item:not(:last-child),
						{{WRAPPER}} nav.hfe-dropdown li.menu-item:not(:last-child),
						{{WRAPPER}} nav.hfe-dropdown-expandible li.menu-item:not(:last-child)' => 'border-bottom-style: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'divider_border_color',
				array(
					'label'     => __( 'Border Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '#c4c4c4',
					'selectors' => array(
						'{{WRAPPER}} .sub-menu li.menu-item:not(:last-child),
						{{WRAPPER}} nav.hfe-dropdown li.menu-item:not(:last-child),
						{{WRAPPER}} nav.hfe-dropdown-expandible li.menu-item:not(:last-child)' => 'border-bottom-color: {{VALUE}};',
					),
					'condition' => array(
						'dropdown_divider_border!' => 'none',
					),
				)
			);

			$this->add_control(
				'dropdown_divider_width',
				array(
					'label'     => __( 'Border Width', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'range'     => array(
						'px' => array(
							'max' => 50,
						),
					),
					'default'   => array(
						'size' => '1',
						'unit' => 'px',
					),
					'selectors' => array(
						'{{WRAPPER}} .sub-menu li.menu-item:not(:last-child),
						{{WRAPPER}} nav.hfe-dropdown li.menu-item:not(:last-child),
						{{WRAPPER}} nav.hfe-dropdown-expandible li.menu-item:not(:last-child)' => 'border-bottom-width: {{SIZE}}{{UNIT}}',
					),
					'condition' => array(
						'dropdown_divider_border!' => 'none',
					),
				)
			);

		$this->end_controls_section();

		$this->start_controls_section(
			'style_toggle',
			array(
				'label' => __( 'Menu Trigger & Close Icon', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->start_controls_tabs( 'tabs_toggle_style' );

		$this->start_controls_tab(
			'toggle_style_normal',
			array(
				'label' => __( 'Normal', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'toggle_color',
			array(
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} div.hfe-nav-menu-icon' => 'color: {{VALUE}}',
					'{{WRAPPER}} div.hfe-nav-menu-icon svg' => 'fill: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'toggle_background_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-nav-menu-icon' => 'background-color: {{VALUE}}; padding: 0.35em;',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'toggle_hover',
			array(
				'label' => __( 'Hover', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'toggle_hover_color',
			array(
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} div.hfe-nav-menu-icon:hover' => 'color: {{VALUE}}',
					'{{WRAPPER}} div.hfe-nav-menu-icon:hover svg' => 'fill: {{VALUE}}',

				),
			)
		);

		$this->add_control(
			'toggle_hover_background_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-nav-menu-icon:hover' => 'background-color: {{VALUE}}; padding: 0.35em;',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_responsive_control(
			'toggle_size',
			array(
				'label'              => __( 'Icon Size', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'range'              => array(
					'px' => array(
						'min' => 15,
					),
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-nav-menu-icon'     => 'font-size: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .hfe-nav-menu-icon svg' => 'font-size: {{SIZE}}px;line-height: {{SIZE}}px;height: {{SIZE}}px;width: {{SIZE}}px;',
				),
				'frontend_available' => true,
				'separator'          => 'before',
			)
		);

		$this->add_responsive_control(
			'toggle_border_width',
			array(
				'label'              => __( 'Border Width', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'range'              => array(
					'px' => array(
						'max' => 10,
					),
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-nav-menu-icon' => 'border-width: {{SIZE}}{{UNIT}}; padding: 0.35em;',
				),
				'frontend_available' => true,
			)
		);

		$this->add_responsive_control(
			'toggle_border_radius',
			array(
				'label'              => __( 'Border Radius', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'size_units'         => array( 'px', '%' ),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-nav-menu-icon' => 'border-radius: {{SIZE}}{{UNIT}}',
				),
				'frontend_available' => true,
			)
		);

		$this->add_control(
			'close_color_flyout',
			array(
				'label'     => __( 'Close Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#7A7A7A',
				'selectors' => array(
					'{{WRAPPER}} .hfe-flyout-close'     => 'color: {{VALUE}}',
					'{{WRAPPER}} .hfe-flyout-close svg' => 'fill: {{VALUE}}',

				),
				'condition' => array(
					'layout' => 'flyout',
				),
				'separator' => 'before',
			)
		);

		$this->add_responsive_control(
			'close_flyout_size',
			array(
				'label'              => __( 'Close Icon Size', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'range'              => array(
					'px' => array(
						'min' => 15,
					),
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-flyout-close,
					{{WRAPPER}} .hfe-flyout-close svg' => 'height: {{SIZE}}px; width: {{SIZE}}px; font-size: {{SIZE}}px; line-height: {{SIZE}}px;',
				),
				'condition'          => array(
					'layout' => 'flyout',
				),
				'frontend_available' => true,
			)
		);

		$this->end_controls_section();
		$this->start_controls_section(
			'style_button',
			array(
				'label'     => __( 'Button', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'menu_last_item' => 'cta',
				),
			)
		);

			$this->add_group_control(
				Group_Control_Typography::get_type(),
				array(
					'name'     => 'all_typography',
					'label'    => __( 'Typography', 'header-footer-elementor' ),
					'global'   => array(
						'default' => Global_Typography::TYPOGRAPHY_ACCENT,
					),
					'selector' => '{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button',
				)
			);
			$this->add_responsive_control(
				'padding',
				array(
					'label'              => __( 'Padding', 'header-footer-elementor' ),
					'type'               => Controls_Manager::DIMENSIONS,
					'size_units'         => array( 'px', 'em', '%' ),
					'selectors'          => array(
						'{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					),
					'frontend_available' => true,
				)
			);

			$this->start_controls_tabs( '_button_style' );

				$this->start_controls_tab(
					'_button_normal',
					array(
						'label' => __( 'Normal', 'header-footer-elementor' ),
					)
				);

					$this->add_control(
						'all_text_color',
						array(
							'label'     => __( 'Text Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button' => 'color: {{VALUE}};',
							),
						)
					);

					$this->add_group_control(
						Group_Control_Background::get_type(),
						array(
							'name'           => 'all_background_color',
							'label'          => __( 'Background Color', 'header-footer-elementor' ),
							'types'          => array( 'classic', 'gradient' ),
							'selector'       => '{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button',
							'fields_options' => array(
								'color' => array(
									'global' => array(
										'default' => Global_Colors::COLOR_ACCENT,
									),
								),
							),
						)
					);

					$this->add_group_control(
						Group_Control_Border::get_type(),
						array(
							'name'     => 'all_border',
							'label'    => __( 'Border', 'header-footer-elementor' ),
							'selector' => '{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button',
						)
					);

					$this->add_control(
						'all_border_radius',
						array(
							'label'      => __( 'Border Radius', 'header-footer-elementor' ),
							'type'       => Controls_Manager::DIMENSIONS,
							'size_units' => array( 'px', '%' ),
							'selectors'  => array(
								'{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
							),
						)
					);

					$this->add_group_control(
						Group_Control_Box_Shadow::get_type(),
						array(
							'name'     => 'all_button_box_shadow',
							'selector' => '{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button',
						)
					);

				$this->end_controls_tab();

				$this->start_controls_tab(
					'all_button_hover',
					array(
						'label' => __( 'Hover', 'header-footer-elementor' ),
					)
				);

					$this->add_control(
						'all_hover_color',
						array(
							'label'     => __( 'Text Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'selectors' => array(
								'{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button:hover' => 'color: {{VALUE}};',
							),
						)
					);

					$this->add_group_control(
						Group_Control_Background::get_type(),
						array(
							'name'           => 'all_background_hover_color',
							'label'          => __( 'Background Color', 'header-footer-elementor' ),
							'types'          => array( 'classic', 'gradient' ),
							'selector'       => '{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button:hover',
							'fields_options' => array(
								'color' => array(
									'global' => array(
										'default' => Global_Colors::COLOR_ACCENT,
									),
								),
							),
						)
					);

					$this->add_control(
						'all_border_hover_color',
						array(
							'label'     => __( 'Border Hover Color', 'header-footer-elementor' ),
							'type'      => Controls_Manager::COLOR,
							'default'   => '',
							'selectors' => array(
								'{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button:hover' => 'border-color: {{VALUE}};',
							),
						)
					);

					$this->add_group_control(
						Group_Control_Box_Shadow::get_type(),
						array(
							'name'      => 'all_button_hover_box_shadow',
							'selector'  => '{{WRAPPER}} .menu-item a.hfe-menu-item.elementor-button:hover',
							'separator' => 'after',
						)
					);

				$this->end_controls_tab();

			$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Add itemprop for Navigation Schema.
	 *
	 * @since 1.5.2
	 * @param string $atts link attributes.
	 * @access public
	 * @return string
	 */
	public function handle_link_attrs( $atts ) {

		$atts .= ' itemprop="url"';
		return $atts;
	}

	/**
	 * Add itemprop to the li tag of Navigation Schema.
	 *
	 * @since 1.6.0
	 * @param string $value link attributes.
	 * @access public
	 * @return string
	 */
	public function handle_li_values( $value ) {

		$value .= ' itemprop="name"';
		return $value;
	}

	/**
	 * Get the menu and close icon HTML.
	 *
	 * @since 1.5.2
	 * @param array $settings Widget settings array.
	 * @access public
	 * @return array
	 */
	public function get_menu_close_icon( $settings ) {
		$menu_icon     = '';
		$close_icon    = '';
		$icons         = array();
		$icon_settings = array(
			$settings['dropdown_icon'],
			$settings['dropdown_close_icon'],
		);

		foreach ( $icon_settings as $icon ) {
			if ( $this->is_elementor_updated() ) {
				ob_start();
				\Elementor\Icons_Manager::render_icon(
					$icon,
					array(
						'aria-hidden' => 'true',
						'tabindex'    => '0',
					)
				);
				$menu_icon = ob_get_clean();
			} else {
				$menu_icon = '<i class="' . esc_attr( $icon ) . '" aria-hidden="true" tabindex="0"></i>';
			}

			array_push( $icons, $menu_icon );
		}

		return $icons;
	}

	/**
	 * Render Nav Menu output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return (void | false)
	 */
	protected function render() {

		$menus = $this->get_available_menus();

		if ( empty( $menus ) ) {
			return false;
		}

		$settings = $this->get_settings_for_display();

		$menu_close_icons = array();
		$menu_close_icons = $this->get_menu_close_icon( $settings );

		$args = array(
			'echo'        => false,
			'menu'        => $settings['menu'],
			'menu_class'  => 'hfe-nav-menu',
			'menu_id'     => 'menu-' . $this->get_nav_menu_index() . '-' . $this->get_id(),
			'fallback_cb' => '__return_empty_string',
			'container'   => '',
			'walker'      => new Menu_Walker(),
		);

		if ( 'yes' === $settings['schema_support'] ) {
			$this->add_render_attribute( 'hfe-nav-menu', 'itemscope', 'itemscope' );
			$this->add_render_attribute( 'hfe-nav-menu', 'itemtype', 'http://schema.org/SiteNavigationElement' );

			add_filter( 'hfe_nav_menu_attrs', array( $this, 'handle_link_attrs' ) );
			add_filter( 'nav_menu_li_values', array( $this, 'handle_li_values' ) );
		}

		if ( 'flyout' === $settings['layout'] ) {

			$this->add_render_attribute( 'hfe-flyout', 'class', 'hfe-flyout-wrapper' );
			if ( 'cta' === $settings['menu_last_item'] ) {

				$this->add_render_attribute( 'hfe-flyout', 'data-last-item', $settings['menu_last_item'] );
			}

			?>
			<div class="hfe-nav-menu__toggle elementor-clickable hfe-flyout-trigger" tabindex="0">
					<div class="hfe-nav-menu-icon">
						<?php echo isset( $menu_close_icons[0] ) ? $menu_close_icons[0] : ''; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</div>
				</div>
			<div <?php $this->print_render_attribute_string( 'hfe-flyout' ); ?> >
				<div class="hfe-flyout-overlay elementor-clickable"></div>
				<div class="hfe-flyout-container">
					<div id="hfe-flyout-content-id-<?php echo esc_attr( $this->get_id() ); ?>" class="hfe-side hfe-flyout-<?php echo esc_attr( $settings['flyout_layout'] ); ?> hfe-flyout-open" data-layout="<?php echo esc_attr( $settings['flyout_layout'] ); ?>" data-flyout-type="<?php echo esc_attr( $settings['flyout_type'] ); ?>">
						<div class="hfe-flyout-content push">
							<nav <?php $this->print_render_attribute_string( 'hfe-nav-menu' ); ?>>
								<?php echo wp_nav_menu( $args ); ?>
							</nav>
							<div class="elementor-clickable hfe-flyout-close" tabindex="0">
								<?php echo isset( $menu_close_icons[1] ) ? $menu_close_icons[1] : ''; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</div>
						</div>
					</div>
				</div>
			</div>
			<?php
		} else {
			$this->add_render_attribute(
				'hfe-main-menu',
				'class',
				array(
					'hfe-nav-menu',
					'hfe-layout-' . $settings['layout'],
				)
			);

			$this->add_render_attribute( 'hfe-main-menu', 'class', 'hfe-nav-menu-layout' );

			$this->add_render_attribute( 'hfe-main-menu', 'class', $settings['layout'] );

			$this->add_render_attribute( 'hfe-main-menu', 'data-layout', $settings['layout'] );

			if ( 'cta' === $settings['menu_last_item'] ) {

				$this->add_render_attribute( 'hfe-main-menu', 'data-last-item', $settings['menu_last_item'] );
			}

			if ( $settings['pointer'] ) {
				if ( 'horizontal' === $settings['layout'] || 'vertical' === $settings['layout'] ) {
					$this->add_render_attribute( 'hfe-main-menu', 'class', 'hfe-pointer__' . $settings['pointer'] );

					if ( in_array( $settings['pointer'], array( 'double-line', 'underline', 'overline' ), true ) ) {
						$key = 'animation_line';
						$this->add_render_attribute( 'hfe-main-menu', 'class', 'hfe-animation__' . $settings[ $key ] );
					} elseif ( 'framed' === $settings['pointer'] || 'text' === $settings['pointer'] ) {
						$key = 'animation_' . $settings['pointer'];
						$this->add_render_attribute( 'hfe-main-menu', 'class', 'hfe-animation__' . $settings[ $key ] );
					}
				}
			}

			if ( 'expandible' === $settings['layout'] ) {
				$this->add_render_attribute( 'hfe-nav-menu', 'class', 'hfe-dropdown-expandible' );
			}

			$this->add_render_attribute(
				'hfe-nav-menu',
				'class',
				array(
					'hfe-nav-menu__layout-' . $settings['layout'],
					'hfe-nav-menu__submenu-' . $settings['submenu_icon'],
				)
			);

			$this->add_render_attribute( 'hfe-nav-menu', 'data-toggle-icon', $menu_close_icons[0] );

			$this->add_render_attribute( 'hfe-nav-menu', 'data-close-icon', $menu_close_icons[1] );

			$this->add_render_attribute( 'hfe-nav-menu', 'data-full-width', $settings['full_width_dropdown'] );

			?>
			<div <?php $this->print_render_attribute_string( 'hfe-main-menu' ); ?>>
				<div role="button" class="hfe-nav-menu__toggle elementor-clickable">
					<span class="screen-reader-text"><?php esc_html_e( 'Menu', 'header-footer-elementor' ); ?></span>
					<div class="hfe-nav-menu-icon">
						<?php
						$menu_close_icons[0] = str_replace( 'tabindex="0"', '', $menu_close_icons[0] );
						echo isset( $menu_close_icons[0] ) ? $menu_close_icons[0] : ''; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
						?>
					</div>
				</div>
				<nav <?php $this->print_render_attribute_string( 'hfe-nav-menu' ); ?>>
					<?php echo wp_nav_menu( $args ); ?> 
				</nav>
			</div>
			<?php
		}
	}
}
