<?php
/**
 * Reading Progress Bar Extension
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Extensions;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * HFE Reading Progress Bar extension class
 */
class Reading_Progress_Bar {

    /**
     * Instance
     *
     * @var null
     */
    private static $_instance = null;

    /**
     * Get instance
     *
     * @return self
     */
    public static function instance() {
        if ( ! isset( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        require_once HFE_DIR . '/inc/widgets-manager/extensions/class-reading-progress-bar-settings.php';

        add_action( 'elementor/kit/register_tabs', [ $this, 'register_extension_tab' ], 1, 40 );
        add_action( 'elementor/documents/register_controls', [ $this, 'page_controls' ], 10 );

        add_action( 'wp_footer', [ $this, 'render_progress_bar' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    /**
     * Enqueue inline script
     */
    public function enqueue_scripts() {
        wp_enqueue_script( 'jquery' );
        $script = "!function($){'use strict';$(document).ready(function(){var bar=$('.hfe-reading-progress-bar');if(!bar.length)return;$(window).on('scroll',function(){var s=$(window).scrollTop(),d=$(document).height()-$(window).height(),p=d? s/d*100:0;bar.css('width',p+'%')});});}(jQuery);";
        wp_add_inline_script( 'jquery', $script );
    }

    /**
     * Register extension tab
     */
    public function register_extension_tab( \Elementor\Core\Kits\Documents\Kit $kit ) {
        $kit->register_tab( 'hfe-reading-progress-bar', Reading_Progress_Bar_Settings::class );
    }

    /**
     * Render progress bar markup
     */
    public function render_progress_bar() {
        $post_id  = get_the_ID();
        $document = [];
        $doc_settings = [];

        if ( \Elementor\Plugin::instance()->preview->is_preview_mode() ) {
            $document = \Elementor\Plugin::$instance->documents->get_doc_for_frontend( $post_id );
        } else {
            $document = \Elementor\Plugin::$instance->documents->get( $post_id, false );
        }
        if ( isset( $document ) && is_object( $document ) ) {
            $doc_settings = $document->get_settings();
        }

        $enable_global = $this->get_elementor_settings( 'hfe_reading_progress_enable' );
        $show_bar      = false;
        if ( 'yes' === $enable_global ) {
            $display_on = $this->get_elementor_settings( 'hfe_reading_progress_display_on' );
            
            // If display_on is not an array, convert it to one for consistency
            if (!is_array($display_on)) {
                $display_on = [$display_on];
            }
            
            // Check if "all" is selected or if the current post type is in the selected types
            if (in_array('all', $display_on, true) || in_array(get_post_type($post_id), $display_on, true)) {
                $show_bar = true;
            }
        }
        if ( isset( $doc_settings['hfe_reading_progress_disable'] ) && 'yes' === $doc_settings['hfe_reading_progress_disable'] ) {
            $show_bar = false;
        }
        if ( $show_bar ) {
            $position = $this->get_elementor_settings( 'hfe_reading_progress_position' );
            $style_container = 'position:fixed;left:0;width:100%;z-index:99999;';
            if ( 'top' === $position ) {
                // Add margin-top if user is logged in to account for the admin bar
                if ( is_admin_bar_showing() && $position === 'top' ) {
                    $style_container .= 'margin-top:30px;';
                }
            }
            $style_bar = 'width:0;';
            $html = "<div class='hfe-reading-progress' style='{$style_container}'><div class='hfe-reading-progress-bar' style='{$style_bar}'></div></div>";
            echo wp_kses_post( $html );
        }

       
    }

    /**
     * Get kit settings
     */
    public function get_elementor_settings( $setting_id ) {
        $return = '';
        $extensions_settings = [];

        if ( ! isset( $extensions_settings['kit_settings'] ) ) {
            if ( \Elementor\Plugin::instance()->preview->is_preview_mode() ) {
                $kit = \Elementor\Plugin::$instance->documents->get_doc_for_frontend( \Elementor\Plugin::$instance->kits_manager->get_active_id() );
            } else {
                $kit = \Elementor\Plugin::$instance->documents->get( \Elementor\Plugin::$instance->kits_manager->get_active_id(), true );
            }
            if ( isset( $kit ) && is_object( $kit ) ) {
                $extensions_settings['kit_settings'] = $kit->get_settings();
            }
        }

        if ( isset( $extensions_settings['kit_settings'][ $setting_id ] ) ) {
            $return = $extensions_settings['kit_settings'][ $setting_id ];
        }
        return $return;
    }

    /**
     * Add page level controls
     */
    public function page_controls( $element ) {
        $enable_global = $this->get_elementor_settings( 'hfe_reading_progress_enable' );
        if ( 'yes' !== $enable_global ) {
            return;
        }

        $element->start_controls_section(
            'hfe_reading_progress_single_section',
            [
                'label' => __( 'Reading Progress Bar', 'header-footer-elementor' ),
                'tab'   => Controls_Manager::TAB_SETTINGS,
            ]
        );

        $element->add_control(
            'hfe_reading_progress_disable',
            [
                'label'        => __( 'Disable For This Page', 'header-footer-elementor' ),
                'type'         => Controls_Manager::SWITCHER,
                'default'      => '',
                'label_on'     => __( 'Yes', 'header-footer-elementor' ),
                'label_off'    => __( 'No', 'header-footer-elementor' ),
                'return_value' => 'yes',
                'description'  => __('Note: Changes will be applied on the frontend.', 'header-footer-elementor'),
            ]
        );

        $element->end_controls_section();
    }
}

Reading_Progress_Bar::instance();
