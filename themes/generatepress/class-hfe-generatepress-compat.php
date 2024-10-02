<?php

declare(strict_types=1);

/**
 * GeneratepressCompatibility.
 *
 * @package  header-footer-elementor
 */

/**
 * HFE_GeneratePress_Compat setup
 *
 * @since 1.0
 */
class HFE_GeneratePress_Compat
{
    /**
     * Instance of HFE_GeneratePress_Compat
     */
    private static ?HFE_GeneratePress_Compat $instance = null;

    /**
     *  Initiator
     */
    // phpcs:ignore
    public static function instance(): HFE_GeneratePress_Compat
    {
        if (! isset(self::$instance)) {
            self::$instance = new HFE_GeneratePress_Compat();

            add_action('wp', [ self::$instance, 'hooks' ]);
        }

        return self::$instance;
    }

    /**
     * Run all the Actions / Filters.
     * // phpcs:ignore
     */
    // phpcs:ignore
    public function hooks(): void
    {
        if (hfe_header_enabled()) {
            add_action('template_redirect', [ $this, 'generatepress_setup_header' ]);
            add_action('generate_header', 'hfe_render_header');
        }

        if (hfe_is_before_footer_enabled()) {
            add_action('generate_footer', [ 'Header_Footer_Elementor', 'get_before_footer_content' ], 5);
        }

        if (hfe_footer_enabled()) {
            add_action('template_redirect', [ $this, 'generatepress_setup_footer' ]);
            add_action('generate_footer', 'hfe_render_footer');
        }
    }

    /**
     * Disable header from the theme.
     * // phpcs:ignore
     */
    // phpcs:ignore
    public function generatepress_setup_header(): void
    {
        remove_action('generate_header', 'generate_construct_header');
    }

    /**
     * Disable footer from the theme.
     *
     * // phpcs:ignore
     */
    // phpcs:ignore
    public function generatepress_setup_footer(): void
    {
        remove_action('generate_footer', 'generate_construct_footer_widgets', 5);
        remove_action('generate_footer', 'generate_construct_footer');
    }
}

HFE_GeneratePress_Compat::instance();
