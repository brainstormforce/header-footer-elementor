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
				'callback'            => [ $this, 'get_email_validation_response' ],
				'permission_callback' => '__return_true',
			]
		);

		register_rest_route(
			'hfe/v1',
			'/email-validation',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'handle_email_validation_response' ],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);
	}

	/**
	 * Email Validation Response.
	 */
	public function get_email_validation_response( WP_REST_Request $request ) {

		$body = $request->get_json_params(); // Get JSON body
		$email = isset($body['email']) ? sanitize_email($body['email']) : '';
		$status = isset($body['status']) ? sanitize_text_field($body['status']) : '';

		if (!$email || !$status) {
			return new WP_REST_Response(['message' => 'Invalid request'], 400);
		}

		// Store validation result for later retrieval
		set_transient('uae_email_validation_' . md5($email), $status, 5 * MINUTE_IN_SECONDS);

		return new WP_REST_Response([
			'message' => 'Validation received',
			'status' => $status,
		], 200);
	}

	/**
	 * Handle Email Validation Response.
	 */
	public function handle_email_validation_response( WP_REST_Request $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), [ 'status' => 403 ] );
		}
		
		$params = $request->get_json_params();
		$email  = isset($params['email']) ? sanitize_email($params['email']) : '';
	
		if (empty($email)) {
			return new WP_REST_Response([ 'status' => 'error', 'message' => 'Invalid email address' ], 400);
		}
	
		$status = $this->check_email_validation_status($email);
	
		return new WP_REST_Response([ 'status' => $status ], 200);
	}

	/**
	 * Check Email Validation Status.
	 */
	private function check_email_validation_status($email) {
		$hash = md5($email);
		$status = get_transient('uae_email_validation_' . $hash);
		
		return $status ? $status : 'pending'; // Return 'pending' instead of waiting.
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
