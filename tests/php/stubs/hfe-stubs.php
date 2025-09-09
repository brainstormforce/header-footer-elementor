<?php

namespace {
	/**
	 * Set up WPML Compatibiblity Class.
	 */
	class HFE_WPML_Compatibility {

		/**
		 * Get instance of HFE_WPML_Compatibility
		 *
		 * @since  1.0.9
		 * @return HFE_WPML_Compatibility
		 */
		public static function instance() {
		}
		/**
		 * Pass the final header and footer ID from the WPML's object filter to allow strings to be translated.
		 *
		 * @since  1.0.9
		 * @param  Int $id  Post ID of the template being rendered.
		 * @return Int $id  Post ID of the template being rendered, Passed through the `wpml_object_id` id.
		 */
		public function get_wpml_object( $id ) {
		}
	}
	/**
	 * Class Header_Footer_Elementor
	 */
	class Header_Footer_Elementor {

		/**
		 * Current theme template
		 *
		 * @var String
		 */
		public $template;
		/**
		 * Instance of Header_Footer_Elementor
		 *
		 * @return Header_Footer_Elementor Instance of Header_Footer_Elementor
		 */
		public static function instance() {
		}
		/**
		 * Constructor
		 */
		function __construct() {
		}
		/**
		 * Reset the Unsupported theme nnotice after a theme is switched.
		 *
		 * @since 1.0.16
		 *
		 * @return void
		 */
		public function reset_unsupported_theme_notice() {
		}
		/**
		 * Register Astra Notices.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register_notices() {
		}
		/**
		 * Enqueue CSS for the Rating Notice.
		 *
		 * @since 1.2.0
		 * @return void
		 */
		public function rating_notice_css() {
		}
		/**
		 * Prints the admin notics when Elementor is not installed or activated or version outdated.
		 *
		 * @since 1.5.9
		 * @param  boolean $is_elementor_callable specifies if elementor is available.
		 * @param  boolean $is_elementor_outdated specifies if elementor version is old.
		 */
		public function elementor_not_available( $is_elementor_callable, $is_elementor_outdated ) {
		}
		/**
		 * Prints the admin notics when Elementor is not installed or activated.
		 */
		public function elementor_not_installed_activated() {
		}
		/**
		 * Prints the admin notics when Elementor version is outdated.
		 */
		public function elementor_outdated() {
		}
		/**
		 * Prints the admin notics when Elementor is not installed or activated.
		 */
		public function show_setup_wizard() {
		}
		/**
		 * Loads the globally required files for the plugin.
		 */
		public function includes() {
		}
		/**
		 * Loads textdomain for the plugin.
		 */
		public function load_textdomain() {
		}
		/**
		 * Enqueue styles and scripts.
		 */
		public function enqueue_scripts() {
		}
		/**
		 * Load admin styles on header footer elementor edit screen.
		 */
		public function enqueue_admin_scripts() {
		}
		/**
		 * Adds classes to the body tag conditionally.
		 *
		 * @param  Array $classes array with class names for the body tag.
		 *
		 * @return Array          array with class names for the body tag.
		 */
		public function body_class( $classes ) {
		}
		/**
		 * Display Settings Page options
		 *
		 * @since 1.6.0
		 */
		public function setup_settings_page() {
		}
		/**
		 * Display Unsupported theme notice if the current theme does add support for 'header-footer-elementor'
		 *
		 * @param array $hfe_settings_tabs settings array tabs.
		 * @since 1.0.3
		 */
		public function setup_unsupported_theme( $hfe_settings_tabs = array() ) {
		}
		/**
		 * Add support for theme if the current theme does add support for 'header-footer-elementor'
		 *
		 * @since  1.6.1
		 */
		public function setup_fallback_support() {
		}
		/**
		 * Prints the Header content.
		 */
		public static function get_header_content() {
		}
		/**
		 * Prints the Footer content.
		 */
		public static function get_footer_content() {
		}
		/**
		 * Prints the Before Footer content.
		 */
		public static function get_before_footer_content() {
		}
		/**
		 * Get option for the plugin settings
		 *
		 * @param  mixed $setting Option name.
		 * @param  mixed $default Default value to be received if the option value is not stored in the option.
		 *
		 * @return mixed.
		 */
		public static function get_settings( $setting = '', $default = '' ) {
		}
		/**
		 * Get header or footer template id based on the meta query.
		 *
		 * @param  String $type Type of the template header/footer.
		 *
		 * @return Mixed       Returns the header or footer template id if found, else returns string ''.
		 */
		public static function get_template_id( $type ) {
		}
		/**
		 * Callback to shortcode.
		 *
		 * @param array $atts attributes for shortcode.
		 */
		public function render_template( $atts ) {
		}
	}
	/**
	 * HFE_Update initial setup
	 *
	 * @since 1.1.4
	 */
	class HFE_Update {

		/**
		 *  Constructor
		 *
		 * @since 1.1.4
		 */
		public function __construct() {
		}
		/**
		 * Implement theme update logic.
		 *
		 * @since 1.1.4
		 */
		public function init() {
		}
		/**
		 * Get header or footer template id based on the meta query.
		 *
		 * @param  String $type Type of the template header/footer.
		 *
		 * @return Mixed  Returns the header or footer template id if found, else returns string ''.
		 */
		public function get_legacy_template_id( $type ) {
		}
	}
}

namespace Elementor {

	if ( ! class_exists( 'Elementor\Widget_Base' ) ) {
		abstract class Widget_Base {

			// Empty class definition for PHPStan
		}
	}

	// Add any other necessary stub definitions below

}

namespace HFE\Themes {
	/**
	 * Class Settings Page.
	 *
	 * @since 1.6.0
	 */
	class HFE_Settings_Page {

