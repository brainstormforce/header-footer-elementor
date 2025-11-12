/**
 * Header Footer Elementor - Simple Editor Bar Integration
 * Based on SureRank implementation pattern
 */

(function() {
    'use strict';


    // Flag to prevent duplicate button creation
    let hfeButtonAdded = false;

    // Helper function to add button to Elementor editor bar using jQuery (like SureRank)
    function addHFEButtonToElementorBar() {
        // Prevent duplicate buttons
        if (hfeButtonAdded) {
            return;
        }

        
        // Use jQuery like SureRank does
        const $ = window.jQuery;
        if (!$) {
            return;
        }

        // Wait a minimal time for Elementor to be ready
        setTimeout(() => {
            // Check if HFE button already exists (be specific, don't check for SureRank)
            if ($('#hfe-dashboard-button').length > 0) {
                hfeButtonAdded = true;
                return;
            }

            // Look for the same selector pattern that SureRank uses
            const targetContainer = $('#elementor-editor-wrapper-v2 header .MuiGrid-root:nth-child(3) .MuiStack-root');
            
            if (targetContainer.length) {
                
                // Get existing button classes from SureRank pattern
                const existingButton = targetContainer.find('button').first();
                const buttonClasses = existingButton.length ? existingButton.attr('class') : 'MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium';
                const svgClasses = existingButton.find('svg').attr('class') || 'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium';

                // Create HFE button wrapper
                const hfeWrapper = $('<div class="hfe-root" id="hfe-dashboard-button"></div>');
                const buttonContainer = $('<div class="relative"></div>');
                
                // Create HFE button with plugin icon
                const iconUrl = window.hfeEditorConfig && window.hfeEditorConfig.iconUrl 
                    ? window.hfeEditorConfig.iconUrl 
                    : '/wp-content/plugins/header-footer-elementor/assets/images/settings/logo.svg';
                const hfeButton = $(`
                    <button type="button" class="${buttonClasses}" 
                            aria-label="Header Footer Elementor Dashboard" 
                            tabindex="0">
                        <img src="${iconUrl}" 
                             width="30" height="30" >
                    </button>
                `).on('click', function() {
                    // Check if UAE Pro is active and redirect accordingly
                    const redirectUrl = window.hfeEditorConfig && window.hfeEditorConfig.isUAEPro 
                        ? '/wp-admin/admin.php?page=uaepro#dashboard'
                        : '/wp-admin/edit.php?post_type=elementor-hf';
                    window.open(redirectUrl, '_blank');
                });

                // Add tooltip functionality like SureRank
                hfeButton.hover(
                    function() {
                        // Show tooltip on hover
                        $(this).attr('title', 'Header Footer Elementor Dashboard');
                    },
                    function() {
                        // Hide tooltip
                        $(this).removeAttr('title');
                    }
                );

                buttonContainer.append(hfeButton);
                hfeWrapper.append(buttonContainer);
                
                // Insert after the last button (like SureRank does)
                targetContainer.children().last().after(hfeWrapper);
                
                hfeButtonAdded = true;
            } else {
                addFallbackButton($);
            }
        }, 500);
    }

    // Fallback method for older Elementor versions
    function addFallbackButton($) {
        // Prevent duplicate buttons
        if (hfeButtonAdded) {
            return;
        }

        // Check if button already exists
        if ($('#hfe-dashboard-button').length > 0) {
            hfeButtonAdded = true;
            return;
        }

        // Try different selectors for older Elementor versions
        const fallbackSelectors = [
            '#elementor-panel-header-kit-close',
            '.elementor-panel-header-button',
            '#elementor-panel-header'
        ];

        for (const selector of fallbackSelectors) {
            const target = $(selector).first();
            if (target.length) {
                
                const fallbackButton = $(`
                    <div id="hfe-dashboard-button" style="display: inline-block; margin-left: 8px;">
                        <button type="button" 
                                style="background: #9b59b6; color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: 500;"
                                title="HFE Dashboard">
                            HFE
                        </button>
                    </div>
                `);
                
                fallbackButton.find('button').on('click', function() {
                    // Check if UAE Pro is active and redirect accordingly
                    const redirectUrl = window.hfeEditorConfig && window.hfeEditorConfig.isUAEPro 
                        ? '/wp-admin/admin.php?page=uaepro#dashboard'
                        : '/wp-admin/admin.php?page=hfe#dashboard';
                    window.open(redirectUrl, '_blank');
                });
                
                target.after(fallbackButton);
                hfeButtonAdded = true;
                break;
            }
        }
    }

    // Initialize when Elementor is ready (following SureRank pattern)
    function initializeHFEButton() {
        // Check if we're in Elementor editor
        if (!window.elementor) {
            return;
        }

        addHFEButtonToElementorBar();
    }

    // Use the same initialization pattern as SureRank
    window.addEventListener('elementor/frontend/init', () => {
        setTimeout(initializeHFEButton, 200);
    });

    // Also try direct initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initializeHFEButton, 300);
        });
    } else {
        setTimeout(initializeHFEButton, 300);
    }

    // Fallback with window load
    window.addEventListener('load', () => {
        setTimeout(initializeHFEButton, 500);
    });

})();