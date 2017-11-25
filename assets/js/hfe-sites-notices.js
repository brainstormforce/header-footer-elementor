jQuery(document).ready(function ($) {

	jQuery( '.hfe-notice.is-dismissible .notice-dismiss' ).on( 'click', function() {
		_this 		= jQuery( this ).parents( '.hfe-active-notice' );
		var $id 	= _this.attr( 'id' ) || '';
		var $time 	= _this.attr( 'dismissible-time' ) || '';
		var $meta 	= _this.attr( 'dismissible-meta' ) || '';

		jQuery.ajax({
			url: ajaxurl,
			type: 'POST',
			data: {
				action 	: 'hfe-notices',
				id 		: $id,
				meta 	: $meta,
				time 	: $time,
			},
		});

	});

});