		/**
		 * Constructor.
		 *
		 * @since 1.6.0
		 */
		public function __construct() {
		}
		/**
		 * Settings tab array
		 *
		 * @var settings tabs
		 */
		public static $hfe_settings_tabs;
		/**
		 * Adds CSS to Hide the extra submenu added for the settings tab.
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function hfe_global_css() {
		}
		/**
		 * Load admin styles on header footer elementor edit screen.
		 */
		public function enqueue_admin_scripts() {
		}
		/**
		 * Adds a tab in plugin submenu page.
		 *
		 * @since 1.6.0
		 * @param string $views to add tab to current post type view.
		 *
		 * @return mixed
		 */
		public function hfe_settings( $views ) {
		}
		/**
		 * Function for registering the settings api.
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function hfe_admin_init() {
		}
		/**
		 * Call back function for the ssettings api function add_settings_section
		 *
		 * This function can be used to add description of the settings sections
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function hfe_compatibility_callback() {
		}
		/**
		 * Call back function for the ssettings api function add_settings_field
		 *
		 * This function will contain the markup for the input feilds that we can add.
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function hfe_compatibility_option_callback() {
		}
		/**
		 * Show a settings page incase of unsupported theme.
		 *
		 * @since 1.6.0
		 *
		 * @return void
		 */
		public function hfe_register_settings_page() {
		}
		/**
		 * Settings page.
		 *
		 * Call back function for add submenu page function.
		 *
		 * @since 1.6.0
		 */
		public function hfe_settings_page() {
		}
		/**
		 * Settings page - load modal content.
		 *
		 * Call back function for add submenu page function.
		 *
		 * @since 1.6.2
		 */
		public function hfe_modal() {
		}
		/**
		 * Function for adding tabs
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function hfe_tabs() {
		}
		/**
		 * Admin footer text.
		 *
		 * Modifies the "Thank you" text displayed in the admin footer.
		 *
		 * Fired by `admin_footer_text` filter.
		 *
		 * @since 1.6.0
		 * @access public
		 *
		 * @param string $footer_text The content that will be printed.
		 *
		 * @return string The content that will be printed.
		 */
		public function admin_footer_text( $footer_text ) {
		}
		/**
		 * Function for theme support tab
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function get_themes_support() {
		}
		/**
		 * Function for Step-By-Step guide
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function get_guide_html() {
		}
		/**
		 * Function for form HTML
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function get_form_html() {
		}
		/**
		 * Function for form Row 1 HTML
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function get_form_row_1() {
		}
		/**
		 * Function for form Row 2 HTML
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function get_form_row_2() {
		}
		/**
		 * Function for Step-By-Step guide modal popup
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function get_guide_modal() {
		}
		/**
		 * Function for About us HTML
		 *
		 * @since 1.6.0
		 * @return void
		 */
		public function get_about_html() {
		}
		/**
		 * Display the General Info section of About tab.
		 *
		 * @since 1.6.0
		 */
		protected function output_about_info() {
		}
		/**
		 * Display the Addons section of About tab.
		 *
		 * @since 1.6.0
		 */
		protected function output_about_addons() {
		}
		/**
		 * Get plugin data to display in the Addons section of About tab.
		 *
		 * @since 1.6.0
		 *
		 * @param string $addon      Plugin/Theme slug.
		 * @param array  $details     Plugin details.
		 * @param array  $all_plugins List of all plugins.
		 * @param array  $all_themes List of all themes.
		 *
		 * @return array
		 */
		protected function get_plugin_data( $addon, $details, $all_plugins, $all_themes ) {
		}
		/**
		 * List of plugins that we propose to install.
		 *
		 * @since 1.6.0
		 *
		 * @return array
		 */
		protected function get_bsf_plugins() {
		}
		/**
		 * Determine if the plugin/addon installations are allowed.
		 *
		 * @since 1.6.0
		 * @param string $type defines addon type.
		 * @return bool
		 */
		public function hfe_can_install( $type ) {
		}
		/**
		 * Add settings link to the Plugins page.
		 *
		 * @since 1.6.0
		 *
		 * @param array $links Plugin row links.
		 *
		 * @return array $links
		 */
		public function settings_link( $links ) {
		}
	}
}

namespace HFE\WidgetsManager {
	/**
	 * Set up Widgets Loader class
	 */
	class Widgets_Loader {

		/**
		 * Get instance of Widgets_Loader
		 *
		 * @since  1.2.0
		 * @return Widgets_Loader
		 */
		public static function instance() {
		}
		/**
		 * Returns Script array.
		 *
		 * @return array()
		 * @since 1.3.0
		 */
		public static function get_widget_script() {
		}
		/**
		 * Returns Script array.
		 *
		 * @return array()
		 * @since 1.3.0
		 */
		public static function get_widget_list() {
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
		}
		/**
		 * Register Category
		 *
		 * @since 1.2.0
		 * @param object $this_cat class.
		 */
		public function register_widget_category( $this_cat ) {
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
		}
		/**
		 * Cart Fragments.
		 *
		 * Refresh the cart fragments.
		 *
		 * @since 1.5.0
		 * @param array $fragments Array of fragments.
		 * @access public
		 */
		public function wc_refresh_mini_cart_count( $fragments ) {
		}
		/**
		 * Validate an HTML tag against a safe allowed list.
		 *
		 * @since 1.5.8
		 * @param string $tag specifies the HTML Tag.
		 * @access public
		 */
		public static function validate_html_tag( $tag ) {
		}
	}
}

namespace HFE\WidgetsManager\Widgets {
	/**
	 * HFE Cart Widget
	 *
	 * @since 1.4.0
	 */
	class Cart extends \Elementor\Widget_Base {

		/**
		 * Retrieve the widget name.
		 *
		 * @since 1.4.0
		 *
		 * @access public
		 *
		 * @return string Widget name.
		 */
		public function get_name() {
		}
		/**
		 * Retrieve the widget title.
		 *
		 * @since 1.4.0
		 *
		 * @access public
		 *
		 * @return string Widget title.
		 */
		public function get_title() {
		}
		/**
		 * Retrieve the widget icon.
		 *
		 * @since 1.4.0
		 *
		 * @access public
		 *
		 * @return string Widget icon.
		 */
		public function get_icon() {
		}
		/**
		 * Retrieve the list of categories the widget belongs to.
		 *
		 * Used to determine where to display the widget in the editor.
		 *
		 * Note that currently Elementor supports only one category.
		 * When multiple categories passed, Elementor uses the first one.
		 *
		 * @since 1.4.0
		 *
		 * @access public
		 *
		 * @return array Widget categories.
		 */
		public function get_categories() {
		}
		/**
		 * Register cart controls.
		 *
		 * @since 1.4.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register cart controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register Menu Cart General Controls.
		 *
		 * @since 1.4.0
		 * @access protected
		 */
		protected function register_general_content_controls() {
		}
		/**
		 * Register Menu Cart Typography Controls.
		 *
		 * @since 1.4.0
		 * @access protected
		 */
		protected function register_cart_typo_content_controls() {
		}
		/**
		 * Render Menu Cart output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.4.0
		 * @access protected
		 */
		protected function render() {
		}
		/**
		 * Render Menu Cart output in the editor.
		 *
		 * Written as a Backbone JavaScript template and used to generate the live preview.
		 *
		 * @since 1.4.0
		 * @access protected
		 */
		protected function content_template() {
		}
	}
	/**
	 * HFE Search Button.
	 *
	 * HFE widget for Search Button.
	 *
	 * @since 1.5.0
	 */
	class Search_Button extends \Elementor\Widget_Base {

