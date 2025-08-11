<?php
/**
 * HFE Promotion Class
 * 
 * Promotes Ultimate Elementor extensions within Header Footer Elementor
 *
 * @package header-footer-elementor
 */

namespace HFE\Extensions;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

use Elementor\Controls_Manager;

/**
 * Class HFE_Promotion
 */
class HFE_Promotion {

    /**
     * Constructor
     */
    public function __construct() {
        // Only show promotions if Ultimate Elementor Pro is not active
        if ( ! $this->is_ultimate_elementor_active() ) {
            $this->init_hooks();
        }
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Particles Extension - Add to section/column/container background sections
        add_action( 'elementor/element/section/section_background/after_section_end', [ $this, 'add_particles_promotion' ], 10 );
        add_action( 'elementor/element/column/section_style/after_section_end', [ $this, 'add_particles_promotion' ], 10 );
        add_action( 'elementor/element/container/section_background/after_section_end', [ $this, 'add_particles_promotion' ], 10 );
        
        // Display Conditions - Add to section/column/container advanced sections and common widgets
        add_action( 'elementor/element/section/section_advanced/after_section_end', [ $this, 'add_display_conditions_promotion' ], 10 );
        add_action( 'elementor/element/column/section_advanced/after_section_end', [ $this, 'add_display_conditions_promotion' ], 10 );
        add_action( 'elementor/element/container/section_layout/after_section_end', [ $this, 'add_display_conditions_promotion' ], 10 );
        add_action( 'elementor/element/common/_section_style/after_section_end', [ $this, 'add_display_conditions_promotion' ], 10 );
        
        // Party Propz Extension - Add to section/column/container advanced sections and common widgets
        add_action( 'elementor/element/section/section_advanced/after_section_end', [ $this, 'add_party_propz_promotion' ], 10 );
        add_action( 'elementor/element/column/section_advanced/after_section_end', [ $this, 'add_party_propz_promotion' ], 10 );
        add_action( 'elementor/element/container/section_layout/after_section_end', [ $this, 'add_party_propz_promotion' ], 10 );
        add_action( 'elementor/element/common/_section_style/after_section_end', [ $this, 'add_party_propz_promotion' ], 10 );
        
        // Sticky Header - Only for header templates (check if we're in header context)
        add_action( 'elementor/element/section/section_advanced/after_section_end', [ $this, 'add_sticky_header_promotion' ], 10 );
        add_action( 'elementor/element/container/section_layout/after_section_end', [ $this, 'add_sticky_header_promotion' ], 10 );
        
        // Cross Domain Copy Paste - Add to Elementor editor
        add_action( 'elementor/editor/after_enqueue_scripts', [ $this, 'add_cross_domain_copy_paste_promotion' ] );
    }

    /**
     * Check if Ultimate Elementor Pro is active
     */
    private function is_ultimate_elementor_active() {
        return defined( 'UAEL_PRO' ) && UAEL_PRO;
    }

    /**
     * Check if we're editing a header template
     */
    private function is_header_template() {
        global $post;
        if ( ! $post ) {
            return false;
        }
        
        $post_type = get_post_type( $post->ID );
        $template_type = get_post_meta( $post->ID, 'ehf_template_type', true );
        
        return ( 'elementor-hf' === $post_type && 'type_header' === $template_type );
    }

