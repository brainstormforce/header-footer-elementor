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
        
        // Validate $post is an object and has ID property
        if ( ! is_object( $post ) || ! isset( $post->ID ) || ! is_numeric( $post->ID ) ) {
            return false;
        }
        
        // Sanitize post ID
        $post_id = absint( $post->ID );
        if ( ! $post_id ) {
            return false;
        }
        
        $post_type = get_post_type( $post_id );
        $template_type = get_post_meta( $post_id, 'ehf_template_type', true );
        
        // Sanitize template type
        $template_type = sanitize_text_field( $template_type );
        
        return ( 'elementor-hf' === $post_type && 'type_header' === $template_type );
    }

    /**
     * Generate promotional teaser template
     */
    private function get_teaser_template( $args ) {
        // Validate input is array
        if ( ! is_array( $args ) ) {
            $args = [];
        }
        
        $defaults = [
            'description' => '',
            'upgrade_text' => __( 'Upgrade Now', 'header-footer-elementor' ),
            'upgrade_url' => '',
        ];

        $args = wp_parse_args( $args, $defaults );
        
        // Additional sanitization
        $description = sanitize_text_field( $args['description'] );
        $upgrade_text = sanitize_text_field( $args['upgrade_text'] );
        $upgrade_url = esc_url_raw( $args['upgrade_url'] );
        
        // Validate URL
        if ( ! filter_var( $upgrade_url, FILTER_VALIDATE_URL ) ) {
            $upgrade_url = '#';
        }

        $html = '
        <div class="hfe-promotion-box">
            <div class="hfe-promo-content">
                <div class="hfe-promo-description">' . esc_html( $description ) . '</div>
                 <a href="' . esc_url( $upgrade_url ) . '" target="_blank" rel="noopener noreferrer" class="hfe-promo-button elementor-button e-accent dialog-button">
                    ' . esc_html( $upgrade_text ) . '
                </a>
            </div>
        </div>
        <style>
        .hfe-promo-description{
            line-height: 19.5px;
            font-size: 13px;
        }
        .hfe-promo-button{
            margin-top:10px;
        }
        .hfe-lock.eicon-lock:hover{
            color: #93003f;
        }
        </style>
        ';

        return $html;
    }

    /**
     * Get sanitized promotion label
     */
    private function get_promotion_label( $feature_name ) {
        $feature_name = sanitize_text_field( $feature_name );
        $lock_icon = '<i class="hfe-lock eicon-lock"></i>';
        
        // Using sprintf for better string formatting
        return sprintf(
            /* translators: %1$s: Feature name, %2$s: Lock icon */
            __( 'UAE - %1$s %2$s', 'header-footer-elementor' ),
            esc_html( $feature_name ),
            $lock_icon // This is safe as it's hardcoded HTML
        );
    }

    /**
     * Add Particles extension promotion
     */
    public function add_particles_promotion( $element ) {
        $element->start_controls_section(
            'hfe_particles_promo',
            [
                'label' => $this->get_promotion_label( __( 'Particle Backgrounds', 'header-footer-elementor' ) ),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $element->add_control(
            'hfe_particles_promo_content',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $this->get_teaser_template([
                    'description' => __( 'Use Particle Backgrounds and other Pro features to extend your toolbox with more control and flexibility.', 'header-footer-elementor' ),
                    'upgrade_url' => 'https://ultimateelementor.com/pricing/?utm_source=plugin-editor&utm_medium=particle-background-promo&utm_campaign=uae-upgrade',
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
                'label' => $this->get_promotion_label( __( 'Display Conditions', 'header-footer-elementor' ) ),
                'tab' => Controls_Manager::TAB_ADVANCED,
            ]
        );

        $element->add_control(
            'hfe_display_conditions_promo_content',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $this->get_teaser_template([
                    'description' => __( 'Use Advanced Display Condition and other Pro features to extend your toolbox with more control and flexibility.', 'header-footer-elementor' ),
                    'upgrade_url' => 'https://ultimateelementor.com/pricing/?utm_source=plugin-editor&utm_medium=display-conditions-promo&utm_campaign=uae-upgrade',
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
                'label' => $this->get_promotion_label( __( 'Party Propz', 'header-footer-elementor' ) ),
                'tab' => Controls_Manager::TAB_ADVANCED,
            ]
        );

        $element->add_control(
            'hfe_party_propz_promo_content',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $this->get_teaser_template([
                    'description' => __( 'Use Party Propz and other Pro features to extend your toolbox with more control and flexibility.', 'header-footer-elementor' ),
                    'upgrade_url' => 'https://ultimateelementor.com/pricing/?utm_source=plugin-editor&utm_medium=party-propz-promo&utm_campaign=uae-upgrade',
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
                'label' => $this->get_promotion_label( __( 'Sticky Header', 'header-footer-elementor' ) ),
                'tab' => Controls_Manager::TAB_ADVANCED,
            ]
        );

        $element->add_control(
            'hfe_sticky_header_promo_content',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $this->get_teaser_template([
                    'description' => __( 'Use Sticky Header and other Pro features to extend your toolbox with more control and flexibility.', 'header-footer-elementor' ),
                    'upgrade_url' => 'https://ultimateelementor.com/pricing/?utm_source=plugin-editor&utm_medium=sticky-header-promo&utm_campaign=uae-upgrade',
                ]),
            ]
        );

        $element->end_controls_section();
    }

}

// Initialize the promotion class
new HFE_Promotion();