		/**
		 * Retrieve the widget name.
		 *
		 * @since 1.5.0
		 *
		 * @access public
		 *
		 * @return string Widget name.
		 */
		public function get_name() {
		}
		/**
		 * Retrieve the widget title.
		 *
		 * @since 1.5.0
		 *
		 * @access public
		 *
		 * @return string Widget title.
		 */
		public function get_title() {
		}
		/**
		 * Retrieve the widget icon.
		 *
		 * @since 1.5.0
		 *
		 * @access public
		 *
		 * @return string Widget icon.
		 */
		public function get_icon() {
		}
		/**
		 * Retrieve the list of categories the widget belongs to.
		 *
		 * Used to determine where to display the widget in the editor.
		 *
		 * Note that currently Elementor supports only one category.
		 * When multiple categories passed, Elementor uses the first one.
		 *
		 * @since 1.5.0
		 *
		 * @access public
		 *
		 * @return array Widget categories.
		 */
		public function get_categories() {
		}
		/**
		 * Retrieve the list of scripts the navigation menu depended on.
		 *
		 * Used to set scripts dependencies required to run the widget.
		 *
		 * @since 1.5.0
		 * @access public
		 *
		 * @return array Widget scripts dependencies.
		 */
		public function get_script_depends() {
		}
		/**
		 * Register Search Button controls.
		 *
		 * @since 1.5.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register Search Button controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register Search General Controls.
		 *
		 * @since 1.5.0
		 * @access protected
		 */
		protected function register_general_content_controls() {
		}
		/**
		 * Register Search Style Controls.
		 *
		 * @since 1.5.0
		 * @access protected
		 */
		protected function register_search_style_controls() {
		}
		/**
		 * Render Search button output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.5.0
		 * @access protected
		 */
		protected function render() {
		}
	}
	/**
	 * Helper class for the Copyright.
	 *
	 * @since 1.2.0
	 */
	class Copyright_Shortcode {

		/**
		 * Constructor.
		 */
		public function __construct() {
		}
		/**
		 * Get the hfe_current_year Details.
		 *
		 * @return array $hfe_current_year Get Current Year Details.
		 */
		public function display_current_year() {
		}
		/**
		 * Get site title of Site.
		 *
		 * @return string.
		 */
		public function display_site_title() {
		}
	}
	/**
	 * HFE Page Title widget
	 *
	 * HFE widget for Page Title.
	 *
	 * @since 1.3.0
	 */
	class Page_Title extends \Elementor\Widget_Base {

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
		}
		/**
		 * Register Page Title controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register Page Title controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register Page Title General Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_content_page_title_controls() {
		}
		/**
		 * Register Page Title Style Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_page_title_style_controls() {
		}
		/**
		 * Render page title widget output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function render() {
		}
		/**
		 * Render page title output in the editor.
		 *
		 * Written as a Backbone JavaScript template and used to generate the live preview.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function content_template() {
		}
	}
	/**
	 * HFE Site title widget
	 *
	 * HFE widget for site title
	 *
	 * @since 1.3.0
	 */
	class Site_Title extends \Elementor\Widget_Base {

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
		}
		/**
		 * Register site title controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register site title controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register Advanced Heading General Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_general_content_controls() {
		}
		/**
		 * Register Advanced Heading Typography Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_heading_typo_content_controls() {
		}
		/**
		 * Render Heading output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function render() {
		}
		/**
		 * Render site title output in the editor.
		 *
		 * Written as a Backbone JavaScript template and used to generate the live preview.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function content_template() {
		}
	}
	/**
	 * HFE Site Logo widget
	 *
	 * HFE widget for Site Logo.
	 *
	 * @since 1.3.0
	 */
	class Site_Logo extends \Elementor\Widget_Base {

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
		}
		/**
		 * Register Site Logo controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register Site Logo controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register Site Logo General Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_content_site_logo_controls() {
		}
		/**
		 * Register Site Image Style Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_site_logo_styling_controls() {
		}
		/**
		 * Register Site Logo style Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_site_logo_caption_styling_controls() {
		}
		/**
		 * Render Site Image output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.3.0
		 * @param array $size returns the size of an image.
		 * @access public
		 */
		public function site_image_url( $size ) {
		}
		/**
		 * Render Site Image output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function render() {
		}
	}
	/**
	 * Class Nav Menu.
	 */
	class Navigation_Menu extends \Elementor\Widget_Base {

		/**
		 * Menu index.
		 *
		 * @access protected
		 * @var $nav_menu_index
		 */
		protected $nav_menu_index = 1;
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
		}
		/**
		 * Retrieve the menu index.
		 *
		 * Used to get index of nav menu.
		 *
		 * @since 1.3.0
		 * @access protected
		 *
		 * @return string nav index.
		 */
		protected function get_nav_menu_index() {
		}
		/**
		 * Check if the Elementor is updated.
		 *
		 * @since 1.3.0
		 *
		 * @return boolean if Elementor updated.
		 */
		public static function is_elementor_updated() {
		}
		/**
		 * Register Nav Menu controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register Nav Menu controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register Nav Menu General Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_general_content_controls() {
		}
		/**
		 * Register Nav Menu General Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_style_content_controls() {
		}
		/**
		 * Register Nav Menu General Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_dropdown_content_controls() {
		}
		/**
		 * Add itemprop for Navigation Schema.
		 *
		 * @since 1.5.2
		 * @param string $atts link attributes.
		 * @access public
		 */
		public function handle_link_attrs( $atts ) {
		}
		/**
		 * Add itemprop to the li tag of Navigation Schema.
		 *
		 * @since 1.6.0
		 * @param string $value link attributes.
		 * @access public
		 */
		public function handle_li_values( $value ) {
		}
		/**
		 * Get the menu and close icon HTML.
		 *
		 * @since 1.5.2
		 * @param array $settings Widget settings array.
		 * @access public
		 */
		public function get_menu_close_icon( $settings ) {
		}
		/**
		 * Render Nav Menu output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function render() {
		}
	}
	/**
	 * Elementor Copyright
	 *
	 * Elementor widget for copyright.
	 *
	 * @since 1.2.0
	 */
	class Copyright extends \Elementor\Widget_Base {

