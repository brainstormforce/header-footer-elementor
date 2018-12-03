jQuery(document).ready(function ($) {

	var ehf_hide_shortcode_field = function() {

		var selected = jQuery('#ehf_template_type').val();

		if( 'custom' == selected ) {
			jQuery( '.hfe-options-row.hfe-shortcode' ).show();
		} else {
			jQuery( '.hfe-options-row.hfe-shortcode' ).hide();
		}
	}

	jQuery(document).on( 'change', '#ehf_template_type', function( e ) {
			
		ehf_hide_shortcode_field();

	});

	ehf_hide_shortcode_field();

});
