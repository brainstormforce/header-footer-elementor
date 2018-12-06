<?php
/**
 * Entry point for the plugin. Checks if Elementor is installed and activated and loads it's own files and actions.
 *
 * @package  header-footer-elementor
 */

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
	 * Instance of Elemenntor Frontend class.
	 *
	 * @var \Elementor\Frontend()
	 */
	private static $elementor_instance;
	/**
	 * Constructor
	 */
	function __construct() {

		$this->template = get_template();

		if ( defined( 'ELEMENTOR_VERSION' ) && is_callable( 'Elementor\Plugin::instance' ) ) {

			self::$elementor_instance = Elementor\Plugin::instance();

			$this->includes();
			$this->load_textdomain();

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
			} else {
				add_action( 'init', array( $this, 'setup_unsupported_theme_notice' ) );
			}

			// Scripts and styles.
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );

			add_filter( 'body_class', array( $this, 'body_class' ) );
			add_action( 'switch_theme', array( $this, 'reset_unsupported_theme_notice' ) );

			add_shortcode( 'hfe_template', array( $this, 'render_template' ) );

		} else {

			add_action( 'admin_notices', array( $this, 'elementor_not_available' ) );
			add_action( 'network_admin_notices', array( $this, 'elementor_not_available' ) );
		}

	}

	/**
	 * Reset the Unsupported theme nnotice after a theme is switched.
	 *
	 * @since 1.0.16
	 *
	 * @return void
	 */
	public function reset_unsupported_theme_notice() {
		delete_user_meta( get_current_user_id(), 'hfe-sites-notices-id-unsupported-theme' );
	}

	/**
	 * Prints the admin notics when Elementor is not installed or activated.
	 */
	public function elementor_not_available() {

		if ( file_exists( WP_PLUGIN_DIR . '/elementor/elementor.php' ) ) {
			$url = network_admin_url() . 'plugins.php?s=elementor';
		} else {
			$url = network_admin_url() . 'plugin-install.php?s=elementor';
		}

		echo '<div class="notice notice-error">';
		/* Translators: URL to install or activate Elementor plugin. */
		echo '<p>' . sprintf( __( 'The <strong>Header Footer Elementor</strong> plugin requires <strong><a href="%s">Elementor</strong></a> plugin installed & activated.', 'header-footer-elementor' ) . '</p>', $url );
		echo '</div>';
	}

	/**
	 * Loads the globally required files for the plugin.
	 */
	public function includes() {
		require_once HFE_DIR . 'admin/class-hfe-admin.php';

		require_once HFE_DIR . 'inc/hfe-functions.php';

		// Load Elementor Canvas Compatibility.
		require_once HFE_DIR . 'inc/class-hfe-elementor-canvas-compat.php';

		// Load WPML Compatibility if WPML is installed and activated.
		if ( defined( 'ICL_SITEPRESS_VERSION' ) ) {
			require_once HFE_DIR . 'inc/compatibility/class-hfe-wpml-compatibility.php';
		}

		// Load the Admin Notice Class.
		require_once HFE_DIR . 'inc/class-hfe-notices.php';
	}

	/**
	 * Loads textdomain for the plugin.
	 */
	public function load_textdomain() {
		load_plugin_textdomain( 'header-footer-elementor' );
	}

	/**
	 * Enqueue styles and scripts.
	 */
	public function enqueue_scripts() {
		wp_enqueue_style( 'hfe-style', HFE_URL . 'assets/css/header-footer-elementor.css', array(), HFE_VER );

		if ( class_exists( '\Elementor\Post_CSS_File' ) ) {

			if ( class_exists( '\Elementor\Plugin' ) ) {
				$elementor = \Elementor\Plugin::instance();
				$elementor->frontend->enqueue_styles();
			}

			if ( class_exists( '\ElementorPro\Plugin' ) ) {
				$elementor_pro = \ElementorPro\Plugin::instance();
				$elementor_pro->enqueue_styles();
			}

			if ( hfe_header_enabled() ) {
				$css_file = new \Elementor\Post_CSS_File( get_hfe_header_id() );
				$css_file->enqueue();
			}

			if ( hfe_footer_enabled() ) {
				$css_file = new \Elementor\Post_CSS_File( get_hfe_footer_id() );
				$css_file->enqueue();
			}
		}
	}

	/**
	 * Load admin styles on header footer elementor edit screen.
	 */
	public function enqueue_admin_scripts() {
		global $pagenow;
		$screen = get_current_screen();

		if ( ( 'elementor-hf' == $screen->id && ( 'post.php' == $pagenow || 'post-new.php' == $pagenow ) ) || ( 'edit.php' == $pagenow && 'edit-elementor-hf' == $screen->id ) ) {
			wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', array(), HFE_VER );

			wp_enqueue_script( 'hfe-admin-script', HFE_URL . 'admin/assets/js/ehf-admin.js', array(), HFE_VER );
		}
	}

	/**
	 * Adds classes to the body tag conditionally.
	 *
	 * @param  Array $classes array with class names for the body tag.
	 *
	 * @return Array          array with class names for the body tag.
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
	 * Display Unsupported theme notice if the current theme does add support for 'header-footer-elementor'
	 *
	 * @since  1.0.3
	 */
	public function setup_unsupported_theme_notice() {

		if ( ! current_theme_supports( 'header-footer-elementor' ) ) {
			HFE_Notices::add_notice(
				array(
					'id'          => 'unsupported-theme',
					'type'        => 'error',
					'dismissible' => true,
					'message'     => __( 'Hey, your current theme is not supported by Header Footer Elementor, click <a href="https://github.com/Nikschavan/header-footer-elementor#which-themes-are-supported-by-this-plugin">here</a> to check out the supported themes.', 'header-footer-elementor' ),
				)
			);
		}

	}

	/**
	 * Prints the Header content.
	 */
	public static function get_header_content() {
		echo self::$elementor_instance->frontend->get_builder_content_for_display( get_hfe_header_id() );
	}

	/**
	 * Prints the Footer content.
	 */
	public static function get_footer_content() {

		echo "<div class='footer-width-fixer'>";
		echo self::$elementor_instance->frontend->get_builder_content_for_display( get_hfe_footer_id() );
		echo '</div>';
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
		if ( 'type_header' == $setting || 'type_footer' == $setting || 'type_before_footer' == $setting ) {
			$templates = self::get_template_id( $setting );

			$template = is_array( $templates ) ? $templates[0] : '';
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

		$cached = wp_cache_get( $type );

		if ( false !== $cached ) {
			return $cached;
		}

		$args = array(
			'post_type'    => 'elementor-hf',
			'meta_key'     => 'ehf_template_type',
			'meta_value'   => $type,
			'meta_type'    => 'post',
			'meta_compare' => '>=',
			'orderby'      => 'meta_value',
			'order'        => 'ASC',
			'meta_query'   => array(
				'relation' => 'OR',
				array(
					'key'     => 'ehf_template_type',
					'value'   => $type,
					'compare' => '==',
					'type'    => 'post',
				),
			),
		);

		$args = apply_filters( 'hfe_get_template_id_args', $args );

		$template = new WP_Query(
			$args
		);

		if ( $template->have_posts() ) {
			$posts = wp_list_pluck( $template->posts, 'ID' );
			wp_cache_set( $type, $posts );

			return $posts;
		}

		return '';
	}

	/**
	 * Callback to shortcode.
	 *
	 * @param array $atts attributes for shortcode.
	 */
	public function render_template( $atts ) {

		$atts = shortcode_atts(
			array(
				'id' => '',
			),
			$atts,
			'hfe_template'
		);

		$id = ! empty( $atts['id'] ) ? intval( $atts['id'] ) : '';

		if ( empty( $id ) ) {
			return '';
		}

		if ( class_exists( '\Elementor\Post_CSS_File' ) ) {

			// Load elementor styles.
			$css_file = new \Elementor\Post_CSS_File( $id );
			$css_file->enqueue();
		}

		return self::$elementor_instance->frontend->get_builder_content_for_display( $id );

	}

}
