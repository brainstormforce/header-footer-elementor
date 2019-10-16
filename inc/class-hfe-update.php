<?php
/**
 * Theme Update
 *
 * @package     Header Footer Elementor
 * @author      Nikhil Chavan <email@nikhilchavan.com>
 * @copyright   Copyright (c) 2019, Header Footer Elementor
 * @link        https://github.com/Nikschavan/header-footer-elementor/
 * @since       HFE 1.1.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'HFE_Update' ) ) {

	/**
	 * HFE_Update initial setup
	 *
	 * @since 1.1.4
	 */
	class HFE_Update {

		/**
		 * Option key for stored version number.
		 *
		 * @since 1.1.4
		 * @var string
		 */
		private $db_option_key = '_hfe_db_version';

		/**
		 *  Constructor
		 *
		 * @since 1.1.4
		 */
		public function __construct() {

			// Theme Updates.
			if ( is_admin() ) {
				add_action( 'admin_init', array( $this, 'init' ), 5 );
			} else {
				add_action( 'wp', array( $this, 'init' ), 5 );
			}
		}

		/**
		 * Implement theme update logic.
		 *
		 * @since 1.1.4
		 */
		public function init() {
			do_action( 'hfe_update_before' );

			if ( ! $this->needs_db_update() ) {
				return;
			}

			// flush rewrite rules on plugin update.
			flush_rewrite_rules();

			$this->update_db_version();

			do_action( 'hfe_update_after' );
		}

		/**
		 * Check if db upgrade is required.
		 *
		 * @since 1.1.4
		 * @return true|false True if stored database version is lower than constant; false if otherwise.
		 */
		private function needs_db_update() {
			$db_version = get_option( $this->db_option_key, false );

			if ( false === $db_version || version_compare( $db_version, HFE_VER ) ) {
				return true;
			}

			return false;
		}

		/**
		 * Update DB version.
		 *
		 * @since 1.1.4
		 * @return void
		 */
		private function update_db_version() {
			update_option( $this->db_option_key, HFE_VER );
		}

	}
}

new HFE_Update();
