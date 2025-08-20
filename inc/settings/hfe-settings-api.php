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
			'/user-roles-options', 
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'hfe_get_user_role_settings'],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);

		register_rest_route(
			'hfe/v1', 
			'/user-roles', 
			[
				'methods'             => 'GET',
				'callback'            => [ $this,'get_user_roles_data'],
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
			'/user-roles',
			[
				'methods' => 'POST',
				'callback' => [ $this,'save_user_roles_data'],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
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
			'/enable-for-canvas-template', 
			[
				'methods'             => 'GET',
				'callback'            => [ $this,'get_enable_for_canvas_template_data'],
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
			'/enable-for-canvas-template',
			[
				'methods' => 'POST',
				'callback' => [ $this,'save_enable_for_canvas_template_data'],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
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

		register_rest_route( 
			'hfe/v1',
			'/recommended-plugins',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_recommended_plugins_list' ],
				'permission_callback' => [ $this, 'get_items_permissions_check' ],
			]
		);

		register_rest_route( 
			'hfe/v1', 
			'/update-post-status', 
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'uae_update_post_status' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
				'args' => [
					'post_id' => [
						'required' => true,
						'type'     => 'integer',
					],
					'status' => [
						'required' => true,
						'type'     => 'string',
						'enum'     => [ 'publish', 'draft', 'private', 'pending' ],
					],
				],
			]
		);

		// GET endpoint to fetch single post data
		register_rest_route( 
			'hfe/v1', 
			'/get-post/(?P<id>\d+)', 
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'uae_get_single_post' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
				'args' => [
					'id' => [
						'required' => true,
						'type'     => 'integer',
					],
				],
			]
		);

		// POST endpoint to update post title
		register_rest_route( 
			'hfe/v1', 
			'/update-post-title', 
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'uae_update_post_title' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
				'args' => [
					'post_id' => [
						'required' => true,
						'type'     => 'integer',
					],
					'post_title' => [
						'required' => true,
						'type'     => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					],
				],
			]
		);

		register_rest_route( 
			'hfe/v1', 
			'/delete-post', 
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'uae_delete_post' ],
				'permission_callback' => function () {
					return current_user_can( 'delete_posts' );
				},
				'args' => [
					'post_id' => [
						'required' => true,
						'type'     => 'integer',
					],
				],
			]
		);
	}

	public function get_enable_for_canvas_template_data( $request ) {
		$post_id = isset( $request['post_id'] ) ? intval( $request['post_id'] ) : 0;
		$display = get_post_meta( $post_id, 'display-on-canvas-template', true );
	
		return [
			'display' => ( $display === '1' ) ? 1 : 0, // Cast to integer
		];
	}

	/**
	 * Save enable for canvas template data for a specific post.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return array
	 */
	public function save_enable_for_canvas_template_data( $request ) {
		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		$params = $request->get_params();
		
		// Get and validate parameters
		$post_id = isset( $params['post_id'] ) ? intval( $params['post_id'] ) : 0;
		$display = isset( $params['display'] ) ? $params['display'] : 0;
		
		// Validate post exists and is correct type
		$post = get_post( $post_id );
		if ( ! $post || $post->post_type !== 'elementor-hf' ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid post ID or post type.', 'header-footer-elementor' ),
			], 400 );
		}
		
		// Sanitize and validate display value (should be 0 or 1)
		$display_value = intval( $display );
		$display_value = ( $display_value === 1 ) ? '1' : '0';
		
		if( $display_value === '1'){
			update_post_meta( $post_id, 'display-on-canvas-template', $display_value );
		}
		else{
			// Update post meta
			delete_post_meta( $post_id, 'display-on-canvas-template' );
		}
		
		
		return [
			'success' => true,
			'message' => __( 'Canvas template setting updated successfully.', 'header-footer-elementor' ),
			'display' => intval( $display_value ), // Return as integer for consistency
		];
	}
	

	public function get_target_rules_data( $request ) {

		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}
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
		];
	}

	public function save_target_rules_data($request) {
		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		$params = $request->get_params();
		// Save the target rules data
		$post_id = isset($params['post_id']) ? intval($params['post_id']) : 0;
		$include_locations = isset($params['include_locations']) ? $params['include_locations'] : [];
		$exclude_locations = isset($params['exclude_locations']) ? $params['exclude_locations'] : [];
		$user_roles = isset($params['user_roles']) ? $params['user_roles'] : [];
		
		update_post_meta($post_id, 'ehf_target_include_locations', $include_locations);
		update_post_meta($post_id, 'ehf_target_exclude_locations', $exclude_locations);
		
		return ['success' => true];
		
	}

	public function uae_create_elementor_hf_layout( $request ) {
		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		$title = sanitize_text_field( $request->get_param( 'title' ) );
		$type = sanitize_text_field( $request->get_param( 'type' ) );
		if($type !== 'custom'){
			$type = 'type_'.strtolower($type);
		}else{
			$type = strtolower($type);
		}

		$post_id = wp_insert_post( [
			'post_title'  => $title,
			'post_type'   => 'elementor-hf',
			'post_status' => 'draft',
		] );
		
		if ( is_wp_error( $post_id ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => 'Failed to create post.',
			], 500 );
		}

		// Create updated title with post ID
		$updated_title = $title . ' #' . $post_id;
		
		// Temporarily disable revisions only for this specific update
		add_filter( 'wp_revisions_to_keep', '__return_zero', 999 );
		
		// Update the post title without creating revisions
		wp_update_post( [
			'ID'         => $post_id,
			'post_title' => $updated_title,
		] );
		
		// Re-enable revisions immediately after the update
		remove_filter( 'wp_revisions_to_keep', '__return_zero', 999 );

		update_post_meta($post_id, 'ehf_template_type', $type);
		
		// Generate edit URL
		$edit_url = admin_url( 'post.php?post=' . $post_id . '&action=elementor' );

		return new WP_REST_Response( [
			'success' => true,
			'post_id' => $post_id,
			'edit_url' => $edit_url,
			'post'    => [
				'id' => $post_id,
				'title'=> $updated_title,
				'post_status' => 'draft',
			],
		], 200 );
	}

	public function uae_get_elementor_hf_post( $request ) {
		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		$type = sanitize_text_field( $request->get_param( 'type' ) );
	
		$args = [
			'post_type'      => 'elementor-hf',
			'posts_per_page' => -1,
			'post_status'    => [ 'publish', 'pending', 'draft' ],
		];
	
		// Only add meta_query if type is provided
		if ( ! empty( $type ) ) {
			if ( strtolower( $type ) === 'custom' ) {
				$type = 'custom';
			} else {
				$type = 'type_' . strtolower( $type );
			}
	
			$args['meta_query'] = [
				[
					'key'   => 'ehf_template_type',
					'value' => $type,
				],
			];
		}
	
		$query = new WP_Query( $args );
		$posts = [];
	
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$post_id = get_the_ID();
				
				// Get the raw title and decode HTML entities to preserve apostrophes
				$raw_title = get_the_title();
				$decoded_title = html_entity_decode( $raw_title, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
				
				$posts[] = [
					'id'    => $post_id,
					'title' => $decoded_title,
					'post_title' => $decoded_title, // Add both for compatibility
					'template_type' => get_post_meta($post_id, 'ehf_template_type', true),
					'post_status' => get_post_status(),
				];
			}
			wp_reset_postdata();
		}
	
		return new WP_REST_Response( [
			'success' => true,
			'posts'   => $posts,
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

	/**
	 * Get user role options for display conditions.
	 *
	 * @return array
	 */
	public function hfe_get_user_role_settings() {

		$selection_options = array(
			'basic'    => array(
				'label' => __( 'Basic', 'header-footer-elementor' ),
				'value' => array(
					'all'        => __( 'All', 'header-footer-elementor' ),
					'logged-in'  => __( 'Logged In', 'header-footer-elementor' ),
					'logged-out' => __( 'Logged Out', 'header-footer-elementor' ),
				),
			),
		
			'advanced' => array(
				'label' => __( 'Advanced', 'header-footer-elementor' ),
				'value' => array(),
			),
		);
		
		/* Load the required file if the function is not defined */
		if ( ! function_exists( 'get_editable_roles' ) ) {
			require_once ABSPATH . 'wp-admin/includes/user.php';
		}
		
		/* Call the global function explicitly */
		$roles = \get_editable_roles();
		
		foreach ( $roles as $slug => $data ) {
			$selection_options['advanced']['value'][ $slug ] = $data['name'];
		}
		
		return [
			'userroleOptions' => $selection_options,
		];		
	}

	/**
	 * Get user roles data for a specific post.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return array
	 */
	public function get_user_roles_data( $request ) {
		$post_id = isset( $request['post_id'] ) ? intval( $request['post_id'] ) : 0;
		
		// Get saved user roles from post meta
		$user_roles = get_post_meta( $post_id, 'ehf_target_user_roles', true );
		
		// Ensure it's an array
		if ( ! is_array( $user_roles ) ) {
			$user_roles = [];
		}
		
		return [
			'userRoles'      => $user_roles,
		];
	}

	/**
	 * Save user roles data for a specific post.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return array
	 */
	public function save_user_roles_data( $request ) {
		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		$params = $request->get_params();
		
		// Get and validate parameters
		$post_id = isset( $params['post_id'] ) ? intval( $params['post_id'] ) : 0;
		$user_roles = isset( $params['user_roles'] ) ? $params['user_roles'] : [];
		
		// Validate post exists and is correct type
		$post = get_post( $post_id );
		if ( ! $post || $post->post_type !== 'elementor-hf' ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid post ID or post type.', 'header-footer-elementor' ),
			], 400 );
		}
		
		// Ensure user_roles is an array
		if ( ! is_array( $user_roles ) ) {
			$user_roles = [];
		}
		
		// Sanitize user roles
		$sanitized_roles = [];
		
		foreach ( $user_roles as $role ) {
			$sanitized_role = sanitize_text_field( $role );
			$sanitized_roles[] = $sanitized_role;
		}
		// Update post meta
		update_post_meta( $post_id, 'ehf_target_user_roles', $sanitized_roles );
		
		return [
			'success' => true,
			'message' => __( 'User roles updated successfully.', 'header-footer-elementor' ),
		];
	}

	

	/**
	 * Update post status callback.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function uae_update_post_status( $request ) {
		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		$post_id = intval( $request->get_param( 'post_id' ) );
		$status  = sanitize_text_field( $request->get_param( 'status' ) );

		// Verify post exists and is the right type
		$post = get_post( $post_id );
		if ( ! $post || $post->post_type !== 'elementor-hf' ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid post ID or post type.', 'header-footer-elementor' ),
			], 400 );
		}

		// Update post status
		$result = wp_update_post( [
			'ID'          => $post_id,
			'post_status' => $status,
		] );

		if ( is_wp_error( $result ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Failed to update post status.', 'header-footer-elementor' ),
			], 500 );
		}

		return new WP_REST_Response( [
			'success' => true,
			'message' => sprintf( __( 'Post status updated to %s successfully.', 'header-footer-elementor' ), $status ),
		], 200 );
	}

	/**
	 * Get single post data callback.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 * @return WP_REST_Response
	 */
	public function uae_get_single_post( $request ) {
		$post_id = intval( $request->get_param( 'id' ) );

		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		// Verify post exists and is the right type
		$post = get_post( $post_id );
		if ( ! $post || $post->post_type !== 'elementor-hf' ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid post ID or post type.', 'header-footer-elementor' ),
			], 400 );
		}

		// Check if user can edit this specific post
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'You do not have permission to edit this post.', 'header-footer-elementor' ),
			], 403 );
		}

		// Get post meta data
		$template_type = get_post_meta( $post_id, 'ehf_template_type', true );
		$target_include = get_post_meta( $post_id, 'ehf_target_include_locations', true );
		$target_exclude = get_post_meta( $post_id, 'ehf_target_exclude_locations', true );

		// Prepare response data with properly decoded titles
		$decoded_title = html_entity_decode( $post->post_title, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
		
		$post_data = [
			'id'                => $post->ID,
			'post_title'        => $decoded_title,
			'title'             => $decoded_title, // Add both for compatibility
			'post_status'       => sanitize_key( $post->post_status ),
			'template_type'     => sanitize_text_field( $template_type ),
			'target_include'    => is_array( $target_include ) ? array_map( 'sanitize_text_field', $target_include ) : sanitize_text_field( $target_include ),
			'target_exclude'    => is_array( $target_exclude ) ? array_map( 'sanitize_text_field', $target_exclude ) : sanitize_text_field( $target_exclude ),
			'post_date'         => sanitize_text_field( $post->post_date ),
			'post_modified'     => sanitize_text_field( $post->post_modified ),
		];

		return new WP_REST_Response( [
			'success' => true,
			'message' => __( 'Post data retrieved successfully.', 'header-footer-elementor' ),
			'data'    => $post_data,
		], 200 );
	}

	/**
	 * Update post title callback.
	 *
	 * @param WP_REST_Request $request The REST request object.
	 * @return WP_REST_Response
	 */
	public function uae_update_post_title( $request ) {
		$post_id    = intval( $request->get_param( 'post_id' ) );
		$post_title = $request->get_param( 'post_title' );

		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		// Verify post exists and is the right type
		$post = get_post( $post_id );
		if ( ! $post || $post->post_type !== 'elementor-hf' ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid post ID or post type.', 'header-footer-elementor' ),
			], 400 );
		}

		// Check if user can edit this specific post
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'You do not have permission to edit this post.', 'header-footer-elementor' ),
			], 403 );
		}

		// Sanitize title properly - preserve apostrophes but remove HTML tags
		$post_title = wp_strip_all_tags( $post_title ); // Remove HTML tags
		$post_title = trim( $post_title ); // Trim whitespace
		
		// Use wp_unslash to handle slashes properly, then sanitize without converting quotes
		$post_title = wp_unslash( $post_title );
		$post_title = sanitize_text_field( $post_title );
		
		// Convert HTML entities back to normal characters (including apostrophes)
		$post_title = html_entity_decode( $post_title, ENT_QUOTES | ENT_HTML5, 'UTF-8' );

		// Validate post title
		if ( empty( $post_title ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Post title cannot be empty.', 'header-footer-elementor' ),
			], 400 );
		}

		// Additional validation: Check title length
		if ( strlen( $post_title ) > 255 ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Post title is too long. Maximum 255 characters allowed.', 'header-footer-elementor' ),
			], 400 );
		}

		// Rate limiting check (prevent spam)
		$transient_key = 'hfe_rename_limit_' . get_current_user_id();
		$recent_renames = get_transient( $transient_key );
		if ( $recent_renames && $recent_renames >= 10 ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Too many rename attempts. Please wait a moment before trying again.', 'header-footer-elementor' ),
			], 429 );
		}

		// Update post title
		$result = wp_update_post( [
			'ID'         => $post_id,
			'post_title' => $post_title,
		] );

		if ( is_wp_error( $result ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Failed to update post title.', 'header-footer-elementor' ),
			], 500 );
		}

		// Set rate limiting transient
		$current_count = $recent_renames ? $recent_renames + 1 : 1;
		set_transient( $transient_key, $current_count, 60 ); // 1 minute

		// Log the action for security auditing
		if ( function_exists( 'wp_log' ) ) {
			wp_log( sprintf( 
				'User %d renamed post %d from "%s" to "%s"', 
				get_current_user_id(), 
				$post_id, 
				$post->post_title, 
				$post_title 
			) );
		}

		return new WP_REST_Response( [
			'success' => true,
			'message' => __( 'Post title updated successfully.', 'header-footer-elementor' ),
			'data'    => [
				'post_id'    => $post_id,
				'post_title' => $post_title, // Return the properly sanitized title without additional escaping
				'title'      => $post_title, // Add both for compatibility
			],
		], 200 );
	}

	/**
	 * Delete post callback (move to trash).
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function uae_delete_post( $request ) {
		// Verify nonce for additional security
		if ( ! wp_verify_nonce( $request->get_header( 'X-WP-Nonce' ), 'wp_rest' ) ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid nonce.', 'header-footer-elementor' ),
			], 403 );
		}

		$post_id = intval( $request->get_param( 'post_id' ) );

		// Verify post exists and is the right type
		$post = get_post( $post_id );
		if ( ! $post || $post->post_type !== 'elementor-hf' ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Invalid post ID or post type.', 'header-footer-elementor' ),
			], 400 );
		}

		// Move post to trash
		$result = wp_trash_post( $post_id );

		if ( ! $result ) {
			return new WP_REST_Response( [
				'success' => false,
				'message' => __( 'Failed to delete post.', 'header-footer-elementor' ),
			], 500 );
		}

		return new WP_REST_Response( [
			'success' => true,
			'message' => __( 'Post moved to trash successfully.', 'header-footer-elementor' ),
		], 200 );
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
	 * Callback function to return recommended plugins list.
	 * 
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response
	 */
	public function get_recommended_plugins_list( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), [ 'status' => 403 ] );
		}

		// Fetch recommended plugins list.
		$recommended_plugins_list = HFE_Helper::get_recommended_bsf_plugins_list();

		if ( ! is_array( $recommended_plugins_list ) ) {
			return new WP_REST_Response( [ 'message' => __( 'Recommended plugins list not found', 'header-footer-elementor' ) ], 404 );
		}

		return new WP_REST_Response( $recommended_plugins_list, 200 );
		
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
		$isActive = sanitize_text_field( $request->get_param( 'isActive' ) );
		$domain = sanitize_text_field( $request->get_param( 'domain' ) );
		
		$api_domain = trailingslashit( $this->get_api_domain() );
		$api_domain_url = $api_domain . 'wp-json/uaelite/v1/subscribe/';
		$validation_url = esc_url_raw( get_site_url() . '/wp-json/hfe/v1/email-response/' );

		// Append session_id to track requests.
		$body = array(
			'email'          => $email,
			'date'           => $date,
			'fname'          => $fname,
			'lname'          => $lname,
			'isActive'       => $isActive,
			'domain'         => $domain
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
