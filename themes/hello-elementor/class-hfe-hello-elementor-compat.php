<?php

declare(strict_types=1);

/**
 * HFE_Hello_Elementor_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Hello Elementor compatibility.
 */
class HFE_Hello_Elementor_Compat
{
    /**
     * Instance of HFE_Hello_Elementor_Compat.
     */
    private static ?HFE_Hello_Elementor_Compat $instance = null;

    /**
     *  Initiator
     */
    // phpcs:ignore
    public static function instance(): HFE_Hello_Elementor_Compat
    {
        if (! isset(self::$instance)) {
            self::$instance = new HFE_Hello_Elementor_Compat();

            if (! class_exists('HFE_Default_Compat')) {
                require_once HFE_DIR . 'themes/default/class-hfe-default-compat.php';
            }
        }

        return self::$instance;
    }
}

HFE_Hello_Elementor_Compat::instance();
