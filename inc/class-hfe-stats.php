<?php

class HFE_Stats {

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

	public function hfe_stats( $stats ) {
		$stats['header-footer-elementor'][] = [
			'version' => HFE_VER,
		];

		return $stats;
	}

	private function load_analytics() {
		require_once HFE_DIR . 'inc/lib/bsf-analytics/class-bsf-analytics-loader.php';
	}

}