		/**
		 * Retrieve the widget name.
		 *
		 * @since 1.2.0
		 *
		 * @access public
		 *
		 * @return string Widget name.
		 */
		public function get_name() {
		}
		/**
		 * Retrieve the widget title.
		 *
		 * @since 1.2.0
		 *
		 * @access public
		 *
		 * @return string Widget title.
		 */
		public function get_title() {
		}
		/**
		 * Retrieve the widget icon.
		 *
		 * @since 1.2.0
		 *
		 * @access public
		 *
		 * @return string Widget icon.
		 */
		public function get_icon() {
		}
		/**
		 * Retrieve the list of categories the widget belongs to.
		 *
		 * Used to determine where to display the widget in the editor.
		 *
		 * Note that currently Elementor supports only one category.
		 * When multiple categories passed, Elementor uses the first one.
		 *
		 * @since 1.2.0
		 *
		 * @access public
		 *
		 * @return array Widget categories.
		 */
		public function get_categories() {
		}
		/**
		 * Register Copyright controls.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register Copyright controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register Copyright General Controls.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function register_content_copy_right_controls() {
		}
		/**
		 * Render Copyright output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function render() {
		}
		/**
		 * Render shortcode widget as plain content.
		 *
		 * Override the default behavior by printing the shortcode instead of rendering it.
		 *
		 * @since 1.2.0
		 * @access public
		 */
		public function render_plain_content() {
		}
		/**
		 * Render shortcode widget output in the editor.
		 *
		 * Written as a Backbone JavaScript template and used to generate the live preview.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function content_template() {
		}
	}
	/**
	 * Class Menu_Walker.
	 */
	class Menu_Walker extends \Walker_Nav_Menu {

		/**
		 * Start element
		 *
		 * @since 1.3.0
		 * @param string $output Output HTML.
		 * @param object $item Individual Menu item.
		 * @param int    $depth Depth.
		 * @param array  $args Arguments array.
		 * @param int    $id Menu ID.
		 * @access public
		 */
		public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		}
		/**
		 * Display element
		 *
		 * @since 1.3.0
		 * @param object $element Individual Menu element.
		 * @param object $children_elements Child Elements.
		 * @param int    $max_depth Maximum Depth.
		 * @param int    $depth Depth.
		 * @param array  $args Arguments array.
		 * @param string $output Output HTML.
		 * @access public
		 */
		function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
		}
	}
	/**
	 * HFE Retina widget
	 *
	 * HFE widget for Retina Image.
	 *
	 * @since 1.2.0
	 */
	class Retina extends \Elementor\Widget_Base {

		/**
		 * Retrieve the widget name.
		 *
		 * @since 1.2.0
		 *
		 * @access public
		 *
		 * @return string Widget name.
		 */
		public function get_name() {
		}
		/**
		 * Retrieve the widget title.
		 *
		 * @since 1.2.0
		 *
		 * @access public
		 *
		 * @return string Widget title.
		 */
		public function get_title() {
		}
		/**
		 * Retrieve the widget icon.
		 *
		 * @since 1.2.0
		 *
		 * @access public
		 *
		 * @return string Widget icon.
		 */
		public function get_icon() {
		}
		/**
		 * Retrieve the list of categories the widget belongs to.
		 *
		 * Used to determine where to display the widget in the editor.
		 *
		 * Note that currently Elementor supports only one category.
		 * When multiple categories passed, Elementor uses the first one.
		 *
		 * @since 1.2.0
		 *
		 * @access public
		 *
		 * @return array Widget categories.
		 */
		public function get_categories() {
		}
		/**
		 * Register Retina Logo controls.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register Retina Logo controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register Retina Logo General Controls.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function register_content_retina_image_controls() {
		}
		/**
		 * Register Retina Image Style Controls.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function register_retina_image_styling_controls() {
		}
		/**
		 * Register Caption style Controls.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function register_retina_caption_styling_controls() {
		}
		/**
		 * Helpful Information.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function register_helpful_information() {
		}
		/**
		 * Render Retina Image output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.2.0
		 * @access protected
		 */
		protected function render() {
		}
	}
	/**
	 * HFE Site tagline widget
	 *
	 * HFE widget for site tagline
	 *
	 * @since 1.3.0
	 */
	class Site_Tagline extends \Elementor\Widget_Base {

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
		}
		/**
		 * Retrieve the widget tagline.
		 *
		 * @since 1.3.0
		 *
		 * @access public
		 *
		 * @return string Widget tagline.
		 */
		public function get_title() {
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
		}
		/**
		 * Register site tagline controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function _register_controls() {
		}
		/**
		 * Register site tagline controls.
		 *
		 * @since 1.5.7
		 * @access protected
		 */
		protected function register_controls() {
		}
		/**
		 * Register site tagline General Controls.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function register_general_content_controls() {
		}
		/**
		 * Render site tagline output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function render() {
		}
		/**
		 * Render Site Tagline widgets output in the editor.
		 *
		 * Written as a Backbone JavaScript template and used to generate the live preview.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
		protected function content_template() {
		}
	}
}

namespace {
	/**
	 * HFE_Elementor_Canvas_Compat setup
	 *
	 * @package header-footer-elementor
	 */
	/**
	 * Astra theme compatibility.
	 */
	class HFE_Elementor_Canvas_Compat {

		/**
		 *  Initiator
		 */
		public static function instance() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Render the header if display template on elementor canvas is enabled
		 * and current template is Elementor Canvas
		 */
		public function render_header() {
		}
		/**
		 * Render the footer if display template on elementor canvas is enabled
		 * and current template is Elementor Canvas
		 */
		public function render_footer() {
		}
	}
}

