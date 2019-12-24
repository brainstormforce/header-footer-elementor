<?php
/**
 * Batch Processing
 *
 * @package Astra Sites
 * @since x.x.x
 */

if ( ! class_exists( 'EHF_Batch_Processing_Importer' ) ) :

	/**
	 * EHF_Batch_Processing_Importer
	 *
	 * @since x.x.x
	 */
	class EHF_Batch_Processing_Importer {

		/**
		 * Instance
		 *
		 * @since x.x.x
		 * @access private
		 * @var object Class object.
		 */
		private static $instance;

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
		}

		/**
		 * Import Block Categories
		 *
		 * @since x.x.x
		 * @return void
		 */
		public function import_block_categories() {

			error_log( 'Elementor Header Footer - Requesting Block Categories' );
			update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Requesting Block Categories' );

			$api_args = [
				'timeout' => 30,
			];

			$tags_request = wp_remote_get( trailingslashit( Header_Footer_Elementor_Popup::instance()->get_api_domain() ) . '/wp-json/wp/v2/blocks-category/?_fields=id,name,slug&per_page=100', $api_args );

			if ( ! is_wp_error( $tags_request ) && 200 === (int) wp_remote_retrieve_response_code( $tags_request ) ) {

				$tags = json_decode( wp_remote_retrieve_body( $tags_request ), true );

				if ( isset( $tags['code'] ) ) {
					$message = isset( $tags['message'] ) ? $tags['message'] : '';
					if ( ! empty( $message ) ) {
						error_log( 'Elementor Header Footer - HTTP Request Error: ' . $message );
					} else {
						error_log( 'Elementor Header Footer - HTTP Request Error!' );
					}
				} else {
					$categories = [];
					foreach ( $tags as $key => $value ) {
						$categories[ $value['id'] ] = $value;
					}
					update_option( 'ehf-blocks-categories', $categories );
				}
			}

			error_log( 'Elementor Header Footer - Block Categories Imported Successfully!' );
			update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Block Categories Imported Successfully!' );
		}

		/**
		 * Import Blocks
		 *
		 * @since x.x.x
		 * @param  integer $page Page number.
		 * @return void
		 */
		public function import_blocks( $page = 1 ) {

			error_log( 'Elementor Header Footer - BLOCK: Import' );

			$api_args = [
				'timeout' => 30,
			];

			$all_blocks = [];
			error_log( 'Elementor Header Footer - BLOCK: Requesting ' . $page );
			update_option( 'ehf-batch-status-string', 'Elementor Header Footer - Requesting for blocks page - ' . $page );
			$response = wp_remote_get( trailingslashit( Header_Footer_Elementor_Popup::instance()->get_api_domain() ) . '/wp-json/astra-blocks/v1/blocks?per_page=100&page=' . $page, $api_args );

			if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
				$astra_blocks = json_decode( wp_remote_retrieve_body( $response ), true );

				if ( isset( $astra_blocks['code'] ) ) {
					$message = isset( $astra_blocks['message'] ) ? $astra_blocks['message'] : '';
					if ( ! empty( $message ) ) {
						error_log( 'Elementor Header Footer - HTTP Request Error: ' . $message );
					} else {
						error_log( 'Elementor Header Footer - HTTP Request Error!' );
					}
				} else {
					error_log( 'Elementor Header Footer - BLOCK: Storing data for page ' . $page . ' in option ehf-blocks-' . $page );
					update_option( 'ehf-blocks-batch-status-string', 'Elementor Header Footer - Storing data for page ' . $page . ' in option ehf-blocks-' . $page );

					update_option( 'ehf-blocks-' . $page, $astra_blocks );
				}
			} else {
				error_log( 'Elementor Header Footer - BLOCK: API Error: ' . $response->get_error_message() );
			}

			error_log( 'Elementor Header Footer - BLOCK: Complete storing data for blocks ' . $page );
			update_option( 'ehf-blocks-batch-status-string', 'Elementor Header Footer - Complete storing data for page ' . $page );
		}
	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	EHF_Batch_Processing_Importer::get_instance();

endif;
