<?php
/**
 * HFE_Stats setup
 *
 * @package header-footer-elementor
 */

/**
 * Analytics stats.
 */
class HFE_Stats {

	/**
	 *  Constructor
	 */
	public function __construct() {
		$this->load_analytics();

		BSF_Analytics::register_product(
			'header-footer-elementor',
			'Elementor - Header, Footer & Blocks',
			'plugin'
		);

		if ( BSF_Analytics::instance()->is_tracking_enabled( 'header-footer-elementor' ) ) {
			add_filter( 'bsf_core_stats', [ $this, 'hfe_stats' ] );
		}
	}

	/**
	 * Adding plugin version to stats.
	 *
	 * @param  Array $stats analytics stat object.
	 */
	public function hfe_stats( $stats ) {
		$stats['header-footer-elementor'][] = [
			'version' => HFE_VER,
		];

		return $stats;
	}

	/**
	 * Load analytics class.
	 * .
	 */
	private function load_analytics() {
		require_once HFE_DIR . 'inc/lib/bsf-analytics/class-bsf-analytics-loader.php';
	}

}
