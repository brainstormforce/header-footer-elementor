<?php
/**
 * HFE Settings Page.
 *
 * Add plugin setting page.
 *
 * @since 1.6.0
 * @package hfe
 */

namespace HFE\Themes;

use HFE\WidgetsManager\Base\HFE_Helper;

/**
 * Class Settings Page.
 *
 * @since 1.6.0
 */
class HFE_Settings_Page {
	
	/**
	 * Instance
	 * z
	 *
	 * @access private
	 * @var string Class object.
	 * @since 1.0.0
	 */
	private $menu_slug = 'hfe';

	/**
	 * Constructor.
	 *
	 * @since 1.6.0
	 */
	public function __construct() {

		add_action( 'admin_post_uaelite_rollback', [ $this, 'post_uaelite_rollback' ] );
		
		add_action( 'admin_head', [ $this, 'hfe_global_css' ] );

		add_action( 'admin_head', [ $this, 'fetch_user_email' ] );
		add_action( 'admin_head', [ $this, 'fetch_site_url' ] );
		add_action( 'admin_head', [ $this, 'fetch_user_fname' ] );

		if ( ! HFE_Helper::is_pro_active() ) {
			if ( is_admin() && current_user_can( 'manage_options' ) ) {
				add_action( 'admin_menu', [ $this, 'hfe_register_settings_page' ] );
				if( ! defined( 'UAEL_PRO' ) ){
					add_action( 'admin_menu', [ $this, 'hfe_add_upgrade_to_pro' ] );
					add_action( 'admin_footer', [ $this, 'hfe_add_upgrade_to_pro_target_attr' ] );
				}
			}
			add_action( 'admin_footer_text', [ $this, 'uae_custom_admin_footer_text' ] );
			add_action( 'admin_init', [ $this, 'hfe_admin_init' ] );
			add_filter( 'views_edit-elementor-hf', [ $this, 'hfe_settings' ], 10, 1 );
		}
		
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ] );
		add_filter( 'plugin_action_links_' . HFE_PATH, [ $this, 'settings_link' ] );
		add_filter( 'plugin_action_links_' . HFE_PATH, [ $this, 'upgrade_pro_link' ] );		

		if ( version_compare( get_bloginfo( 'version' ), '5.1.0', '>=' ) ) {
			add_filter( 'wp_check_filetype_and_ext', [ $this, 'real_mime_types_5_1_0' ], 10, 5 );
		} else {
			add_filter( 'wp_check_filetype_and_ext', [ $this, 'real_mime_types' ], 10, 4 );
		}

		/* Flow content view */
		add_action( 'hfe_render_admin_page_content', [ $this, 'render_content' ], 10, 2 );


		if ( ! HFE_Helper::is_pro_active() ) {
			add_action( 'admin_footer', __CLASS__ . '::show_nps_notice' );
		}

		if ( version_compare( get_bloginfo( 'version' ), '5.1.0', '>=' ) ) {
			add_filter( 'wp_check_filetype_and_ext', [ $this, 'real_mime_types_5_1_0' ], 10, 5 );
		} else {
			add_filter( 'wp_check_filetype_and_ext', [ $this, 'real_mime_types' ], 10, 4 );
		}
	}

	/**
	 * Show action on plugin page.
	 *
	 * @param  array $links links.
	 * @return array
	 * @since 2.4.5
	 */
	public function upgrade_pro_link( $links ) {
		$plugin_file = 'ultimate-elementor/ultimate-elementor.php';
		if ( ! file_exists( WP_PLUGIN_DIR . '/' . $plugin_file ) && ! HFE_Helper::is_pro_active() ) {
			$links[]     = '<a href="' . esc_url( 'https://ultimateelementor.com/pricing/?utm_source=wp-admin&utm_medium=plugin-list&utm_campaign=uae-upgrade' ) . '" target="_blank" rel="noreferrer" class="uae-plugins-go-pro">' . esc_html__( 'Get UAE Pro', 'header-footer-elementor' ) . '</a>';
		}

		return $links;
	}

	/**
	 * Adding Rating footer to dashboard pages.
	 *
	 * @since 2.4.5
	 * @return void
	 */
	public function uae_custom_admin_footer_text( $footer_text ) {
		$screen = get_current_screen();
	
		if (
			( isset( $_GET['page'] ) && $_GET['page'] === 'hfe' ) ||
			( isset( $screen->post_type ) && $screen->post_type === 'elementor-hf' )
		) {
			$footer_text = sprintf(
				/* translators: %1$s is bold plugin name, %2$s is the review link */
				__( 'Enjoyed %1$s? Please leave us a %2$s rating. We really appreciate your support!', 'header-footer-elementor' ),
				'<b>UAE</b>',
				'<a class="uae-rating" href="https://wordpress.org/support/plugin/header-footer-elementor/reviews/#new-post" target="_blank">★★★★★</a>'
			);
		}
		return $footer_text;
	}

	/**
	 * Render UAE NPS Survey Notice.
	 *
	 * @since 2.1.0
	 * @return void
	 */
	public static function show_nps_notice() {
		if ( class_exists( 'Nps_Survey' ) ) {
			$uae_logo = HFE_URL . 'assets/images/settings/logo.svg';
			\Nps_Survey::show_nps_notice(
				'nps-survey-header-footer-elementor',
				[
					'show_if'          => true, // Add your display conditions.
					'dismiss_timespan' => 2 * WEEK_IN_SECONDS,
					'display_after'    => 2 * WEEK_IN_SECONDS,
					'plugin_slug'      => 'header-footer-elementor',
					'show_on_screens'  => [ 'toplevel_page_hfe' ],
					'message'          => [
						// Step 1 i.e rating input.
						'logo'                  => esc_url( $uae_logo ),
						'plugin_name'           => __( 'Ultimate Addons for Elementor', 'header-footer-elementor' ),
						'nps_rating_message'    => __( 'How likely are you to recommend Ultimate Addons for Elementor to your friends or colleagues?', 'header-footer-elementor' ),
						// Step 2A i.e. positive.
						'feedback_content'      => __( 'Could you please do us a favor and give us a 5-star rating on Trustpilot? It would help others choose Ultimate Addons for Elementor with confidence. Thank you!', 'header-footer-elementor' ),
						'plugin_rating_link'    => esc_url( 'https://www.trustpilot.com/review/ultimateelementor.com' ),
						// Step 2B i.e. negative.
						'plugin_rating_title'   => __( 'Thank you for your feedback', 'header-footer-elementor' ),
						'plugin_rating_content' => __( 'We value your input. How can we improve your experience?', 'header-footer-elementor' ),
					],
				]
			);
		}
	}

	/**
	 * Get Elementor edit page link
	 */
	public static function get_elementor_new_page_url() {

		if ( class_exists( '\Elementor\Plugin' ) && current_user_can( 'edit_pages' ) ) {
			// Ensure Elementor is loaded.
			$query_args = [
				'action'    => 'elementor_new_post',
				'post_type' => 'page',
			];
		
			$new_post_url = add_query_arg( $query_args, admin_url( 'edit.php' ) );
		
			$new_post_url = add_query_arg( '_wpnonce', wp_create_nonce( 'elementor_action_new_post' ), $new_post_url );
		
			return $new_post_url;
		}
		return '';
	}

	

	/**
	 * UAELite version rollback.
	 *
	 * Rollback to previous version.
	 *
	 * Fired by `admin_post_uaelite_rollback` action.
	 *
	 * @since 2.2.1
	 * @access public
	 */
	public function post_uaelite_rollback() {

		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_die(
				esc_html__( 'You do not have permission to access this page.', 'header-footer-elementor' ),
				esc_html__( 'Rollback to Previous Version', 'header-footer-elementor' ),
				[
					'response' => 200,
				]
			);
		}

		check_admin_referer( 'uaelite_rollback' );

		$rollback_versions = HFE_Helper::get_rollback_versions_options();
		$update_version    = isset( $_GET['version'] ) ? sanitize_text_field( $_GET['version'] ) : '';

		// Extract version values from the rollback_versions array.
		$version_values = array_column( $rollback_versions, 'value' );

		if ( empty( $update_version ) || ! in_array( $update_version, $version_values, true ) ) {
			wp_die( esc_html__( 'Error occurred, The version selected is invalid. Try selecting different version.', 'header-footer-elementor' ) );
		}

		$plugin_slug = basename( HFE_FILE, '.php' );
		
		if ( class_exists( 'HFE_Rollback' ) ) {
			$rollback = new \HFE_Rollback(
				[
					'version'     => $update_version,
					'plugin_name' => HFE_PATH,
					'plugin_slug' => $plugin_slug,
					'package_url' => sprintf( 'https://downloads.wordpress.org/plugin/%s.%s.zip', $plugin_slug, $update_version ),
				]
			);

			$rollback->run();

			wp_die(
				'',
				esc_html__( 'Rollback to Previous Version', 'header-footer-elementor' ),
				[
					'response' => 200,
				]
			);
		}
		wp_die();
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
		wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', [], HFE_VER );
	}

	/**
	 * Fetch and return the user's email.
	 *
	 * @since 1.6.0
	 * @return string|null The user's email if logged in, null otherwise.
	 */
	public function fetch_user_email() {
		$current_user = wp_get_current_user();
		if ( $current_user->ID !== 0 ) {
			return $current_user->user_email;
		} else {
			return null;
		}
	}

	/**
	 * Fetch and return the user's first name.
	 *
	 * @since 2.4.5
	 * @return string|null The user's name if logged in, null otherwise.
	 */
	public function fetch_user_fname() {
		$current_user = wp_get_current_user();
		if ( $current_user->ID !== 0 ) {
			return $current_user->user_firstname;
		} else {
			return null;
		}
	}

	/**
	 * Fetch and return the site URL.
	 *
	 * @since 2.4.5
	 * @return string|null
	 */
	public function fetch_site_url() {
		$siteurl = get_option('siteURL');
		if ( !empty( $siteurl ) ) {
			return $siteurl;
		} else {
			return null;
		}
	}

	/**
	 * Load admin styles on header footer elementor edit screen.
	 *
	 * @return void
	 */
	public function enqueue_admin_scripts() {

		global $pagenow, $post_type;
	
		$uae_logo      = HFE_URL . 'assets/images/settings/dashboard-logo.svg';
		$white_logo    = HFE_URL . 'assets/images/settings/white-logo.svg';
		$show_view_all = ( $post_type === 'elementor-hf' && $pagenow === 'post.php' ) ? 'yes' : 'no';
		$hfe_edit_url  = admin_url( 'edit.php?post_type=elementor-hf' );
		$is_hfe_post   = ( 'elementor-hf' === $post_type && ( 'post.php' === $pagenow || 'post-new.php' === $pagenow ) ) ? 'yes' : 'no';
	
		$additional_condition = ( isset( $_GET['post_type'] ) && 'elementor-hf' === sanitize_text_field( $_GET['post_type'] ) && 
			( 'edit.php' === $GLOBALS['pagenow'] || 'post.php' === $GLOBALS['pagenow'] || 'post-new.php' === $GLOBALS['pagenow'] ) ) ||
			( isset( $_GET['post'] ) && 'post.php' === $GLOBALS['pagenow'] && isset( $_GET['action'] ) && 'edit' === sanitize_text_field( $_GET['action'] ) && 'elementor-hf' === get_post_type( sanitize_text_field( $_GET['post'] ) ) ) ||
			( 'post-new.php' === $GLOBALS['pagenow'] && isset( $_GET['post_type'] ) && 'elementor-hf' === sanitize_text_field( $_GET['post_type'] ) );
	
		if ( ( 
				self::is_current_page( 'hfe' ) || 
				$additional_condition 
			) && 
			! HFE_Helper::is_pro_active() 
		) {
	
			$rollback_versions = HFE_Helper::get_rollback_versions_options();
			$st_status         = HFE_Helper::free_starter_templates_status();
			$stpro_status      = HFE_Helper::premium_starter_templates_status();
			$st_link           = HFE_Helper::starter_templates_link();
			$hfe_post_url      = admin_url( 'post-new.php?post_type=elementor-hf' );
			// Fetch the user's email.
			$user_email = $this->fetch_user_email();
			$user_name  = $this->fetch_user_fname();
			$siteurl    = $this->fetch_site_url();
			$show_theme_support = 'no';
			$hfe_theme_status   = get_option( 'hfe_is_theme_supported', false );
			$analytics_status   = get_option( 'uae_analytics_optin', false );
	
			if ( ( ! current_theme_supports( 'header-footer-elementor' ) ) && ! $hfe_theme_status ) {
				$show_theme_support = 'yes';
			}
			$theme_option = get_option( 'hfe_compatibility_option', '1' );
	
			wp_enqueue_script(
				'header-footer-elementor-react-app',
				HFE_URL . 'build/main.js',
				[ 'wp-element', 'wp-dom-ready', 'wp-api-fetch' ],
				HFE_VER,
				true
			);

			wp_set_script_translations( 'header-footer-elementor-react-app', 'header-footer-elementor', HFE_DIR . 'languages' );

	
			wp_localize_script(
				'header-footer-elementor-react-app',
				'hfeSettingsData',
				[
					'hfe_nonce_action'         => wp_create_nonce( 'wp_rest' ),
					'installer_nonce'          => wp_create_nonce( 'updates' ),
					'ajax_url'                 => admin_url( 'admin-ajax.php' ),
					'ajax_nonce'               => wp_create_nonce( 'hfe-widget-nonce' ),
					'templates_url'            => HFE_URL . 'assets/images/settings/starter-templates.png',
					'column_url'               => HFE_URL . 'assets/images/settings/column.png',
					'template_url'             => HFE_URL . 'assets/images/settings/template.png',
					'icon_url'                 => HFE_URL . 'assets/images/settings/logo.svg',
					'elementor_page_url'       => self::get_elementor_new_page_url(),
					'astra_url'                => HFE_URL . 'assets/images/settings/astra.svg',
					'starter_url'              => HFE_URL . 'assets/images/settings/starter-templates.svg',
					'surecart_url'             => HFE_URL . 'assets/images/settings/surecart.svg',
					'suretriggers_url'         => HFE_URL . 'assets/images/settings/OttoKit-Symbol-Primary.svg',
					'theme_url_selected'       => HFE_URL . 'assets/images/settings/theme.svg',
					'theme_url'                => HFE_URL . 'assets/images/settings/layout-template.svg',
					'version_url'              => HFE_URL . 'assets/images/settings/version.svg',
					'version__selected_url'    => HFE_URL . 'assets/images/settings/git-compare.svg',
					'tracking_url'              => HFE_URL . 'assets/images/settings/tracking.svg',
					'tracking__selected_url'    => HFE_URL . 'assets/images/settings/tracking_selected.svg',
					'user_url'                 => HFE_URL . 'assets/images/settings/user.svg',
					'user__selected_url'       => HFE_URL . 'assets/images/settings/user-selected.svg',
					'integrations_url'         => HFE_URL . 'assets/images/settings/integrations.svg', // Update the path to your assets folder.
					'welcome_banner'           => HFE_URL . 'assets/images/settings/welcome-banner.png',
					'build_banner'             => HFE_URL . 'assets/images/settings/build_banner.png',
					'special_reward'           => HFE_URL . 'assets/images/settings/build_bg.png',
					'success_banner'           => HFE_URL . 'assets/images/settings/success_bg.png',
					'success_badge'            => HFE_URL . 'assets/images/settings/success_badge.svg',
					'icon_svg'                 => HFE_URL . 'assets/images/settings/uae-logo-svg.svg',
					'augemented_url'                 => HFE_URL . 'assets/images/settings/augemented_reality_widgets.png',
					'rocket_svg'                 => HFE_URL . 'assets/images/settings/rocket.svg',
					'augmented_reality'                 => HFE_URL . 'assets/images/settings/augmented_reality.png',
					'welcome_new'                 => HFE_URL . 'assets/images/settings/welcome_new.png',
					'icon_new'                 => HFE_URL . 'assets/images/settings/icon_2.svg',
					'create_new'                 => HFE_URL . 'assets/images/settings/create_new_banner.png',
					'uaelite_previous_version' => isset( $rollback_versions[0]['value'] ) ? $rollback_versions[0]['value'] : '',
					'uaelite_versions'         => $rollback_versions,
					'uaelite_rollback_url'     => esc_url( add_query_arg( 'version', 'VERSION', wp_nonce_url( admin_url( 'admin-post.php?action=uaelite_rollback' ), 'uaelite_rollback' ) ) ),
					'uaelite_current_version'  => defined( 'HFE_VER' ) ? HFE_VER : '',
					'show_theme_support'       => $show_theme_support,
					'theme_option'             => $theme_option,
					'st_status'                => $st_status,
					'hfe_settings_url'         => admin_url( 'admin.php?page=hfe' ),
					'header_footer_builder'    => admin_url( 'edit.php?post_type=elementor-hf' ),
					'st_pro_status'            => $stpro_status,
					'st_link'                  => $st_link,
					'hfe_post_url'             => $hfe_post_url,
					'is_hfe_post'              => $is_hfe_post,
					'user_email'               => $user_email,
					'user_fname'               => $user_name,
					'siteurl'                  => $siteurl,
					'analytics_status'         => $analytics_status,
					'onboarding_success_url'   => admin_url( 'admin.php?page=hfe#onboardingsuccess' ),
					'uaelite_subscription'	   => get_option( 'uaelite_subscription', false )
				]
			);
	
			wp_enqueue_style(
				'header-footer-elementor-react-styles',
				HFE_URL . 'build/main.css',
				[],
				HFE_VER
			);
		}
	
		if ( '' !== $uae_logo && '' !== $white_logo ) {
	
			$custom_css = '
				#toplevel_page_hfe .wp-menu-image {
					background-image: url(' . esc_url( $uae_logo ) . ') !important;
					background-size: 23px 34px !important;
					background-repeat: no-repeat !important;
					background-position: center !important;
				}
				#toplevel_page_hfe.wp-menu-open .wp-menu-image,
				#toplevel_page_hfe .wp-has-current-submenu .wp-menu-image {
					background-image: url(' . esc_url( $white_logo ) . ') !important;
				}
			';
			wp_add_inline_style( 'wp-admin', $custom_css );
		}
	
		wp_enqueue_script( 'hfe-admin-script', HFE_URL . 'admin/assets/js/ehf-admin.js', [ 'jquery', 'updates' ], HFE_VER, true );
	
		$is_dismissed = get_user_meta( get_current_user_id(), 'hfe-popup' );
	
		$strings = [
			'addon_activate'        => esc_html__( 'Activate', 'header-footer-elementor' ),
			'addon_activated'       => esc_html__( 'Activated', 'header-footer-elementor' ),
			'addon_active'          => esc_html__( 'Active', 'header-footer-elementor' ),
			'addon_deactivate'      => esc_html__( 'Deactivate', 'header-footer-elementor' ),
			'addon_inactive'        => esc_html__( 'Inactive', 'header-footer-elementor' ),
			'addon_install'         => esc_html__( 'Install', 'header-footer-elementor' ),
			'theme_installed'       => esc_html__( 'Theme Installed', 'header-footer-elementor' ),
			'plugin_installed'      => esc_html__( 'Plugin Installed', 'header-footer-elementor' ),
			'addon_download'        => esc_html__( 'Download', 'header-footer-elementor' ),
			'addon_exists'          => esc_html__( 'Already Exists.', 'header-footer-elementor' ),
			'visit_site'            => esc_html__( 'Visit Website', 'header-footer-elementor' ),
			'plugin_error'          => esc_html__( 'Could not install. Please download from WordPress.org and install manually.', 'header-footer-elementor' ),
			'subscribe_success'     => esc_html__( 'Your details are submitted successfully.', 'header-footer-elementor' ),
			'subscribe_error'       => esc_html__( 'Encountered an error while performing your request.', 'header-footer-elementor' ),
			'ajax_url'              => admin_url( 'admin-ajax.php' ),
			'nonce'                 => wp_create_nonce( 'hfe-admin-nonce' ),
			'installer_nonce'       => wp_create_nonce( 'updates' ),
			'popup_dismiss'         => false,
			'data_source'           => 'HFE',
			'show_all_hfe'          => $show_view_all,
			'hfe_edit_url'          => $hfe_edit_url,
			'view_all_text'         => esc_html__( 'View All', 'header-footer-elementor' ),
			'header_footer_builder' => $hfe_edit_url,
		];
	
		$strings = apply_filters( 'hfe_admin_strings', $strings );
	
		wp_localize_script(
			'hfe-admin-script',
			'hfe_admin_data',
			$strings
		);
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
		return $views;
	}

	/**
	 * CHeck if it is current page by parameters
	 *
	 * @param string $page_slug Menu name.
	 * @param string $action Menu name.
	 *
	 * @return  string page url
	 */
	public static function is_current_page( $page_slug = '', $action = '' ) {

		$page_matched = false;

		if ( empty( $page_slug ) ) {
			return false;
		}

		$current_page_slug = isset( $_GET['page'] ) ? sanitize_text_field( $_GET['page'] ) : ''; //phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$current_action    = isset( $_GET['action'] ) ? sanitize_text_field( $_GET['action'] ) : ''; //phpcs:ignore WordPress.Security.NonceVerification.Recommended

		if ( ! is_array( $action ) ) {
			$action = explode( ' ', $action );
		}

		if ( $page_slug === $current_page_slug && in_array( $current_action, $action, true ) ) {
			$page_matched = true;
		}

		return $page_matched;
	}

	/**
	 * Function for registering the settings api.
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function hfe_admin_init() {
		register_setting( 'hfe-plugin-options', 'hfe_compatibility_option' );
		add_settings_section( 'hfe-options', __( 'Add Theme Support', 'header-footer-elementor' ), [ $this, 'hfe_compatibility_callback' ], 'Settings' );
		add_settings_field( 'hfe-way', 'Methods to Add Theme Support', [ $this, 'hfe_compatibility_option_callback' ], 'Settings', 'hfe-options' );

		register_setting( 'hfe-plugin-guide', 'hfe_guide_email' );
		register_setting( 'hfe-plugin-guide', 'hfe_guide_fname' );
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
		$message      = __( 'The Ultimate Addons for Elementor plugin need compatibility with your current theme to work smoothly.</br></br>Following are two methods that enable theme support for the plugin.</br></br>Method 1 is selected by default and that works fine almost will all themes. In case, you face any issue with the header or footer template, try choosing Method 2.', 'header-footer-elementor' );
		$allowed_html = [ 'br' => [] ];
		echo wp_kses( $message, $allowed_html );
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
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
		wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', [], HFE_VER );
		?>

		<label>
			<input type="radio" name="hfe_compatibility_option" value= 1 <?php checked( $hfe_radio_button, 1 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( ' Method 1 (Recommended)', 'header-footer-elementor' ); ?></div>
			<p class="description"><?php esc_html_e( 'This method replaces your theme\'s header (header.php) & footer (footer.php) template with plugin\'s custom templates.', 'header-footer-elementor' ); ?></p><br>
		</label>
		<label>
			<input type="radio" name="hfe_compatibility_option" value= 2 <?php checked( $hfe_radio_button, 2 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( 'Method 2', 'header-footer-elementor' ); ?></div>
			<p class="description">
				<?php
				printf(
					esc_html__( "This method hides your theme's header & footer template with CSS and displays custom templates from the plugin.", 'header-footer-elementor' ),
					'<br>'
				);
				?>
			</p><br>
		</label>
		<p class="description">
			<?php
			/* translators: %s: URL to the plugin support page */
			printf(
				wp_kses(
					__( 'Sometimes above methods might not work well with your theme, in this case, contact your theme author and request them to add support for the <a href="%s">plugin.</a>', 'header-footer-elementor' ),
					[
						'a' => [
							'href' => [],
						],
					]
				),
				'https://github.com/brainstormforce/header-footer-elementor/wiki/Adding-Header-Footer-Elementor-support-for-your-theme'
			);
			?>
		</p>

		<?php
	}

	/**
	 * Show a settings page incase of unsupported theme.
	 *
	 * @since 1.6.0
	 *
	 * @return void
	 */
	public function hfe_register_settings_page() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$menu_slug  = $this->menu_slug;
		$capability = 'manage_options';

		add_menu_page(
			__( 'UAE Lite', 'header-footer-elementor' ),
			__( 'UAE', 'header-footer-elementor' ),
			$capability,
			$menu_slug,
			[ $this, 'render' ],
			'none',
			'59'
		);

		// Add the Dashboard Submenu.
		add_submenu_page(
			$menu_slug,
			__( 'UAE Lite', 'header-footer-elementor' ),
			__( 'Dashboard', 'header-footer-elementor' ),
			$capability,
			$menu_slug,
			[ $this, 'render' ],
			1
		);

		
		// Add the Settings Submenu.
		add_submenu_page(
			$menu_slug,
			__( 'Settings', 'header-footer-elementor' ),
			__( 'Settings', 'header-footer-elementor' ),
			$capability,
			$menu_slug . '#settings',
			[ $this, 'render' ],
			9
		);

		// Add the Settings Submenu.
		add_submenu_page(
			$menu_slug,
			__( 'Onboarding', 'header-footer-elementor' ),
			__( 'Onboarding', 'header-footer-elementor' ),
			$capability,
			$menu_slug . '#onboarding',
			[ $this, 'render' ],
			9
		);
		

		// Add the Settings Submenu.
		add_submenu_page(
			$menu_slug,
			__( 'Onboarding', 'header-footer-elementor' ),
			__( 'Onboardingsuccess', 'header-footer-elementor' ),
			$capability,
			$menu_slug . '#onboardingsuccess',
			[ $this, 'render' ],
			9
		);
	}
	
	/**
	 * Open to Upgrade to Pro submenu link in new tab.
	 *
	 * @return void
	 * @since 2.4.2
	 */
	public function hfe_add_upgrade_to_pro_target_attr() {
		?>
		<script type="text/javascript">
			document.addEventListener('DOMContentLoaded', function () {
				// Upgrade link handler.
				// IMPORTANT: If this URL changes, also update it in the `add_upgrade_to_pro` function.
				const upgradeLink = document.querySelector('a[href*="https://ultimateelementor.com/pricing/?utm_source=wp-admin&utm_medium=menu&utm_campaign=uae-upgrade"]');
				if (upgradeLink) {
					upgradeLink.addEventListener('click', e => {
						e.preventDefault();
						window.open(upgradeLink.href, '_blank');
					});
				}
			});
		</script>
		<?php
	}

	/**
	 * Add Upgrade to pro menu item.
	 *
	 * @return void
	 * @since 2.4.2
	 */
	public function hfe_add_upgrade_to_pro() {
		// The url used here is used as a selector for css to style the upgrade to pro submenu.
		// If you are changing this url, please make sure to update the css as well.
			// Add the Upgrade to Pro Submenu.
			add_submenu_page(
				$this->menu_slug,
				__( 'Upgrade to Pro', 'header-footer-elementor' ),
				 __( 'Upgrade to Pro', 'header-footer-elementor' ),
				'manage_options',
				'https://ultimateelementor.com/pricing/?utm_source=wp-admin&utm_medium=menu&utm_campaign=uae-upgrade',
			);
	}
	/**
	 * Settings page.
	 *
	 * Call back function for add submenu page function.
	 *
	 * @since 2.2.1
	 * @return void
	 */
	public function render() {

		$menu_page_slug = ( ! empty( $_GET['page'] ) ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : $this->menu_slug; //phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$page_action    = '';
   
		if ( isset( $_GET['action'] ) ) { //phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$page_action = sanitize_text_field( wp_unslash( $_GET['action'] ) ); //phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$page_action = str_replace( '_', '-', $page_action );
		}
   
		include_once HFE_DIR . 'inc/settings/admin-base.php';
	}

	/**
	 * Renders the admin settings content.
	 *
	 * @since 1.0.0
	 * @param string $menu_page_slug current page name.
	 * @param string $page_action current page action.
	 *
	 * @return void
	 */
	public function render_content() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( self::is_current_page( 'hfe' ) ) {
			include_once HFE_DIR . 'inc/settings/settings-app.php';
		}
	}

	/**
	 * Settings page.
	 *
	 * Call back function for add submenu page function.
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function hfe_settings_page() {
		echo '<h1 class="hfe-heading-inline">';
		esc_attr_e( 'Elementor Header & Footer Builder ', 'header-footer-elementor' );
		echo '</h1>';
		$this->hfe_tabs();
		?>
		<?php
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
		?>
		<?php
		if ( isset( $_GET['page'] ) ) { // PHPCS:Ignore WordPress.Security.NonceVerification.Recommended -- This code is deprecated and will be removed in future versions.
			switch ( $_GET['page'] ) { // PHPCS:Ignore WordPress.Security.NonceVerification.Recommended -- This code is deprecated and will be removed in future versions.
				case 'hfe-settings':
					$this->get_themes_support();
					break;

				case 'hfe-about':
					$this->get_about_html();
					break;

				case 'default':
					break;
			}
		}
	}

	/**
	 * Settings page - load modal content.
	 *
	 * Call back function for add submenu page function.
	 *
	 * @since 1.6.2
	 * @return (void | bool)
	 */
	public function hfe_modal() {
		$is_dismissed = [];
		$is_dismissed = get_user_meta( get_current_user_id(), 'hfe-popup' );

		$is_subscribed   = get_user_meta( get_current_user_ID(), 'hfe-subscribed' );
		$subscribe_valid = ( is_array( $is_subscribed ) && isset( $is_subscribed[0] ) && 'yes' === $is_subscribed[0] ) ? 'yes' : false;

		if ( ( ! empty( $is_dismissed ) && 'dismissed' === $is_dismissed[0] ) || 'yes' === $subscribe_valid ) {
			return false;
		} else {
			$this->get_guide_modal();
		}
	}

	/**
	 * Function for adding tabs
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function hfe_tabs() {
		?>
		<div class="nav-tab-wrapper">
			<?php
			if ( ! isset( self::$hfe_settings_tabs ) ) {
				self::$hfe_settings_tabs['hfe_templates'] = [
					'name' => __( 'All Templates', 'header-footer-elementor' ),
					'url'  => admin_url( 'edit.php?post_type=elementor-hf' ),
				];
			}

			self::$hfe_settings_tabs['hfe_about'] = [
				
				'name' => __( 'About Us', 'header-footer-elementor' ),
				'url'  => admin_url( 'themes.php?page=hfe-about' ),
			];

			$tabs = apply_filters( 'hfe_settings_tabs', self::$hfe_settings_tabs );

			foreach ( $tabs as $tab_id => $tab ) {

				$tab_slug = str_replace( '_', '-', $tab_id );

				$active_tab = ( ( isset( $_GET['page'] ) && $tab_slug == $_GET['page'] ) || ( ! isset( $_GET['page'] ) && 'hfe_templates' == $tab_id ) ) ? $tab_id : ''; // PHPCS:Ignore WordPress.Security.NonceVerification.Recommended --This code is deprecated and will be removed in future versions.

				$active = ( $active_tab == $tab_id ) ? ' nav-tab-active' : '';

				echo '<a href="' . esc_url( $tab['url'] ) . '" class="nav-tab' . esc_attr( $active ) . '">';
				echo esc_html( $tab['name'] );
				echo '</a>';
			}

			?>
		</div>
		<?php
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
		$current_screen = get_current_screen();

		$is_elementor_screen = ( $current_screen && ( 'elementor-hf' === $current_screen->post_type || 'appearance_page_hfe-guide' === $current_screen->id || 'appearance_page_hfe-about' === $current_screen->id || 'appearance_page_hfe-settings' === $current_screen->id ) );

		if ( $is_elementor_screen ) {
			$footer_text = sprintf(
				/* translators: 1: Elementor, 2: Link to plugin review */
				__( 'Help us spread the word about the plugin by leaving %2$s %1$s %3$s ratings on %2$s WordPress.org %3$s. Thank you from the Brainstorm Force team!', 'header-footer-elementor' ),
				'&#9733;&#9733;&#9733;&#9733;&#9733;',
				'<a href="https://wordpress.org/support/plugin/header-footer-elementor/reviews/#new-post" target="_blank">',
				'</a>'
			);
		}

		return $footer_text;
	}

	/**
	 * Function for theme support tab
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_themes_support() {
		?>
		<form action="options.php" method="post">
			<?php settings_fields( 'hfe-plugin-options' ); ?>
			<?php do_settings_sections( 'Settings' ); ?>
			<?php submit_button(); ?>
		</form>
		<?php
	}

	/**
	 * Function for Step-By-Step guide
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_guide_html() {

		$is_subscribed   = get_user_meta( get_current_user_ID(), 'hfe-subscribed' );
		$subscribe_valid = ( is_array( $is_subscribed ) && isset( $is_subscribed[0] ) && 'yes' === $is_subscribed[0] ) ? 'yes' : false;
		$subscribe_flag  = ( 'yes' === $subscribe_valid ) ? ' hfe-user-subscribed' : ' hfe-user-unsubscribed';
		?>

		<div class="hfe-admin-about-section hfe-admin-columns hfe-admin-guide-section<?php echo esc_attr( $subscribe_flag ); ?>">

			<div class="hfe-admin-column-50">
				<div class="hfe-admin-about-section-column">
					<h2><?php esc_html_e( 'Create Impressive Header and Footer Designs', 'header-footer-elementor' ); ?></h2>
					<p><?php esc_html_e( 'Elementor Header & Footer Builder plugin lets you build impactful navigation for your website very easily. Before we begin, we would like to know more about you. This will help us to serve you better.', 'header-footer-elementor' ); ?></p>
				</div>
			</div>
			<?php if ( 'yes' !== $subscribe_valid ) { ?>
				<div class="hfe-admin-column-50 hfe-admin-column-last">
					<div class="hfe-guide-content hfe-subscription-step-1-active">
						<div class="hfe-guide-content-header hfe-admin-columns">
						</div>
						<form action="options.php" method="post">
							<?php $this->get_form_html(); ?>
						</form>
					</div>
					<div class="hfe-privacy-policy-container">
						<?php /* translators: %1$s and %3$s are opening anchor tags, and %2$s and %4$s is closing anchor tags. */ ?>
						<p class="hfe-subscription-policy"><?php printf( __( 'By submitting, you agree to our %1$sTerms%2$s and %3$sPrivacy Policy%4$s.', 'header-footer-elementor' ), '<a href="https://store.brainstormforce.com/terms-and-conditions/" target="_blank">', '</a>', '<a href="https://store.brainstormforce.com/privacy-policy/" target="_blank">', '</a>' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- This code is deprecated and will be removed in future versions?></p>
					</div>
				</div>
			<?php } ?>
		</div>
		<?php
	}

	/**
	 * Function for form HTML
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_form_html() {
		?>
		<?php $this->get_form_row_1(); ?>
		<?php $this->get_form_row_2(); ?>
		<a href="#" class="button-subscription-skip"><?php esc_html_e( 'Skip', 'header-footer-elementor' ); ?></a>
		<?php
	}

	/**
	 * Function for form Row 1 HTML
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_form_row_1() {
		?>

		<div class="hfe-subscription-step-1">
			<div class="hfe-subscription-row">
				<div class="hfe-input-container">
					<select class="hfe-subscribe-field subscription-input-wp-user-type" name="wp_user_type">
						<option value=""></option>
						<option value="1"><?php esc_html_e( 'Beginner', 'header-footer-elementor' ); ?></option>
						<option value="2"><?php esc_html_e( 'Intermediate', 'header-footer-elementor' ); ?></option>
						<option value="3"><?php esc_html_e( 'Expert', 'header-footer-elementor' ); ?></option>
					</select>
					<small class="subscription-desc"><?php esc_html_e( 'Field is required', 'header-footer-elementor' ); ?></small>
					<label class="subscription-label"><?php esc_html_e( 'I\'m a WordPress:', 'header-footer-elementor' ); ?></label>
				</div>
				<div class="hfe-input-container">
					<select class="hfe-subscribe-field subscription-input-build-website-for" name="build_website_for">
						<option value=""></option>
						<option value="1"><?php esc_html_e( 'Myself/My company', 'header-footer-elementor' ); ?></option>
						<option value="2"><?php esc_html_e( 'My client', 'header-footer-elementor' ); ?></option>
					</select>
					<small class="subscription-desc"><?php esc_html_e( 'Field is required', 'header-footer-elementor' ); ?></small>
					<label class="subscription-label"><?php esc_html_e( 'I\'m building website for:', 'header-footer-elementor' ); ?></label>
				</div>
			</div>

			<p class="submit">
				<input type="submit" name="submit-1" id="submit-1" class="button submit-1 button-primary" value="Next">
			</p>
		</div>
		<?php
	}

	/**
	 * Function for form Row 2 HTML
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_form_row_2() {
		?>
		<div class="hfe-subscription-step-2">
			<div class="hfe-subscription-row">
				<div class="hfe-input-container">
					<input id="hfe_subscribe_name" class="hfe-subscribe-field hfe-subscribe-name" type="text" name="hfe_subscribe_name" value="<?php echo esc_attr( get_option( 'hfe_guide_fname' ) ); ?>">
					<small class="subscription-desc"><?php esc_html_e( 'First name is required', 'header-footer-elementor' ); ?></small>
					<label class="subscription-label"><?php esc_html_e( 'Your First Name', 'header-footer-elementor' ); ?></label>
				</div>
				<div class="hfe-input-container">
					<input id="hfe_subscribe_email" class="hfe-subscribe-field hfe-subscribe-email" type="text" name="hfe_subscribe_email" value="<?php echo esc_attr( get_option( 'hfe_guide_email' ) ); ?>">
					<small class="subscription-desc"><?php esc_html_e( 'Email address is required', 'header-footer-elementor' ); ?></small>
					<label class="subscription-label"><?php esc_html_e( 'Your Work Email', 'header-footer-elementor' ); ?></label>
				</div>
				<div class="hfe-input-container">
					<input type="checkbox" name="hfe_subscribe_accept" id="hfe_subscribe_accept" class="hfe_subscribe_accept" value="check">
					<label for="hfe_subscribe_accept" class="hfe-subscribe-accept-label"><?php esc_html_e( 'I agree to receive your newsletters and accept the data privacy statement.', 'header-footer-elementor' ); ?></label>
				</div>
			</div>
			<p class="submit">
				<button type="submit" id="submit-2"  class="button submit-2 button-primary">
					<span class="hfe-submit-button-text"><?php echo esc_html__( 'Submit', 'header-footer-elementor' ); ?></span>
				</button>
			</p>
		</div>
		<?php
	}


	/**
	 * Function for Step-By-Step guide modal popup
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_guide_modal() {
		$new_page_url = admin_url( 'admin.php?page=' . $this->menu_slug );
		?>
		<div class="hfe-guide-modal-popup" data-new-page="<?php echo esc_attr( $new_page_url ); ?>">
			<div class="hfe-guide-modal-popup-wrapper">
				<div class="hfe-guide-modal-content">
					<div class="heading">
						<img src="<?php echo esc_url( HFE_URL . 'assets/images/settings/uael-icon.svg' ); ?>" class="hfe-logo">
						<h3><?php esc_html_e( 'Ultimate Addons for Elementor', 'header-footer-elementor' ); ?></h3>
					</div>
					<?php $this->get_guide_html(); ?>
				</div>
			</div>
			<div class="hfe-guide-modal-overlay"></div>
		</div>
		<?php
	}

	/**
	 * Function for About us HTML
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_about_html() {
		$this->output_about_info();
		$this->output_about_addons();
	}

	/**
	 * Function for Astra Pro white labels with defaults.
	 *
	 * @since 1.6.24
	 * @return array
	 */
	protected function get_white_label() {
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
	 * Display the General Info section of About tab.
	 *
	 * @since 1.6.0
	 * @return void
	 */
	protected function output_about_info() {

		$white_labels = $this->get_white_label();

		?>

		<div class="hfe-admin-about-section hfe-admin-columns hfe-admin-about-us">

			<div class="hfe-admin-column-60">
				<h3><?php esc_html_e( 'Welcome to Elementor Header & Footer Builder!', 'header-footer-elementor' ); ?></h3>

				<p><?php esc_html_e( 'With this awesome plugin, experience the easiest way to create a customized header and footer for your website with Elementor. That too 100% FREE!', 'header-footer-elementor' ); ?></p>

				<p><?php esc_html_e( 'Design beautiful layouts with simple drag & drop and display them at desired location with powerful target controls. The plugin comes with inbuilt Elementor widgets that offer essential features to build header and footer. It\'s a lightweight plugin that works seamlessly with all themes and backed up by 24/7 support.', 'header-footer-elementor' ); ?></p>

				<p><?php esc_html_e( 'Trusted by more than 1+ Million users, Elementor Header & Footer Builder is a modern way to build advanced navigation for your website.', 'header-footer-elementor' ); ?></p>

				<?php /* translators: %s: theme name */ ?>
				<p><?php printf( esc_html__( 'This plugin is brought to you by the same team behind the popular WordPress theme %s and a series of Ultimate Addons plugins.', 'header-footer-elementor' ), esc_html( $white_labels['theme_name'] ) ); ?>

			</div>

			<div class="hfe-admin-column-40 hfe-admin-column-last">
				<figure>
					<img src="<?php echo esc_url( HFE_URL ); ?>assets/images/settings/our-team.jpeg" alt="<?php esc_attr_e( 'Team photo', 'header-footer-elementor' ); ?>">
					<figcaption>
						<?php esc_html_e( 'Brainstorm Force Team', 'header-footer-elementor' ); ?><br>
					</figcaption>
				</figure>
			</div>

		</div>
		<?php
	}

	/**
	 * Display the Addons section of About tab.
	 *
	 * @since 1.6.0
	 * @return void
	 */
	protected function output_about_addons() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$all_plugins         = get_plugins();
		$all_themes          = wp_get_themes();
		$bsf_plugins         = $this->get_bsf_plugins();
		$can_install_plugins = $this->hfe_can_install( 'plugin' );
		$can_install_themes  = $this->hfe_can_install( 'theme' );

		?>
		<div class="hfe-admin-addons">
			<div class="addons-container">
				<?php
				foreach ( $bsf_plugins as $plugin => $details ) :

					$plugin_data = $this->get_plugin_data( $plugin, $details, $all_plugins, $all_themes );

					?>
					<div class="addon-container">
						<div class="addon-item">
							<div class="details hfe-clear">
								<img src="<?php echo esc_url( $plugin_data['details']['icon'] ); ?>">
								<div class="addon-details">
									<h5 class="addon-name">
									<?php
										printf(
										/* translators: %s - addon status label. */
											esc_html__( '%1$s %3$s %2$s', 'header-footer-elementor' ),
											'<a href="' . esc_url( $details['siteurl'] ) . '" target="_blank" class="website-link">',
											'</a>',
											esc_html( $plugin_data['details']['name'] )
										);
									?>
										</h5>

									<p class="addon-desc"><?php echo wp_kses_post( $plugin_data['details']['desc'] ); ?></p>
								</div>
							</div>
							<div class="actions hfe-clear">
								<div class="status">
									<strong>
										<?php
										printf(
										/* translators: %s - addon status label. */
											esc_html__( 'Status: %s', 'header-footer-elementor' ),
											'<span class="status-label ' . esc_attr( $plugin_data['status_class'] ) . '">' . wp_kses_post( $plugin_data['status_text'] ) . '</span>'
										);
										?>
									</strong>
								</div>
								<div class="action-button">
									<?php if ( 'Visit Website' === $plugin_data['action_text'] ) { ?>
										<a href="<?php echo esc_url( $plugin_data['plugin_src'] ); ?>" target="_blank" rel="noopener noreferrer" class="pro-plugin button button-primary"><?php echo wp_kses_post( $plugin_data['action_text'] ); ?></a>
									<?php } elseif ( 'theme' === $details['type'] && $can_install_themes ) { ?>
										<button class="<?php echo esc_attr( $plugin_data['action_class'] ); ?>" data-plugin="<?php echo esc_attr( $plugin_data['plugin_src'] ); ?>" data-type="theme" data-slug="<?php echo esc_attr( $details['slug'] ); ?>" data-site="<?php echo esc_url( $details['url'] ); ?>">
											<span><?php echo wp_kses_post( $plugin_data['action_text'] ); ?></span>
										</button>
									<?php } elseif ( 'plugin' === $details['type'] && $can_install_plugins ) { ?>
										<button class="<?php echo esc_attr( $plugin_data['action_class'] ); ?>" data-plugin="<?php echo esc_attr( $plugin_data['plugin_src'] ); ?>" data-type="plugin" data-slug="<?php echo esc_attr( $details['slug'] ); ?>" data-site="<?php echo esc_url( $details['url'] ); ?>" data-file="<?php echo esc_attr( $plugin ); ?>">
											<span><?php echo wp_kses_post( $plugin_data['action_text'] ); ?></span>
										</button>
									<?php } else { ?>
										<a href="<?php echo esc_url( $details['wporg'] ); ?>" target="_blank" rel="noopener noreferrer">
											<?php esc_html_e( 'WordPress.org', 'header-footer-elementor' ); ?>
											<span aria-hidden="true" class="dashicons dashicons-external"></span>
										</a>
									<?php } ?>
								</div>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
		<?php
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

		$have_pro = ( ! empty( $details['pro'] ) );
		$show_pro = false;

		$theme = wp_get_theme();

		$plugin_data = [];

		$is_plugin = ( 'plugin' === $details['type'] ) ? true : false;
		$is_theme  = ( 'theme' === $details['type'] ) ? true : false;

		if ( ( $is_plugin && array_key_exists( $addon, $all_plugins ) ) || ( $is_theme && array_key_exists( $addon, $all_themes ) ) ) {

			if ( ( $is_plugin && is_plugin_active( $addon ) ) || ( $is_theme && ( 'Astra' === $theme->name || 'Astra' === $theme->parent_theme ) ) ) {

				// Status text/status.
				$plugin_data['status_class'] = 'status-active';
				$plugin_data['status_text']  = esc_html__( 'Active', 'header-footer-elementor' );
				// Button text/status.
				$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-secondary disabled';
				$plugin_data['action_text']  = esc_html__( 'Activated', 'header-footer-elementor' );
				$plugin_data['plugin_src']   = esc_attr( $addon );
			} else {
				// Status text/status.
				$plugin_data['status_class'] = 'status-inactive';
				$plugin_data['status_text']  = esc_html__( 'Inactive', 'header-footer-elementor' );
				// Button text/status.
				$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-secondary';
				$plugin_data['action_text']  = esc_html__( 'Activate', 'header-footer-elementor' );
				$plugin_data['plugin_src']   = esc_attr( $addon );
			}
		} else {
			// install if already doesn't exists.
			// Status text/status.
			$plugin_data['status_class'] = 'status-download';
			if ( isset( $details['act'] ) && 'go-to-url' === $details['act'] ) {
				$plugin_data['status_class'] = 'status-go-to-url';
			}
			$plugin_data['status_text'] = esc_html__( 'Not Installed', 'header-footer-elementor' );
			// Button text/status.
			$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-primary';
			$plugin_data['action_text']  = esc_html__( 'Install', 'header-footer-elementor' );
			$plugin_data['plugin_src']   = esc_url( $details['url'] );

			if ( $have_pro ) {
				$plugin_data['status_class'] = '';
				$plugin_data['action_text']  = esc_html__( 'Visit Website', 'header-footer-elementor' );
			}
		}

		$plugin_data['details'] = $details;

		return $plugin_data;
	}

	/**
	 * List of plugins that we propose to install.
	 *
	 * @since 1.6.0
	 *
	 * @return array
	 */
	protected function get_bsf_plugins() {

		$white_labels = $this->get_white_label();

		$images_url = HFE_URL . 'assets/images/settings/';

		return [

			'astra'                                     => [
				'icon'    => ! empty( $white_labels['theme_icon'] ) ? $white_labels['theme_icon'] : $images_url . 'plugin-astra.png',
				'type'    => 'theme',
				'name'    => $white_labels['theme_name'],
				'desc'    => $white_labels['description'],
				'wporg'   => 'https://wordpress.org/themes/astra/',
				'url'     => 'https://downloads.wordpress.org/theme/astra.zip',
				'siteurl' => $white_labels['author_url'],
				'pro'     => false,
				'slug'    => 'astra',
			],

			'astra-sites/astra-sites.php'               => [
				'icon'    => $images_url . 'plugin-st.png',
				'type'    => 'plugin',
				'name'    => esc_html__( 'Starter Templates', 'header-footer-elementor' ),
				'desc'    => esc_html__( 'A popular templates plugin that provides an extensive library of professional and fully customizable 600+ ready website and templates. More than 1+ Million websites have built with this plugin.', 'header-footer-elementor' ),
				'wporg'   => 'https://wordpress.org/plugins/astra-sites/',
				'url'     => 'https://downloads.wordpress.org/plugin/astra-sites.zip',
				'siteurl' => 'https://startertemplates.com/',
				'pro'     => false,
				'slug'    => 'astra-sites',
			],

			'ultimate-elementor/ultimate-elementor.php' => [
				'icon'    => $images_url . 'plugin-uae.png',
				'type'    => 'plugin',
				'name'    => esc_html__( 'Ultimate Addons for Elementor', 'header-footer-elementor' ),
				'desc'    => esc_html__( 'It’s a collection of 40+ unique, creative, and optimized Elementor widgets with 100+ readymade templates. Trusted by more than 600+ K web professionals. It’s a #1 toolkit for Elementor Page Builder.', 'header-footer-elementor' ),
				'wporg'   => '',
				'url'     => 'https://ultimateelementor.com/',
				'siteurl' => 'https://ultimateelementor.com/',
				'pro'     => true,
				'slug'    => 'ultimate-elementor',
			],
		];
	}

	/**
	 * Determine if the plugin/addon installations are allowed.
	 *
	 * @since 1.6.0
	 * @param string $type defines addon type.
	 * @return bool
	 */
	public function hfe_can_install( $type ) {

		if ( ! in_array( $type, [ 'plugin', 'theme' ], true ) ) {
			return false;
		}

		// Determine whether file modifications are allowed.
		if ( ! wp_is_file_mod_allowed( 'hfe_can_install' ) ) {
			return false;
		}

		if ( 'theme' === $type ) {
			if ( ! current_user_can( 'install_themes' ) ) {
				return false;
			}

			return true;

		} elseif ( 'plugin' === $type ) {
			if ( ! current_user_can( 'install_plugins' ) ) {
				return false;
			}

			return true;
		}

		return false;
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
		$menu_setting = HFE_Helper::is_pro_active() ? 'uaepro' : 'hfe'; // Replace with your actual menu slug.

		$custom['settings'] = sprintf(
			'<a href="%s" aria-label="%s">%s</a>',
			esc_url(
				add_query_arg(
					[
						'page' => $menu_setting,
					],
					admin_url( 'admin.php' )
				) . '#dashboard'
			),
			esc_attr__( 'Go to UAE Settings page', 'header-footer-elementor' ),
			esc_html__( 'Settings', 'header-footer-elementor' )
		);

		return array_merge( $custom, (array) $links );
	}

	/**
	 * Different MIME type of different PHP version
	 *
	 * Filters the "real" file type of the given file.
	 *
	 * @since 1.2.9
	 *
	 * @param array  $defaults File data array containing 'ext', 'type', and
	 *                                          'proper_filename' keys.
	 * @param string $file                      Full path to the file.
	 * @param string $filename                  The name of the file (may differ from $file due to
	 *                                          $file being in a tmp directory).
	 * @param array  $mimes                     Key is the file extension with value as the mime type.
	 * @param string $real_mime                Real MIME type of the uploaded file.
	 */
	public function real_mime_types_5_1_0( $defaults, $file, $filename, $mimes, $real_mime ) {
		return $this->real_mimes( $defaults, $filename, $file );
	}

	/**
	 * Different MIME type of different PHP version
	 *
	 * Filters the "real" file type of the given file.
	 *
	 * @since 1.2.9
	 *
	 * @param array  $defaults File data array containing 'ext', 'type', and
	 *                                          'proper_filename' keys.
	 * @param string $file                      Full path to the file.
	 * @param string $filename                  The name of the file (may differ from $file due to
	 *                                          $file being in a tmp directory).
	 * @param array  $mimes                     Key is the file extension with value as the mime type.
	 */
	public function real_mime_types( $defaults, $file, $filename, $mimes ) {
		return $this->real_mimes( $defaults, $filename, $file );
	}

	/**
	 * Real Mime Type
	 *
	 * This function checks if the file is an SVG and sanitizes it accordingly. 
	 * PHPCS rules are disabled selectively to allow necessary file operations that are essential for handling SVG files safely.
	 *
	 * @since 1.2.15
	 *
	 * @param array  $defaults File data array containing 'ext', 'type', and
	 *                                          'proper_filename' keys.
	 * @param string $filename                  The name of the file (may differ from $file due to
	 *                                          $file being in a tmp directory).
	 * @param string $file file content.
	 */
	public function real_mimes( $defaults, $filename, $file ) {

		if ( 'svg' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			// Perform SVG sanitization using the sanitize_svg function.
			$svg_content           = file_get_contents( $file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$sanitized_svg_content = $this->sanitize_svg( $svg_content );
			// phpcs:disable WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents
			file_put_contents( $file, $sanitized_svg_content );
			// phpcs:enable WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents

			// Update mime type and extension.
			$defaults['type'] = 'image/svg+xml';
			$defaults['ext']  = 'svg';
		}

		return $defaults;
	}
	/**
	 * Sanitizes SVG Code string.
	 *
	 * This function performs sanitization on SVG code to ensure that only safe tags and attributes are retained. 
	 * PHPCS rules are selectively disabled in specific areas to accommodate necessary file operations, compatibility with different PHP versions, and to enhance code readability:
	 * 
	 * - File operations are required for reading and writing SVG content.
	 * - PHP version compatibility is maintained by selectively disabling PHPCS rules for PHP version-specific functions.
	 * - Code readability is enhanced by selectively disabling PHPCS rules for specific areas.
	 * 
	 * @param string $original_content SVG code to sanitize.
	 * @return string|bool
	 * @since 1.0.7
	 * @phpstan-ignore-next-line
	 * */
	public function sanitize_svg( $original_content ) {

		if ( ! $original_content ) {
			return '';
		}

		// Define allowed tags and attributes.
		$allowed_tags = [
			'a',
			'circle',
			'clippath',
			'defs',
			'style',
			'desc',
			'ellipse',
			'fegaussianblur',
			'filter',
			'foreignobject',
			'g',
			'image',
			'line',
			'lineargradient',
			'marker',
			'mask',
			'metadata',
			'path',
			'pattern',
			'polygon',
			'polyline',
			'radialgradient',
			'rect',
			'stop',
			'svg',
			'switch',
			'symbol',
			'text',
			'textpath',
			'title',
			'tspan',
			'use',
		];

		$allowed_attributes = [
			'class',
			'clip-path',
			'clip-rule',
			'fill',
			'fill-opacity',
			'fill-rule',
			'filter',
			'id',
			'mask',
			'opacity',
			'stroke',
			'stroke-dasharray',
			'stroke-dashoffset',
			'stroke-linecap',
			'stroke-linejoin',
			'stroke-miterlimit',
			'stroke-opacity',
			'stroke-width',
			'style',
			'systemlanguage',
			'transform',
			'href',
			'xlink:href',
			'xlink:title',
			'cx',
			'cy',
			'r',
			'requiredfeatures',
			'clippathunits',
			'type',
			'rx',
			'ry',
			'color-interpolation-filters',
			'stddeviation',
			'filterres',
			'filterunits',
			'height',
			'primitiveunits',
			'width',
			'x',
			'y',
			'font-size',
			'display',
			'font-family',
			'font-style',
			'font-weight',
			'text-anchor',
			'marker-end',
			'marker-mid',
			'marker-start',
			'x1',
			'x2',
			'y1',
			'y2',
			'gradienttransform',
			'gradientunits',
			'spreadmethod',
			'markerheight',
			'markerunits',
			'markerwidth',
			'orient',
			'preserveaspectratio',
			'refx',
			'refy',
			'viewbox',
			'maskcontentunits',
			'maskunits',
			'd',
			'patterncontentunits',
			'patterntransform',
			'patternunits',
			'points',
			'fx',
			'fy',
			'offset',
			'stop-color',
			'stop-opacity',
			'xmlns',
			'xmlns:se',
			'xmlns:xlink',
			'xml:space',
			'method',
			'spacing',
			'startoffset',
			'dx',
			'dy',
			'rotate',
			'textlength',
		];

		$is_encoded = false;

		$needle = "\x1f\x8b\x08";
		// phpcs:disable PHPCompatibility.ParameterValues.NewIconvMbstringCharsetDefault.NotSet
		if ( function_exists( 'mb_strpos' ) ) {
			$is_encoded = 0 === mb_strpos( $original_content, $needle );
		} else {
			$is_encoded = 0 === strpos( $original_content, $needle );
		}
		// phpcs:enable PHPCompatibility.ParameterValues.NewIconvMbstringCharsetDefault.NotSet

		if ( $is_encoded ) {
			$original_content = gzdecode( $original_content );
			if ( false === $original_content ) {
				return '';
			}
		}

		// Strip php tags.
		$content = preg_replace( '/<\?(=|php)(.+?)\?>/i', '', $original_content );
		$content = preg_replace( '/<\?(.*)\?>/Us', '', $content );
		$content = preg_replace( '/<\%(.*)\%>/Us', '', $content );

		if ( ( false !== strpos( $content, '<?' ) ) || ( false !== strpos( $content, '<%' ) ) ) {
			return '';
		}

		// Strip comments.
		$content = preg_replace( '/<!--(.*)-->/Us', '', $content );
		$content = preg_replace( '/\/\*(.*)\*\//Us', '', $content );

		if ( ( false !== strpos( $content, '<!--' ) ) || ( false !== strpos( $content, '/*' ) ) ) {
			return '';
		}

		// Strip line breaks.
		$content = preg_replace( '/\r|\n/', '', $content );

		// Find the start and end tags so we can cut out miscellaneous garbage.
		$start = strpos( $content, '<svg' );
		$end   = strrpos( $content, '</svg>' );
		if ( false === $start || false === $end ) {
			return '';
		}

		$content = substr( $content, $start, ( $end - $start + 6 ) );

		// If the server's PHP version is 8 or up, make sure to disable the ability to load external entities.
		$php_version_under_eight = version_compare( PHP_VERSION, '8.0.0', '<' );
		if ( $php_version_under_eight ) {
			// phpcs:disable Generic.PHP.DeprecatedFunctions.Deprecated
			$libxml_disable_entity_loader = libxml_disable_entity_loader( true );
			// phpcs:enable Generic.PHP.DeprecatedFunctions.Deprecated
		}
		// Suppress the errors.
		$libxml_use_internal_errors = libxml_use_internal_errors( true );

		// Create DOMDocument instance.
		$dom                      = new \DOMDocument();
		$dom->formatOutput        = false;
		$dom->preserveWhiteSpace  = false;
		$dom->strictErrorChecking = false;

		$open_svg = ! ! $content ? $dom->loadXML( $content ) : false;
		if ( ! $open_svg ) {
			return '';
		}

		// Strip Doctype.
		foreach ( $dom->childNodes as $child ) {
			if ( XML_DOCUMENT_TYPE_NODE === $child->nodeType && ! ! $child->parentNode ) {
				$child->parentNode->removeChild( $child );
			}
		}

		// Sanitize elements.
		$elements = $dom->getElementsByTagName( '*' );
		for ( $index = $elements->length - 1; $index >= 0; $index-- ) {
			$current_element = $elements->item( $index );
			if ( ! in_array( strtolower( $current_element->tagName ), $allowed_tags, true ) ) {
				$current_element->parentNode->removeChild( $current_element );
				continue;
			}

			// Validate allowed attributes.
			for ( $i = $current_element->attributes->length - 1; $i >= 0; $i-- ) {
				$attr_name           = $current_element->attributes->item( $i )->name;
				$attr_name_lowercase = strtolower( $attr_name );
				if ( ! in_array( $attr_name_lowercase, $allowed_attributes ) &&
					! preg_match( '/^aria-/', $attr_name_lowercase ) &&
					! preg_match( '/^data-/', $attr_name_lowercase ) ) {
					$current_element->removeAttribute( $attr_name );
					continue;
				}

				$attr_value = $current_element->attributes->item( $i )->value;
				if ( ! empty( $attr_value ) &&
					( preg_match( '/^((https?|ftp|file):)?\/\//i', $attr_value ) ||
					preg_match( '/base64|data|(?:java)?script|alert\(|window\.|document/i', $attr_value ) ) ) {
					$current_element->removeAttribute( $attr_name );
					continue;
				}
			}

			// Strip xlink:href.
			$xlink_href = $current_element->getAttributeNS( 'http://www.w3.org/1999/xlink', 'href' );
			if ( $xlink_href && strpos( $xlink_href, '#' ) !== 0 ) {
				$current_element->removeAttributeNS( 'http://www.w3.org/1999/xlink', 'href' );
			}

			// Strip use tag with external references.
			if ( strtolower( $current_element->tagName ) === 'use' ) {
				$xlink_href = $current_element->getAttributeNS( 'http://www.w3.org/1999/xlink', 'href' );
				if ( $current_element->parentNode && $xlink_href && strpos( $xlink_href, '#' ) !== 0 ) {
					$current_element->parentNode->removeChild( $current_element );
				}
			}
		}

		$sanitized = $dom->saveXML( $dom->documentElement, LIBXML_NOEMPTYTAG );

		// Restore defaults.
		if ( $php_version_under_eight && isset( $libxml_disable_entity_loader ) && function_exists( 'libxml_disable_entity_loader' ) ) {
			// phpcs:disable Generic.PHP.DeprecatedFunctions.Deprecated
			libxml_disable_entity_loader( $libxml_disable_entity_loader );
			// phpcs:enable Generic.PHP.DeprecatedFunctions.Deprecated
		}
		libxml_use_internal_errors( $libxml_use_internal_errors );

		return $sanitized;
	}
}

new HFE_Settings_Page();
