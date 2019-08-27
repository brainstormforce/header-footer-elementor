<?php
/**
 * Theme Update
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2019, Astra
 * @link        https://wpastra.com/
 * @since       Astra 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'HFE_Update' ) ) {

	/**
	 * HFE_Update initial setup
	 *
	 * @since 1.0.0
	 */
	class HFE_Update {

		/**
		 * Option key for stored version number.
		 *
		 * @since x.x.x
		 * @var string
		 */
		private $db_option_key = '_hfe_db_version';

		/**
		 *  Constructor
		 *
		 * @since x.x.x
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
		 * @since x.x.x
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
		 * @since x.x.x
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
		 * @since x.x.x
		 * @return void
		 */
		private function update_db_version() {
			update_option( $this->db_option_key, HFE_VER );
		}

	}
}

new HFE_Update();
