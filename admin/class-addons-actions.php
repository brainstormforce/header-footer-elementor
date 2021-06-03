<?php
/**
 * Plugin AJAX functions.
 *
 * @package  header-footer-elementor
 */

/**
 * Open modal popup.
 *
 * @since x.x.x
 */
function hfe_admin_modal() {

	// Run a security check.
	check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

	update_user_meta( get_current_user_id(), 'hfe-popup', 'dismissed' );
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

	$arguments = isset( $_POST['data'] ) ? array_map( 'sanitize_text_field', json_decode( stripslashes( $_POST['data'] ), true ) ) : [];

	$url = add_query_arg( $arguments, $api_domain . 'wp-json/starter-templates/v1/subscribe/' ); // add URL of your site or mail API.

	$response = wp_remote_post( $url, [ 'timeout' => 60 ] );

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
	return apply_filters( 'hfe_api_domain', 'https://mitras11.sg-host.com/' );
}

/**
 * Activate addon.
 *
 * @since x.x.x
 */
function hfe_activate_addon() {

	// Run a security check.
	check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

	if ( isset( $_POST['plugin'] ) ) {

		$type = '';
		if ( ! empty( $_POST['type'] ) ) {
			$type = sanitize_key( $_POST['type'] );
		}

		$plugin   = sanitize_text_field( wp_unslash( $_POST['plugin'] ) );

		if ( 'plugin' === $type ) {

			// Check for permissions.
			if ( ! current_user_can( 'activate_plugins' ) ) {
				wp_send_json_error( esc_html__( 'Plugin activation is disabled for you on this site.', 'header-footer-elementor' ) );
			}
			
			$activate = activate_plugins( $plugin );
			
			if ( ! is_wp_error( $activate ) ) {

				do_action( 'hfe_plugin_activated', $plugin );

				wp_send_json_success( esc_html__( 'Plugin activated.', 'header-footer-elementor' ) );
			}
		}

		if ( 'theme' === $type ) {

			// Check for permissions.
			if( ! ( current_user_can( 'switch_themes' ) ) ) {
				wp_send_json_error( esc_html__( 'Theme activation is disabled for you on this site.', 'header-footer-elementor' ) );
			}
			$activate = switch_theme( $plugin );
			
			if ( ! is_wp_error( $activate ) ) {

				do_action( 'hfe_theme_activated', $plugin );

				wp_send_json_success( esc_html__( 'Theme activated.', 'header-footer-elementor' ) );
			}
		}
	}

	if ( 'plugin' === $type ) {
		wp_send_json_error( esc_html__( 'Could not activate plugin. Please activate from the Plugins page.', 'header-footer-elementor' ) );
	} else if ( 'theme' === $type ) {
		wp_send_json_error( esc_html__( 'Could not activate theme. Please activate from the Themes page.', 'header-footer-elementor' ) );
	}
}
add_action( 'wp_ajax_hfe_activate_addon', 'hfe_activate_addon' );

/**
 * Install addon.
 *
 * @since x.x.x
 */
