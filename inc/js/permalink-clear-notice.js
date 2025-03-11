var ElementorEditorCheck = function() {
    var isNoticeClosed = function() {

        jQuery(document).on('click', '.uae-permalink-notice-close', function(e) {
            var $notice = jQuery('#uae-permalink-clear-notice');
            if ($notice.data('visible')) {
                $notice.remove();
                jQuery.ajax({
                    url: hfePermalinkClearNotice.ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'update_permalink_notice_option',
                        nonce: hfePermalinkClearNotice.nonce,
                    },
                    success: function(response) {
                        if (response.success) {
                            console.log('Option updated successfully');
                        } else {
                            console.log('Error updating option: ' + response.data);
                        }
                    },
                    error: function(error) {
                        console.log('Error updating option');
                    }
                });
            }
        });
    }

    var isPermalinkFlushed = function() {

        jQuery(document).on('click', '.uae-permalink-flush-btn', function(e) {
            
            var $loader = jQuery('.uae-notice-loader');
            var $button = jQuery(this);
            var $buttonText = $button.find('.uae-btn-main-text');

            // Show loader and disable button
            $loader.show();
            $buttonText.text('Flushing...');
            $button.prop('disabled', true);
            
            jQuery.ajax({
                    url: hfePermalinkClearNotice.ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'hfe_flush_permalink_notice',
                        nonce: hfePermalinkClearNotice.nonce,
                    },
                    success: function(response) {
                        // Hide the loader
                        $loader.hide();
                        $buttonText.text('Flushed Permalink');
                        if (response.success) {
                            console.log('Permalink refreshed successfully');
                            location.reload(true);
                        } else {
                            console.log('Error updating option: ' + response.data);
                        }
                    },
                    error: function(error) {
                         // Hide the loader
                        $loader.hide();
                        $buttonText.text('Flushed Permalink');
                        console.log('Error updating option');
                    }
                });
            });
    }


    var isElementorLoadedCheck = function() {
        if ( 'undefined' === typeof elementor ) {
            return false;
        }
        
        if ( ! elementor.loaded ) {
            return false;
        }

        if ( jQuery( '#elementor-loading' ).is( ':visible' ) ) {
            return false;
        }

        return true;
    };

    var permalinkNoticeCheck = function() {
        var $notice = jQuery( '#uae-permalink-clear-notice' );

        if ( isElementorLoadedCheck() ) {
            $notice.remove();
            return;
        }

        if ( ! $notice.data( 'visible' ) ) {
            $notice.show().data( 'visible', true );
        }

        // Re-check after 500ms.
        setTimeout( permalinkNoticeCheck, 500 );
    };

    var init = function() {
        setTimeout( permalinkNoticeCheck, 30000 );
        isNoticeClosed();
        isPermalinkFlushed();
    };

    init();
};

new ElementorEditorCheck();