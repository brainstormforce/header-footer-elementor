<?php
/**
 * Elementor Importer
 *
 * @package header-footer-elementor
 */

namespace Elementor\TemplateLibrary;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// If plugin - 'Elementor' not exist then return.
if ( ! class_exists( '\Elementor\Plugin' ) ) {
	return;
}

use Elementor\Core\Base\Document;
use Elementor\DB;
use Elementor\Core\Settings\Page\Manager as PageSettingsManager;
use Elementor\Core\Settings\Manager as SettingsManager;
use Elementor\Core\Settings\Page\Model;
use Elementor\Editor;
use Elementor\Plugin;
use Elementor\Settings;
use Elementor\Utils;

/**
 * Elementor template library local source.
 *
 * Elementor template library local source handler class is responsible for
 * handling local Elementor templates saved by the user locally on his site.
 *
 * @since x.x.x Added compatibility for Elemetnor v2.5.0
 */
class Header_Footer_Elementor_Import extends Source_Local {

	/**
	 * Update post meta.
	 *
	 * @since x.x.x
	 * @param  integer $post_id Post ID.
	 * @param  array   $data Elementor Data.
	 * @return array   $data Elementor Imported Data.
	 */
	public function import( $post_id = 0, $data = [] ) {

		if ( ! empty( $post_id ) && ! empty( $data ) ) {

			$data = json_encode( $data, true );

			// Update WP form IDs.
			$ids_mapping = get_option( 'ehf_blocks_wpforms_ids_mapping', [] );
			if ( $ids_mapping ) {
				foreach ( $ids_mapping as $old_id => $new_id ) {
					$data = str_replace( '[wpforms id=\"' . $old_id, '[wpforms id=\"' . $new_id, $data );
				}
			}

			$data = json_decode( $data, true );

			// Import the data.
			$data = $this->process_export_import_content( $data, 'on_import' );

			// Update processed meta.
			update_metadata( 'post', $post_id, '_elementor_data', $data );

			// !important, Clear the cache after images import.
			Plugin::$instance->posts_css_manager->clear_cache();

			return $data;
		}

		return [];
	}
}
