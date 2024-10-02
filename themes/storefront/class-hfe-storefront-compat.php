<?php

declare(strict_types=1);

/**
 * HFE_Storefront_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Astra theme compatibility.
 */
class HFE_Storefront_Compat
{
    /**
     * Instance of HFE_Storefront_Compat.
     *
     * @var $HFE_Storefront_Compat
     */
    private static $instance = null;

    /**
     *  Initiator
     */
    // phpcs:ignore
    public static function instance(): HFE_Storefront_Compat
    {
        if (! isset(self::$instance)) {
            self::$instance = new HFE_Storefront_Compat();

            add_action('wp', [ self::$instance, 'hooks' ]);
        }

        return self::$instance;
    }

    /**
     * Run all the Actions / Filters.
     */
    // phpcs:ignore
    public function hooks(): void
    {
        if (hfe_header_enabled()) {
            add_action('template_redirect', [ $this, 'setup_header' ], 10);
            add_action('storefront_before_header', 'hfe_render_header', 500);
        }

        if (hfe_footer_enabled()) {
            add_action('template_redirect', [ $this, 'setup_footer' ], 10);
            add_action('storefront_after_footer', 'hfe_render_footer', 500);
        }

        if (hfe_is_before_footer_enabled()) {
            add_action('storefront_before_footer', 'hfe_render_before_footer');
        }

        if (hfe_header_enabled() || hfe_footer_enabled()) {
            add_action('wp_enqueue_scripts', [ $this, 'styles' ]);
        }
    }

    /**
     * Add inline CSS to hide empty divs for header and footer in storefront
     *
     * @since 1.2.0
     *
     * // phpcs:ignore
     */
    // phpcs:ignore
    public function styles(): void
    {
        $css = '';

        if (hfe_header_enabled() === true) {
            $css .= '.site-header {
				display: none;
			}';
        }

        if (hfe_footer_enabled() === true) {
            $css .= '.site-footer {
				display: none;
			}';
        }

        wp_add_inline_style('hfe-style', $css);
    }

    /**
     * Disable header from the theme.
     *
     * @return void
     *
     * // phpcs:ignore
     */
    // phpcs:ignore
    public function setup_header(): void
    {
        for ($priority = 0; $priority < 200; $priority++) {
            remove_all_actions('storefront_header', $priority);
        }
    }
    // phpcs:ignore
    /**
     * Disable footer from the theme.
     * // phpcs:ignore
     */
    // phpcs:ignore
    public function setup_footer(): void
    {
        for ($priority = 0; $priority < 200; $priority++) {
            remove_all_actions('storefront_footer', $priority);
        }
    }
}

HFE_Storefront_Compat::instance();