    /**
     * Generate promotional teaser template
     */
    private function get_teaser_template( $args ) {
        $defaults = [
            'title' => '',
            'description' => '',
            'features' => [],
            'upgrade_text' => __( 'Upgrade to Pro', 'header-footer-elementor' ),
            'upgrade_url' => 'https://ultimateelementor.com/pricing/',
            'demo_url' => '',
        ];

        $args = wp_parse_args( $args, $defaults );

        $features_html = '';
        if ( ! empty( $args['features'] ) ) {
            $features_html = '<ul class="hfe-promo-features">';
            foreach ( $args['features'] as $feature ) {
                $features_html .= '<li>✓ ' . esc_html( $feature ) . '</li>';
            }
            $features_html .= '</ul>';
        }

        $demo_button = '';
        if ( ! empty( $args['demo_url'] ) ) {
            $demo_button = '<a href="' . esc_url( $args['demo_url'] ) . '" target="_blank" class="hfe-promo-demo-btn">
                ' . __( 'View Demo', 'header-footer-elementor' ) . '
            </a>';
        }

        $html = '
        <div class="hfe-promotion-box">
           
            <div class="hfe-promo-content">
                <div class="hfe-promo-description">' . esc_html( $args['description'] ) . '</div>
                ' . $features_html . '
            </div>
            <div class="hfe-promo-footer">
                ' . $demo_button . '
                <a href="' . esc_url( $args['upgrade_url'] ) . '" target="_blank" class="hfe-promo-button elementor-button elementor-button-default">
                    ' . esc_html( $args['upgrade_text'] ) . '
                </a>
            </div>
        </div>
        <style>
        .hfe-promotion-box {
            background: linear-gradient(135deg, #3D0ED6, #4E1FFF);
            border-radius: 8px;
            padding: 20px;
            color: white;
            text-align: center;
            margin: 10px 0;
        }
        .hfe-promo-header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
        }
        .hfe-promo-icon {
            font-size: 24px;
            margin-right: 10px;
        }
        .hfe-promo-title {
            font-size: 18px;
            font-weight: 600;
        }
        .hfe-promo-description {
            font-size: 14px;
            margin-bottom: 15px;
            opacity: 0.9;
        }
        .hfe-promo-features {
            list-style: none;
            padding: 0;
            margin: 15px 0;
            text-align: left;
        }
        .hfe-promo-features li {
            padding: 5px 0;
            font-size: 13px;
        }
        .hfe-promo-footer {
            display: flex;
            flex-direction: row;
            gap: 10px;
            justify-content: center;
            flex-wrap: nowrap;
        }
        .hfe-promo-button, .hfe-promo-demo-btn {
            background: rgba(255,255,255,0.2) !important;
            border: 1px solid rgba(255,255,255,0.3) !important;
            color: white !important;
            padding: 5px 10px !important;
            border-radius: 5px !important;
            text-decoration: none !important;
            display: inline-block !important;
            transition: all 0.3s ease !important;
            font-size: 12px !important;
        }
        .hfe-promo-button:hover, .hfe-promo-demo-btn:hover {
            background: rgba(255,255,255,0.3) !important;
            transform: translateY(-2px);
            color: white !important;
        }
        </style>';

        return $html;
    }

    /**
     * Add Particles extension promotion
     */
    public function add_particles_promotion( $element ) {
        $element->start_controls_section(
            'hfe_particles_promo',
            [
                'label' => __( 'UAE - Particle Backgrounds', 'header-footer-elementor' ),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $element->add_control(
            'hfe_particles_promo_content',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $this->get_teaser_template([
                    'title' => __( 'Particle Backgrounds', 'header-footer-elementor' ),
                    'description' => __( 'Add stunning animated particle backgrounds to your sections, columns, and containers.', 'header-footer-elementor' ),
                    'features' => [
                        'NASA, Snow, Christmas themes',
                        'Custom particle configurations',
                        'Interactive animations',
                        'Performance optimized',
                        'Mobile responsive'
                    ],
                    'demo_url' => 'https://ultimateelementor.com/particles-background/',
                ]),
            ]
        );

        $element->end_controls_section();
    }

    /**
     * Add Display Conditions extension promotion
     */
    public function add_display_conditions_promotion( $element ) {
        $element->start_controls_section(
            'hfe_display_conditions_promo',
            [
                'label' => __( 'UAE - Display Conditions', 'header-footer-elementor' ),
                'tab' => Controls_Manager::TAB_ADVANCED,
            ]
        );

        $element->add_control(
            'hfe_display_conditions_promo_content',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $this->get_teaser_template([
                    'title' => __( 'Display Conditions', 'header-footer-elementor' ),
                    'description' => __( 'Control when and where your content appears with advanced conditional logic.', 'header-footer-elementor' ),
                    'features' => [
                        'User role based visibility',
                        'Date & time conditions',
                        'Device & browser targeting',
                        'Location based display',
                        'Custom PHP conditions'
                    ],
                    'demo_url' => 'https://ultimateelementor.com/display-conditions/',
                ]),
            ]
        );

        $element->end_controls_section();
    }

