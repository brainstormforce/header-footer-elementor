<?php

class BSF_Analytics_Stats {

	/**
	 * Active plugins.
	 *
	 * Holds the sites active plugins list.
	 *
	 * @var array
	 */
	private $plugins;

	public function get_stats() {
		return apply_filters( 'bsf_core_stats', $this->get_default_stats() );
	}

	private function get_default_stats() {
		return array(
			'graupi_version'         => defined( 'BSF_UPDATER_VERSION' ) ? BSF_UPDATER_VERSION : false,
			'domain_name'            => get_site_url(),
			'php_os'                 => PHP_OS,
			'server_software'        => $_SERVER['SERVER_SOFTWARE'],
			'mysql_version'          => $this->get_mysql_version(),
			'php_version'            => $this->get_php_version(),
			'php_max_input_vars'     => ini_get( 'max_input_vars' ), // phpcs:ignore:PHPCompatibility.IniDirectives.NewIniDirectives.max_input_varsFound
			'php_post_max_size'      => ini_get( 'post_max_size' ),
			'php_max_execution_time' => ini_get( 'max_execution_time' ),
			'php_memory_limit'       => ini_get( 'memory_limit' ),
			'zip_installed'          => extension_loaded( 'zip' ),
			'imagick_availabile'     => extension_loaded( 'imagick' ),
			'curl_version'           => $this->get_curl_version(),
			'curl_ssl_version'       => $this->get_curl_ssl_version(),
			'is_writable'            => $this->is_content_writable(),

			'wp_version'             => get_bloginfo( 'version' ),
			'user_count'             => $this->get_user_count(),
			'site_language'          => get_locale(),
			'timezone'               => wp_timezone_string(),
			'is_ssl'                 => is_ssl(),
			'is_multisite'           => is_multisite(),
			'admin_email'            => get_option( 'admin_email' ),
			'external_object_cache'  => (bool) wp_using_ext_object_cache(),
			'wp_debug'               => WP_DEBUG,
			'wp_debug_display'       => WP_DEBUG_DISPLAY,
			'script_debug'           => SCRIPT_DEBUG,

			'active_plugins'         => $this->get_active_plugins(),

			'active_theme'           => get_template(),
			'active_stylesheet'      => get_stylesheet(),
		);
	}

	private function get_php_version() {
		if ( defined( 'PHP_MAJOR_VERSION' ) ) {
			return PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION . '.' . PHP_RELEASE_VERSION;
		}

		return phpversion();
	}

	private function get_user_count() {
		if ( is_multisite() ) {
			$user_count = get_user_count();
		} else {
			$count      = count_users();
			$user_count = $count['total_users'];
		}

		return $user_count;
	}

	private function get_active_plugins() {
		if ( ! $this->plugins ) {
			// Ensure get_plugins function is loaded
			if ( ! function_exists( 'get_plugins' ) ) {
				include ABSPATH . '/wp-admin/includes/plugin.php';
			}

			$active_plugins = get_option( 'active_plugins' );
			$this->plugins  = array_values( array_intersect_key( get_plugins(), array_flip( $active_plugins ) ) );
		}

		return $this->plugins;
	}

	private function get_curl_ssl_version() {
		$curl = curl_version();

		return isset( $curl['ssl_version'] ) ? $curl['ssl_version'] : false;
	}

	private function get_curl_version() {
		$curl = curl_version();

		return isset( $curl['version'] ) ? $curl['version'] : false;
	}

	private function get_mysql_version() {
		global $wpdb;
		return $wpdb->db_version();
	}

	private function is_content_writable() {
		$upload_dir = wp_upload_dir();
		return wp_is_writable( $upload_dir['basedir'] );
	}

}
