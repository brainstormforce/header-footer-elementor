<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use HFE\WidgetsManager\Base\HFE_Helper;

/**
 * Class Settings_Api.
 */
class Settings_Api {

    /**
     * Instance.
     *
     * @access private
     * @var object Class object.
     * @since 1.0.0
     */
    private static $instance;

    /**
     * Get the singleton instance of the class.
     *
     * @return Settings_Api
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
     * @since 1.0.0
     * @return void
     */
    private function __construct() {
        // Log an error message to check if the file is loading
        error_log( 'Settings_Api class constructor called' );

        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

    /**
     * Register REST API routes.
     *
     * @since 1.0.0
     * @return void
     */
    public function register_routes() {

        $routes = array(
            '/widgets' => 'get_hfe_widgets',
            '/settings' => array('GET' => 'get_hfe_settings', 'POST' => 'save_hfe_settings'),
            '/plugins' => 'get_plugins_list',
        );

        foreach ( $routes as $route => $callback ) {
            if ( is_array( $callback ) ) {
                foreach ( $callback as $method => $cb ) {
                    register_rest_route(
                        'hfe/v1',
                        $route,
                        array(
                            'methods'             => $method,
                            'callback'            => array( $this, $cb ),
                            'permission_callback' => array( $this, 'get_items_permissions_check' ),
                        )
                    );
                }
            } else {
                register_rest_route(
                    'hfe/v1',
                    $route,
                    array(
                        'methods'             => 'GET',
                        'callback'            => array( $this, $callback ),
                        'permission_callback' => array( $this, 'get_items_permissions_check' ),
                    )
                );
            }
        }
    }

    /**
     * Callback function to return plugins list.
     *
     * @return WP_REST_Response
     */
    public function get_plugins_list( $request ) {

        $nonce = $request->get_header( 'X-WP-Nonce' );

        if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
            return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'uael' ), array( 'status' => 403 ) );
        }

        // Fetch branding settings
        $plugins_list = HFE_Helper::get_bsf_plugins_list();

        if ( ! is_array( $plugins_list ) ) {
            return new WP_REST_Response( array( 'message' => __( 'Plugins list not found', 'uael' ) ), 404 );
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
            return new WP_Error( 'invalid_nonce', __( 'Invalid nonce', 'uael' ), array( 'status' => 403 ) );
        }

        // Fetch widgets settings
        $widgets_list = HFE_Helper::get_bsf_widgets();

        if ( ! is_array( $widgets_list ) ) {
            return new WP_REST_Response( array( 'message' => __( 'Widgets list not found', 'uael' ) ), 404 );
        }

        return new WP_REST_Response( $widgets_list, 200 );
        
    }

}

// Initialize the Settings_Api class
Settings_Api::get_instance();
