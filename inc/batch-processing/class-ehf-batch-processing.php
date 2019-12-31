<?php
/**
 * Batch Processing
 *
 * @package header-footer-elementor
 * @since x.x.x
 */

if ( ! class_exists( 'EHF_Batch_Processing' ) ) :

	/**
	 * EHF_Batch_Processing
	 *
	 * @since x.x.x
	 */
	class EHF_Batch_Processing {

		/**
		 * Instance
		 *
		 * @since x.x.x
		 * @var object Class object.
		 * @access private
		 */
		private static $instance;

		/**
		 * Sites Importer
		 *
		 * @since x.x.x
		 * @var object Class object.
		 * @access public
		 */
		public static $process_site_importer;

		/**
		 * Initiator
		 *
		 * @since x.x.x
		 * @return object initialized object of class.
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since x.x.x
		 */
		public function __construct() {

			// Core Helpers - Image.
			// @todo 	This file is required for Elementor.
			// Once we implement our logic for updating elementor data then we'll delete this file.
			require_once ABSPATH . 'wp-admin/includes/image.php';

			// Core Helpers - Batch Processing.
			require_once HFE_DIR . 'inc/batch-processing/helpers/class-wp-async-request.php';
			require_once HFE_DIR . 'inc/batch-processing/helpers/class-wp-background-process.php';

			// Process Importer.
			require_once HFE_DIR . 'inc/batch-processing/class-ehf-batch-processing-importer-base.php';
			require_once HFE_DIR . 'inc/batch-processing/class-ehf-batch-processing-importer.php';

			self::$process_site_importer = new EHF_Batch_Processing_Importer_Base();

			// Start image importing after site import complete.
			add_filter( 'ehf_image_importer_skip_image', [ $this, 'skip_image' ], 10, 2 );
			add_filter( 'http_request_timeout', [ $this, 'set_http_timeout' ], 10, 2 );
			add_action( 'admin_head', [ $this, 'start_importer' ] );
			add_action( 'wp_ajax_ehf-update-library', [ $this, 'update_library' ] );
			add_action( 'wp_ajax_ehf-update-library-complete', [ $this, 'update_library_complete' ] );
			add_action( 'wp_ajax_ehf-import-block-categories', [ $this, 'import_block_categories' ] );
			add_action( 'wp_ajax_ehf-import-blocks', [ $this, 'import_blocks' ] );
		}

		/**
		 * Import Block Categories
		 *
		 * @since x.x.x
		 * @return void
		 */
		public function import_block_categories() {
			EHF_Batch_Processing_Importer::get_instance()->import_block_categories();
			wp_send_json_success();
		}

		/**
		 * Import Blocks
		 *
		 * @since x.x.x
		 * @return void
		 */
		public function import_blocks() {
			EHF_Batch_Processing_Importer::get_instance()->import_blocks();
			wp_send_json_success();
		}

		/**
		 * Update Library Complete
		 *
		 * @since x.x.x
		 * @return void
		 */
		public function update_library_complete() {
			update_option( 'ehf-batch-is-complete', 'no' );
			wp_send_json_success();
		}

		/**
		 * Update Library
		 *
		 * @since x.x.x
		 * @return void
		 */
		public function update_library() {
			$status = Header_Footer_Elementor_Popup::instance()::test_cron();
			if ( is_wp_error( $status ) ) {
				$import_with = 'ajax';
			} else {
				$import_with = 'batch';
				// Process import.
				$this->process_batch();
			}

			wp_send_json_success( $import_with );
		}

		/**
		 * Start Importer
		 *
		 * @since x.x.x
		 * @return void
		 */
		public function start_importer() {

			$is_fresh_user = get_user_meta( get_current_user_id(), 'ehf-fresh-user', true );

			// Process initially for the fresh user.
			if ( isset( $_GET['reset'] ) ) {

				// Process import.
				$this->process_batch();

			} elseif ( 'no' === $is_fresh_user ) {

				// Process import.
				$this->process_batch();

				update_user_meta( get_current_user_id(), 'ehf-fresh-user', 'yes' );

			} else {

				$current_screen = get_current_screen();

				// Bail if not on Header Footer Elementor screen.
				if ( ! is_object( $current_screen ) && null === $current_screen ) {
					return;
				}

				if ( 'edit-elementor-hf' === $current_screen->id ) {

					// Process import.
					$this->process_import();
				}
			}
		}

		/**
		 * Process Batch
		 *
		 * @since x.x.x
		 * @return mixed
		 */
		public function process_batch() {

			$status = Header_Footer_Elementor_Popup::instance()::test_cron();

			if ( is_wp_error( $status ) ) {
				error_log( 'Elementor Header Footer - Error! Batch Process did not start due to disabled cron events!' );
				update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Error! Batch Process did not start due to disabled cron events!' );
				return;
			}

			error_log( 'Elementor Header Footer - Batch Process Started.' );

			// Get count.
			$total_requests = $this->get_total_blocks_requests();
			if ( $total_requests ) {
				error_log( 'Elementor Header Footer - BLOCK: Total Blocks Requests - ' . $total_requests );
				update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Total Blocks Requests - ' . $total_requests );
				for ( $page = 1; $page <= $total_requests; $page++ ) {

					error_log( 'Elementor Header Footer - BLOCK: Added page ' . $page . ' in queue.' );
					update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Added page ' . $page . ' in queue.' );
					self::$process_site_importer->push_to_queue(
						[
							'page'     => $page,
							'instance' => EHF_Batch_Processing_Importer::get_instance(),
							'method'   => 'import_blocks',
						]
					);
				}
			}

			// Added the categories.
			error_log( 'Elementor Header Footer - - Added Block Categories in queue.' );
			update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Added Block Categories in queue.' );
			self::$process_site_importer->push_to_queue(
				[
					'instance' => EHF_Batch_Processing_Importer::get_instance(),
					'method'   => 'import_block_categories',
				]
			);

			error_log( 'Elementor Header Footer -  Dispatch the Queue!' );
			update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Dispatch the Queue!' );

			// Dispatch Queue.
			self::$process_site_importer->save()->dispatch();
		}

		/**
		 * Process Import
		 *
		 * @since x.x.x
		 *
		 * @return mixed Null if process is already started.
		 */
		public function process_import() {

			// Batch is already started? Then return.
			$status  = get_option( 'ehf-batch-status' );
			$expired = get_transient( 'ehf-import-check' );
			if ( 'in-process' === $status ) {
				return;
			}

			// Check batch expiry.
			$expired = get_transient( 'ehf-import-check' );
			if ( false !== $expired ) {
				return;
			}

			// For 1 hour.
			set_transient( 'ehf-import-check', 'true', WEEK_IN_SECONDS );

			update_option( 'ehf-batch-status', 'in-process' );

			// Process batch.
			$this->process_batch();
		}

		/**
		 * Get Blocks Total Requests
		 *
		 * @return integer
		 */
		public function get_total_blocks_requests() {

			error_log( 'Elementor Header Footer - BLOCK: Getting Total Blocks' );
			update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Getting Total Blocks' );

			$api_args = [
				'timeout' => 60,
			];

			$response = wp_remote_get( trailingslashit( Header_Footer_Elementor_Popup::instance()->get_api_domain() ) . '/wp-json/astra-blocks/v1/get-total-blocks', $api_args );
			if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
				$total_requests = json_decode( wp_remote_retrieve_body( $response ), true );
				error_log( 'Elementor Header Footer - BLOCK: Updated requests ' . $total_requests );
				update_option( 'ehf-blocks-batch-status-string', 'Elementor Header Footer - Updated requests ' . $total_requests );

				update_option( 'ehf-blocks-requests', $total_requests );

				return $total_requests;
			}

			error_log( 'Elementor Header Footer - BLOCK: Request Failed! Trying Again.' );
			update_option( 'ehf-blocks-batch-status-string', 'Elementor Header Footer - Request Failed! Trying Again.' );

			$this->get_total_blocks_requests();
		}

		/**
		 * Set the timeout for the HTTP request for the images which serve from domain `websitedemos.net`.
		 *
		 * @since 1x.x.x
		 *
		 * @param int    $default Time in seconds until a request times out. Default 5.
		 * @param string $url           The request URL.
		 */
		public function set_http_timeout( $default, $url ) {

			if ( strpos( $url, 'websitedemos.net' ) === false ) {
				return $default;
			}

			if ( Header_Footer_Elementor_Popup::instance()->is_image_url( $url ) ) {
				$default = 30;
			}

			return $default;
		}

		/**
		 * Get Supporting Post Types..
		 *
		 * @since x.x.x
		 * @param  integer $feature Feature.
		 * @return array
		 */
		public static function get_post_types_supporting( $feature ) {
			global $_wp_post_type_features;

			$post_types = array_keys(
				wp_filter_object_list( $_wp_post_type_features, [ $feature => true ] )
			);

			return $post_types;
		}

	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	EHF_Batch_Processing::get_instance();

endif;
