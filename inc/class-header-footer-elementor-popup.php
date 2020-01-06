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

		// Import AJAX.
		add_action( 'wp_ajax_ehf-blocks-import-wpforms', [ $this, 'import_wpforms' ] );
		add_action( 'wp_ajax_ehf-blocks-batch-process', [ $this, 'blocks_batch_process' ] );
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

		if ( defined( 'ASTRA_SITES_VER' ) ) {
			return;
		}

		if ( hfe_footer_enabled() || hfe_header_enabled() ) {

			wp_enqueue_script( 'masonry' );
			wp_enqueue_script( 'imagesloaded' );
			wp_enqueue_script( 'hfe-template-popup-script', HFE_URL . 'admin/assets/js/ehf-template-popup.js', [ 'jquery', 'wp-util', 'updates', 'masonry', 'imagesloaded' ], HFE_VER );

			$type = '';

			if ( get_post_meta( get_the_ID(), 'ehf_template_type', true ) ) {

				if ( hfe_footer_enabled() ) {
					$type = 'about';
				}

				if ( hfe_header_enabled() ) {
					$type = 'contact';
				}
			}

			$data = apply_filters(
				'ehf_render_localized_vars',
				[
					'blocks'           => $this->get_all_blocks(),
					'ajax_url'         => esc_url( admin_url( 'admin-ajax.php' ) ),
					'api_url'          => $this->api_url,
					'_ajax_nonce'      => wp_create_nonce( 'ehf-elementor-popup' ),
					'block_categories' => get_option( 'ehf-blocks-categories', [] ),
					'site_url'         => site_url(),
					'type'             => $type,
					'type_slug' 	   => get_post_meta( get_the_ID(), 'ehf_template_type', true ),
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

	/**
	 * Import WP Forms
	 *
	 * @since x.x.x
	 *
	 * @param  string $wpforms_url WP Forms JSON file URL.
	 * @return void
	 */
	public function import_wpforms( $wpforms_url = '' ) {

		// Verify Nonce.
		check_ajax_referer( 'ehf-elementor-popup', '_ajax_nonce' );

		if ( ! current_user_can( 'customize' ) ) {
			wp_send_json_error( __( 'You are not allowed to perform this action', 'header-footer-elementor' ) );
		}

		$wpforms_url = ( isset( $_REQUEST['wpforms_url'] ) ) ? urldecode( $_REQUEST['wpforms_url'] ) : $wpforms_url;
		$ids_mapping = [];

		if ( ! empty( $wpforms_url ) && function_exists( 'wpforms_encode' ) ) {

			// Download JSON file.
			$file_path = self::download_file( $wpforms_url );

			if ( $file_path['success'] ) {
				if ( isset( $file_path['data']['file'] ) ) {

					$ext = strtolower( pathinfo( $file_path['data']['file'], PATHINFO_EXTENSION ) );

					if ( 'json' === $ext ) {
						$forms = json_decode( file_get_contents( $file_path['data']['file'] ), true );

						if ( ! empty( $forms ) ) {

							foreach ( $forms as $form ) {
								$title = ! empty( $form['settings']['form_title'] ) ? $form['settings']['form_title'] : '';
								$desc  = ! empty( $form['settings']['form_desc'] ) ? $form['settings']['form_desc'] : '';

								$new_id = post_exists( $title );

								if ( ! $new_id ) {
									$new_id = wp_insert_post(
										[
											'post_title'   => $title,
											'post_status'  => 'publish',
											'post_type'    => 'wpforms',
											'post_excerpt' => $desc,
										]
									);

									// Set meta for tracking the post.
									update_post_meta( $new_id, '_ehf_blocks_imported_wp_forms', true );
								}

								if ( $new_id ) {

									// ID mapping.
									$ids_mapping[ $form['id'] ] = $new_id;

									$form['id'] = $new_id;
									wp_update_post(
										[
											'ID'           => $new_id,
											'post_content' => wpforms_encode( $form ),
										]
									);
								}
							}
						}
					}
				}
			}
		}

		update_option( 'ehf_blocks_wpforms_ids_mapping', $ids_mapping );

		wp_send_json_success( $ids_mapping );
	}

	/**
	 * Download File Into Uploads Directory
	 *
	 * @param  string $file Download File URL.
	 * @param  int    $timeout_seconds Timeout in downloading the XML file in seconds.
	 * @return array        Downloaded file data.
	 */
	public static function download_file( $file = '', $timeout_seconds = 300 ) {

		// Gives us access to the download_url() and wp_handle_sideload() functions.
		require_once ABSPATH . 'wp-admin/includes/file.php';

		// Download file to temp dir.
		$temp_file = download_url( $file, $timeout_seconds );

		// WP Error.
		if ( is_wp_error( $temp_file ) ) {
			return [
				'success' => false,
				'data'    => $temp_file->get_error_message(),
			];
		}

		// Array based on $_FILE as seen in PHP file uploads.
		$file_args = [
			'name'     => basename( $file ),
			'tmp_name' => $temp_file,
			'error'    => 0,
			'size'     => filesize( $temp_file ),
		];

		$overrides = [

			// Tells WordPress to not look for the POST form
			// fields that would normally be present as
			// we downloaded the file from a remote server, so there
			// will be no form fields
			// Default is true.
			'test_form'   => false,

			// Setting this to false lets WordPress allow empty files, not recommended.
			// Default is true.
			'test_size'   => true,

			// A properly uploaded file will pass this test. There should be no reason to override this one.
			'test_upload' => true,

			'mimes'       => [
				'xml'  => 'text/xml',
				'json' => 'text/plain',
			],
		];

		// Move the temporary file into the uploads directory.
		$results = wp_handle_sideload( $file_args, $overrides );

		if ( isset( $results['error'] ) ) {
			return [
				'success' => false,
				'data'    => $results,
			];
		}

		// Success.
		return [
			'success' => true,
			'data'    => $results,
		];
	}

	/**
	 * Blocks Batch Process via AJAX
	 *
	 * @since x.x.x
	 */
	public function blocks_batch_process() {

		// Verify Nonce.
		check_ajax_referer( 'ehf-elementor-popup', '_ajax_nonce' );

		if ( ! current_user_can( 'customize' ) ) {
			wp_send_json_error( __( 'You are not allowed to perform this action', 'header-footer-elementor' ) );
		}

		if ( ! isset( $_POST['url'] ) ) {
			wp_send_json_error( __( 'Invalid API URL', 'header-footer-elementor' ) );
		}

		$response = wp_remote_get( $_POST['url'] );

		if ( is_wp_error( $response ) ) {
			wp_send_json_error( wp_remote_retrieve_body( $response ) );
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );
		if ( ! isset( $data['post-meta']['_elementor_data'] ) ) {
			wp_send_json_error( __( 'Invalid Post Meta', 'header-footer-elementor' ) );
		}

		$meta    = json_decode( $data['post-meta']['_elementor_data'], true );
		$post_id = $_POST['id'];

		if ( empty( $post_id ) || empty( $meta ) ) {
			wp_send_json_error( __( 'Invalid Post ID or Elementor Meta', 'header-footer-elementor' ) );
		}

		$import      = new \Elementor\TemplateLibrary\Header_Footer_Elementor_Import();
		$import_data = $import->import( $post_id, $meta );

		wp_send_json_success( $import_data );
	}
}

Header_Footer_Elementor_Popup::instance();