namespace HFE\Lib {
	/**
	 * Meta Boxes setup
	 */
	class Astra_Target_Rules_Fields {

		/**
		 * Initiator
		 *
		 * @since  1.0.0
		 */
		public static function get_instance() {
		}
		/**
		 * Constructor
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
		}
		/**
		 * Initialize member variables.
		 *
		 * @return void
		 */
		public function initialize_options() {
		}
		/**
		 * Get location selection options.
		 *
		 * @return array
		 */
		public static function get_location_selections() {
		}
		/**
		 * Get user selection options.
		 *
		 * @return array
		 */
		public static function get_user_selections() {
		}
		/**
		 * Get location label by key.
		 *
		 * @param string $key Location option key.
		 * @return string
		 */
		public static function get_location_by_key( $key ) {
		}
		/**
		 * Get user label by key.
		 *
		 * @param string $key User option key.
		 * @return string
		 */
		public static function get_user_by_key( $key ) {
		}
		/**
		 * Ajax handeler to return the posts based on the search query.
		 * When searching for the post/pages only titles are searched for.
		 *
		 * @since  1.0.0
		 */
		function hfe_get_posts_by_query() {
		}
		/**
		 * Return search results only by post title.
		 * This is only run from hfe_get_posts_by_query()
		 *
		 * @param  (string)   $search   Search SQL for WHERE clause.
		 * @param  (WP_Query) $wp_query The current WP_Query object.
		 *
		 * @return (string) The Modified Search SQL for WHERE clause.
		 */
		function search_only_titles( $search, $wp_query ) {
		}
		/**
		 * Function Name: admin_styles.
		 * Function Description: admin_styles.
		 */
		public function admin_styles() {
		}
		/**
		 * Function Name: target_rule_settings_field.
		 * Function Description: Function to handle new input type.
		 *
		 * @param string $name string parameter.
		 * @param string $settings string parameter.
		 * @param string $value string parameter.
		 */
		public static function target_rule_settings_field( $name, $settings, $value ) {
		}
		/**
		 * Get target rules for generating the markup for rule selector.
		 *
		 * @since  1.0.0
		 *
		 * @param object $post_type post type parameter.
		 * @param object $taxonomy taxonomy for creating the target rule markup.
		 */
		public static function get_post_target_rule_options( $post_type, $taxonomy ) {
		}
		/**
		 * Generate markup for rendering the location selction.
		 *
		 * @since  1.0.0
		 * @param  String $type                 Rule type display|exclude.
		 * @param  Array  $selection_options     Array for available selection fields.
		 * @param  String $input_name           Input name for the settings.
		 * @param  Array  $saved_values          Array of saved valued.
		 * @param  String $add_rule_label       Label for the Add rule button.
		 *
		 * @return HTML Markup for for the location settings.
		 */
		public static function generate_target_rule_selector( $type, $selection_options, $input_name, $saved_values, $add_rule_label ) {
		}
		/**
		 * Get current layout.
		 * Checks of the passed post id of the layout is to be displayed in the page.
		 *
		 * @param int    $layout_id Layout ID.
		 * @param string $option Option prefix.
		 *
		 * @return int|boolean If the current layout is to be displayed it will be returned back else a boolean will be passed.
		 */
		public function get_current_layout( $layout_id, $option ) {
		}
		/**
		 * Checks for the display condition for the current page/
		 *
		 * @param  int   $post_id Current post ID.
		 * @param  array $rules   Array of rules Display on | Exclude on.
		 *
		 * @return boolean      Returns true or false depending on if the $rules match for the current page and the layout is to be displayed.
		 */
		public function parse_layout_display_condition( $post_id, $rules ) {
		}
		/**
		 * Function Name: target_user_role_settings_field.
		 * Function Description: Function to handle new input type.
		 *
		 * @param string $name string parameter.
		 * @param string $settings string parameter.
		 * @param string $value string parameter.
		 */
		public static function target_user_role_settings_field( $name, $settings, $value ) {
		}
		/**
		 * Parse user role condition.
		 *
		 * @since  1.0.0
		 * @param  int   $post_id Post ID.
		 * @param  Array $rules   Current user rules.
		 *
		 * @return boolean  True = user condition passes. False = User condition does not pass.
		 */
		public function parse_user_role_condition( $post_id, $rules ) {
		}
		/**
		 * Get current page type
		 *
		 * @since  1.0.0
		 *
		 * @return string Page Type.
		 */
		public function get_current_page_type() {
		}
		/**
		 * Get posts by conditions
		 *
		 * @since  1.0.0
		 * @param  string $post_type Post Type.
		 * @param  array  $option meta option name.
		 *
		 * @return object  Posts.
		 */
		public function get_posts_by_conditions( $post_type, $option ) {
		}
		/**
		 * Remove exclusion rule posts.
		 *
		 * @since  1.0.0
		 * @param  string $post_type Post Type.
		 * @param  array  $option meta option name.
		 */
		public function remove_exclusion_rule_posts( $post_type, $option ) {
		}
		/**
		 * Remove user rule posts.
		 *
		 * @since  1.0.0
		 * @param  int   $post_type Post Type.
		 * @param  array $option meta option name.
		 */
		public function remove_user_rule_posts( $post_type, $option ) {
		}
		/**
		 * Same display_on notice.
		 *
		 * @since  1.0.0
		 * @param  int   $post_type Post Type.
		 * @param  array $option meta option name.
		 */
		public static function same_display_on_notice( $post_type, $option ) {
		}
		/**
		 * Meta option post.
		 *
		 * @since  1.0.0
		 * @param  string $post_type Post Type.
		 * @param  array  $option meta option name.
		 *
		 * @return false | object
		 */
		public static function get_meta_option_post( $post_type, $option ) {
		}
		/**
		 * Get post selection.
		 *
		 * @since  1.0.0
		 * @param  string $post_type Post Type.
		 *
		 * @return object  Posts.
		 */
		public static function get_post_selection( $post_type ) {
		}
		/**
		 * Formated rule meta value to save.
		 *
		 * @since  1.0.0
		 * @param  array  $save_data PostData.
		 * @param  string $key varaible key.
		 *
		 * @return array Rule data.
		 */
		public static function get_format_rule_value( $save_data, $key ) {
		}
	}
}

