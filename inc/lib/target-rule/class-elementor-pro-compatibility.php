<?php
/**
 * Astra Advanced Headers Bar Post Meta Box
 *
 * @package   Astra Pro
 */

namespace HFE\Lib;

use Elementor\Core\Base\Document;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Common Widget
 *
 * @since 0.0.1
 */
abstract class Elementor_Pro_Compatibility extends Document {

	/**
	 * Get header title
	 *
	 * @param string $slug Module slug.
	 * @since 0.0.1
	 */
	public function get_container_attributes() {

		if ( \Elementor\Plugin::$instance->preview->is_preview_mode() ) {
			$attributes['data-elementor-title'] = 'Before Footer';
		} 
		return $attributes;
	}
}