function hfe_install_addon() {

	// Run a security check.
	check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

	$generic_error = esc_html__( 'There was an error while performing your request.', 'header-footer-elementor' );

	$type = '';
	if ( ! empty( $_POST['type'] ) ) {
		$type = sanitize_key( wp_unslash( $_POST['type'] ) );
	}

	$plugin_name = $_POST['plugin'];

	// Check if new installations are allowed.
	if ( ! hfe_can_install( $type ) ) {
		wp_send_json_error( $generic_error );
	}

	$error = esc_html__( 'Could not install. Please download from wordpress.org and install manually.', 'header-footer-elementor' );

	if ( empty( $_POST['plugin'] ) ) {
		wp_send_json_error( $error );
	}

	// Set the current screen to avoid undefined notices.
	set_current_screen( 'appearance_page_hfe-about' );

	// Prepare variables.
	$url = esc_url_raw(
		add_query_arg(
			array(
				'page' => 'hfe-about',
			),
			admin_url( 'admin.php' )
		)
	);

	require_once ABSPATH . 'wp-admin/includes/file.php';
	$creds = request_filesystem_credentials( $url, '', false, false, null );

	// Check for file system permissions.
	if ( false === $creds ) {
		wp_send_json_error( $error );
	}

	if ( ! WP_Filesystem( $creds ) ) {
		wp_send_json_error( $error );
	}

	require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

	require_once HFE_DIR . 'admin/class-skin-install.php';

	if( 'theme' === $type ) {

		$slug = 'astra';

		$status = array(
			'install' => 'theme',
			'slug'    => $slug,
		);

		include_once ABSPATH . 'wp-admin/includes/theme.php';

		$api = themes_api(
			'theme_information',
			array(
				'slug'   => $slug,
				'fields' => array( 'sections' => false ),
			)
		);

		if ( is_wp_error( $api ) ) {
			$status['errorMessage'] = $api->get_error_message();
			wp_send_json_error( $status );
		}
		
		$installer = new Theme_Upgrader( new HFE_Skin_Install() );

		// Error check.
		if ( ! method_exists( $installer, 'install' ) ) {
			wp_send_json_error( $error );
		}

		$installer->install( $plugin_name );

		// Flush the cache and return the newly installed plugin basename.
		wp_cache_flush();

		$theme_basename = wp_get_theme( $slug )->get( 'Name' );

		if ( empty( $theme_basename ) ) {
			wp_send_json_error( $error );
		}

		$result = array(
			'msg'          => $generic_error,
			'is_activated' => false,
			'basename'     => $theme_basename,
		);

		// Check for permissions.
		if ( ! current_user_can( 'switch_themes' ) ) {
			$result['msg'] = esc_html__( 'Theme installed.', 'header-footer-elementor' );
			wp_send_json_success( $result );
		}
		// Activate the theme silently.
		$activated = switch_theme( $plugin_basename );

		if ( ! is_wp_error( $activated ) ) {
			$result['is_activated'] = true;
			$result['msg']          = esc_html__( 'Theme installed & activated.', 'header-footer-elementor' );
			wp_send_json_success( $result );
		}

	}

	if( 'plugin' === $type ) {

		if ( ! function_exists( 'get_plugin_data' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		// Do not allow WordPress to search/download translations, as this will break JS output.
		remove_action( 'upgrader_process_complete', array( 'Language_Pack_Upgrader', 'async_upgrade' ), 20 );

		// Create the plugin upgrader with our custom skin.
		$installer = new Plugin_Upgrader( new HFE_Skin_Install() );

		// Error check.
		if ( ! method_exists( $installer, 'install' ) ) {
			wp_send_json_error( $error );
		}

		$installer->install( $plugin_name ); // phpcs:ignore

		// Flush the cache and return the newly installed plugin basename.
		wp_cache_flush();

		$plugin_basename = $installer->plugin_info();

		if ( empty( $plugin_basename ) ) {
			wp_send_json_error( $error );
		}

		$result = array(
			'msg'          => $generic_error,
			'is_activated' => false,
			'basename'     => $plugin_basename,
		);

		// Check for permissions
		if ( ! current_user_can( 'activate_plugins' ) ) {
			$result['msg'] = esc_html__( 'Plugin installed.', 'header-footer-elementor' );
			wp_send_json_success( $result );
		}
		// Activate the plugin silently.
		$activated = activate_plugin( $plugin_basename );

		if ( ! is_wp_error( $activated ) ) {
			$result['is_activated'] = true;
			$result['msg']          = esc_html__( 'Plugin installed & activated.', 'header-footer-elementor' );
			wp_send_json_success( $result );
		}

	}

	// Fallback error just in case.
	wp_send_json_error( $result );
}
add_action( 'wp_ajax_hfe_install_addon', 'hfe_install_addon' );

/**
 * Determine if the plugin/addon installations are allowed.
 *
 * @since x.x.x
 *
 * @return bool
 */
function hfe_can_install( $type ) {

	if ( ! in_array( $type, [ 'plugin', 'theme' ], true ) ) {
		return false;
	}

	// // Determine whether file modifications are allowed.
	if ( ! wp_is_file_mod_allowed( 'hfe_can_install' ) ) {
		return false;
	}

	if( 'theme' === $type ) {
		if ( ! current_user_can( 'install_themes' ) ) {
			return false;
		}	

		return true;

	} elseif ( 'plugin' === $type ) {
		if ( ! current_user_can( 'install_plugins' ) ) {
			return false;
		}

		return true;
	}

	return false;
}