namespace {
	/**
	 * Astra_Notices
	 *
	 * @since 1.0.0
	 */
	class Astra_Notices {

		/**
		 * Initiator
		 *
		 * @since 1.0.0
		 * @return object initialized object of class.
		 */
		public static function get_instance() {
		}
		/**
		 * Constructor
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
		}
		/**
		 * Filters and Returns a list of allowed tags and attributes for a given context.
		 *
		 * @param array  $allowedposttags array of allowed tags.
		 * @param string $context Context type (explicit).
		 * @since 1.0.0
		 * @return array
		 */
		public function add_data_attributes( $allowedposttags, $context ) {
		}
		/**
		 * Add Notice.
		 *
		 * @since 1.0.0
		 * @param array $args Notice arguments.
		 * @return void
		 */
		public static function add_notice( $args = array() ) {
		}
		/**
		 * Dismiss Notice.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function dismiss_notice() {
		}
		/**
		 * Enqueue Scripts.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function enqueue_scripts() {
		}
		/**
		 * Sort the notices based on the given priority of the notice.
		 * This function is called from usort()
		 *
		 * @since 1.5.2
		 * @param array $notice_1 First notice.
		 * @param array $notice_2 Second Notice.
		 * @return array
		 */
		public function sort_notices( $notice_1, $notice_2 ) {
		}
		/**
		 * Display the notices in the WordPress admin.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function show_notices() {
		}
		/**
		 * Render a notice.
		 *
		 * @since 1.0.0
		 * @param  array $notice Notice markup.
		 * @return void
		 */
		public static function markup( $notice = array() ) {
		}
		/**
		 * Get base URL for the astra-notices.
		 *
		 * @return mixed URL.
		 */
		public static function get_url() {
		}
	}
	/**
	 * HFE_Admin setup
	 *
	 * @since 1.0
	 */
	class HFE_Admin {

		/**
		 * Instance of HFE_Admin
		 *
		 * @return HFE_Admin Instance of HFE_Admin
		 */
		public static function instance() {
		}
		/**
		 * Load the icons style in editor.
		 *
		 * @since 1.3.0
		 */
		public static function load_admin() {
		}
		/**
		 * Enqueue admin scripts
		 *
		 * @since 1.3.0
		 * @param string $hook Current page hook.
		 * @access public
		 */
		public static function hfe_admin_enqueue_scripts( $hook ) {
		}
		/**
		 * Script for Elementor Pro full site editing support.
		 *
		 * @since 1.4.0
		 *
		 * @return void
		 */
		public function register_hfe_epro_script() {
		}
		/**
		 * Adds or removes list table column headings.
		 *
		 * @param array $columns Array of columns.
		 * @return array
		 */
		public function column_headings( $columns ) {
		}
		/**
		 * Adds the custom list table column content.
		 *
		 * @since 1.2.0
		 * @param array $column Name of column.
		 * @param int   $post_id Post id.
		 * @return void
		 */
		public function column_content( $column, $post_id ) {
		}
		/**
		 * Get Markup of Location rules for Display rule column.
		 *
		 * @param array $locations Array of locations.
		 * @return void
		 */
		public function column_display_location_rules( $locations ) {
		}
		/**
		 * Register Post type for Elementor Header & Footer Builder templates
		 */
		public function header_footer_posttype() {
		}
		/**
		 * Register the admin menu for Elementor Header & Footer Builder.
		 *
		 * @since  1.0.0
		 * @since  1.0.1
		 *         Moved the menu under Appearance -> Elementor Header & Footer Builder
		 */
		public function register_admin_menu() {
		}
		/**
		 * Register meta box(es).
		 */
		function ehf_register_metabox() {
		}
		/**
		 * Render Meta field.
		 *
		 * @param  POST $post Currennt post object which is being displayed.
		 */
		function efh_metabox_render( $post ) {
		}
		/**
		 * Markup for Display Rules Tabs.
		 *
		 * @since  1.0.0
		 */
		public function display_rules_tab() {
		}
		/**
		 * Save meta field.
		 *
		 * @param  POST $post_id Currennt post object which is being displayed.
		 *
		 * @return Void
		 */
		public function ehf_save_meta( $post_id ) {
		}
		/**
		 * Display notice when editing the header or footer when there is one more of similar layout is active on the site.
		 *
		 * @since 1.0.0
		 */
		public function location_notice() {
		}
		/**
		 * Convert the Template name to be added in the notice.
		 *
		 * @since  1.0.0
		 *
		 * @param  String $template_type Template type name.
		 *
		 * @return String $template_type Template type name.
		 */
		public function template_location( $template_type ) {
		}
		/**
		 * Don't display the elementor Elementor Header & Footer Builder templates on the frontend for non edit_posts capable users.
		 *
		 * @since  1.0.0
		 */
		public function block_template_frontend() {
		}
		/**
		 * Single template function which will choose our template
		 *
		 * @since  1.0.1
		 *
		 * @param  String $single_template Single template.
		 */
		function load_canvas_template( $single_template ) {
		}
		/**
		 * Set shortcode column for template list.
		 *
		 * @param array $columns template list columns.
		 */
		function set_shortcode_columns( $columns ) {
		}
		/**
		 * Display shortcode in template list column.
		 *
		 * @param array $column template list column.
		 * @param int   $post_id post id.
		 */
		function render_shortcode_column( $column, $post_id ) {
		}
	}
	/**
	 * BSF analytics stat class.
	 */
	class BSF_Analytics_Stats {

		/**
		 * Create only once instance of a class.
		 *
		 * @return object
		 * @since 1.0.0
		 */
		public static function instance() {
		}
		/**
		 * Get stats.
		 *
		 * @return array stats data.
		 * @since 1.0.0
		 */
		public function get_stats() {
		}
		/**
		 * Format plugin data.
		 *
		 * @param string $plugin plugin.
		 * @return array formatted plugin data.
		 * @since 1.0.0
		 */
		public function format_plugin( $plugin ) {
		}
	}
	/**
	 * BSF analytics
	 */
	class BSF_Analytics {

