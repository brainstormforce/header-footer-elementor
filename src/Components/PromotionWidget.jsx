import { useEffect } from '@wordpress/element';

const PromotionWidget = () => {
	useEffect( () => {
		// Global variables to track state
		let lastClickedWidgetType = null;
		let continuousCheckInterval = null;
		let searchObserver = null;

		// Function to customize the promotion dialog
		const customizePromotionDialog = ( forceUaeWidget = false ) => {
			const dialog = parent.document.querySelector( '#elementor-element--promotion__dialog' );
			if ( ! dialog ) {
				return false;
			}

			const defaultBtn = dialog.querySelector( '.dialog-buttons-action:not(.uae-upgrade-button)' );
			if ( ! defaultBtn ) {
				return false;
			}

			// Always show our button in search results or if forced
			const shouldShowUaeButton = forceUaeWidget || lastClickedWidgetType === 'uae';

			// Clean up any previous custom buttons to avoid duplicates
			const existingCustomBtns = dialog.querySelectorAll( '.uae-upgrade-button' );
			existingCustomBtns.forEach( ( btn ) => btn.remove() );

			if ( shouldShowUaeButton ) {
				// Hide the default button
				defaultBtn.style.display = 'none';

				// Create our custom button
				const button = document.createElement( 'a' );
				button.textContent = 'Upgrade Now';

				// Get widget name from the dialog title
				const dialogTitle = dialog.querySelector( '.dialog-header' );
				let widgetTitle = 'widget';

				if ( dialogTitle && dialogTitle.textContent ) {
					widgetTitle = dialogTitle.textContent.trim().toLowerCase().replace( /\s+/g, '-' );
				}

				// Set href with dynamic widget title in utm_medium
				button.setAttribute( 'href', `https://ultimateelementor.com/pricing/?utm_source=plugin-editor&utm_medium=${ widgetTitle }-promo&utm_campaign=uae-upgrade` );
				button.setAttribute( 'target', '_blank' );
				button.classList.add(
					'dialog-button',
					'dialog-action',
					'dialog-buttons-action',
					'elementor-button',
					'go-pro',
					'elementor-button-success',
					'uae-upgrade-button',
				);

				// Insert our button
				defaultBtn.insertAdjacentElement( 'afterend', button );

				// Add event listener to prevent default behavior
				button.addEventListener( 'click', ( e ) => {
					e.stopPropagation();
				} );

				// Mark the dialog as customized
				dialog.setAttribute( 'data-uae-customized', 'true' );

				return true;
			}
			// Not our widget, make sure default button is visible
			defaultBtn.style.display = '';
			dialog.removeAttribute( 'data-uae-customized' );
			return true;
		};

		// Function to check if a widget is a UAE widget
		const isUaeWidget = ( widget ) => {
			if ( ! widget ) {
				return false;
			}

			// Check if it has the hfe class in the icon
			const icon = widget.querySelector( '.icon > i' );
			const hasHfeClass = icon && icon.className.includes( 'hfe' );

			// Check if it's in our category
			const isInUaeCategory = widget.closest( '#elementor-panel-category-hfe-widgets' ) !== null;

			return hasHfeClass || isInUaeCategory;
		};

		// Function to start continuous checking for dialog changes
		const startContinuousCheck = () => {
			// Clear any existing interval
			if ( continuousCheckInterval ) {
				clearInterval( continuousCheckInterval );
			}

			// Set up a new interval to check every 100ms
			continuousCheckInterval = setInterval( () => {
				const dialog = parent.document.querySelector( '#elementor-element--promotion__dialog' );
				if ( ! dialog ) {
					return;
				}

				if ( lastClickedWidgetType === 'uae' ) {
					const defaultBtn = dialog.querySelector( '.dialog-buttons-action:not(.uae-upgrade-button)' );
					const customBtn = dialog.querySelector( '.uae-upgrade-button' );

					// If default button is visible or our button is missing, fix it
					if ( ( defaultBtn && defaultBtn.style.display !== 'none' ) || ! customBtn ) {
						customizePromotionDialog( true );
					}
				}
			}, 100 );

			// Safety timeout to stop checking after 10 seconds
			setTimeout( () => {
				if ( continuousCheckInterval ) {
					clearInterval( continuousCheckInterval );
					continuousCheckInterval = null;
				}
			}, 10000 );
		};

		// Handle clicks on promotion widgets
		const handleProWidgetClick = ( e ) => {
			// Find the clicked promotion widget
			let clickedWidget = null;
			const allProWidgets = parent.document.querySelectorAll( '.elementor-element--promotion' );

			for ( let i = 0; i < allProWidgets.length; i++ ) {
				if ( allProWidgets[ i ].contains( e.target ) ) {
					clickedWidget = allProWidgets[ i ];
					break;
				}
			}

			if ( ! clickedWidget ) {
				return;
			}

			// Check if it's our widget
			const isUae = isUaeWidget( clickedWidget );

			// Update the last clicked widget type
			lastClickedWidgetType = isUae ? 'uae' : 'other';

			// Start continuous checking for dialog changes
			startContinuousCheck();

			// Also set up multiple immediate checks with increasing delays
			const delays = [ 10, 30, 50, 100, 200, 300, 500, 1000, 1500, 2000 ];
			delays.forEach( ( delay ) => {
				setTimeout( () => {
					const dialog = parent.document.querySelector( '#elementor-element--promotion__dialog' );
					if ( dialog ) {
						customizePromotionDialog( isUae );
					}
				}, delay );
			} );
		};

		// Create a mutation observer to watch for dialog changes
		const createDialogObserver = () => {
			const observer = new MutationObserver( ( mutations ) => {
				for ( const mutation of mutations ) {
					// Look for added nodes that might be the dialog
					if ( mutation.addedNodes.length ) {
						for ( const node of mutation.addedNodes ) {
							if ( node.id === 'elementor-element--promotion__dialog' ) {
								// Dialog was just added, customize it
								customizePromotionDialog( lastClickedWidgetType === 'uae' );
								startContinuousCheck();
							}
						}
					}

					// Also check for attribute changes on the dialog
					if ( mutation.type === 'attributes' &&
                        mutation.target.id === 'elementor-element--promotion__dialog' ) {
						if ( lastClickedWidgetType === 'uae' ) {
							customizePromotionDialog( true );
						}
					}
				}

				// Always check if dialog exists and needs customization
				const dialog = parent.document.querySelector( '#elementor-element--promotion__dialog' );
				if ( dialog && lastClickedWidgetType === 'uae' ) {
					const defaultBtn = dialog.querySelector( '.dialog-buttons-action:not(.uae-upgrade-button)' );
					const customBtn = dialog.querySelector( '.uae-upgrade-button' );

					// If default button is visible or our button is missing, fix it
					if ( ( defaultBtn && defaultBtn.style.display !== 'none' ) || ! customBtn ) {
						customizePromotionDialog( true );
					}
				}
			} );

			// Observe the body for changes
			if ( parent.document.body ) {
				observer.observe( parent.document.body, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: [ 'style', 'class', 'id' ],
				} );
			}

			return observer;
		};

		// Special function to handle search results
		const setupSearchResultsHandler = () => {
			// If we already have an observer, disconnect it
			if ( searchObserver ) {
				searchObserver.disconnect();
				searchObserver = null;
			}

			// Create a new observer specifically for search results
			searchObserver = new MutationObserver( ( mutations ) => {
				// Check if search results are visible
				const searchWrapper = parent.document.querySelector( '#elementor-panel-elements-search-wrapper' );
				if ( ! searchWrapper ) {
					return;
				}

				// Process all promotion widgets in search results
				const searchPromoWidgets = searchWrapper.querySelectorAll( '.elementor-element--promotion' );
				if ( searchPromoWidgets.length === 0 ) {
					return;
				}

				// Add click handlers to all promotion widgets in search results
				searchPromoWidgets.forEach( ( widget ) => {
					// Remove any existing click handlers
					widget.removeEventListener( 'click', handleSearchWidgetClick );

					// Add our click handler
					widget.addEventListener( 'click', handleSearchWidgetClick );

					// Mark this widget as processed
					widget.setAttribute( 'data-uae-processed', 'true' );
				} );
			} );

			// Observe the panel for changes
			const panelElements = parent.document.querySelector( '#elementor-panel-elements' );
			if ( panelElements ) {
				searchObserver.observe( panelElements, {
					childList: true,
					subtree: true,
					attributes: false,
				} );
			}

			// Also observe the search input
			const searchInput = parent.document.querySelector( '#elementor-panel-elements-search-input' );
			if ( searchInput ) {
				// Add input event listener
				searchInput.addEventListener( 'input', handleSearchInput );
			}
		};

		// Handle search input changes
		const handleSearchInput = () => {
			// Wait a bit for search results to render
			setTimeout( () => {
				const searchWrapper = parent.document.querySelector( '#elementor-panel-elements-search-wrapper' );
				if ( ! searchWrapper ) {
					return;
				}

				const searchPromoWidgets = searchWrapper.querySelectorAll( '.elementor-element--promotion' );

				searchPromoWidgets.forEach( ( widget ) => {
					// Remove any existing click handlers
					widget.removeEventListener( 'click', handleSearchWidgetClick );

					// Add our click handler
					widget.addEventListener( 'click', handleSearchWidgetClick );

					// Mark this widget as processed
					widget.setAttribute( 'data-uae-processed', 'true' );
				} );
			}, 300 );
		};

		// Handle clicks on widgets in search results
		const handleSearchWidgetClick = ( e ) => {
			// Set all widgets in search results to be treated as UAE widgets
			lastClickedWidgetType = 'uae';

			// Start continuous checking
			startContinuousCheck();

			// Set up immediate checks with increasing delays
			const delays = [ 10, 30, 50, 100, 200, 300, 500, 1000 ];
			delays.forEach( ( delay ) => {
				setTimeout( () => {
					const dialog = parent.document.querySelector( '#elementor-element--promotion__dialog' );
					if ( dialog ) {
						customizePromotionDialog( true );
					}
				}, delay );
			} );

			// Don't stop propagation - we want the dialog to open
		};

		// Initialize everything
		const initProWidgets = () => {
			if ( typeof parent.document === 'undefined' ) {
				return;
			}

			// Remove any existing event listeners to prevent duplicates
			parent.document.removeEventListener( 'mousedown', handleProWidgetClick, true );

			// Add our event listener with capture phase to ensure it runs first
			parent.document.addEventListener( 'mousedown', handleProWidgetClick, true );

			// Set up search results handler
			setupSearchResultsHandler();

			// Create the observer
			const observer = createDialogObserver();

			// Check if dialog already exists
			const existingDialog = parent.document.querySelector( '#elementor-element--promotion__dialog' );
			if ( existingDialog ) {
				customizePromotionDialog();
			}

			return observer;
		};

		// Initialize when Elementor is ready
		let observer = null;
		if ( window.elementor ) {
			elementor.on( 'preview:loaded', () => {
				observer = initProWidgets();
			} );
		} else {
			window.addEventListener( 'elementor/frontend/init', () => {
				observer = initProWidgets();
			} );
		}

		// Cleanup function
		return () => {
			if ( continuousCheckInterval ) {
				clearInterval( continuousCheckInterval );
			}

			if ( observer ) {
				observer.disconnect();
			}

			if ( searchObserver ) {
				searchObserver.disconnect();
			}

			if ( typeof parent.document !== 'undefined' ) {
				parent.document.removeEventListener( 'mousedown', handleProWidgetClick, true );

				// Remove search input event listeners
				const searchInput = parent.document.querySelector( '#elementor-panel-elements-search-input' );
				if ( searchInput ) {
					searchInput.removeEventListener( 'input', handleSearchInput );
				}

				// Remove click handlers from search widgets
				const searchPromoWidgets = parent.document.querySelectorAll( '#elementor-panel-elements-search-wrapper .elementor-element--promotion' );
				searchPromoWidgets.forEach( ( widget ) => {
					widget.removeEventListener( 'click', handleSearchWidgetClick );
				} );
			}

			if ( window.elementor && elementor.off ) {
				elementor.off( 'preview:loaded', initProWidgets );
			} else {
				window.removeEventListener( 'elementor/frontend/init', initProWidgets );
			}
		};
	}, [] );

	return null;
};

export default PromotionWidget;
