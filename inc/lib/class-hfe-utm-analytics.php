<?php
/**
 * Init
 *
 * Loads latest UTM Analytics library in environment.
 *
 * @since x.x.x
 * @package UTM Analytics
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'HFE_Utm_Analytics' ) ) :

	/**
	 * Admin
	 */
	class HFE_Utm_Analytics {

		/**
		 * Instance
		 *
		 * @since x.x.x
		 * @var (Object) HFE_Utm_Analytics
		 */
		private static $instance = null;

		/**
		 * Get Instance
		 *
		 * @since x.x.x
		 *
		 * @return object Class object.
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Constructor.
		 *
		 * @since 1.0.0
		 */
		private function __construct() {
			$this->version_check();
			add_action( 'init', [ $this, 'load' ], 999 );
		}

		/**
		 * Version Check
		 *
		 * @return void
		 */
		public function version_check() {

			$file = realpath( dirname( __FILE__ ) . '/utm-analytics/version.json' );

			// Is file exist?
			if ( is_file( $file ) ) {
				// @codingStandardsIgnoreStart
				$file_data = json_decode( file_get_contents( $file ), true );
				// @codingStandardsIgnoreEnd
				global $utm_analytics_version, $utm_analytics_init;
				$path = realpath( dirname( __FILE__ ) . '/utm-analytics/bsf-utm-analytics.php' );
				$version = isset( $file_data['bsf-utm-analytics'] ) ? $file_data['bsf-utm-analytics'] : 0;

				if ( null === $utm_analytics_version ) {
					$utm_analytics_version = '0.0.1';
				}

				// Compare versions.
				if ( version_compare( $version, $utm_analytics_version, '>=' ) ) {
					$utm_analytics_version = $version;
					$utm_analytics_init = $path;
				}
			}
		}

		/**
		 * Load latest plugin
		 *
		 * @return void
		 */
		public function load() {

			global $utm_analytics_version, $utm_analytics_init;
			if ( is_file( realpath( $utm_analytics_init ) ) ) {
				include_once realpath( $utm_analytics_init );
			}
		}
	}

	HFE_Utm_Analytics::get_instance();

endif;