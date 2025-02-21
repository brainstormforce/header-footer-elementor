<?php
/**
 * HFE Analytics.
 *
 * @package HFE
 */
use Elementor\Modules\Usage\Module as Usage_Module;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * HFE Analytics.
 *
 * HFE Analytics. handler class is responsible for rolling back HFE to
 * previous version.
 *
 * @since x.x.x
 */
if ( ! class_exists( 'HFE_Analytics' ) ) {

	class HFE_Analytics {

		/**
		 * HFE Analytics constructor.
		 *
		 * Initializing HFE Analytics.
		 *
		 * @since x.x.x
		 * @access public
		 *
		 * @param array $args Optional. HFE Analytics arguments. Default is an empty array.
		 */
		public function __construct() {

			// BSF Analytics Tracker.
			if ( ! class_exists( 'BSF_Analytics_Loader' ) ) {
				require_once HFE_DIR . 'admin/bsf-analytics/class-bsf-analytics-loader.php';
			}

			$bsf_analytics = BSF_Analytics_Loader::get_instance();

			$bsf_analytics->set_entity(
				[
					'bsf' => [
						'product_name'        => 'Ultimate Addons for Elementor',
						'path'                => HFE_DIR . 'admin/bsf-analytics',
						'author'              => 'Brainstorm Force',
						'time_to_display'     => '+24 hours',
						'deactivation_survey' => [
							[
								'id'                => 'deactivation-survey-header-footer-elementor', // 'deactivation-survey-<your-plugin-slug>'
								'popup_logo'        => HFE_URL . 'assets/images/settings/logo.svg',
								'plugin_slug'       => 'header-footer-elementor', // <your-plugin-slug>
								'plugin_version'    => HFE_VER,
								'popup_title'       => __( 'Quick Feedback', 'header-footer-elementor' ),
								'support_url'       => 'https://ultimateelementor.com/contact/',
								'popup_description' => __( 'If you have a moment, please share why you are deactivating Ultimate Addons for Elementor:', 'header-footer-elementor' ),
								'show_on_screens'   => [ 'plugins' ],
							],
						],
					],
				]
			);

			if ( ! class_exists( 'HFE_Utm_Analytics' ) ) {
				require_once HFE_DIR . 'inc/lib/class-hfe-utm-analytics.php';
			}
			
			add_filter( 'bsf_core_stats', [ $this, 'add_uae_analytics_data' ] );

			$this->add_uae_analytics_data( [] );
		}
        
        /**
         * Callback function to add specific analytics data.
         *
         * @param array $stats_data existing stats_data.
         * @since x.x.x
         * @return array
         */
        public function add_uae_analytics_data( $stats_data ) {
            $stats_data['plugin_data']['header-footer-elementor']		= [
                'free_version'  => HFE_VER,
                'pro_version' => ( defined( 'UAEL_VERSION' ) ? UAEL_VERSION : '' ),
                'site_language' => get_locale(),
                'elementor_version' => ( defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : '' ),
                'elementor_pro_version' => ( defined( 'ELEMENTOR_PRO_VERSION' ) ? ELEMENTOR_PRO_VERSION : '' ),
                'onboarding_triggered' => ( 'yes' === get_option( 'hfe_onboarding_triggered' ) ) ? 'yes' : 'no'
            ];

            $hfe_posts = get_posts( [
                'post_type'   => 'elementor-hf',
                'post_status' => 'publish',
                'numberposts' => -1
            ] );

            $stats_data['plugin_data']['header-footer-elementor']['numeric_values'] = [
                'total_hfe_templates'            => count( $hfe_posts ),
            ];

			$fetch_elementor_data = $this->ajax_get_widgets_usage();

            return $stats_data;
        }

		/**
		 * Fetch Elementor data.
		 */
		private function ajax_get_widgets_usage() {

			$get_Widgets = get_option( '_elementor_controls_usage', [] );
			error_log( "--------------------------------");
			error_log( print_r( $get_Widgets, true ) );
		
			/** @var Usage_Module $usage_module */
			$usage_module = Usage_Module::instance();
			$usage_module->recalc_usage();
	
			$widgets_usage = [];
			foreach ( $usage_module->get_formatted_usage( 'raw' ) as $data ) {

				// error_log( "--------------------------------");
				// error_log( print_r( $data, true ) );

				foreach ( $data['elements'] as $element => $count ) {
					if ( ! isset( $widgets_usage[ $element ] ) ) {
						$widgets_usage[ $element ] = 0;
					}
	
					$widgets_usage[ $element ] += $count;
				}
			}
		
			return $widgets_usage;
		}

        /**
         * Runs custom WP_Query to fetch data as per requirement
         *
         * @param array $meta_query meta query array for WP_Query.
         * @since x.x.x
         * @return int
         */
        private function custom_wp_query_total_posts( $meta_query ) {

            $args = [
                'post_type'      => 'elementor-hf',
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'meta_query'     => $meta_query, //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query -- Meta query required as we need to fetch count of nested data.
            ];

            $query       = new \WP_Query( $args );
            $posts_count = $query->found_posts;

            wp_reset_postdata();

            return $posts_count;
        }
	}
}
new HFE_Analytics();