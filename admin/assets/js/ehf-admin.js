( function( $ ) {

	HFEAdmin = {

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
		 * Display the Modal Popup
		 *
		 */
		_addons: function() {
			
		},
	}

	$(document).ready(function ($) {
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