		/**
		 * Member Variable
		 *
		 * @var string Usage tracking document URL
		 */
		public $usage_doc_link = 'https://store.brainstormforce.com/usage-tracking/?utm_source=wp_dashboard&utm_medium=general_settings&utm_campaign=usage_tracking';
		/**
		 * Setup actions, load files.
		 *
		 * @param array  $args entity data for analytics.
		 * @param string $analytics_path directory path to analytics library.
		 * @param float  $analytics_version analytics library version.
		 * @since 1.0.0
		 */
		public function __construct( $args, $analytics_path, $analytics_version ) {
		}
		/**
		 * Setup actions for admin notice style and analytics cron event.
		 *
		 * @since 1.0.4
		 */
		public function set_actions() {
		}
		/**
		 * BSF Analytics URL
		 *
		 * @param string $analytics_path directory path to analytics library.
		 * @return String URL of bsf-analytics directory.
		 * @since 1.0.0
		 */
		public function get_analytics_url( $analytics_path ) {
		}
		/**
		 * Enqueue Scripts.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function enqueue_assets() {
		}
		/**
		 * Send analytics API call.
		 *
		 * @since 1.0.0
		 */
		public function send() {
		}
		/**
		 * Check if usage tracking is enabled.
		 *
		 * @return bool
		 * @since 1.0.0
		 */
		public function is_tracking_enabled() {
		}
		/**
		 * Check if WHITE label is enabled for BSF products.
		 *
		 * @param string $source source of analytics.
		 * @return bool
		 * @since 1.0.0
		 */
		public function is_white_label_enabled( $source ) {
		}
		/**
		 * Display admin notice for usage tracking.
		 *
		 * @since 1.0.0
		 */
		public function option_notice() {
		}
		/**
		 * Process usage tracking opt out.
		 *
		 * @since 1.0.0
		 */
		public function handle_optin_optout() {
		}
		/**
		 * Register usage tracking option in General settings page.
		 *
		 * @since 1.0.0
		 */
		public function register_usage_tracking_setting() {
		}
		/**
		 * Sanitize Callback Function
		 *
		 * @param bool $input Option value.
		 * @since 1.0.0
		 */
		public function sanitize_option( $input ) {
		}
		/**
		 * Print settings field HTML.
		 *
		 * @param array $args arguments to field.
		 * @since 1.0.0
		 */
		public function render_settings_field_html( $args ) {
		}
		/**
		 * Schedule/unschedule cron event on updation of option.
		 *
		 * @param string $old_value old value of option.
		 * @param string $value value of option.
		 * @param string $option Option name.
		 * @since 1.0.0
		 */
		public function update_analytics_option_callback( $old_value, $value, $option ) {
		}
		/**
		 * Analytics option add callback.
		 *
		 * @param string $option Option name.
		 * @param string $value value of option.
		 * @since 1.0.0
		 */
		public function add_analytics_option_callback( $option, $value ) {
		}
		/**
		 * Send analaytics track event if tracking is enabled.
		 *
		 * @since 1.0.0
		 */
		public function maybe_track_analytics() {
		}
		/**
		 * Save analytics option to network.
		 *
		 * @param string $option name of option.
		 * @param string $value value of option.
		 * @since 1.0.0
		 */
		public function add_option_to_network( $option, $value ) {
		}
	}
	/**
	 * Class BSF_Analytics_Loader.
	 */
	class BSF_Analytics_Loader {

		/**
		 * Get instace of class.
		 *
		 * @return object
		 */
		public static function get_instance() {
		}
		/**
		 * Constructor
		 */
		public function __construct() {
		}
		/**
		 * Set entity for analytics.
		 *
		 * @param string $data Entity attributes data.
		 * @return void
		 */
		public function set_entity( $data ) {
		}
		/**
		 * Load Analytics library.
		 *
		 * @return void
		 */
		public function load_analytics() {
		}
	}
	/**
	 * Initialization
	 *
	 * @since 1.6.0
	 */
	class HFE_Addons_Actions {

		/**
		 *  Initiator
		 */
		public static function get_instance() {
		}
		/**
		 *  Constructor
		 */
		public function __construct() {
		}
		/**
		 * Open modal popup.
		 *
		 * @since 1.6.0
		 */
		public function hfe_admin_modal() {
		}
		/**
		 * Update Subscription
		 *
		 * @since 1.6.0
		 */
		public function update_subscription() {
		}
		/**
		 * Get the API URL.
		 *
		 * @since 1.6.0
		 */
		public function get_api_domain() {
		}
		/**
		 * Activate addon.
		 *
		 * @since 1.6.0
		 */
		public function hfe_activate_addon() {
		}
	}
	/**
	 * HFE_Storefront_Compat setup
	 *
	 * @package header-footer-elementor
	 */
	/**
	 * Astra theme compatibility.
	 */
	class HFE_Storefront_Compat {

		/**
		 *  Initiator
		 */
		public static function instance() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Add inline CSS to hide empty divs for header and footer in storefront
		 *
		 * @since 1.2.0
		 * @return void
		 */
		public function styles() {
		}
		/**
		 * Disable header from the theme.
		 */
		public function setup_header() {
		}
		/**
		 * Disable footer from the theme.
		 */
		public function setup_footer() {
		}
	}
	/**
	 * GeneratepressCompatibility.
	 *
	 * @package  header-footer-elementor
	 */
	/**
	 * HFE_GeneratePress_Compat setup
	 *
	 * @since 1.0
	 */
	class HFE_GeneratePress_Compat {

		/**
		 *  Initiator
		 */
		public static function instance() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Disable header from the theme.
		 */
		public function generatepress_setup_header() {
		}
		/**
		 * Disable footer from the theme.
		 */
		public function generatepress_setup_footer() {
		}
	}
	/**
	 * BB Theme Compatibility.
	 *
	 * @package  header-footer-elementor
	 */
	/**
	 * HFE_BB_Theme_Compat setup
	 *
	 * @since 1.0
	 */
	class HFE_BB_Theme_Compat {

