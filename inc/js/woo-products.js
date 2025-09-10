/**
 * HFE Woo Products Widget JavaScript
 */
(function($) {
    'use strict';

    var HFEWooProducts = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            // Add any interactive functionality here
            $(document).on('click', '.hfe-product-add-to-cart .button', this.handleAddToCart);
        },

        handleAddToCart: function(e) {
            var $button = $(this);
            
            // Add loading state
            $button.addClass('loading');
            
            // Remove loading state after WooCommerce handles the request
            setTimeout(function() {
                $button.removeClass('loading');
            }, 2000);
        }
    };

    // Initialize when document is ready
    $(document).ready(function() {
        HFEWooProducts.init();
    });

    // Initialize for Elementor editor
    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/hfe-woo-product-grid.default', function($scope) {
            HFEWooProducts.init();
        });
    });

})(jQuery);
