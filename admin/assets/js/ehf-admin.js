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

	hf_new_post.on( 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this 		= jQuery( this );
	});
});
