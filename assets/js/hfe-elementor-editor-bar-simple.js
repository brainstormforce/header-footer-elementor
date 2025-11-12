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

        // Only show button if UAE Pro is NOT active
        if (window.hfeEditorConfig && window.hfeEditorConfig.isUAEPro) {
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
                    // Always redirect to HFE dashboard
                    window.open('/wp-admin/admin.php?page=hfe#dashboard', '_blank');
                });

                // Add conditional tooltip functionality
                function getTooltipText() {
                    // Check different conditions and return appropriate tooltip
                    if (window.hfeEditorConfig) {
                        // Condition 1: Check if user has templates
                        if (window.hfeEditorConfig.hasTemplates) {
                            return 'HFE Dashboard - View Your Templates';
                        }
                        
                        // Condition 2: Check user capability
                        if (window.hfeEditorConfig.canCreateTemplates) {
                            return 'HFE Dashboard - Create New Templates';
                        }
                        
                        // Condition 3: Check current post type
                        if (window.hfeEditorConfig.currentPostType === 'elementor-hf') {
                            return 'HFE Dashboard - Back to Templates List';
                        }
                    }
                    
                    // Default tooltip
                    return 'Header Footer Elementor Dashboard';
                }

                hfeButton.hover(
                    function() {
                        // Show conditional tooltip on hover
                        const tooltipText = getTooltipText();
                        $(this).attr('title', tooltipText);
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
            }
        }, 500);
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