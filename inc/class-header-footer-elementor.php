<?php
/**
 * Entry point for the plugin. Checks if Elementor is installed and activated and loads it's own files and actions.
 *
 * @package header-footer-elementor
 */

use HFE\Lib\Astra_Target_Rules_Fields;

/**
 * Class Header_Footer_Elementor
 */
class Header_Footer_Elementor {

	/**
	 * Current theme template
	 *
	 * @var string
	 */
	public $template;

	/**
	 * Instance of Elemenntor Frontend class.
	 *
	 * @var object \Elementor\Frontend()
	 */
	private static $elementor_instance;

	/**
	 * Instance of HFE_Admin
	 *
	 * @var Header_Footer_Elementor
	 */
	private static $_instance = null;

	/**
	 * Instance of Header_Footer_Elementor
	 *
	 * @return Header_Footer_Elementor Instance of Header_Footer_Elementor
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}
	/**
	 * Constructor
	 */
	public function __construct() {
		$this->template = get_template();

		$is_elementor_callable = ( defined( 'ELEMENTOR_VERSION' ) && is_callable( 'Elementor\Plugin::instance' ) ) ? true : false;

		$required_elementor_version = '3.5.0';

		$is_elementor_outdated = ( $is_elementor_callable && ( ! version_compare( ELEMENTOR_VERSION, $required_elementor_version, '>=' ) ) ) ? true : false;

		if ( ( ! $is_elementor_callable ) || $is_elementor_outdated ) {
			$this->elementor_not_available( $is_elementor_callable, $is_elementor_outdated );
		}

		if ( $is_elementor_callable ) {
			self::$elementor_instance = Elementor\Plugin::instance();

			$this->includes();

			add_action( 'admin_init', [ $this, 'hfe_redirect_to_onboarding' ] );
			
			add_action( 'init', [ $this, 'load_hfe_textdomain' ] );

			add_filter(
				'elementor/admin-top-bar/is-active',
				function( $is_active, $current_screen ) {
					if ( strpos( $current_screen->id, 'elementor-hf' ) !== false ) {
						return false;
					}
					return $is_active;
				},
				10,
				2
			);
			

			add_action(
				'current_screen',
				function () {
					$current_screen = get_current_screen();
					if ( $current_screen && ( 'edit-elementor-hf' === $current_screen->id || 'elementor-hf' === $current_screen->id ) ) {
						add_action(
							'in_admin_header',
							function () {
								$this->render_admin_top_bar();
							} 
						);
					}
				} 
			);

			$is_theme_supported = true;

			if ( 'genesis' == $this->template ) {
				require HFE_DIR . 'themes/genesis/class-hfe-genesis-compat.php';
			} elseif ( 'astra' == $this->template ) {
				require HFE_DIR . 'themes/astra/class-hfe-astra-compat.php';
			} elseif ( 'bb-theme' == $this->template || 'beaver-builder-theme' == $this->template ) {
				$this->template = 'beaver-builder-theme';
				require HFE_DIR . 'themes/bb-theme/class-hfe-bb-theme-compat.php';
			} elseif ( 'generatepress' == $this->template ) {
				require HFE_DIR . 'themes/generatepress/class-hfe-generatepress-compat.php';
			} elseif ( 'oceanwp' == $this->template ) {
				require HFE_DIR . 'themes/oceanwp/class-hfe-oceanwp-compat.php';
			} elseif ( 'storefront' == $this->template ) {
				require HFE_DIR . 'themes/storefront/class-hfe-storefront-compat.php';
			} elseif ( 'hello-elementor' == $this->template ) {
				require HFE_DIR . 'themes/hello-elementor/class-hfe-hello-elementor-compat.php';
			} else {
				$is_theme_supported = false;
				add_filter( 'hfe_settings_tabs', [ $this, 'setup_unsupported_theme' ] );
				add_action( 'init', [ $this, 'setup_fallback_support' ] );
			}

			update_option( 'hfe_is_theme_supported', $is_theme_supported );
			
			add_action( 'init', [ $this, 'setup_settings_page' ] );

			if ( 'yes' === get_option( 'uae_lite_is_activated' ) ) {
				add_action( 'admin_init', [ $this, 'get_plugin_version' ] );
			}

			// Filter to change Astra menu positon.
			add_filter( 'astra_menu_priority', array( $this, 'update_admin_menu_position' ) );
			// Scripts and styles.
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );

			add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ] );

			add_filter( 'body_class', [ $this, 'body_class' ] );
			add_action( 'switch_theme', [ $this, 'reset_unsupported_theme_notice' ] );

			add_shortcode( 'hfe_template', [ $this, 'render_template' ] );

			add_action( 'astra_notice_before_markup_header-footer-elementor-rating', [ $this, 'rating_notice_css' ] );

			require_once HFE_DIR . 'inc/class-hfe-analytics.php';
			     
		}
	}

	/**
	 * Update Astra's menu priority to show after Dashboard menu.
	 *
	 * @param int $menu_priority top level menu priority.
	 */
	public function update_admin_menu_position( $menu_priority ) {
		return 2.1;
	}

	/**
	 * Onboarding redirect function.
	 */
	public function hfe_redirect_to_onboarding() {
		if ( ! get_option( 'hfe_start_onboarding', false ) ) {
			return;
		}

		$is_old_user             = ( 'yes' === get_option( 'hfe_plugin_is_activated' ) ) ? true : false;
		$is_onboarding_triggered = ( 'yes' === get_option( 'hfe_onboarding_triggered' ) ) ? true : false;
		$is_uaepro_active        = ( defined( 'UAEL_PRO' ) && UAEL_PRO ) ? true : false;

		// IMPORTANT: Comment out this code before release - Show onboarding only for new users only once.
		if ( $is_old_user || $is_onboarding_triggered || $is_uaepro_active ) {
			return;
		}

		delete_option( 'hfe_start_onboarding' );

		if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
			update_option( 'hfe_onboarding_triggered', 'yes' );
			wp_safe_redirect( admin_url( 'admin.php?page=hfe#onboarding' ) );
			exit();
		}
	}
	
	/*
	 * Render admin top bar
	 */
	private function render_admin_top_bar() {
		?>
		<div id="hfe-admin-top-bar-root">
		</div>
		<?php
	}

	/**
	 * Reset the Unsupported theme nnotice after a theme is switched.
	 *
	 * @since 1.0.16
	 *
	 * @return void
	 */
	public function reset_unsupported_theme_notice() {
		delete_user_meta( get_current_user_id(), 'unsupported-theme' );
	}

	/**
	 * Register Astra Notices.
	 *
	 * @since 1.2.0
	 *
	 * @return void
	 */
	public function register_notices() {
		$image_path = HFE_URL . 'assets/images/settings/uael-icon.svg';

		Astra_Notices::add_notice(
			[
				'id'                         => 'header-footer-elementor-rating',
				'type'                       => '',
				'message'                    => sprintf(
					'<div class="notice-image">
						<img src="%1$s" class="custom-logo" alt="Sidebar Manager" itemprop="logo"></div>
						<div class="notice-content">
							<div class="notice-heading">
								%2$s
							</div>
							%3$s<br />
							<div class="astra-review-notice-container">
								<a href="%4$s" class="astra-notice-close astra-review-notice button-primary" target="_blank">
								%5$s
								</a>
							<span class="dashicons dashicons-calendar"></span>
								<a href="#" data-repeat-notice-after="%6$s" class="astra-notice-close astra-review-notice">
								%7$s
								</a>
							<span class="dashicons dashicons-smiley"></span>
								<a href="#" class="astra-notice-close astra-review-notice">
								%8$s
								</a>
							</div>
						</div>',
					$image_path,
					__( 'Hello! Seems like you have used Ultimate Addons for Elementor to build this website — Thanks a ton!', 'header-footer-elementor' ),
					__( 'Could you please do us a BIG favor and give it a 5-star rating on WordPress? This would boost our motivation and help other users make a comfortable decision while choosing the Ultimate Addons for Elementor.', 'header-footer-elementor' ),
					'https://wordpress.org/support/plugin/header-footer-elementor/reviews/?filter=5#new-post',
					__( 'Ok, you deserve it', 'header-footer-elementor' ),
					MONTH_IN_SECONDS,
					__( 'Nope, maybe later', 'header-footer-elementor' ),
					__( 'I already did', 'header-footer-elementor' )
				),
				'show_if'                    => ( hfe_header_enabled() || hfe_footer_enabled() || hfe_is_before_footer_enabled() ) ? true : false,
				'repeat-notice-after'        => MONTH_IN_SECONDS,
				'display-notice-after'       => 1296000, // Display notice after 15 days.
				'priority'                   => 18,
				'display-with-other-notices' => false,
			]
		);
	}

	/**
	 * Enqueue CSS for the Rating Notice.
	 *
	 * @since 1.2.0
	 * @return void
	 */
	public function rating_notice_css() {
		wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'assets/css/admin-header-footer-elementor.css', [], HFE_VER );
	}

	/**
	 * Prints the admin notics when Elementor is not installed or activated or version outdated.
	 *
	 * @since 1.5.9
	 * @param  boolean $is_elementor_callable specifies if elementor is available.
	 * @param  boolean $is_elementor_outdated specifies if elementor version is old.
	 * @return void
	 */
	public function elementor_not_available( $is_elementor_callable, $is_elementor_outdated ) {

		if ( ( ! did_action( 'elementor/loaded' ) ) || ( ! $is_elementor_callable ) ) {
			add_action( 'admin_notices', [ $this, 'elementor_not_installed_activated' ] );
			add_action( 'network_admin_notices', [ $this, 'elementor_not_installed_activated' ] );
			return;
		}

		if ( $is_elementor_outdated ) {
			add_action( 'admin_notices', [ $this, 'elementor_outdated' ] );
			add_action( 'network_admin_notices', [ $this, 'elementor_outdated' ] );
			return;
		}
	}

	/**
	 * Prints the admin notics when Elementor is not installed or activated.
	 *
	 * @return void
	 */
	public function elementor_not_installed_activated() {

		$screen = get_current_screen();
		if ( isset( $screen->parent_file ) && 'plugins.php' === $screen->parent_file && 'update' === $screen->id ) {
			return;
		}

		if ( ! did_action( 'elementor/loaded' ) ) {
			// Check user capability.
			if ( ! ( current_user_can( 'activate_plugins' ) && current_user_can( 'install_plugins' ) ) ) {
				return;
			}

			/* TO DO */
			$class = 'notice notice-error';
			/* translators: %s: html tags */
			$message = sprintf( __( 'The %1$sUltimate Addons for Elementor%2$s plugin requires %1$sElementor%2$s plugin installed & activated.', 'header-footer-elementor' ), '<strong>', '</strong>' );

			$plugin = 'elementor/elementor.php';

			if ( _is_elementor_installed() ) {

				$action_url   = wp_nonce_url( 'plugins.php?action=activate&amp;plugin=' . $plugin . '&amp;plugin_status=all&amp;paged=1&amp;s', 'activate-plugin_' . $plugin );
				$button_label = __( 'Activate Elementor', 'header-footer-elementor' );

			} else {

				$action_url   = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=elementor' ), 'install-plugin_elementor' );
				$button_label = __( 'Install Elementor', 'header-footer-elementor' );
			}

			$button = '<p><a href="' . esc_url( $action_url ) . '" class="button-primary">' . esc_html( $button_label ) . '</a></p><p></p>';

			printf( '<div class="%1$s"><p>%2$s</p>%3$s</div>', esc_attr( $class ), wp_kses_post( $message ), wp_kses_post( $button ) );
		}
	}

	/**
	 * Prints the admin notics when Elementor version is outdated.
	 *
	 * @return void
	 */
	public function elementor_outdated() {

		// Check user capability.
		if ( ! ( current_user_can( 'activate_plugins' ) && current_user_can( 'install_plugins' ) ) ) {
			return;
		}

		/* TO DO */
		$class = 'notice notice-error';
		/* translators: %s: html tags */
		$message = sprintf( __( 'The %1$sUltimate Addons for Elementor%2$s plugin has stopped working because you are using an older version of %1$sElementor%2$s plugin.', 'header-footer-elementor' ), '<strong>', '</strong>' );

		$plugin = 'elementor/elementor.php';

		if ( file_exists( WP_PLUGIN_DIR . '/elementor/elementor.php' ) ) {

			$action_url   = wp_nonce_url( self_admin_url( 'update.php?action=upgrade-plugin&amp;plugin=' ) . $plugin . '&amp;', 'upgrade-plugin_' . $plugin );
			$button_label = __( 'Update Elementor', 'header-footer-elementor' );

		} else {

			$action_url   = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=elementor' ), 'install-plugin_elementor' );
			$button_label = __( 'Install Elementor', 'header-footer-elementor' );
		}

		$button = '<p><a href="' . esc_url( $action_url ) . '" class="button-primary">' . esc_html( $button_label ) . '</a></p><p></p>';

		printf( '<div class="%1$s"><p>%2$s</p>%3$s</div>', esc_attr( $class ), wp_kses_post( $message ), wp_kses_post( $button ) );
	}

	/**
	 * Plugin version tracking.
	 *
	 * @return void
	 */
	public function get_plugin_version() {

		$hfe_old_version = get_option( 'hfe_plugin_version' );
		$old_version     = $hfe_old_version ? $hfe_old_version : HFE_VER;
		$new_version     = HFE_VER;

		if ( ! $hfe_old_version || ( $old_version !== $new_version ) ) {
			// Store previous version.
			update_option( 'hfe_plugin_previous_version', $old_version );
			update_option( 'hfe_plugin_version', $new_version );
		}
	}

	/**
	 * Loads the globally required files for the plugin.
	 *
	 * @return void
	 */
	public function includes() {
		require_once HFE_DIR . 'admin/class-hfe-admin.php';

		require_once HFE_DIR . 'inc/hfe-functions.php';
		require_once HFE_DIR . 'inc/class-hfe-rollback.php';

		// Load Elementor Canvas Compatibility.
		require_once HFE_DIR . 'inc/class-hfe-elementor-canvas-compat.php';

		// Load WPML & Polylang Compatibility if WPML is installed and activated.
		if ( defined( 'ICL_SITEPRESS_VERSION' ) || defined( 'POLYLANG_BASENAME' ) ) {
			require_once HFE_DIR . 'inc/compatibility/class-hfe-wpml-compatibility.php';
		}

		// Load the Admin Notice Class.
		require_once HFE_DIR . 'inc/lib/astra-notices/class-astra-notices.php';

		// Load Target rules.
		require_once HFE_DIR . 'inc/lib/target-rule/class-astra-target-rules-fields.php';
		// Setup upgrade routines.
		require_once HFE_DIR . 'inc/class-hfe-update.php';

		// Load the widgets.
		require HFE_DIR . 'inc/widgets-manager/class-widgets-loader.php';

		// Load the extensions.
		require HFE_DIR . 'inc/widgets-manager/class-extensions-loader.php';

		require_once HFE_DIR . 'inc/settings/hfe-settings-api.php';

		// Load the NPS Survey library.
		if ( ! class_exists( 'Uae_Nps_Survey' ) ) {
			require_once HFE_DIR . 'inc/lib/class-uae-nps-survey.php';
		}
					
	}

	/**
	 * Loads textdomain for the plugin.
	 *
	 * @return void
	 */
	public function load_hfe_textdomain() {
	
		// Default languages directory for "header-footer-elementor".
		$lang_dir = HFE_DIR . 'languages/';
	
		/**
		 * Filters the languages directory path to use for AffiliateWP.
		 *
		 * @param string $lang_dir The languages directory path.
		 */
		$lang_dir = apply_filters( 'hfe_languages_directory', $lang_dir );
	
		// Traditional WordPress plugin locale filter.
		global $wp_version;
	
		$get_locale = get_locale();
	
		if ( $wp_version >= 4.7 ) {
			$get_locale = get_user_locale();
		}
	
		/**
		 * Language Locale for Ultimate Elementor
		 *
		 * @var $get_locale The locale to use. Uses get_user_locale()` in WordPress 4.7 or greater,
		 *                  otherwise uses `get_locale()`.
		 */
		$locale = apply_filters( 'plugin_locale', $get_locale, 'header-footer-elementor' );
		$mofile = sprintf( '%1$s-%2$s.mo', 'header-footer-elementor', $locale );
	
		// Setup paths to current locale file.
		$mofile_local  = $lang_dir . $mofile;
		$mofile_global = WP_LANG_DIR . '/header-footer-elementor/' . $mofile;
	
		if ( file_exists( $mofile_global ) ) {
			// Look in global /wp-content/languages/header-footer-elementor/ folder.
			load_textdomain( 'header-footer-elementor', $mofile_global );
		} elseif ( file_exists( $mofile_local ) ) {
			// Look in local /wp-content/plugins/header-footer-elementor/languages/ folder.
			load_textdomain( 'header-footer-elementor', $mofile_local );
		} else {
			// Load the default language files.
			load_plugin_textdomain( 'header-footer-elementor', false, $lang_dir );
		}
	}

	/**
	 * Enqueue styles and scripts.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		wp_enqueue_style( 'hfe-style', HFE_URL . 'assets/css/header-footer-elementor.css', [], HFE_VER );

		if ( class_exists( '\Elementor\Plugin' ) ) {
			$elementor = \Elementor\Plugin::instance();
			if ( method_exists( $elementor->frontend, 'enqueue_styles' ) ) {
				$elementor->frontend->enqueue_styles();
			}
		}

		if ( class_exists( '\ElementorPro\Plugin' ) ) {
			$elementor_pro = \ElementorPro\Plugin::instance();
			if ( method_exists( $elementor_pro, 'enqueue_styles' ) ) {
				$elementor_pro->enqueue_styles();
			}
		}

		if ( hfe_header_enabled() ) {
			if ( class_exists( '\Elementor\Core\Files\CSS\Post' ) ) {
				$css_file = new \Elementor\Core\Files\CSS\Post( get_hfe_header_id() );
			} elseif ( class_exists( '\Elementor\Post_CSS_File' ) ) {
				$css_file = new \Elementor\Post_CSS_File( get_hfe_header_id() );
			}

			if ( isset( $css_file ) ) {
				$css_file->enqueue();
			}
		}

		if ( hfe_footer_enabled() ) {
			if ( class_exists( '\Elementor\Core\Files\CSS\Post' ) ) {
				$css_file = new \Elementor\Core\Files\CSS\Post( get_hfe_footer_id() );
			} elseif ( class_exists( '\Elementor\Post_CSS_File' ) ) {
				$css_file = new \Elementor\Post_CSS_File( get_hfe_footer_id() );
			}

			if ( isset( $css_file ) ) {
				$css_file->enqueue();
			}
		}

		if ( hfe_is_before_footer_enabled() ) {
			if ( class_exists( '\Elementor\Core\Files\CSS\Post' ) ) {
				$css_file = new \Elementor\Core\Files\CSS\Post( hfe_get_before_footer_id() );
			} elseif ( class_exists( '\Elementor\Post_CSS_File' ) ) {
				$css_file = new \Elementor\Post_CSS_File( hfe_get_before_footer_id() );
			}
			if ( isset( $css_file ) ) {
				$css_file->enqueue();
			}
		}
	}

	/**
	 * Load admin styles on header footer elementor edit screen.
	 *
	 * @return void
	 */
	public function enqueue_admin_scripts() {
		global $pagenow;
		$screen = get_current_screen();

		if ( ( 'elementor-hf' == $screen->id && ( 'post.php' == $pagenow || 'post-new.php' == $pagenow ) ) || ( 'edit.php' == $pagenow && 'edit-elementor-hf' == $screen->id ) ) {

			wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', [], HFE_VER );
			wp_enqueue_script( 'hfe-admin-script', HFE_URL . 'admin/assets/js/ehf-admin.js', [ 'jquery', 'updates' ], HFE_VER, true );

		}
	}

	/**
	 * Adds classes to the body tag conditionally.
	 *
	 * @param  array $classes array with class names for the body tag.
	 *
	 * @return array          array with class names for the body tag.
	 */
	public function body_class( $classes ) {
		if ( hfe_header_enabled() ) {
			$classes[] = 'ehf-header';
		}

		if ( hfe_footer_enabled() ) {
			$classes[] = 'ehf-footer';
		}

		$classes[] = 'ehf-template-' . $this->template;
		$classes[] = 'ehf-stylesheet-' . get_stylesheet();

		return $classes;
	}

	/**
	 * Display Settings Page options
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function setup_settings_page() {

		require_once HFE_DIR . 'inc/class-hfe-settings-page.php';
	}

	/**
	 * Display Unsupported theme notice if the current theme does add support for 'header-footer-elementor'
	 *
	 * @param array $hfe_settings_tabs settings array tabs.
	 * @since 1.0.3
	 * @return array
	 */
	public function setup_unsupported_theme( $hfe_settings_tabs = [] ) {

		if ( ! current_theme_supports( 'header-footer-elementor' ) ) {
			$hfe_settings_tabs['hfe_settings'] = [
				'name' => __( 'Theme Support', 'header-footer-elementor' ),
				'url'  => admin_url( 'themes.php?page=hfe-settings' ),
			];
		}
		return $hfe_settings_tabs;
	}

	/**
	 * Add support for theme if the current theme does add support for 'header-footer-elementor'
	 *
	 * @since  1.6.1
	 * @return void
	 */
	public function setup_fallback_support() {

		if ( ! current_theme_supports( 'header-footer-elementor' ) ) {
			$hfe_compatibility_option = get_option( 'hfe_compatibility_option', '1' );

			if ( '1' === $hfe_compatibility_option ) {
				if ( ! class_exists( 'HFE_Default_Compat' ) ) {
					require_once HFE_DIR . 'themes/default/class-hfe-default-compat.php';
				}
			} elseif ( '2' === $hfe_compatibility_option ) {
				require HFE_DIR . 'themes/default/class-global-theme-compatibility.php';
			}
		}
	}

	/**
	 * Prints the Header content.
	 *
	 * @return void
	 */
	public static function get_header_content() {
		$header_content = self::$elementor_instance->frontend->get_builder_content_for_display( get_hfe_header_id() );
		echo $header_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- If escaped output is not rendered on frontend.
	}

	/**
	 * Prints the Footer content.
	 *
	 * @return void
	 */
	public static function get_footer_content() {
		echo "<div class='footer-width-fixer'>";
		echo self::$elementor_instance->frontend->get_builder_content_for_display( get_hfe_footer_id() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- If escaped output is not rendered on frontend.
		echo '</div>';
	}

	/**
	 * Prints the Before Footer content.
	 *
	 * @return void
	 */
	public static function get_before_footer_content() {
		echo "<div class='footer-width-fixer'>";
		echo self::$elementor_instance->frontend->get_builder_content_for_display( hfe_get_before_footer_id() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- If escaped output is not rendered on frontend.
		echo '</div>';
	}

	/**
	 * Get option for the plugin settings
	 *
	 * @param  string $setting Option name.
	 * @param  string $default Default value to be received if the option value is not stored in the option.
	 *
	 * @return mixed | string
	 */
	public static function get_settings( $setting = '', $default = '' ) {
		if ( 'type_header' == $setting || 'type_footer' == $setting || 'type_before_footer' == $setting ) {
			$templates = self::get_template_id( $setting );

			$template = ! is_array( $templates ) ? $templates : $templates[0];

			$template = apply_filters( "hfe_get_settings_{$setting}", $template );

			return $template;
		}
	}

	/**
	 * Get header or footer template id based on the meta query.
	 *
	 * @param  String $type Type of the template header/footer.
	 *
	 * @return Mixed       Returns the header or footer template id if found, else returns string ''.
	 */
	public static function get_template_id( $type ) {
		$option = [
			'location'  => 'ehf_target_include_locations',
			'exclusion' => 'ehf_target_exclude_locations',
			'users'     => 'ehf_target_user_roles',
		];

		$hfe_templates = Astra_Target_Rules_Fields::get_instance()->get_posts_by_conditions( 'elementor-hf', $option );

		foreach ( $hfe_templates as $template ) {
			if ( get_post_meta( absint( $template['id'] ), 'ehf_template_type', true ) === $type ) {
				if ( function_exists( 'pll_current_language' ) ) {
					if ( pll_current_language( 'slug' ) == pll_get_post_language( $template['id'], 'slug' ) ) {
						return $template['id'];
					}
				} else {
					return $template['id'];
				}
			}
		}

		return '';
	}

	/**
	 * Callback to shortcode.
	 *
	 * @param array $atts attributes for shortcode.
	 * @return string
	 */
	public function render_template( $atts ) {
		$atts = shortcode_atts(
			[
				'id' => '',
			],
			$atts,
			'hfe_template'
		);

		$id = ! empty( $atts['id'] ) ? apply_filters( 'hfe_render_template_id', intval( $atts['id'] ) ) : '';

		if ( empty( $id ) ) {
			return '';
		}

		// Check if the current user has permission to edit posts.
		if ( ! current_user_can( 'edit_post', $id ) ) {
			$post_status = get_post_status( $id );
			// Prevent access to drafts, private, pending, and password-protected posts for unauthorized users.
			if ( in_array( $post_status, [ 'draft', 'private', 'pending' ], true ) || post_password_required( $id ) ) {
				return ''; // Prevent access to restricted posts.
			}
		}

		if ( class_exists( '\Elementor\Core\Files\CSS\Post' ) ) {
			$css_file = new \Elementor\Core\Files\CSS\Post( $id );
		} elseif ( class_exists( '\Elementor\Post_CSS_File' ) ) {
			// Load elementor styles.
			$css_file = new \Elementor\Post_CSS_File( $id );
		}
			$css_file->enqueue();

		return self::$elementor_instance->frontend->get_builder_content_for_display( $id );
	}
}
/**
 * Is elementor plugin installed.
 */
if ( ! function_exists( '_is_elementor_installed' ) ) {

	/**
	 * Check if Elementor is installed
	 *
	 * @since 1.6.0
	 *
	 * @access public
	 * @return bool
	 */
	function _is_elementor_installed() {
		return ( file_exists( WP_PLUGIN_DIR . '/elementor/elementor.php' ) ) ? true : false;
	}
}
