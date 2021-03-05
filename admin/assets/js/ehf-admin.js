;( function( $ ) {

	'use strict';

	// Global settings access.
	var s;

	var HFEAdmin = {

		// Settings.
		settings: {
			iconActivate: '<i class="fa fa-toggle-on fa-flip-horizontal" aria-hidden="true"></i>',
			iconDeactivate: '<i class="fa fa-toggle-on" aria-hidden="true"></i>',
			iconInstall: '<i class="fa fa-cloud-download" aria-hidden="true"></i>'
		},

		/**
		 * Start the engine.
		 *
		 * @since 1.3.9
		 */
		init: function() {

			// Settings shortcut.
			s = this.settings;
			
			$( document ).ready( function( e ) {

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

				$( document ).on( 'click', '.hfe-guide-content .button', HFEAdmin._subscribe );
			
				// About us - addons functionality.
				if ( $( '#hfe-admin-addons' ).length ) {
			
					$( document ).on( 'click', '#hfe-admin-addons .addon-item button', function( event ) {
						event.preventDefault();
			
						if ( $( this ).hasClass( 'disabled' ) ) {
							return false;
						}
			
						HFEAdmin._addons( $( this ) );

					} );
			
				}
				
			});

		},

		/**
		 * Subscribe Form
		 *
		 */
		_subscribe: function( event ) {

			event.preventDefault();
			event.stopPropagation();

			var submit_button = $(this);

			var is_modal = $( '.hfe-guide-modal-popup.hfe-show' );
			
			var email_field = $( '.hfe-guide-content input[name="hfe_subscribe_field"]' );
			var subscription_email = email_field.val() || '';

			$( '.hfe-subscribe-message' ).remove();

			if( false === HFEAdmin.addEmailError(subscription_email ) ) {
				return;
			}

			if( ! $( '.hfe-checkbox-container input.hfe-guide-checkbox' ).is( ':checked' ) ) {
				$( '.hfe-guide-checkbox' ).addClass( 'hfe-error' );
				return;
			}

			if( ! submit_button.hasClass( 'submitting' ) ) {
				submit_button.addClass( 'submitting' );
			} else {
				return;
			}

			var subscription_fields = {
				email: subscription_email,
			};

			$.ajax({
				url  : hfe_admin_data.ajax_url,
				type : 'POST',
				data : {
					action : 'hfe-update-subscription',
					nonce : hfe_admin_data.nonce,
					data: JSON.stringify( subscription_fields ),
				},
				beforeSend: function() {
					console.groupCollapsed( 'Email Subscription' );

					submit_button.after( '<span class="dashicons dashicons-update hfe-loader"></span>' );

				},
			})
			.done( function ( response ) {

				$( '.hfe-loader.dashicons-update' ).remove();

				submit_button.removeClass( 'submitting' ).addClass('submitted');

				if( response.success === true ) {
					$('.hfe-guide-content form').trigger("reset");

					submit_button.after( '<span class="hfe-subscribe-message success">' + hfe_admin_data.subscribe_success + '</span>' );
				} else {
					submit_button.after( '<span class="hfe-subscribe-message error">' + hfe_admin_data.subscribe_error + '</span>' );
				}
				
				if( is_modal.length ) {
					window.setTimeout( function () {
						window.location = $( '.hfe-guide-modal-popup' ).data( 'new-page' );
					}, 3000 );
				}

			});

		},

		/**
		 * Display error if email field is invalid
		 *
		 */
		addEmailError: function( subscription_email ) {

			$( '.hfe-input-container' ).removeClass( 'hfe-error' );

			if( ! subscription_email || false === HFEAdmin.isValidEmail( subscription_email ) ) {
				$( '.hfe-input-container' ).addClass( 'hfe-error' );

				return false;
			}

			return true;

		},

		/**
		 * email Validation
		 *
		 */
		isValidEmail: function(eMail) {
			if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( eMail ) ) {
				return true;
			}
			
			return false;
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
			var display_allow = hfe_admin_data.popup_dismiss;

			if( 'dismissed' !== display_allow[0] ) {
				// Display Modal Popup on click of Add new button.
				hf_new_post.on( 'click', function(e) {
					if( modal_wrapper.length && ! modal_wrapper.hasClass( 'hfe-show' ) ) {
						e.preventDefault();
						e.stopPropagation();
						modal_wrapper.addClass( 'hfe-show' );
					}
				});
			}
		
			// Close popup and redirect to edit page.
			close_button.on( 'click', function(e) {
				
				$.ajax({
					url: hfe_admin_data.ajax_url,
					type: 'POST',
					data: {
						action  : 'hfe_admin_modal',
						nonce   : hfe_admin_data.nonce,
					},
				});

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
			$button.html( '<span class="dashicons dashicons-update hfe-loader"></span>' );

			if ( $button.hasClass( 'status-active' ) ) {

				// Deactivate.
				state = 'deactivate';
				cssClass = 'status-inactive';
				if ( pluginType === 'plugin' ) {
					cssClass += ' button button-secondary';
				}
				stateText = hfe_admin_data.addon_inactive;
				buttonText = hfe_admin_data.addon_activate;
				errorText  = hfe_admin_data.addon_deactivate;
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
				stateText = hfe_admin_data.addon_active;
				buttonText = hfe_admin_data.addon_deactivate;
				if ( pluginType === 'addon' ) {
					buttonText = s.iconDeactivate + buttonText;
					errorText  = s.iconActivate + hfe_admin_data.addon_activate;
				} else if ( pluginType === 'plugin' ) {
					buttonText = hfe_admin_data.addon_activated;
					errorText  = hfe_admin_data.addon_activate;
				}

			} else if ( $button.hasClass( 'status-download' ) ) {

				// Install & Activate.
				state = 'install';
				cssClass = 'status-active';
				if ( pluginType === 'plugin' ) {
					cssClass += ' button disabled';
				}
				stateText = hfe_admin_data.addon_active;
				buttonText = hfe_admin_data.addon_activated;
				errorText  = s.iconInstall;
				if ( pluginType === 'addon' ) {
					buttonText = s.iconActivate + hfe_admin_data.addon_deactivate;
					errorText += hfe_admin_data.addon_install;
				}

			} else {
				return;
			}

			// eslint-disable-next-line complexity
			HFEAdmin._setAddonState( plugin, state, pluginType, function( res ) {

				if ( res.success ) {
					if ( 'install' === state ) {
						$button.attr( 'data-plugin', res.data.basename );
						successText = res.data.msg;
						if ( ! res.data.is_activated ) {
							stateText  = hfe_admin_data.addon_inactive;
							buttonText = 'plugin' === pluginType ? hfe_admin_data.addon_activate : s.iconActivate + hfe_admin_data.addon_activate;
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
						
						$addon.find( '.actions' ).append( '<div class="msg error">' +hfes_admin.plugin_error + '</div>' );
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
				nonce: hfe_admin_data.nonce,
				plugin: plugin,
				type: pluginType,
			};

			$.post( hfe_admin_data.ajax_url, data, function( res ) {

				callback( res );
			} ).fail( function( xhr ) {

				console.log( xhr.responseText );
			} );
		},
	};

	HFEAdmin.init();

	window.HFEAdmin = HFEAdmin;

} )( jQuery );
