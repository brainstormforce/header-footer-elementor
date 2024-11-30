<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Extensions;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Progress bar extension
 *
 * @since x.x.x
 */
class Scroll_To_Top {

	/**
	 * Instance of Widgets_Loader.
	 *
	 * @since  x.x.x
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Get instance of Widgets_Loader
	 *
	 * @since  x.x.x
	 * @return Widgets_Loader
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Setup actions and filters.
	 *
	 * @since  x.x.x
	 * @access private
	 */
	private function __construct() {

		require_once HFE_DIR . '/inc/widgets-manager/extensions/class-scroll-to-top-settings.php';

		add_action( 'elementor/kit/register_tabs', [ $this, 'register_extension_tab' ], 1, 40 );
		add_action( 'elementor/documents/register_controls', [ $this, 'page_scroll_to_top_controls' ], 10 );

		add_action( 'wp_footer', [ $this, 'render_scroll_to_top_html' ] );

		// Enqueue jQuery and add inline script.
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	/**
	 * Enqueues the necessary scripts for the Scroll to Top functionality.
	 *
	 * This function is responsible for adding the required JavaScript and CSS files
	 * to the WordPress site to enable the Scroll to Top feature.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		// Ensure jQuery is enqueued.
		wp_enqueue_script( 'jquery' );

		// Add inline script.
		wp_add_inline_script(
			'jquery',
			'!function($){"use strict";$(document).ready(function(){$(this).scrollTop()>100&&$(".hfe-scroll-to-top-wrap").removeClass("hfe-scroll-to-top-hide"),$(window).scroll(function(){$(this).scrollTop()<100?$(".hfe-scroll-to-top-wrap").fadeOut(300):$(".hfe-scroll-to-top-wrap").fadeIn(300)}),$(".hfe-scroll-to-top-wrap").on("click",function(){$("html, body").animate({scrollTop:0},300);return!1})})}(jQuery);'
		);
	}

	/**
	 * Register extension tab
	 *
	 * @param \Elementor\Core\Kits\Documents\Kit $kit The Elementor Kit document.
	 * @since x.x.x
	 */
	public function register_extension_tab( \Elementor\Core\Kits\Documents\Kit $kit ) {
		$kit->register_tab( 'hfe-scroll-to-top-settings', Scroll_To_Top_Settings::class );
	}

	/**
	 * Render scroll to top html
	 *
	 * @since x.x.x
	 */
	public function render_scroll_to_top_html() {

		$post_id                = get_the_ID();
		$document               = [];
		$document_settings_data = [];

		if ( \Elementor\Plugin::instance()->preview->is_preview_mode() ) {
			// get auto save data.
			$document = \Elementor\Plugin::$instance->documents->get_doc_for_frontend( $post_id );
		} else {
			$document = \Elementor\Plugin::$instance->documents->get( $post_id, false );
		}
		if ( isset( $document ) && is_object( $document ) ) {
			$document_settings_data = $document->get_settings();
		}

		$scroll_to_top_global = $this->get_elementor_settings( 'hfe_scroll_to_top_global' );

		$scroll_to_top = false;

		if ( 'yes' == $scroll_to_top_global ) {
			$scroll_to_top = true;
		}

		if ( isset( $document_settings_data['hfe_scroll_to_top_single_disable'] ) && 'yes' == $document_settings_data['hfe_scroll_to_top_single_disable'] ) {
			$scroll_to_top = false;
		}

		if ( ! \Elementor\Plugin::instance()->preview->is_preview_mode() && $scroll_to_top ) {

			$scrolltop_media_type = ! empty( $this->get_elementor_settings( 'hfe_scroll_to_top_media_type' ) ) ? $this->get_elementor_settings( 'hfe_scroll_to_top_media_type' ) : 'icon';
			$scrolltop_icon_html  = '';
			if ( 'icon' == $scrolltop_media_type ) {
				$scrolltop_icon      = ! empty( $this->get_elementor_settings( 'hfe_scroll_to_top_button_icon' ) ) ? $this->get_elementor_settings( 'hfe_scroll_to_top_button_icon' )['value'] : 'fas fa-chevron-up';
				$scrolltop_icon_html = "<i class='$scrolltop_icon'></i>";
			} elseif ( 'image' == $scrolltop_media_type ) {
				$scrolltop_image     = ! empty( $this->get_elementor_settings( 'hfe_scroll_to_top_button_image' ) ) ? $this->get_elementor_settings( 'hfe_scroll_to_top_button_image' )['url'] : '';
				$scrolltop_icon_html = "<img src='$scrolltop_image'>";
			} elseif ( 'text' == $scrolltop_media_type ) {
				$scrolltop_text      = ! empty( $this->get_elementor_settings( 'hfe_scroll_to_top_button_text' ) ) ? $this->get_elementor_settings( 'hfe_scroll_to_top_button_text' ) : '';
				$scrolltop_icon_html = "<span>$scrolltop_text</span>";
			}

			$scroll_to_top_html = "<div class='hfe-scroll-to-top-wrap hfe-scroll-to-top-hide'><span class='hfe-scroll-to-top-button'>$scrolltop_icon_html</span></div>";

			$elementor_page = get_post_meta( get_the_ID(), '_elementor_edit_mode', true );
			if ( (bool) $elementor_page ) {
				printf( '%1$s', wp_kses_post( $scroll_to_top_html ) );
			}       
		}

		if ( \Elementor\Plugin::instance()->preview->is_preview_mode() ) {
			if ( $scroll_to_top ) {
				$scrolltop_media_type = ! empty( $this->get_elementor_settings( 'hfe_scroll_to_top_media_type' ) ) ? $this->get_elementor_settings( 'hfe_scroll_to_top_media_type' ) : 'icon';
				$scrolltop_icon_html  = '';
				if ( 'icon' == $scrolltop_media_type ) {
					$scrolltop_icon      = ! empty( $this->get_elementor_settings( 'hfe_scroll_to_top_button_icon' ) ) ? $this->get_elementor_settings( 'hfe_scroll_to_top_button_icon' )['value'] : 'fas fa-chevron-up';
					$scrolltop_icon_html = "<i class='$scrolltop_icon'></i>";
				} elseif ( 'image' == $scrolltop_media_type ) {
					$scrolltop_image     = ! empty( $this->get_elementor_settings( 'hfe_scroll_to_top_button_image' ) ) ? $this->get_elementor_settings( 'hfe_scroll_to_top_button_image' )['url'] : '';
					$scrolltop_icon_html = "<img src='$scrolltop_image'>";
				} elseif ( 'text' == $scrolltop_media_type ) {
					$scrolltop_text      = ! empty( $this->get_elementor_settings( 'hfe_scroll_to_top_button_text' ) ) ? $this->get_elementor_settings( 'hfe_scroll_to_top_button_text' ) : '';
					$scrolltop_icon_html = "<span>$scrolltop_text</span>";
				}
				$scroll_to_top_html = "<div class='hfe-scroll-to-top-wrap hfe-scroll-to-top-hide'><span class='hfe-scroll-to-top-button'>$scrolltop_icon_html</span></div>";

				$elementor_page = get_post_meta( get_the_ID(), '_elementor_edit_mode', true );
				if ( (bool) $elementor_page ) {
					printf( '%1$s', wp_kses_post( $scroll_to_top_html ) );
				}
			}
			?>
			<script>
				;(function($) {
					'use strict';
					var markup = '<div class="hfe-scroll-to-top-wrap edit-mode hfe-scroll-to-top-hide"><span class="hfe-scroll-to-top-button"><i class="fas fa-chevron-up"></i></span></div>';
					var scrolltop = jQuery('.hfe-scroll-to-top-wrap');

					if ( ! scrolltop.length ) {
						jQuery('body').append(markup);
					}

					function hfeSanitizeString(input) {
						var htmlTags = /<[^>]*>/g;
						var sanitizedInput = input.replace(htmlTags, "");
						return sanitizedInput;
					}

					function hfeSanitizeURL(url) {
						var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
						if (url.match(urlPattern)) {
							return url;
						} else {
							return "";
						}
					}

					window.addEventListener('message',function(e) {
						var data = e.data;
						if( 'hfeMessage' == data.check ) {
							if (e.origin != window.origin) {
								return;
							}
							if (e.source.location.href != window.parent.location.href) {
								return;
							}
							var scrolltopWrap = jQuery('.hfe-scroll-to-top-wrap');
							var button = scrolltopWrap.find('.hfe-scroll-to-top-button');
							var changeValue = data.changeValue;
							var changeItem = data.changeItem;

							if ( 'hfe_scroll_to_top_single_disable' != changeItem[0] ) {
								var icon = '';
								var image = '';
								var text = '';
								var items = {
									'enable_global_hfe' : ('hfe_scroll_to_top_global' == changeItem[0]) ? changeValue : data.enable_global_hfe,
									'media_type' : ('hfe_scroll_to_top_media_type' == changeItem[0]) ? changeValue : data.media_type,
									'icon' : ('hfe_scroll_to_top_button_icon' == changeItem[0]) ? changeValue : data.icon,
									'image' : ('hfe_scroll_to_top_button_image' == changeItem[0]) ? changeValue : data.image,
									'text' : ('hfe_scroll_to_top_button_text' == changeItem[0]) ? changeValue : data.text,
								};

								if( 'hfe_scroll_to_top_button_icon' == changeItem[0] ) {
									items.media_type = 'icon';
								} else if( 'hfe_scroll_to_top_button_image' == changeItem[0] ) {
									items.media_type = 'image';
								} else if( 'hfe_scroll_to_top_button_text' == changeItem[0] ) {
									items.media_type = 'text';
								}

								if ('icon' == items.media_type) {
									icon = '<i class="' + hfeSanitizeString(items.icon.value) + '"></i>';
									button.html(icon);
								} else if ('image' == items.media_type) {
									image = '<img src="' + hfeSanitizeURL(items.image.url) + '">';
									button.html(image);
								} else if ('text' == items.media_type) {
									text = '<span>' + hfeSanitizeString(items.text) + '</span>';
									button.html(text);
								}

								if( 'yes' == items.enable_global_hfe && scrolltopWrap.hasClass("edit-mode") ) {
									scrolltopWrap.removeClass("edit-mode");
								} else if( '' == changeValue && !scrolltopWrap.hasClass("edit-mode") ) {
									scrolltopWrap.addClass("edit-mode");
								}
							}

							if( 'hfe_scroll_to_top_single_disable' == changeItem[0] ) {
								if( 'yes' == changeValue && !scrolltopWrap.hasClass("single-page-off") ) {
									scrolltopWrap.addClass("single-page-off");
								} else if( '' == changeValue && scrolltopWrap.hasClass("single-page-off") ) {
									scrolltopWrap.removeClass("single-page-off");
								}
							}
						}
					})
				}(jQuery));
				!function(o){"use strict";o((function(){o(this).scrollTop()>100&&o(".hfe-scroll-to-top-wrap").removeClass("hfe-scroll-to-top-hide"),o(window).scroll((function(){o(this).scrollTop()<100?o(".hfe-scroll-to-top-wrap").fadeOut(300):o(".hfe-scroll-to-top-wrap").fadeIn(300)})),o(".hfe-scroll-to-top-wrap").on("click",(function(){return o("html, body").animate({scrollTop:0},300),!1}))}))}(jQuery);
			</script>
			<?php
		}

	}

	/**
	 * Get Elementor settings
	 * 
	 * @param string $setting_id Setting ID.
	 * @return string
	 */
	public function get_elementor_settings( $setting_id ) {

		$return              = '';
		$extensions_settings = [];

		if ( ! isset( $extensions_settings['kit_settings'] ) ) {
			if ( \Elementor\Plugin::instance()->preview->is_preview_mode() ) {
				// get auto save data.
				$kit = \Elementor\Plugin::$instance->documents->get_doc_for_frontend( \Elementor\Plugin::$instance->kits_manager->get_active_id() );
			} else {
				$kit = \Elementor\Plugin::$instance->documents->get( \Elementor\Plugin::$instance->kits_manager->get_active_id(), true );
			}
			if ( isset( $kit ) && is_object( $kit ) ) {
				$extensions_settings['kit_settings'] = $kit->get_settings();
			}
		}

		if ( isset( $extensions_settings) && isset( $extensions_settings['kit_settings'][ $setting_id ] ) ) {
			$return = $extensions_settings['kit_settings'][ $setting_id ];
		}

		return $return;
	}

	/**
	 * Add scroll to top controls
	 *
	 * @param \Elementor\Widget_Base $element Elementor Widget.
	 */
	public function page_scroll_to_top_controls( $element ) {

		$scroll_to_top_global = $this->get_elementor_settings( 'hfe_scroll_to_top_global' );
		if ( 'yes' !== $scroll_to_top_global ) {
			return;
		}

		$element->start_controls_section(
			'hfe_scroll_to_top_single_section',
			[
				'label' => __( 'Scroll to Top', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_SETTINGS,
			]
		);

		$element->add_control(
			'hfe_scroll_to_top_single_disable',
			[
				'label'        => __( 'Disable Scroll to Top For This Page', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'default'      => '',
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
			]
		);

		$element->end_controls_section();
	}


}

Scroll_To_Top::instance();
