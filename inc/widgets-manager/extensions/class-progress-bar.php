<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */
namespace HFE\WidgetsManager\Extensions;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use \Elementor\Group_Control_Background;
use \Elementor\Group_Control_Border;
use \Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Progress bar extension
 *
 * @since x.x.x
 */
class Progress_Bar {

    /**
	 * Instance of Widgets_Loader.
	 *
	 * @since  x.x.x
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Get instance of Progress_Bar
	 *
	 * @since  x.x.x
	 * @return Progress_Bar
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

        require_once HFE_DIR . '/inc/widgets-manager/extensions/class-progress-bar-settings.php';

		add_action( 'elementor/kit/register_tabs', [ $this, 'register_extension_tab' ], 1, 40 );
		add_action( 'elementor/documents/register_controls', [ $this, 'page_progress_bar_controls' ], 10 );

		add_action( 'wp_footer', [ $this, 'render_progress_bar_html' ] );

		// Enqueue jQuery and add inline script.
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );

    }

    public function enqueue_scripts() {
		// Ensure jQuery is enqueued
		wp_enqueue_script( 'jquery' );

		// Add inline script
		wp_add_inline_script(
			'jquery',
			'"use strict";(function($,window){"use strict";var $window=window,progress_bar_El=$(".ha-reading-progress-bar");if(progress_bar_El.length<=0)return;var progress_bar_settings={};progress_bar_settings=JSON.parse(progress_bar_El.attr("data-pbar-settings"));if(progress_bar_settings.hfe_progress_bar_enable!=="yes")return;$($window).scroll(function(){var scrollPercent=0,scroll_top=$(window).scrollTop()||0,doc_height=$(document).height()||1,window_height=$(window).height()||1;scrollPercent=scroll_top/(doc_height-window_height)*100;var position=scrollPercent.toFixed(0);scrollPercent>100&&(scrollPercent=100);$(".hfe-progress-bar").css({display:"flex"}),$(".hfe-progress-bar").width(position+"%"),position>1&&scrollPercent>0?($(".hfe-tool-tip").css({opacity:1,transition:"opacity 0.3s"}),$(".hfe-tool-tip").text(position+"%"),position>=98?$(".hfe-tool-tip").css({right:"5px"}):$(".hfe-tool-tip").css({right:"-28px"})):($(".hfe-tool-tip").css({opacity:0,transition:"opacity 0.3s"}),$(".hfe-tool-tip").text("0%"))})})(jQuery,window);'
		);
	}

	/**
	 * Register extension tab
	 *
	 * @param \Elementor\Core\Kits\Documents\Kit $kit
	 * @since x.x.x
	 */
	public function register_extension_tab( \Elementor\Core\Kits\Documents\Kit $kit ) {
		$kit->register_tab( 'hfe-progress-bar-settings', Progress_Bar_Settings::class );
	}

