<?php
/**
 * Plugin Name:     Header, Footer & Blocks for Elementor
 * Plugin URI:      https://github.com/Nikschavan/header-footer-elementor
 * Description:     Create Header and Footer for your site using Elementor Page Builder.
 * Author:          Brainstorm Force, Nikhil Chavan
 * Author URI:      https://www.brainstormforce.com/
 * Text Domain:     header-footer-elementor
 * Domain Path:     /languages
 * Version:         1.1.2
 *
 * @package         header-footer-elementor
 */

define( 'HFE_VER', '1.1.2' );
define( 'HFE_DIR', plugin_dir_path( __FILE__ ) );
define( 'HFE_URL', plugins_url( '/', __FILE__ ) );
define( 'HFE_PATH', plugin_basename( __FILE__ ) );

/**
 * Load the class loader.
 */
require_once HFE_DIR . '/inc/class-header-footer-elementor.php';
require_once HFE_DIR . 'inc/lib/notices/class-astra-notices.php';

/**
 * Load the Plugin Class.
 */
function hfe_init() {
	new Header_Footer_Elementor();
}

add_action( 'plugins_loaded', 'hfe_init' );

if ( ! function_exists( 'register_notices' ) ) :

	/**
	* Ask Theme Rating
	*
	* @since 1.4.0
	*/
	function register_notices() {
		$image_path = HFE_URL . 'assets/images/header-footer-elementor-icon.png';
		Astra_Notices::add_notice(
			array(
				'id'                         => 'header-footer-elementor-rating',
				'type'                       => '',
				'message'                    => sprintf(
					'<div class="notice-image">
						<img src="%1$s" class="custom-logo" alt="Sidebar Manager" itemprop="logo"></div> 
						<div class="notice-content">
							<div class="notice-heading">
								%2$s
							</div>
							%3$s<br />
							<div class="astra-review-notice-container">
								<a href="%4$s" class="astra-notice-close astra-review-notice button-primary" target="_blank">
								%5$s
								</a>
							<span class="dashicons dashicons-calendar"></span>
								<a href="#" data-repeat-notice-after="%6$s" class="astra-notice-close astra-review-notice">
								%7$s
								</a>
							<span class="dashicons dashicons-smiley"></span>
								<a href="#" class="astra-notice-close astra-review-notice">
								%8$s
								</a>
							</div>
						</div>',
					$image_path,
					__( 'Hello! Seems like you have used Header Footer Elementor to build this website — Thanks a ton!', 'header-footer-elementor' ),
					__( 'Could you please do us a BIG favor and give it a 5-star rating on WordPress? This would boost our motivation and help other users make a comfortable decision while choosing the Header Footer Elementor.', 'header-footer-elementor' ),
					'https://wordpress.org/support/plugin/header-footer-elementor/reviews/?filter=5#new-post',
					__( 'Ok, you deserve it', 'header-footer-elementor' ),
					MONTH_IN_SECONDS,
					__( 'Nope, maybe later', 'header-footer-elementor' ),
					__( 'I already did', 'header-footer-elementor' )
				),
				'repeat-notice-after'        => MONTH_IN_SECONDS,
				'priority'                   => 18,
				'display-with-other-notices' => false,
			)
		);
	}

	add_action( 'admin_notices', 'register_notices' );

endif;

