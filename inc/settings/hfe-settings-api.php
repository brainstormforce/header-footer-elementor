<?php
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

        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
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
            array(
                'methods'             => 'GET',
                'callback'            => array( $this, 'get_hfe_widgets' ),
                'permission_callback' => array( $this, 'get_items_permissions_check' ),
            )
        );

        register_rest_route(
            'hfe/v1',
            '/plugins',
            array(
                'methods'             => 'GET',
                'callback'            => array( $this, 'get_plugins_list' ),
                'permission_callback' => array( $this, 'get_items_permissions_check' ),
            )
        );

        register_rest_route(
            'hfe/v1',
            '/templates',
            array(
                'methods'             => 'GET',
                'callback'            => array( $this, 'get_templates_status' ),
                'permission_callback' => array( $this, 'get_items_permissions_check' ),
            )
        );
    }

    /**
	 * Check whether a given request has permission to read notes.
	 *
	 * @param  WP_REST_Request $request Full details about the request.
	 * @return WP_Error|boolean
	 */
	public function get_items_permissions_check() {

		if ( ! current_user_can( 'manage_options' ) ) {
            return new \WP_Error( 'uae_rest_not_allowed', __( 'Sorry, you are not authorized to perform this action.', 'header-footer-elementor' ), array( 'status' => 403 ) );
        }

		return true;
	}

    /**
	 * Get Starter Templates Status.
	 */
	public function get_templates_status( WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), array( 'status' => 403 ) );
		}

		$templates_status = HFE_Helper::starter_templates_status();

		$response_data = array(
			'templates_status' => $templates_status,
		);
	
		if ( 'Activated' === $templates_status ) {
			$response_data['redirect_url'] = HFE_Helper::starter_templates_link();
		}

		return new WP_REST_Response( $response_data, 200 );
	}

    /**
     * Callback function to return plugins list.
     *
     * @return WP_REST_Response
     */
    public function get_plugins_list( $request ) {

        $nonce = $request->get_header( 'X-WP-Nonce' );

        if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
            return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), array( 'status' => 403 ) );
        }

        // Fetch branding settings
        $plugins_list = HFE_Helper::get_bsf_plugins_list();

        if ( ! is_array( $plugins_list ) ) {
            return new WP_REST_Response( array( 'message' => __( 'Plugins list not found', 'header-footer-elementor' ) ), 404 );
        }

        return new WP_REST_Response( $plugins_list, 200 );
        
    }

    /**
     * Callback function to return widgets list.
     *
     * @return WP_REST_Response
     */
    public function get_hfe_widgets( $request ) {

        $nonce = $request->get_header( 'X-WP-Nonce' );

        if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
            return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'header-footer-elementor' ), array( 'status' => 403 ) );
        }

        // Fetch widgets settings
        $widgets_list = HFE_Helper::get_all_widgets_list();

        if ( ! is_array( $widgets_list ) ) {
            return new WP_REST_Response( array( 'message' => __( 'Widgets list not found', 'header-footer-elementor' ) ), 404 );
        }

        return new WP_REST_Response( $widgets_list, 200 );
        
    }
    

}

// Initialize the HFE_Settings_Api class
HFE_Settings_Api::get_instance();