    /**
	 * Add Progress Bar controls
	 *
	 * @param \Elementor\Widget_Base $element Elementor Widget.
	 */
    public function page_progress_bar_controls( $element ) {

        $progress_bar_global = $this->get_elementor_settings( 'hfe_scroll_to_top_global' );

		if ( 'yes' !== $progress_bar_global ) {
			return;
		}

		$element->start_controls_section(
			'hfe_progress_bar_single_section',
			[
				'label' => __( 'Reading Progress Bar', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_SETTINGS,
			]
		);

        $show_progress_bar_global = $this->get_elementor_settings( 'hfe_progress_bar_apply_globally' );

		if( 'globally' === $show_progress_bar_global ) {
			$element->add_control(
				'hfe_progress_bar_single_disable',
				[
					'label'        => __( 'Disable', 'header-footer-elementor' ),
					'description'  => __( 'Disable Reading Progress Bar for this Page', 'header-footer-elementor' ),
					'type'         => Controls_Manager::SWITCHER,
					'default'      => 'no',
					'label_on'     => __( 'Yes', 'header-footer-elementor' ),
					'label_off'    => __( 'No', 'header-footer-elementor' ),
					'return_value' => 'yes',
				]
			);
		} else {
			$element->add_control(
				'hfe_progress_bar_single_enable',
				[
					'label'        => __( 'Enable', 'header-footer-elementor' ),
					'description'  => __( 'Enable Reading Progress Bar for this Page', 'header-footer-elementor' ),
					'type'         => Controls_Manager::SWITCHER,
					'default'      => 'no',
					'label_on'     => __( 'Yes', 'header-footer-elementor' ),
					'label_off'    => __( 'No', 'header-footer-elementor' ),
					'return_value' => 'yes',
				]
			);
		}
		

		$element->end_controls_section();
	}

    /**
	 * Render Progress Bar html
	 *
	 * @since x.x.x
	 */
	public function render_progress_bar_html() {

		$post_id                = get_the_ID();
		$document               = [];
		$document_settings_data = [];

        if ( ! is_singular() && ! is_archive() ) {
			return;
		}

		$is_archive_template = $this->hfe_is_archive_template();
		if( ! empty ( $is_archive_template ) ){
			$template_id = $this->hfe_get_archive_template_id();
			if ( ! empty( $template_id ) ) {
				$post_id = $template_id;
			}
		}

		if ($this->prevent_reading_progress_bar_rendering($post_id)) {
			return;
		}

		$document = Plugin::$instance->documents->get( $post_id, false );

		if ( is_object( $document ) ) {
			$document_settings_data = $document->get_settings();
		}

		$progress_bar_enable = $this->elementor_get_setting('hfe_progress_bar_enable');
		$global_enable = $this->elementor_get_setting('hfe_progress_bar_apply_globally');

		$single_enable = isset( $document_settings_data['hfe_progress_bar_single_enable'] ) ? $document_settings_data['hfe_progress_bar_single_enable'] : 'no' ;
		$single_disable = isset( $document_settings_data['hfe_progress_bar_single_disable'] ) ? $document_settings_data['hfe_progress_bar_single_disable'] : 'no' ;

		$reading_progress_is_enable = false;

		if ( 'yes' === $progress_bar_enable ) {
			
			if ('globally' === $global_enable ) {
				$display_condition = $this->elementor_get_setting('hfe_progress_bar_global_display_condition');

				$current_post_type = get_post_type();
				
				if (is_array($display_condition) && in_array($current_post_type, $display_condition)) {
					$reading_progress_is_enable = true;
				}

				if ($single_disable === 'yes') {
					$reading_progress_is_enable = false;
				}
			} elseif ($global_enable === 'individually') {
				if ($single_enable === 'yes') {
					$reading_progress_is_enable = true;
				}
			}
		}

        $progress_bar_type = $this->elementor_get_setting('hfe_progress_bar_type');
        $horizontal_position = $this->elementor_get_setting('hfe_progress_bar_horizontal_position');
        $enable_horizontal_percentage = $this->elementor_get_setting('hfe_progress_bar_enable_horizontal_percentage');
        $settings_data = [
			'hfe_progress_bar_enable' => $this->elementor_get_setting('hfe_progress_bar_enable'),
		];
        
        if ( Plugin::instance()->preview->is_preview_mode() ) {
			?>
			<div id="hfe-progress-bar-wrapper" class="hfe-progress-bar-container hfe-reading-progress-bar" data-pbar-settings="<?php echo esc_attr(json_encode($settings_data)); ?>" style="opacity:0">
				<div class="hfe-progress-bar">
					<span class="hfe-tool-tip hfe-tool-tip-<?php echo esc_attr($horizontal_position); ?>">0%</span>
				</div>
			</div>

			<script>
				;(function($) {
					'use strict';
					
					var pbar_container = $('.hfe-reading-progress-bar');

					if(pbar_container.pbar_container <= 0) {
						return;
					}

					// Check display on
					var global_enable = "<?php echo $global_enable; ?>";
					var single_enable = "<?php echo $single_enable; ?>";
					var single_disable = "<?php echo $single_disable; ?>";
					
					if( global_enable == 'globally' ) {
						if( single_disable !== 'yes' ) {
							$('.hfe-reading-progress-bar').css({'opacity':1, 'transition':'opacity 0.3s'});
								$('.hfe-progress-bar-container').css({'opacity':1, 'transition':'opacity 0.3s'});
						} else {
							$('.hfe-reading-progress-bar').css({'opacity':0, 'transition':'opacity 0.3s'});
							return;
						}
					} else if ( global_enable == 'individually' ) {
						if ( single_enable !== 'yes' ) {
							$('.hfe-reading-progress-bar').css({'opacity':0, 'transition':'opacity 0.3s'});
							return;
						} else {
							$('.hfe-reading-progress-bar').css({'opacity':1, 'transition':'opacity 0.3s'});
                            $('.hfe-progress-bar-container').css({'opacity':1, 'transition':'opacity 0.3s'});
						}
					}

					// check type
					$('.hfe-progress-bar-container').css({'opacity':1, 'transition':'opacity 0.3s'});
					
					window.addEventListener('message',function(e) {
						var data = e.data;
						
						if( 'rpbMessage' == data.check ) {

							if (e.origin != window.origin) {
								return;
							}
							if (e.source.location.href != window.parent.location.href) {
								return;
							}

							var changeValue = data.changeValue;
							var changeItem = data.changeItem;
							var rpbDefaultType = "<?php echo $progress_bar_type;  ?>";

							// Check enable
							if (changeItem[0] == 'hfe_progress_bar_enable') {
								if ( changeValue == 'yes' ) {
									$('.hfe-reading-progress-bar').css({'opacity':1, 'transition':'opacity 0.3s'});
                                    $('.hfe-progress-bar-container').css({'opacity':1, 'transition':'opacity 0.3s'});
								} else {
									$('.hfe-reading-progress-bar').css({'opacity':0, 'transition':'opacity 0.3s'});
								}
							}

							// Check display on
							if ( changeItem[0] == 'hfe_progress_bar_apply_globally' ) {
								var single_enable = "<?php echo $single_enable; ?>";
								var single_disable = "<?php echo $single_disable; ?>";
								
								if( changeValue == 'globally' ) {
									if( single_disable !== 'yes' ) {
										$('.hfe-reading-progress-bar').css({'opacity':1, 'transition':'opacity 0.3s'});
                                        $('.hfe-progress-bar-container').css({'opacity':1, 'transition':'opacity 0.3s'});
									}
								} else if ( changeValue == 'individually' ) {
									if ( single_enable !== 'yes' ) {
										$('.hfe-reading-progress-bar').css({'opacity':0, 'transition':'opacity 0.3s'});
										return;
									}
								} 
								
							}

							// Check type
							if ( changeItem[0] == 'hfe_progress_bar_type' ) {
								rpbDefaultType = changeValue;
								$('.hfe-progress-bar-container').css({'opacity':1, 'transition':'opacity 0.3s'});
							}

							// Start scrolling
							$(window).scroll(function () {
								var scrollPercent = 0;
								var scroll_top = $(window).scrollTop() || 0,
									doc_height = $(document).height() || 1,
									window_height = $(window).height() || 1;
								scrollPercent = ( scroll_top / (doc_height - window_height) ) * 100;
								var position = scrollPercent.toFixed(0);

								if (scrollPercent > 100) {
									scrollPercent = 100;
								}
								
								$('.hfe-progress-bar').css({'display': 'flex'});
                                $('.hfe-progress-bar').width(position + '%');

                                if (position > 1 && scrollPercent > 0 ) {
                                    $('.hfe-tool-tip').css({'opacity':1, 'transition':'opacity 0.3s'});
                                    $('.hfe-tool-tip').text(position + '%');
                                    if( position >= 98 ) {
                                        $('.hfe-tool-tip').css({'right':'5px'});
                                    } else {
                                        $('.hfe-tool-tip').css({'right':'-28px'});
                                    }
                                } else {
                                    $('.hfe-tool-tip').css({'opacity':0, 'transition':'opacity 0.3s'});
                                    $('.hfe-tool-tip').text('0%');
                                }

							});

							// check horizontal tool tip
							if ( changeItem[0] == 'hfe_progress_bar_horizontal_position' ) {
								if ( changeValue == 'bottom' ) {
									$('.hfe-progress-bar .hfe-tool-tip').removeClass('hfe-tool-tip-top');
									$('.hfe-progress-bar .hfe-tool-tip').addClass('hfe-tool-tip-bottom');
								} else if( changeValue == 'top' ) {
									$('.hfe-progress-bar .hfe-tool-tip').removeClass('hfe-tool-tip-bottom');
									$('.hfe-progress-bar .hfe-tool-tip').addClass('hfe-tool-tip-top');
								}
							}

						}

					});
					
				}(jQuery));
			</script>

		<?php }

		if ( ! Plugin::instance()->preview->is_preview_mode() ) {
			
			if( ! $reading_progress_is_enable ) {
				return;
			}
            ?>
			<div id="hfe-progress-bar-wrapper" class="hfe-progress-bar-container hfe-reading-progress-bar" data-pbar-settings="<?php echo esc_attr(json_encode($settings_data)); ?>">
				<div class="hfe-progress-bar">
					<span class="hfe-tool-tip hfe-tool-tip-<?php echo esc_attr($horizontal_position); ?>">0%</span>
				</div>
			</div>
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
				// get auto save data
				$kit = \Elementor\Plugin::$instance->documents->get_doc_for_frontend( \Elementor\Plugin::$instance->kits_manager->get_active_id() );
			} else {
				$kit = \Elementor\Plugin::$instance->documents->get( \Elementor\Plugin::$instance->kits_manager->get_active_id(), true );
			}
			$extensions_settings['kit_settings'] = $kit->get_settings();
		}

		if ( isset( $extensions_settings['kit_settings'][ $setting_id ] ) ) {
			$return = $extensions_settings['kit_settings'][ $setting_id ];
		}

		return $return;
	}

