<?php
/**
 * HFE Settings API.
 *
 * @package HFE
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use HFE\WidgetsManager\Base\HFE_Helper;

/**
 * Class HFE_Settings_Api.
 */
class HFE_Settings_Api {

	/**
	 * Instance.
	 *
	 * @access private
	 * @var object Class object.
	 * @since 2.2.1
	 */
	private static $instance;

	/**
	 * Get the singleton instance of the class.
	 *
	 * @return HFE_Settings_Api
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Initialize hooks.
	 *
	 * @since 2.2.1
	 * @return void
	 */
	private function __construct() {
		// Log an error message to check if the file is loading.

		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Register REST API routes.
	 *
	 * @since 2.2.1
	 * @return void
	 */
	public function register_routes() {

		register_rest_route(
			'hfe/v1',
			'/widgets',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_hfe_widgets' ],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);

		register_rest_route(
			'hfe/v1',
			'/plugins',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_plugins_list' ],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);

		register_rest_route(
			'hfe/v1',
			'/templates',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_templates_status' ],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);

		register_rest_route(
			'hfe/v1',
			'/email-webhook',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'send_email_to_webhook_api' ],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);
	}

	/**
	 * Check whether a given request has permission to read notes.
	 *
	 * @since 2.2.1
	 * @return WP_Error|boolean
	 */
	public function get_items_permissions_check() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'uae_rest_not_allowed', __( 'Sorry, you are not authorized to perform this action.', 'header-footer-elementor' ), [ 'status' => 403 ] );
		}

		return true;
	}

	/**
	 * Get Starter Templates Status.
	 * 
	 * @param WP_REST_Request $request Request object.
	 */
	public function get_templates_status( WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), [ 'status' => 403 ] );
		}

		$templates_status = HFE_Helper::starter_templates_status();

		$response_data = [
			'templates_status' => $templates_status,
		];
	
		if ( 'Activated' === $templates_status ) {
			$response_data['redirect_url'] = HFE_Helper::starter_templates_link();
		}

		return new WP_REST_Response( $response_data, 200 );
	}

	/**
	 * Callback function to return plugins list.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function get_plugins_list( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), [ 'status' => 403 ] );
		}

		// Fetch branding settings.
		$plugins_list = HFE_Helper::get_bsf_plugins_list();

		if ( ! is_array( $plugins_list ) ) {
			return new WP_REST_Response( [ 'message' => __( 'Plugins list not found', 'header-footer-elementor' ) ], 404 );
		}

		return new WP_REST_Response( $plugins_list, 200 );
		
	}

	/**
	 * 
	 * Callback function to return widgets list.
	 * 
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response
	 */
	public function get_hfe_widgets( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), [ 'status' => 403 ] );
		}

		// Fetch widgets settings.
		$widgets_list = HFE_Helper::get_all_widgets_list();

		if ( ! is_array( $widgets_list ) ) {
			return new WP_REST_Response( [ 'message' => __( 'Widgets list not found', 'header-footer-elementor' ) ], 404 );
		}

		return new WP_REST_Response( $widgets_list, 200 );
		
	}

	/**
	 * Get the API URL.
	 *
	 * @since 2.3.1
	 * @return string
	 */
	public function get_api_domain() {
		return apply_filters( 'hfe_api_domain', 'https://websitedemos.net/' );
	}

	/**
	 * Send Email to Webhook.
	 * @param WP_REST_Request $request Request object.
	 * 
	 */
	public function send_email_to_webhook_api( WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );
		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), [ 'status' => 403 ] );
		}

		$email = sanitize_email( $request->get_param( 'email' ) );
		$date  = sanitize_text_field( $request->get_param( 'date' ) );
		$fname  = sanitize_text_field( $request->get_param( 'fname' ) );
		$lname  = sanitize_text_field( $request->get_param( 'lname' ) );

		if ( empty( $email ) || empty( $date ) || empty( $fname ) ) {
			// Return error response if any of the required parameters are missing.
			return new WP_Error( 'missing_parameters', __( 'Missing Fields', 'header-footer-elementor' ), [ 'status' => 400 ] );
		}

		$api_domain = trailingslashit( $this->get_api_domain() );
		$api_domain_url = $api_domain . 'wp-json/uaelite/v1/subscribe/';
		$validation_url = esc_url_raw( get_site_url() . '/wp-json/hfe/v1/email-response/' );

		// Append session_id to track requests.
		$body = array(
			'email'          => $email,
			'date'           => $date,
			'fname'          => $fname,
			'lname'          => $lname
		);

		$args = array(
			'body'    => $body,
			'timeout' => 30,
		);

		$response = wp_remote_post( $api_domain_url, $args );

		if ( is_wp_error( $response ) ) {
			return new WP_Error( 'webhook_error', __( 'Error calling endpoint', 'header-footer-elementor' ), [ 'status' => 500 ] );
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		$response_body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! in_array( $response_code, [ 200, 201, 204 ], true ) ) {
			return new WP_Error( 'webhook_error', __( 'Error in API response: ' . ( $response_body['message'] ?? 'Unknown error' ), 'header-footer-elementor' ), [ 'status' => $response_code ] );
		}

		update_option( 'uaelite_subscription', 'done' );

		return new WP_REST_Response(
			[
				'message'    => 'success'
			],
			200
		);
	}
	
}

// Initialize the HFE_Settings_Api class.
HFE_Settings_Api::get_instance();
