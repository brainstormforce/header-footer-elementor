<?php 
/**
 * Open modal popup.
 *
 * @since x.x.x
 */
function hfe_admin_modal() {

	// Run a security check.
	check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

	// update_user_meta( get_current_user_id(), 'hfe-popup', 'dismissed' );

}
add_action( 'wp_ajax_hfe_admin_modal', 'hfe_admin_modal' );

/**
 * Update Subscription
 */
function update_subscription() {

	check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error( 'You can\'t perform this action.' );
	}

	$api_domain = trailingslashit( get_api_domain() );

	$arguments = isset( $_POST['data'] ) ? array_map( 'sanitize_text_field', json_decode( stripslashes( $_POST['data'] ), true ) ) : array();

	$url = add_query_arg( $arguments, $api_domain . 'wp-json/starter-templates/v1/subscribe/' ); // add URL of your site or mail API.

	$response = wp_remote_post( $url );

	if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
		$response = json_decode( wp_remote_retrieve_body( $response ), true );

		// Successfully subscribed.
		if ( isset( $response['success'] ) && $response['success'] ) {
			update_user_meta( get_current_user_ID(), 'hfe-subscribed', 'yes' );
			wp_send_json_success( $response );
		}

	} else {
		wp_send_json_error( $response );
	}

}
add_action( 'wp_ajax_hfe-update-subscription', 'update_subscription' );

/**
 * Get the API URL.
 *
 * @since x.x.x
 */
function get_api_domain() {
	return apply_filters( 'hfe_api_domain', 'https://astra-sites-multisite.mydomain9.com/' );
}

?>