		/**
		 *  Initiator
		 */
		public static function instance() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Display header markup for beaver builder theme.
		 */
		public function get_header_content() {
		}
		/**
		 * Display footer markup for beaver builder theme.
		 */
		public function get_footer_content() {
		}
	}
	/**
	 * HFE_Hello_Elementor_Compat setup
	 *
	 * @package header-footer-elementor
	 */
	/**
	 * Hello Elementor compatibility.
	 */
	class HFE_Hello_Elementor_Compat {

		/**
		 *  Initiator
		 */
		public static function instance() {
		}
	}
}

namespace HFE\Themes {
	/**
	 * Global theme compatibility.
	 */
	class Global_Theme_Compatibility {

		/**
		 *  Initiator
		 */
		public function __construct() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Force full width CSS for the header.
		 *
		 * @since 1.2.0
		 * @return void
		 */
		public function force_fullwidth() {
		}
		/**
		 * Function overriding the header in the wp_body_open way.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function option_override_header() {
		}
	}
	/**
	 * Astra theme compatibility.
	 */
	class HFE_Default_Compat {

		/**
		 *  Initiator
		 */
		public function __construct() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Function for overriding the header in the elmentor way.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function override_header() {
		}
		/**
		 * Function for overriding the footer in the elmentor way.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function override_footer() {
		}
	}
}

namespace {
	/**
	 * HFE_OceanWP_Compat setup
	 *
	 * @package header-footer-elementor
	 */
	/**
	 * OceanWP theme compatibility.
	 */
	class HFE_OceanWP_Compat {

		/**
		 *  Initiator
		 */
		public static function instance() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Disable header from the theme.
		 */
		public function setup_header() {
		}
		/**
		 * Disable footer from the theme.
		 */
		public function setup_footer() {
		}
	}
	/**
	 * HFE_Astra_Compat setup
	 *
	 * @package header-footer-elementor
	 */
	/**
	 * Astra theme compatibility.
	 */
	class HFE_Astra_Compat {

		/**
		 *  Initiator
		 */
		public static function instance() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Disable header from the theme.
		 */
		public function astra_setup_header() {
		}
		/**
		 * Disable footer from the theme.
		 */
		public function astra_setup_footer() {
		}
	}
	/**
	 * Genesis_Compat setup
	 *
	 * @package header-footer-elementor
	 */
	/**
	 * Genesis theme compatibility.
	 */
	class HFE_Genesis_Compat {

		/**
		 *  Initiator
		 */
		public static function instance() {
		}
		/**
		 * Run all the Actions / Filters.
		 */
		public function hooks() {
		}
		/**
		 * Disable header from the theme.
		 */
		public function genesis_setup_header() {
		}
		/**
		 * Disable footer from the theme.
		 */
		public function genesis_setup_footer() {
		}
		/**
		 * Open markup for header.
		 */
		public function genesis_header_markup_open() {
		}
		/**
		 * Close MArkup for header.
		 */
		public function genesis_header_markup_close() {
		}
		/**
		 * Open markup for footer.
		 */
		public function genesis_footer_markup_open() {
		}
		/**
		 * Close markup for footer.
		 */
		public function genesis_footer_markup_close() {
		}
	}
}

namespace {
	/**
	 * Header Footer Elementor Function
	 *
	 * @package  header-footer-elementor
	 */
	/**
	 * Checks if Header is enabled from HFE.
	 *
	 * @since  1.0.2
	 * @return bool True if header is enabled. False if header is not enabled
	 */
	function hfe_header_enabled() {
	}
	/**
	 * Checks if Footer is enabled from HFE.
	 *
	 * @since  1.0.2
	 * @return bool True if header is enabled. False if header is not enabled.
	 */
	function hfe_footer_enabled() {
	}
	/**
	 * Get HFE Header ID
	 *
	 * @since  1.0.2
	 * @return (String|boolean) header id if it is set else returns false.
	 */
	function get_hfe_header_id() {
	}
	/**
	 * Get HFE Footer ID
	 *
	 * @since  1.0.2
	 * @return (String|boolean) header id if it is set else returns false.
	 */
	function get_hfe_footer_id() {
	}
	/**
	 * Display header markup.
	 *
	 * @since  1.0.2
	 */
	function hfe_render_header() {
	}
	/**
	 * Display footer markup.
	 *
	 * @since  1.0.2
	 */
	function hfe_render_footer() {
	}
	/**
	 * Get HFE Before Footer ID
	 *
	 * @since  1.0.2
	 * @return String|boolean before footer id if it is set else returns false.
	 */
	function hfe_get_before_footer_id() {
	}
	/**
	 * Checks if Before Footer is enabled from HFE.
	 *
	 * @since  1.0.2
	 * @return bool True if before footer is enabled. False if before footer is not enabled.
	 */
	function hfe_is_before_footer_enabled() {
	}
	/**
	 * Display before footer markup.
	 *
	 * @since  1.0.2
	 */
	function hfe_render_before_footer() {
	}
	/**
	 * Check if Elementor is installed
	 *
	 * @since 1.6.0
	 *
	 * @access public
	 */
	function _is_elementor_installed() {
	}
	/**
	 * Plugin Name: Elementor Header & Footer Builder
	 * Plugin URI:  https://github.com/brainstormforce/header-footer-elementor
	 * Description: This powerful plugin allows creating a custom header, footer with Elementor and display them on selected locations. You can also create custom Elementor blocks and place them anywhere on the website with a shortcode.
	 * Author:      Brainstorm Force, Nikhil Chavan
	 * Author URI:  https://www.brainstormforce.com/
	 * Text Domain: header-footer-elementor
	 * Domain Path: /languages
	 * Version: 2.0.0
	 * Elementor tested up to: 3.32
	 * Elementor Pro tested up to: 3.32
	 *
	 * @package header-footer-elementor
	 */
	\define( 'HFE_VER', '2.0.0' );
	\define( 'HFE_FILE', __FILE__ );
	\define( 'HFE_DIR', \plugin_dir_path( __FILE__ ) );
	\define( 'HFE_URL', \plugins_url( '/', __FILE__ ) );
	\define( 'HFE_PATH', \plugin_basename( __FILE__ ) );
	\define( 'HFE_DOMAIN', \trailingslashit( 'https://ultimateelementor.com' ) );
	/**
	 * Load the Plugin Class.
	 */
	function hfe_plugin_activation() {
	}
	/**
	 * Load the Plugin Class.
	 */
	function hfe_init() {
	}
}
