<?php

declare(strict_types=1);

/**
 * Support all themes.
 *
 * @package header-footer-elementor
 */

namespace HFE\Themes;

/**
 * Global theme compatibility.
 */
class Global_Theme_Compatibility
{
    /**
     *  Initiator
     */
    public function __construct()
    {
        add_action('wp', [ $this, 'hooks' ]);
    }

    /**
     * Run all the Actions / Filters.
     */
    // phpcs:ignore
    public function hooks(): void
    {
        if (hfe_header_enabled()) {
            // Replace header.php.
            add_action('get_header', [ $this, 'option_override_header' ]);

            add_action('wp_body_open', [ 'Header_Footer_Elementor', 'get_header_content' ]);
            add_action('hfe_fallback_header', [ 'Header_Footer_Elementor', 'get_header_content' ]);
        }

        if (hfe_is_before_footer_enabled()) {
            add_action('wp_footer', [ 'Header_Footer_Elementor', 'get_before_footer_content' ], 20);
        }

        if (hfe_footer_enabled()) {
            add_action('wp_footer', [ 'Header_Footer_Elementor', 'get_footer_content' ], 50);
        }

        if (hfe_header_enabled() || hfe_footer_enabled()) {
            add_action('wp_enqueue_scripts', [ $this, 'force_fullwidth' ]);
        }
    }

    /**
     * Force full width CSS for the header.
     *
     * @since 1.2.0
     *
     *  // phpcs:ignore
     */
    // phpcs:ignore
    public function force_fullwidth(): void
    {
        $css = '
		.force-stretched-header {
			width: 100vw;
			position: relative;
			margin-left: -50vw;
			left: 50%;
		}';

        if (hfe_header_enabled() === true) {
            $css .= 'header#masthead {
				display: none;
			}';
        }

        if (hfe_footer_enabled() === true) {
            $css .= 'footer#colophon {
				display: none;
			}';
        }

        wp_add_inline_style('hfe-style', $css);
    }

    /**
     * Function overriding the header in the wp_body_open way.
     *
     * @since 1.2.0
     *
     * // phpcs:ignore
     */
    // phpcs:ignore
    public function option_override_header(): void
    {
        $templates = [];
        $templates[] = 'header.php';
        locate_template($templates, true);

        if (! did_action('wp_body_open')) {
            echo '<div class="force-stretched-header">';
            do_action('hfe_fallback_header');
            echo '</div>';
        }
    }
}
new Global_Theme_Compatibility();
