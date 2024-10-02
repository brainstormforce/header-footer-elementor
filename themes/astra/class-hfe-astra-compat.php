<?php

declare(strict_types=1);

/**
 * HFE_Astra_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Astra theme compatibility.
 */
class HFE_Astra_Compat
{
    /**
     * Instance of HFE_Astra_Compat.
     */
    private static HFE_Astra_Compat $instance;

    /**
     *  Initiator
     */
    public static function instance(): HFE_Astra_Compat
    {
        if (! isset(self::$instance)) {
            self::$instance = new HFE_Astra_Compat();

            add_action('wp', [ self::$instance, 'hooks' ]);
        }

        return self::$instance;
    }

    /**
     * Run all the Actions / Filters.
     */
    public function hooks(): void
    {
        if (hfe_header_enabled()) {
            add_action('template_redirect', [ $this, 'astra_setup_header' ], 10);
            add_action('astra_header', 'hfe_render_header');
        }

        if (hfe_footer_enabled()) {
            add_action('template_redirect', [ $this, 'astra_setup_footer' ], 10);
            add_action('astra_footer', 'hfe_render_footer');
        }

        if (hfe_is_before_footer_enabled()) {
            add_action('astra_footer_before', 'hfe_render_before_footer');
        }
    }

    /**
     * Disable header from the theme.
     */
    public function astra_setup_header(): void
    {
        remove_action('astra_header', 'astra_header_markup');

        // Remove the new header builder action.
        if (class_exists('Astra_Builder_Helper') && Astra_Builder_Helper::$is_header_footer_builder_active) {
            remove_action('astra_header', [ Astra_Builder_Header::get_instance(), 'prepare_header_builder_markup' ]);
        }
    }

    /**
     * Disable footer from the theme.
     */
    public function astra_setup_footer(): void
    {
        remove_action('astra_footer', 'astra_footer_markup');

        // Remove the new footer builder action.
        if (class_exists('Astra_Builder_Helper') && Astra_Builder_Helper::$is_header_footer_builder_active) {
            remove_action('astra_footer', [ Astra_Builder_Footer::get_instance(), 'footer_markup' ]);
        }
    }
}

HFE_Astra_Compat::instance();
