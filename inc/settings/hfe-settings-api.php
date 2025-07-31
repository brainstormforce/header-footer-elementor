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

use HFE\Lib\Astra_Target_Rules_Fields;
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

		register_rest_route(
			'hfe/v1', 
			'/target-rules', 
			[
				'methods'             => 'GET',
				'callback'            => [ $this,'get_target_rules_data'],
				'args'     => [
					'post_id' => [
						'required' => true,
						'type'     => 'integer',
					],
				],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);
		
		register_rest_route(
			'hfe/v1', 
			'/target-rules',
			[
				'methods' => 'POST',
				'callback' => [ $this,'save_target_rules_data'],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);

		register_rest_route( 
			'hfe/v1', 
			'/target-rules-options', 
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'hfe_get_target_rule_settings'],
				'permission_callback' => [ $this, 'get_items_permissions_check' ], // secure as needed
			]
		);

		register_rest_route( 
			'hfe/v1', 
			'/create-layout', 
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'uae_create_elementor_hf_layout' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
				'args' => [
					'title' => [
						'required' => false,
						'type'     => 'string',
						'default'  => 'New Header/Footer Layout',
					],
				],
			]
		);
		register_rest_route( 
			'hfe/v1', 
			'/get-post', 
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'uae_get_elementor_hf_post' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
				'args' => [
					'type' => [
						'required' => true,
						'type'     => 'string',
						'default'  => '',
					],
				],
			]
		);
		
	}

	public function uae_create_elementor_hf_layout( $request ) {
		$title = sanitize_text_field( $request->get_param( 'title' ) );
		$type = sanitize_text_field( $request->get_param( 'type' ) );
		$type = 'type_'.strtolower($type);
		$post_id = wp_insert_post( [
			'post_title'  => $title,
			'post_type'   => 'elementor-hf',
			'post_status' => 'draft',
		] );
		update_post_meta($post_id, 'ehf_template_type', $type);
	
		if ( is_wp_error( $post_id ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => 'Failed to create post.',
			], 500 );
		}
	
		return new WP_REST_Response( [
			'success' => true,
			'post_id' => $post_id,
		], 200 );
	}

	public function uae_get_elementor_hf_post( $request ) {
			$type = sanitize_text_field( $request->get_param( 'type' ) );
			$type = 'type_'.strtolower($type);
			$args = [
				'post_type'      => 'elementor-hf',
				'posts_per_page' => -1,
				'post_status' => array('publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit'),    
				'meta_query'     => [
					[
						'key'   => 'ehf_template_type',
						'value' => $type,
					],
				],
			];
			$query = new WP_Query( $args );
			$posts = [];
			if ( $query->have_posts() ) {
				while ( $query->have_posts() ) {
					$query->the_post();
					$posts[] = [
						'id'    => get_the_ID(),
						'title' => get_the_title(),
					];
				}
				wp_reset_postdata();
			}
			return new WP_REST_Response( [
				'success' => true,
				'posts' => $posts,
			], 200 );
	}

	public function hfe_get_target_rule_settings() {

		    // Get an instance of the Astra_Target_Rules_Fields class
			$target_rules = Astra_Target_Rules_Fields::get_instance();
    
			// Call the get_location_selections() method to get the location options
			$location_selections = $target_rules->get_location_selections();
			
			return [
				'locationOptions' => $location_selections,
				'addRuleLabel'     => __( 'Add Rule', 'header-footer-elementor' ),
				'excludeRuleLabel' => __( 'Add Exclusion Rule', 'header-footer-elementor' ),
			];
	}

	// public function get_target_rules_data() {
	// 	// Return all the location options, user roles, etc.
	// 	$target_rules = Astra_Target_Rules_Fields::get_instance();
		
	// 	return [
	// 		'locations' => $target_rules->get_location_selections(),
	// 		'userRoles' => $target_rules->get_user_selections(),
	// 		// Add any other data you need
	// 	];
	// }

	public function get_target_rules_data( $request ) {
		$post_id = isset( $request['post_id'] ) ? intval( $request['post_id'] ) : 0;
		
		$include_locations = get_post_meta( $post_id, 'ehf_target_include_locations', true );
		$exclude_locations = get_post_meta( $post_id, 'ehf_target_exclude_locations', true );
		$user_roles        = get_post_meta( $post_id, 'ehf_target_user_roles', true );
		$conditions = [];
	
		// Parse include rules
		if ( isset( $include_locations['rule'] ) && is_array( $include_locations['rule'] ) ) {
			foreach ( $include_locations['rule'] as $rule ) {
				$conditions[] = [
					'conditionType' => [
						'id'   => 'include',
						'name' => __( 'Include', 'header-footer-elementor' ),
					],
					'displayLocation' => [
						'id'   => $rule,
						'name' => ucwords( str_replace( '-', ' ', $rule ) ), // or fetch from options array
					],
				];
			}
		}
	
		// Parse exclude rules
		if ( isset( $exclude_locations['rule'] ) && is_array( $exclude_locations['rule'] ) ) {
			foreach ( $exclude_locations['rule'] as $rule ) {
				$conditions[] = [
					'conditionType' => [
						'id'   => 'exclude',
						'name' => __( 'Exclude', 'header-footer-elementor' ),
					],
					'displayLocation' => [
						'id'   => $rule,
						'name' => ucwords( str_replace( '-', ' ', $rule ) ),
					],
				];
			}
		}
		// You can also parse user roles similarly if needed
		
		return [
			'conditions' => $conditions,
			'locations'  => Astra_Target_Rules_Fields::get_instance()->get_location_selections(),
			// 'userRoles'  => Astra_Target_Rules_Fields::get_instance()->get_user_selections(),
		];
	}
	
	
	public function save_target_rules_data($request) {
		$params = $request->get_params();
		// Save the target rules data
		$post_id = isset($params['post_id']) ? intval($params['post_id']) : 0;
		$include_locations = isset($params['include_locations']) ? $params['include_locations'] : [];
		$exclude_locations = isset($params['exclude_locations']) ? $params['exclude_locations'] : [];
		$user_roles = isset($params['user_roles']) ? $params['user_roles'] : [];
		
		update_post_meta($post_id, 'ehf_target_include_locations', $include_locations);
		update_post_meta($post_id, 'ehf_target_exclude_locations', $exclude_locations);
		update_post_meta($post_id, 'ehf_target_user_roles', $user_roles);
		
		return ['success' => true];
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