    /**
     * Add Party Propz extension promotion
     */
    public function add_party_propz_promotion( $element ) {
        $element->start_controls_section(
            'hfe_party_propz_promo',
            [
                'label' => __( 'UAE - Party Propz', 'header-footer-elementor' ),
                'tab' => Controls_Manager::TAB_ADVANCED,
            ]
        );

        $element->add_control(
            'hfe_party_propz_promo_content',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $this->get_teaser_template([
                    'title' => __( 'Party Propz Extension', 'header-footer-elementor' ),
                    'description' => __( 'Add festive animations and effects to celebrate special occasions and events.', 'header-footer-elementor' ),
                    'features' => [
                        'Confetti animations',
                        'Fireworks effects',
                        'Balloon animations',
                        'Snow falling effects',
                        'Custom celebration themes'
                    ],
                    'demo_url' => 'https://ultimateelementor.com/party-propz/',
                ]),
            ]
        );

        $element->end_controls_section();
    }

    /**
     * Add Sticky Header extension promotion (only for header templates)
     */
    public function add_sticky_header_promotion( $element ) {
        // Only show for header templates
        if ( ! $this->is_header_template() ) {
            return;
        }

        $element->start_controls_section(
            'hfe_sticky_header_promo',
            [
                'label' => __( 'UAE - Sticky Header', 'header-footer-elementor' ),
                'tab' => Controls_Manager::TAB_ADVANCED,
            ]
        );

        $element->add_control(
            'hfe_sticky_header_promo_content',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $this->get_teaser_template([
                    'title' => __( 'Sticky Header', 'header-footer-elementor' ),
                    'description' => __( 'Make your header stick to the top when users scroll for better navigation.', 'header-footer-elementor' ),
                    'features' => [
                        'Smart sticky behavior',
                        'Offset controls',
                        'Hide on scroll options',
                        'Mobile responsive',
                        'Custom animations'
                    ],
                    'demo_url' => 'https://ultimateelementor.com/sticky-header/',
                ]),
            ]
        );

        $element->end_controls_section();
    }

    /**
     * Add Cross Domain Copy Paste promotion
     */
    public function add_cross_domain_copy_paste_promotion() {
        // Add a notice in the Elementor editor about cross-domain copy paste
        ?>
        <script>
        jQuery(document).ready(function($) {
            if (typeof elementor !== 'undefined') {
                elementor.once('preview:loaded', function() {
                    // Add promotion notice for cross-domain copy paste
                    var promoHtml = '<div class="hfe-cross-domain-promo" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; margin: 10px; border-radius: 8px; text-align: center;">' +
                        '<div style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">🔄 Cross-Domain Copy Paste</div>' +
                        '<div style="font-size: 14px; margin-bottom: 15px;">Copy elements between different websites seamlessly with Ultimate Elementor Pro.</div>' +
                        '<div>' +
                            '<a href="https://ultimateelementor.com/cross-domain-copy-paste/" target="_blank" style="background: rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; margin-right: 10px; font-size: 14px;">View Demo</a>' +
                            '<a href="https://ultimateelementor.com/pricing/" target="_blank" style="background: rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 14px;">Upgrade Now</a>' +
                        '</div>' +
                    '</div>';
                    
                    // Add to Elementor panel
                    setTimeout(function() {
                        if ($('#elementor-panel-elements-search-area').length) {
                            $('#elementor-panel-elements-search-area').after(promoHtml);
                        }
                    }, 2000);
                });
            }
        });
        </script>
        <?php
    }
}

// Initialize the promotion class
new HFE_Promotion();
