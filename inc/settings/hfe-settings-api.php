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
	 * @since x.x.x
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
	 * @since x.x.x
	 * @return void
	 */
	private function __construct() {
		// Log an error message to check if the file is loading.

		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Register REST API routes.
	 *
	 * @since x.x.x
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
			'/email-response',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'get_response_from_suretriggers' ],
				'permission_callback' => '__return_true',
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

		register_rest_route(
			'hfe/v1',
			'/email-validation',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'get_email_status' ],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);
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

		$session_id = isset( $_COOKIE['hfe_custom_user_session_id'] ) ? sanitize_text_field( wp_unslash( $_COOKIE['hfe_custom_user_session_id'] ) ) : '';

		if ( ! $session_id ) {
			$session_id = md5( wp_generate_uuid4() . microtime( true ) );
			if ( ! headers_sent() ) {
				setcookie( 'hfe_custom_user_session_id', $session_id, time() + ( 20 * MINUTE_IN_SECONDS ), '/' );
			}
		}

		$email = sanitize_email( $request->get_param( 'email' ) );
		$date  = sanitize_text_field( $request->get_param( 'date' ) );

		if ( empty( $email ) || empty( $date ) ) {
			return new WP_Error( 'missing_parameters', __( 'Missing email or date parameter', 'header-footer-elementor' ), [ 'status' => 400 ] );
		}

		// Store the email validation request temporarily.
		set_transient(
			"hfe_email_validation_{$session_id}",
			[
				'email' => $email,
				'date'  => $date,
			],
			10 * MINUTE_IN_SECONDS 
		);

		$webhook_url    = 'https://webhook.suretriggers.com/suretriggers/4cb01209-5164-4521-93c1-360df407d83b';
		$validation_url = get_site_url() . '/wp-json/hfe/v1/email-response/';

		// Append session_id to track requests.
		$body = json_encode(
			[
				'email'          => $email,
				'date'           => $date,
				'session_id'     => $session_id,
				'validation_url' => $validation_url,
			]
		);

		$response = wp_remote_post(
			$webhook_url,
			[
				'method'  => 'POST',
				'headers' => [ 'Content-Type' => 'application/json' ],
				'body'    => $body,
			]
		);

		if ( is_wp_error( $response ) ) {
			return new WP_Error( 'webhook_error', __( 'Error calling webhook', 'header-footer-elementor' ), [ 'status' => 500 ] );
		}

		return new WP_REST_Response(
			[
				'message'    => 'Webhook call successful',
				'session_id' => $session_id,
			],
			200 
		);
	}

	/**
	 * Email Validation Response.
	 * @param WP_REST_Request $request Request object.
	 * 
	 */
	public function get_response_from_suretriggers( WP_REST_Request $request ) {

		$body = $request->get_params();
		
		$email      = isset( $body['email'] ) ? sanitize_email( $body['email'] ) : '';
		$status     = isset( $body['status'] ) ? sanitize_text_field( $body['status'] ) : '';
		$session_id = isset( $body['session_id'] ) ? sanitize_text_field( $body['session_id'] ) : '';

		if ( ! $email || ! $status || ! $session_id ) {
			return new WP_REST_Response( [ 'message' => 'Invalid request' ], 400 );
		}

		$existing_session = get_transient( "hfe_email_validation_{$session_id}" );
	
		if ( false === $existing_session ) {
			return new WP_REST_Response( [ 'message' => 'Session expired or invalid.' ], 403 );
		}

		if ( $email !== $existing_session['email'] ) {
			return new WP_REST_Response( [ 'message' => 'Email mismatch' ], 400 );
		}

		// Store validation result.
		set_transient(
			"uae_validation_data_{$session_id}",
			[
				'email'  => $email,
				'status' => $status,
			],
			5 * MINUTE_IN_SECONDS 
		);

		// Invalidate the original transient to prevent reuse.
		delete_transient( "hfe_email_validation_{$session_id}" );
	
		return new WP_REST_Response(
			[
				'message' => 'Validation received successfully.',
				'status'  => $status,
			],
			200 
		);
	}

	/**
	 * Handle Email Validation Response.
	 * @param WP_REST_Request $request Request object.
	 * 
	 */
	public function get_email_status( WP_REST_Request $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), [ 'status' => 403 ] );
		}

		// Retrieve session ID from cookie.
		$session_id = isset( $_COOKIE['hfe_custom_user_session_id'] ) ? sanitize_text_field( wp_unslash( $_COOKIE['hfe_custom_user_session_id'] ) ) : '';

		if ( empty( $session_id ) ) {
			return new WP_REST_Response(
				[
					'status'  => 'error',
					'message' => 'Session expired or invalid.',
				],
				403 
			);
		}

		// Check if session is still valid.
		$existing_session = get_transient( "uae_validation_data_{$session_id}" );
		
		$params = $request->get_json_params();
		$email  = isset( $params['email'] ) ? sanitize_email( $params['email'] ) : '';
	
		if ( empty( $email ) ) {
			return new WP_REST_Response(
				[
					'status'  => 'error',
					'message' => 'Invalid email address',
				],
				400
			);
		}
	
		$status = isset( $existing_session['status'] ) ? $existing_session['status'] : 'pending';

		if ( 'pending' !== $status ) {
			delete_transient( "uae_validation_data_{$session_id}" );
		}

		if ( 'valid' === $status ) {
			update_option( "uae_hide_onboarding", true );
		}
	
		return new WP_REST_Response( [ 'status' => $status ], 200 );
	}

	/**
	 * Check whether a given request has permission to read notes.
	 *
	 * @since x.x.x
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
	

}

// Initialize the HFE_Settings_Api class.
HFE_Settings_Api::get_instance();
