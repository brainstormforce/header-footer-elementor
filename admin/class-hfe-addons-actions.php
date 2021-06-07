<?php
/**
 * Plugin AJAX functions.
 *
 * @package  header-footer-elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'HFE_Addons_Actions' ) ) {

	/**
	 * Initialization
	 *
	 * @since x.x.x
	 */
	class HFE_Addons_Actions {

		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance;

		/**
		 *  Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 *  Constructor
		 */
		public function __construct() {
			add_action( 'wp_ajax_hfe_admin_modal', array( $this, 'hfe_admin_modal' ) );
			add_action( 'wp_ajax_hfe-update-subscription', array( $this, 'update_subscription' ) );
			add_action( 'wp_ajax_hfe_activate_addon', array( $this, 'hfe_activate_addon' ) );
			add_action( 'wp_ajax_hfe_install_addon', array( $this, 'hfe_install_addon' ) );
		}
		
		/**
		 * Open modal popup.
		 *
		 * @since x.x.x
		 */
		public function hfe_admin_modal() {

			// Run a security check.
			check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

			update_user_meta( get_current_user_id(), 'hfe-popup', 'dismissed' );
		}

		/**
		 * Update Subscription
		 */
		public function update_subscription() {

			check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( 'You can\'t perform this action.' );
			}

			$api_domain = trailingslashit( $this->get_api_domain() );

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

		/**
		 * Get the API URL.
		 *
		 * @since x.x.x
		 */
		public function get_api_domain() {
			return apply_filters( 'hfe_api_domain', 'https://mitras11.sg-host.com/' );
		}

		/**
		 * Activate addon.
		 *
		 * @since x.x.x
		 */
		public function hfe_activate_addon() {

			// Run a security check.
			check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

			if ( isset( $_POST['plugin'] ) ) {

				$type = '';
				if ( ! empty( $_POST['type'] ) ) {
					$type = sanitize_key( wp_unslash( $_POST['type'] ) );
				}

				$plugin = sanitize_text_field( $_POST['plugin'] );

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

					$slug = sanitize_key( wp_unslash( $_POST['slug'] ) );

					// Check for permissions.
					if ( ! ( current_user_can( 'switch_themes' ) ) ) {
						wp_send_json_error( esc_html__( 'Theme activation is disabled for you on this site.', 'header-footer-elementor' ) );
					}

					$activate = switch_theme( $slug );

					if ( ! is_wp_error( $activate ) ) {

						do_action( 'hfe_theme_activated', $plugin );

						wp_send_json_success( esc_html__( 'Theme activated.', 'header-footer-elementor' ) );
					}
				}
			}

			if ( 'plugin' === $type ) {
				wp_send_json_error( esc_html__( 'Could not activate plugin. Please activate from the Plugins page.', 'header-footer-elementor' ) );
			} elseif ( 'theme' === $type ) {
				wp_send_json_error( esc_html__( 'Could not activate theme. Please activate from the Themes page.', 'header-footer-elementor' ) );
			}
		}

		/**
		 * Install addon.
		 *
		 * @since x.x.x
		 */
		public function hfe_install_addon() {

			// Run a security check.
			check_ajax_referer( 'hfe-admin-nonce', 'nonce' );

			$default_error = esc_html__( 'Encountered an error while performing your request.', 'header-footer-elementor' );

			$type = '';
			if ( ! empty( $_POST['type'] ) ) {
				$type = sanitize_key( wp_unslash( $_POST['type'] ) );
			}

			// Check if new installations are allowed.
			if ( ! $this->hfe_can_install( $type ) ) {
				wp_send_json_error( $default_error );
			}

			$error = esc_html__( 'Could not install. Please download from wordpress.org and install manually.', 'header-footer-elementor' );

			if ( empty( $_POST['plugin'] ) ) {
				wp_send_json_error( $error );
			}

			$plugin = sanitize_text_field( $_POST['plugin'] );

			// To avoid undefined notices.
			set_current_screen( 'appearance_page_hfe-about' );

			$url = esc_url_raw(
				add_query_arg(
					[
						'page' => 'hfe-about',
					],
					admin_url( 'admin.php' )
				)
			);

			require_once ABSPATH . 'wp-admin/includes/file.php';
			$file_creds = request_filesystem_credentials( $url, '', false, false, null );

			// Check File permissions.
			if ( false === $file_creds || ( ! WP_Filesystem( $file_creds ) ) ) {
				wp_send_json_error( $error );
			}

			require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

			require_once HFE_DIR . 'admin/class-hfe-skin-install.php';

			if ( 'theme' === $type ) {

				$slug = sanitize_key( wp_unslash( $_POST['slug'] ) );

				$status = [
					'install' => 'theme',
					'slug'    => $slug,
				];

				include_once ABSPATH . 'wp-admin/includes/theme.php';

				$api = themes_api(
					'theme_information',
					[
						'slug'   => $slug,
						'fields' => [ 'sections' => false ],
					]
				);

				if ( is_wp_error( $api ) ) {
					$status['errorMessage'] = $api->get_error_message();
					wp_send_json_error( $status );
				}

				/** WP_Ajax_Upgrader_Skin class */
				require_once ABSPATH . 'wp-admin/includes/class-wp-ajax-upgrader-skin.php';

				$skin = new WP_Ajax_Upgrader_Skin();

				$installer = new Theme_Upgrader( $skin );

				// Check for Error if any.
				if ( ! method_exists( $installer, 'install' ) ) {
					wp_send_json_error( $error );
				}

				$installer->install( $api->download_link );

				// To fetch newly installed plugin basename flush cache.
				wp_cache_flush();

				$theme_basename = wp_get_theme( $slug )->get( 'Name' );

				if ( empty( $theme_basename ) ) {
					wp_send_json_error( $error );
				}

				$result = [
					'msg'          => $default_error,
					'is_activated' => false,
					'basename'     => $theme_basename,
				];

				// Check for permissions.
				if ( ! current_user_can( 'switch_themes' ) ) {
					$result['msg'] = esc_html__( 'Theme installed.', 'header-footer-elementor' );
					wp_send_json_success( $result );
				}
				// Activate the theme silently.
				$activated = switch_theme( $slug );

				if ( ! is_wp_error( $activated ) ) {
					$result['is_activated'] = true;
					$result['msg']          = esc_html__( 'Theme installed & activated.', 'header-footer-elementor' );
					wp_send_json_success( $result );
				}
			}

			if ( 'plugin' === $type ) {

				if ( ! function_exists( 'get_plugin_data' ) ) {
					require_once ABSPATH . 'wp-admin/includes/plugin.php';
				}

				// Do not allow WordPress to search/download translations, as this will break JS output.
				remove_action( 'upgrader_process_complete', [ 'Language_Pack_Upgrader', 'async_upgrade' ], 20 );

				// Create the plugin upgrader with our custom skin.
				$installer = new Plugin_Upgrader( new HFE_Skin_Install() );

				// Error check.
				if ( ! method_exists( $installer, 'install' ) ) {
					wp_send_json_error( $error );
				}

				$installer->install( $plugin ); // phpcs:ignore

				// Flush the cache and return the newly installed plugin basename.
				wp_cache_flush();

				$plugin_basename = $installer->plugin_info();

				if ( empty( $plugin_basename ) ) {
					wp_send_json_error( $error );
				}

				$result = [
					'msg'          => $default_error,
					'is_activated' => false,
					'basename'     => $plugin_basename,
				];

				// Check for permissions.
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

		/**
		 * Determine if the plugin/addon installations are allowed.
		 *
		 * @since x.x.x
		 * @param string $type defines type of addon.
		 * @return bool
		 */
		public function hfe_can_install( $type ) {

			if ( ! in_array( $type, [ 'plugin', 'theme' ], true ) ) {
				return false;
			}

			// Check if file modifications are allowed.
			if ( ! wp_is_file_mod_allowed( 'hfe_can_install' ) ) {
				return false;
			}

			if ( 'theme' === $type ) {
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

	}

	/**
	 *  Kicking this off by calling 'get_instance()' method
	 */
	HFE_Addons_Actions::get_instance();

}

