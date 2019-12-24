<?php
/**
 * Entry point for the plugin. Checks if Elementor is installed and activated and loads it's own files and actions.
 *
 * @package header-footer-elementor
 */

/**
 * Class Header_Footer_Elementor_Popup
 */
class Header_Footer_Elementor_Popup {

	/**
	 * API URL which is used to get the response from.
	 *
	 * @since  x.x.x
	 * @var (String) URL
	 */
	public $api_url;

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
	 * Instance of HFE_Admin
	 *
	 * @var Header_Footer_Elementor_Popup
	 */
	private static $_instance = null;

	/**
	 * Instance of Header_Footer_Elementor_Popup
	 *
	 * @return Header_Footer_Elementor_Popup Instance of Header_Footer_Elementor_Popup
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
	function __construct() {

		$this->set_api_url();

		add_action( 'elementor/editor/footer', [ $this, 'block_template' ] );

		add_action( 'elementor/editor/footer', [ $this, 'enqueue_elementor_editor_script' ], 99 );
		add_action( 'elementor/editor/before_enqueue_scripts', [ $this, 'enqueue_elementor_editor_style' ] );
			add_action( 'elementor/preview/enqueue_styles', [ $this, 'enqueue_elementor_editor_style' ] );
	}

	/**
	 * Get the API URL.
	 *
	 * @since  x.x.x
	 */
	public static function get_api_domain() {
		return apply_filters( 'ehf_api_domain', 'https://websitedemos.net/' );
	}

	/**
	 * Setter for $api_url
	 *
	 * @since  x.x.x
	 */
	public function set_api_url() {

		$this->api_url = apply_filters( 'ehf_api_url', trailingslashit( self::get_api_domain() ) . '/wp-json/wp/v2/' );

		$this->search_url = apply_filters( 'ehf_search_api_url', trailingslashit( self::get_api_domain() ) . '/wp-json/analytics/v2/search/' );
	}

	/**
	 * Enqueue Template Popup Assets
	 *
	 * @return void
	 */
	public function enqueue_elementor_editor_script() {

		if ( hfe_footer_enabled() || hfe_header_enabled() ) {

			wp_enqueue_script( 'masonry' );
			wp_enqueue_script( 'imagesloaded' );
			wp_enqueue_script( 'hfe-template-popup-script', HFE_URL . 'admin/assets/js/ehf-template-popup.js', [ 'jquery', 'wp-util', 'updates', 'masonry', 'imagesloaded' ], HFE_VER );

			$data = apply_filters(
				'ehf_render_localized_vars',
				[
					'blocks'           => $this->get_all_blocks(),
					'ajax_url'         => esc_url( admin_url( 'admin-ajax.php' ) ),
					'api_url'          => $this->api_url,
					'_ajax_nonce'      => wp_create_nonce( 'ehf-elementor-popup' ),
					'block_categories' => get_option( 'ehf-blocks-categories', [] ),
					'site_url'         => site_url(),
				]
			);

			wp_localize_script( 'hfe-template-popup-script', 'ehf_blocks', $data );
		}
	}

	/**
	 * Register module required js on elementor's action.
	 *
	 * @since x.x.x
	 */
	public function enqueue_elementor_editor_style() {

		wp_enqueue_style( 'ehf-elementor-admin-page', HFE_URL . 'admin/assets/css/ehf-elementor-blocks.css', HFE_VER, true );
		wp_style_add_data( 'ehf-elementor-admin-page', 'rtl', 'replace' );

	}

	/**
	 * Check Cron Status
	 *
	 * Gets the current cron status by performing a test spawn. Cached for one hour when all is well.
	 *
	 * @since x.x.x
	 *
	 * @param bool $cache Whether to use the cached result from previous calls.
	 * @return true|WP_Error Boolean true if the cron spawner is working as expected, or a WP_Error object if not.
	 */
	public static function test_cron( $cache = true ) {
		global $wp_version;

		if ( defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON ) {
			return new WP_Error( 'wp_ehf_cron_error', esc_html__( 'ERROR! Cron schedules are disabled by setting constant DISABLE_WP_CRON to true.<br/>To start the import process please enable the cron by setting it to false. E.g. define( \'DISABLE_WP_CRON\', false );', 'header-footer-elementor' ) );
		}

		if ( defined( 'ALTERNATE_WP_CRON' ) && ALTERNATE_WP_CRON ) {
			return new WP_Error( 'wp_ehf_cron_error', esc_html__( 'ERROR! Cron schedules are disabled by setting constant ALTERNATE_WP_CRON to true.<br/>To start the import process please enable the cron by setting it to false. E.g. define( \'ALTERNATE_WP_CRON\', false );', 'header-footer-elementor' ) );
		}

		$cached_status = get_transient( 'ehf-cron-test-ok' );

		if ( $cache && $cached_status ) {
			return true;
		}

		$sslverify     = version_compare( $wp_version, 4.0, '<' );
		$doing_wp_cron = sprintf( '%.22F', microtime( true ) );

		$cron_request = apply_filters(
			'cron_request',
			[
				'url'  => site_url( 'wp-cron.php?doing_wp_cron=' . $doing_wp_cron ),
				'key'  => $doing_wp_cron,
				'args' => [
					'timeout'   => 3,
					'blocking'  => true,
					'sslverify' => apply_filters( 'https_local_ssl_verify', $sslverify ),
				],
			]
		);

		$cron_request['args']['blocking'] = true;

		$result = wp_remote_post( $cron_request['url'], $cron_request['args'] );

		if ( is_wp_error( $result ) ) {
			return $result;
		} elseif ( wp_remote_retrieve_response_code( $result ) >= 300 ) {
			return new WP_Error(
				'unexpected_http_response_code',
				sprintf(
					/* translators: 1: The HTTP response code. */
					__( 'Unexpected HTTP response code: %s', 'header-footer-elementor' ),
					intval( wp_remote_retrieve_response_code( $result ) )
				)
			);
		} else {
			set_transient( 'ehf-cron-test-ok', 1, 3600 );
			return true;
		}

	}

	/**
	 * Is Image URL
	 *
	 * @since x.x.x
	 *
	 * @param  string $url URL.
	 * @return boolean
	 */
	public function is_image_url( $url = '' ) {
		if ( empty( $url ) ) {
			return false;
		}

		if ( preg_match( '/^((https?:\/\/)|(www\.))([a-z0-9-].?)+(:[0-9]+)?\/[\w\-]+\.(jpg|png|svg|gif|jpeg)\/?$/i', $url ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Block Templates
	 *
	 * @return void
	 */
	public function block_template() {
		ob_start();
		require_once HFE_DIR . 'admin/templates/templates.php';
		ob_end_flush();
	}

	/**
	 * Get all blocks
	 *
	 * @since x.x.x
	 * @return array All Elementor Blocks.
	 */
	public function get_all_blocks() {
		$blocks = [];
		for ( $page = 1; $page <= 2; $page++ ) {
			$current_page_data = get_option( 'ehf-blocks-' . $page, [] );
			if ( ! empty( $current_page_data ) ) {
				foreach ( $current_page_data as $page_id => $page_data ) {
					$blocks[ $page_id ] = $page_data;
				}
			}
		}

		return $blocks;
	}
}

Header_Footer_Elementor_Popup::instance();
