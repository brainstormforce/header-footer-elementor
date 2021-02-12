jQuery(document).ready(function ($) {
	var ehf_hide_shortcode_field = function() {
		var selected = jQuery('#ehf_template_type').val() || 'none';
		jQuery( '.hfe-options-table' ).removeClass().addClass( 'hfe-options-table widefat hfe-selected-template-type-' + selected );
	}

	jQuery(document).on( 'change', '#ehf_template_type', function( e ) {
		ehf_hide_shortcode_field();
	});

	ehf_hide_shortcode_field();

	var hf_new_post = jQuery( '.post-type-elementor-hf' ).find( '.page-title-action' );

	var close_button = jQuery( '.hfe-close-icon' );
	var modal_wrapper = jQuery( '.hfe-guide-modal-popup' );
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

});