    public function prevent_reading_progress_bar_rendering($post_id)
    {
        $get_template_name = get_post_meta( $post_id, '_elementor_template_type', true);
        $template_list = [
            'header',
            'footer',
            'section',
            'search-results',
            'error-404',
        ];

        return in_array($get_template_name, $template_list);
    }

    /**
     * Check if current template is theme archive.
     */
    public function hfe_is_archive_template( $type = 'archive' ): bool {
		$is_archive_template = false;

		if ( class_exists( 'ElementorPro\Modules\ThemeBuilder\Module' ) ) {
			$conditions_manager = \ElementorPro\Plugin::instance()->modules_manager->get_modules( 'theme-builder' )->get_conditions_manager();
		
			if( ! empty( $conditions_manager->get_documents_for_location( 'archive') ) || ! empty( $conditions_manager->get_documents_for_location( 'single') ) ) {
				$is_archive_template = true;
			}
		}

		return $is_archive_template;
	}

    /**
     * Get current template ID.
     */
	public function hfe_get_archive_template_id() {
		$template_id = 0;
		if ( class_exists( 'ElementorPro\Modules\ThemeBuilder\Module' ) ) {
			if ( $this->hfe_is_archive_template() ) {
				$page_body_classes = get_body_class();

				if( is_array( $page_body_classes ) && count( $page_body_classes ) ){
					foreach( $page_body_classes as $page_body_class){
						if ( strpos( $page_body_class, 'elementor-page-' ) !== FALSE ) {
							$template_id = intval( str_replace('elementor-page-', '', $page_body_class) );
						} 
					}
				}
			}
		}

		return $template_id;
	}

}

Progress_Bar::instance();