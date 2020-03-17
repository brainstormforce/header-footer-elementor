( function( $ ) {

	elementor.on( "preview:loaded", function() {
		
		
		console.log($( '.elementor-document-handle').addClass('hii'));
	});
	setTimeout(function(){
		jQuery( '.hfe-search-button-wrapper' ).addClass('hii');
	}, 3000);
} )( jQuery );