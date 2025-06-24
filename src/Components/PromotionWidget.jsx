import { useEffect } from '@wordpress/element';

const PromotionWidget = () => {
    useEffect(() => {
        // Global variables to track state
        let lastClickedWidgetType = null;
        let continuousCheckInterval = null;
        
        // Function to customize the promotion dialog
        const customizePromotionDialog = (forceUaeWidget = false) => {
            const dialog = parent.document.querySelector('#elementor-element--promotion__dialog');
            if (!dialog) return false;
            
            const defaultBtn = dialog.querySelector('.dialog-buttons-action:not(.uae-upgrade-button)');
            if (!defaultBtn) return false;
            
            // Determine if we should show our button
            const shouldShowUaeButton = forceUaeWidget || lastClickedWidgetType === 'uae';
            
            // Clean up any previous custom buttons to avoid duplicates
            const existingCustomBtns = dialog.querySelectorAll('.uae-upgrade-button');
            existingCustomBtns.forEach(btn => btn.remove());
            
            if (shouldShowUaeButton) {
                // Hide the default button
                defaultBtn.style.display = 'none';
                
                // Create our custom button
                const button = document.createElement('a');
                button.textContent = 'Upgrade Now';
                
                // Get widget name from the dialog title
                const dialogTitle = dialog.querySelector('.dialog-header');
                let widgetTitle = 'widget';
                
                if (dialogTitle && dialogTitle.textContent) {
                    widgetTitle = dialogTitle.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                }
                
                // Set href with dynamic widget title in utm_medium
                button.setAttribute('href', `https://ultimateelementor.com/pricing/?utm_source=plugin-editor&utm_medium=${widgetTitle}-promo&utm_campaign=uae-upgrade`);
                button.setAttribute('target', '_blank');
                button.classList.add(
                    'dialog-button', 
                    'dialog-action', 
                    'dialog-buttons-action', 
                    'elementor-button', 
                    'go-pro', 
                    'elementor-button-success', 
                    'uae-upgrade-button'
                );
                
                // Insert our button
                defaultBtn.insertAdjacentElement('afterend', button);
                
                // Add event listener to prevent default behavior
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
                
                // Mark the dialog as customized
                dialog.setAttribute('data-uae-customized', 'true');
                
                console.log('UAE: Added custom button, hid default button');
                return true;
            } else {
                // Not our widget, make sure default button is visible
                defaultBtn.style.display = '';
                dialog.removeAttribute('data-uae-customized');
                console.log('UAE: Showing default button only');
                return true;
            }
        };
        
        // Function to check if a widget is a UAE widget
        const isUaeWidget = (widget) => {
            if (!widget) return false;
            
            // Check if it has the hfe class in the icon
            const icon = widget.querySelector('.icon > i');
            const hasHfeClass = icon && icon.className.includes('hfe');
            
            // Check if it's in our category
            const isInUaeCategory = widget.closest('#elementor-panel-category-hfe-widgets') !== null;
            
            return hasHfeClass && isInUaeCategory;
        };
        
        // Function to start continuous checking for dialog changes
        const startContinuousCheck = () => {
            // Clear any existing interval
            if (continuousCheckInterval) {
                clearInterval(continuousCheckInterval);
            }
            
            // Set up a new interval to check every 100ms
            continuousCheckInterval = setInterval(() => {
                const dialog = parent.document.querySelector('#elementor-element--promotion__dialog');
                if (!dialog) return;
                
                if (lastClickedWidgetType === 'uae') {
                    const defaultBtn = dialog.querySelector('.dialog-buttons-action:not(.uae-upgrade-button)');
                    const customBtn = dialog.querySelector('.uae-upgrade-button');
                    
                    // If default button is visible or our button is missing, fix it
                    if ((defaultBtn && defaultBtn.style.display !== 'none') || !customBtn) {
                        customizePromotionDialog(true);
                    }
                }
            }, 100);
            
            // Safety timeout to stop checking after 10 seconds
            setTimeout(() => {
                if (continuousCheckInterval) {
                    clearInterval(continuousCheckInterval);
                    continuousCheckInterval = null;
                }
            }, 10000);
        };
        
        // Handle clicks on promotion widgets
        const handleProWidgetClick = (e) => {
            // Find the clicked promotion widget
            let clickedWidget = null;
            const allProWidgets = parent.document.querySelectorAll('.elementor-element--promotion');
            
            for (let i = 0; i < allProWidgets.length; i++) {
                if (allProWidgets[i].contains(e.target)) {
                    clickedWidget = allProWidgets[i];
                    break;
                }
            }
            
            if (!clickedWidget) return;
            
            // Check if it's our widget
            const isUae = isUaeWidget(clickedWidget);
            
            // Update the last clicked widget type
            lastClickedWidgetType = isUae ? 'uae' : 'other';
            console.log('UAE: Widget clicked, type:', lastClickedWidgetType);
            
            // Start continuous checking for dialog changes
            startContinuousCheck();
            
            // Also set up multiple immediate checks with increasing delays
            const delays = [10, 30, 50, 100, 200, 300, 500, 1000, 1500, 2000];
            delays.forEach(delay => {
                setTimeout(() => {
                    const dialog = parent.document.querySelector('#elementor-element--promotion__dialog');
                    if (dialog) {
                        customizePromotionDialog(isUae);
                    }
                }, delay);
            });
        };
        
        // Create a mutation observer to watch for dialog changes
        const createDialogObserver = () => {
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    // Look for added nodes that might be the dialog
                    if (mutation.addedNodes.length) {
                        for (const node of mutation.addedNodes) {
                            if (node.id === 'elementor-element--promotion__dialog') {
                                // Dialog was just added, customize it
                                customizePromotionDialog(lastClickedWidgetType === 'uae');
                                startContinuousCheck();
                            }
                        }
                    }
                    
                    // Also check for attribute changes on the dialog
                    if (mutation.type === 'attributes' && 
                        mutation.target.id === 'elementor-element--promotion__dialog') {
                        if (lastClickedWidgetType === 'uae') {
                            customizePromotionDialog(true);
                        }
                    }
                }
                
                // Always check if dialog exists and needs customization
                const dialog = parent.document.querySelector('#elementor-element--promotion__dialog');
                if (dialog && lastClickedWidgetType === 'uae') {
                    const defaultBtn = dialog.querySelector('.dialog-buttons-action:not(.uae-upgrade-button)');
                    const customBtn = dialog.querySelector('.uae-upgrade-button');
                    
                    // If default button is visible or our button is missing, fix it
                    if ((defaultBtn && defaultBtn.style.display !== 'none') || !customBtn) {
                        customizePromotionDialog(true);
                    }
                }
            });
            
            // Observe the body for changes
            if (parent.document.body) {
                observer.observe(parent.document.body, { 
                    childList: true, 
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['style', 'class', 'id']
                });
            }
            
            return observer;
        };
        
        // Initialize everything
        const initProWidgets = () => {
            if (typeof parent.document === 'undefined') return;
            
            // Remove any existing event listeners to prevent duplicates
            parent.document.removeEventListener('mousedown', handleProWidgetClick, true);
            
            // Add our event listener with capture phase to ensure it runs first
            parent.document.addEventListener('mousedown', handleProWidgetClick, true);
            
            // Create the observer
            const observer = createDialogObserver();
            
            // Check if dialog already exists
            const existingDialog = parent.document.querySelector('#elementor-element--promotion__dialog');
            if (existingDialog) {
                customizePromotionDialog();
            }
            
            return observer;
        };
        
        // Initialize when Elementor is ready
        let observer = null;
        if (window.elementor) {
            elementor.on('preview:loaded', () => {
                observer = initProWidgets();
            });
        } else {
            window.addEventListener('elementor/frontend/init', () => {
                observer = initProWidgets();
            });
        }
        
        // Cleanup function
        return () => {
            if (continuousCheckInterval) {
                clearInterval(continuousCheckInterval);
            }
            
            if (observer) {
                observer.disconnect();
            }
            
            if (typeof parent.document !== 'undefined') {
                parent.document.removeEventListener('mousedown', handleProWidgetClick, true);
            }
            
            if (window.elementor && elementor.off) {
                elementor.off('preview:loaded', initProWidgets);
            } else {
                window.removeEventListener('elementor/frontend/init', initProWidgets);
            }
        };
    }, []);

    return null;
};

export default PromotionWidget;
