<?php
/**
 * BSF analytics class file.
 *
 * @version 1.0.0
 *
 * @package bsf-analytics
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'BSF_Analytics' ) ) {

	/**
	 * BSF analytics
	 */
	class BSF_Analytics {

		/**
		 * Member Variable
		 *
		 * @var string Usage tracking document URL
		 */
		private $usage_doc_link = 'https://store.brainstormforce.com/usage-tracking/?utm_source=wp_dashboard&utm_medium=general_settings&utm_campaign=usage_tracking';

		/**
		 * Setup actions, load files.
		 */
		public function __construct() {
			add_action( 'admin_init', array( $this, 'handle_optin_optout' ) );
			add_action( 'cron_schedules', array( $this, 'every_two_days_schedule' ) );
			add_action( 'admin_notices', array( $this, 'option_notice' ) );

			if ( ! has_action( 'bsf_analytics_send', array( $this, 'send' ) ) ) {
				add_action( 'bsf_analytics_send', array( $this, 'send' ) );
			}

			add_action( 'admin_init', array( $this, 'register_usage_tracking_setting' ) );

			$this->includes();
			$this->schedule_event();
		}

		/**
		 * Get API URL for sending analytics.
		 *
		 * @return string API URL.
		 */
		private function get_api_url() {
			return defined( 'BSF_API_URL' ) ? BSF_API_URL : 'https://support.brainstormforce.com/';
		}

		/**
		 * Send analytics API call.
		 */
		public function send() {
			$bsf_analytics_stats = new BSF_Analytics_Stats();
			wp_remote_post(
				$this->get_api_url() . 'wp-json/bsf-core/v1/analytics/',
				array(
					'body'     => $bsf_analytics_stats->get_stats(),
					'timeout'  => 5,
					'blocking' => false,
				)
			);
		}

		/**
		 * Check if usage tracking is enabled.
		 *
		 * @return bool
		 */
		public function is_tracking_enabled() {
			$is_enabled = get_option( 'bsf_analytics_optin' ) === 'yes' ? true : false;
			return apply_filters( 'bsf_tracking_enabled', $is_enabled );
		}

		/**
		 * Display admin notice for usage tracking.
		 */
		public function option_notice() {

			// Don't display the notice if the user has taken action on the notice.
			if ( get_option( 'bsf_analytics_optin' ) || ! apply_filters( 'bsf_tracking_enabled', true ) ) {
				return;
			}

			// Show tracker consent notice after 24 hours from installed time.
			if ( strtotime( '+24 hours', $this->get_analytics_install_time() ) > time() ) {
				return;
			}

			Astra_Notices::add_notice(
				array(
					'id'                         => 'bsf-optin-notice',
					'type'                       => '',
					'message'                    => sprintf(
						'<div class="notice-content">
								<div class="notice-heading">
									%1$s
								</div>
								<div class="astra-notices-container">
									<a href="%2$s" class="astra-notices button-primary">
									%3$s
									</a> &nbsp; 
									<a href="%4$s" data-repeat-notice-after="%5$s" class="astra-notices button-secondary">
									%6$s
									</a>
								</div>
							</div>',
						/* translators: %s product name */
						sprintf( __( 'Want to help make <strong>%1s</strong> even more awesome? Allow us to collect non-sensitive diagnostic data and usage information. ', 'bsf' ) . '<a href="%2s" target="_blank" rel="noreferrer noopener">%3s</a>', $this->get_product_name(), esc_url( $this->usage_doc_link ), __( 'Know More.', 'bsf' ) ),
						add_query_arg(
							array(
								'bsf_analytics_optin' => 'yes',
								'bsf_analytics_nonce' => wp_create_nonce( 'bsf_analytics_optin' ),
							)
						),
						__( 'Allow', 'bsf' ),
						add_query_arg(
							array(
								'bsf_analytics_optin' => 'no',
								'bsf_analytics_nonce' => wp_create_nonce( 'bsf_analytics_optin' ),
							)
						),
						MONTH_IN_SECONDS,
						__( 'No Thanks', 'bsf' )
					),
					'show_if'                    => true,
					'repeat-notice-after'        => false,
					'priority'                   => 18,
					'display-with-other-notices' => true,
				)
			);
		}

		/**
		 * Process usage tracking opt out.
		 */
		public function handle_optin_optout() {
			if ( ! isset( $_GET['bsf_analytics_nonce'] ) ) {
				return;
			}

			if ( ! wp_verify_nonce( sanitize_text_field( $_GET['bsf_analytics_nonce'] ), 'bsf_analytics_optin' ) ) {
				return;
			}

			$optin_status = sanitize_text_field( $_GET['bsf_analytics_optin'] );

			if ( 'yes' === $optin_status ) {
				$this->optin();
			} elseif ( 'no' === $optin_status ) {
				$this->optout();
			}

			wp_safe_redirect(
				remove_query_arg(
					array(
						'bsf_analytics_optin',
						'bsf_analytics_nonce',
					)
				)
			);
		}

		/**
		 * Opt in to usage tracking.
		 */
		private function optin() {
			$this->unschedule_event();
			$this->schedule_event();
			update_option( 'bsf_analytics_optin', 'yes' );
		}

		/**
		 * Opt out to usage tracking.
		 */
		private function optout() {
			$this->unschedule_event();
			update_option( 'bsf_analytics_optin', 'no' );
		}

		/**
		 * Add two days event schedule variables.
		 *
		 * @param array $schedules scheduled array data.
		 */
		public function every_two_days_schedule( $schedules ) {
			$schedules['every_two_days'] = array(
				'interval' => 2 * DAY_IN_SECONDS,
				'display'  => __( 'Every two days', 'textdomain' ),
			);

			return $schedules;
		}

		/**
		 * Schedule usage tracking event.
		 */
		private function schedule_event() {
			if ( ! wp_next_scheduled( 'bsf_analytics_send' ) && $this->is_tracking_enabled() ) {
				wp_schedule_event( time(), 'every_two_days', 'bsf_analytics_send' );
			}
		}

		/**
		 * Unschedule usage tracking event.
		 */
		private function unschedule_event() {
			wp_clear_scheduled_hook( 'bsf_analytics_send' );
		}

		/**
		 * Load analytics stat class.
		 */
		private function includes() {
			require_once __DIR__ . '/class-bsf-analytics-stats.php';
		}

		/**
		 * Register usage tracking option in General settings page.
		 */
		public function register_usage_tracking_setting() {

			if ( ! apply_filters( 'bsf_tracking_enabled', true ) ) {
				return;
			}

			register_setting(
				'general',             // Options group.
				'bsf_analytics_optin',      // Option name/database.
				array( 'sanitize_callback' => array( $this, 'sanitize_option' ) ) // sanitize callback function.
			);

			add_settings_field(
				'bsf-analytics-optin',       // Field ID.
				__( 'Usage Tracking', 'bsf' ),       // Field title.
				array( $this, 'render_settings_field_html' ), // Field callback function.
				'general'                    // Settings page slug.
			);
		}

		/**
		 * Sanitize Callback Function
		 *
		 * @param bool $input Option value.
		 */
		public function sanitize_option( $input ) {
			return $input ? 'yes' : 'no';
		}

		/**
		 * Print settings field HTML.
		 */
		public function render_settings_field_html() {
			?>
			<label for="bsf-analytics-optin">
				<input id="bsf-analytics-optin" type="checkbox" value="1" name="bsf_analytics_optin" <?php checked( get_option( 'bsf_analytics_optin', 'no' ), 'yes' ); ?>>
				<?php esc_html_e( 'Allow Brainstorm Force products to track non-sensitive usage tracking data.', 'bsf' ); ?>
			</label>
			<?php
			echo wp_kses_post( sprintf( '<a href="%1s" target="_blank" rel="noreferrer noopener">%2s</a>', esc_url( $this->usage_doc_link ), __( 'Learn More.', 'bsf' ) ) );
		}

		/**
		 * Get current product name.
		 *
		 * @return string $plugin_data['Name] Name of plugin.
		 */
		private function get_product_name() {

			$base      = wp_normalize_path( dirname( __FILE__ ) );
			$theme_dir = wp_normalize_path( get_template_directory() );

			if ( false !== strpos( $base, $theme_dir ) ) {
				$theme = wp_get_theme( get_template() );
				return $theme->get( 'Name' );
			}

			$base = plugin_basename( __FILE__ );

			$exploded_path = explode( '/', $base, 2 );
			$plugin_slug   = $exploded_path[0];

			if ( ! function_exists( 'get_plugin_data' ) ) {
				require_once ABSPATH . 'wp-admin/includes/plugin.php';
			}

			$plugin_main_file = WP_PLUGIN_DIR . '/' . $plugin_slug . '/' . $plugin_slug . '.php';
			$plugin_data      = get_plugin_data( wp_normalize_path( $plugin_main_file ) );

			return $plugin_data['Name'];
		}

		/**
		 * Set analytics installed time in option.
		 *
		 * @return string $time analytics installed time.
		 */
		private function get_analytics_install_time() {

			$time = get_option( 'bsf_analytics_installed_time' );

			if ( ! $time ) {
				$time = time();
				update_option( 'bsf_analytics_installed_time', time() );
			}

			return $time;
		}
	}

}

new BSF_Analytics();
