( function( $ ) {

	'use strict';

	// Global settings access.
	var s;

	var HFEAdmin = {

		// Settings.
		settings: {
			iconActivate: '<i class="fa fa-toggle-on fa-flip-horizontal" aria-hidden="true"></i>',
			iconDeactivate: '<i class="fa fa-toggle-on" aria-hidden="true"></i>',
			iconInstall: '<i class="fa fa-cloud-download" aria-hidden="true"></i>',
			iconSpinner: '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>',
			mediaFrame: false
		},

		/**
		 * Display the Modal Popup
		 *
		 */
		_display_modal: function() {
			var hf_new_post = $( '.post-type-elementor-hf' ).find( '.page-title-action' );
	
			var close_button = $( '.hfe-close-icon' );
			var modal_wrapper = $( '.hfe-guide-modal-popup' );
			var new_page_link = modal_wrapper.data( 'new-page' );
		
			// Display Modal Popup on click of Add new button.
			hf_new_post.on( 'click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				if( ! modal_wrapper.hasClass( 'hfe-show' ) ) {
					modal_wrapper.addClass( 'hfe-show' );
				}
			});
		
			// Close popup and redirect to edit page.
			close_button.on( 'click', function(e) {
				if( modal_wrapper.hasClass( 'hfe-show' ) ) {
					modal_wrapper.removeClass( 'hfe-show' );
				}
				window.location = new_page_link;
			});
		},

		/**
		 * Toggle addon state.
		 */
		_addons: function( $button ) {

			// Settings shortcut.
			s = this.settings;

			var $addon = $button.closest( '.addon-item' ),
				plugin = $button.attr( 'data-plugin' ),
				pluginType = $button.attr( 'data-type' ),
				state,
				cssClass,
				stateText,
				buttonText,
				errorText,
				successText;

			if ( $button.hasClass( 'status-go-to-url' ) ) {

				// Open url in new tab.
				window.open( $button.attr( 'data-plugin' ), '_blank' );
				return;
			}

			$button.prop( 'disabled', true ).addClass( 'loading' );
			$button.html( s.iconSpinner );

			if ( $button.hasClass( 'status-active' ) ) {

				// Deactivate.
				state = 'deactivate';
				cssClass = 'status-inactive';
				if ( pluginType === 'plugin' ) {
					cssClass += ' button button-secondary';
				}
				stateText = hfe_admin.addon_inactive;
				buttonText = hfe_admin.addon_activate;
				errorText  = hfe_admin.addon_deactivate;
				if ( pluginType === 'addon' ) {
					buttonText = s.iconActivate + buttonText;
					errorText  = s.iconDeactivate + errorText;
				}

			} else if ( $button.hasClass( 'status-inactive' ) ) {

				// Activate.
				state = 'activate';
				cssClass = 'status-active';
				if ( pluginType === 'plugin' ) {
					cssClass += ' button button-secondary disabled';
				}
				stateText = hfe_admin.addon_active;
				buttonText = hfe_admin.addon_deactivate;
				if ( pluginType === 'addon' ) {
					buttonText = s.iconDeactivate + buttonText;
					errorText  = s.iconActivate + hfe_admin.addon_activate;
				} else if ( pluginType === 'plugin' ) {
					buttonText = hfe_admin.addon_activated;
					errorText  = hfe_admin.addon_activate;
				}

			} else if ( $button.hasClass( 'status-download' ) ) {

				// Install & Activate.
				state = 'install';
				cssClass = 'status-active';
				if ( pluginType === 'plugin' ) {
					cssClass += ' button disabled';
				}
				stateText = hfe_admin.addon_active;
				buttonText = hfe_admin.addon_activated;
				errorText  = s.iconInstall;
				if ( pluginType === 'addon' ) {
					buttonText = s.iconActivate + hfe_admin.addon_deactivate;
					errorText += hfe_admin.addon_install;
				}

			} else {
				return;
			}

			// eslint-disable-next-line complexity
			WPFormsAdmin._setAddonState( plugin, state, pluginType, function( res ) {

				if ( res.success ) {
					if ( 'install' === state ) {
						$button.attr( 'data-plugin', res.data.basename );
						successText = res.data.msg;
						if ( ! res.data.is_activated ) {
							stateText  = hfe_admin.addon_inactive;
							buttonText = 'plugin' === pluginType ? hfe_admin.addon_activate : s.iconActivate + hfe_admin.addon_activate;
							cssClass   = 'plugin' === pluginType ? 'status-inactive button button-secondary' : 'status-inactive';
						}
					} else {
						successText = res.data;
					}
					$addon.find( '.actions' ).append( '<div class="msg success">' + successText + '</div>' );
					$addon.find( 'span.status-label' )
						.removeClass( 'status-active status-inactive status-download' )
						.addClass( cssClass )
						.removeClass( 'button button-primary button-secondary disabled' )
						.text( stateText );
					$button
						.removeClass( 'status-active status-inactive status-download' )
						.removeClass( 'button button-primary button-secondary disabled' )
						.addClass( cssClass ).html( buttonText );
				} else {
					if ( 'object' === typeof res.data ) {
						if ( pluginType === 'addon' ) {
							$addon.find( '.actions' ).append( '<div class="msg error">' +hfes_admin.addon_error + '</div>' );
						} else {
							$addon.find( '.actions' ).append( '<div class="msg error">' +hfes_admin.plugin_error + '</div>' );
						}
					} else {
						$addon.find( '.actions' ).append( '<div class="msg error">' + res.data + '</div>' );
					}
					if ( 'install' === state && 'plugin' === pluginType ) {
						$button.addClass( 'status-go-to-url' ).removeClass( 'status-download' );
					}
					$button.html( errorText );
				}

				$button.prop( 'disabled', false ).removeClass( 'loading' );

				// Automatically clear addon messages after 3 seconds.
				setTimeout( function() {

					$( '.addon-item .msg' ).remove();
				}, 3000 );

			} );
		},

		/**
		 * Change plugin/addon state.
		 *
		 * @since x.x.x
		 *
		 * @param {string}   plugin     Plugin slug or URL for download.
		 * @param {string}   state      State status activate|deactivate|install.
		 * @param {string}   pluginType Plugin type addon or plugin.
		 * @param {Function} callback   Callback for get result from AJAX.
		 */
		_setAddonState: function( plugin, state, pluginType, callback ) {

			var actions = {
					'activate': 'hfe_activate_addon',
					'install': 'hfe_install_addon',
					'deactivate': 'hfe_deactivate_addon',
				},
				action = actions[ state ];

			if ( ! action ) {
				return;
			}

			var data = {
				action: action,
				nonce: hfe_admin.nonce,
				plugin: plugin,
				type: pluginType,
			};

			$.post( hfe_admin.ajax_url, data, function( res ) {

				callback( res );
			} ).fail( function( xhr ) {

				console.log( xhr.responseText );
			} );
		},
	};

	$( document ).ready( function() {

		console.log( '=======================================================================================================================' );

		var ehf_hide_shortcode_field = function() {
			var selected = $('#ehf_template_type').val() || 'none';
			$( '.hfe-options-table' ).removeClass().addClass( 'hfe-options-table widefat hfe-selected-template-type-' + selected );
		}
	
		$(document).on( 'change', '#ehf_template_type', function( e ) {
			ehf_hide_shortcode_field();
		});
	
		ehf_hide_shortcode_field();
	
		// Templates page modal popup.
		HFEAdmin._display_modal();
	
		// About us - addons functionality.
		if ( ! $( '#hfe-admin-addons' ).length ) {
	
			$( document ).on( 'click', '#hfe-admin-addons .addon-item button', function( event ) {
	
				event.preventDefault();
	
				if ( $( this ).hasClass( 'disabled' ) ) {
					return false;
				}
	
				HFEAdmin._addons( $( this ) );

			} );
	
		}
	});

} )( jQuery );
