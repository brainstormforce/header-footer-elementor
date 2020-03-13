( function( $ ) {
	$( document ).ready( function( e ) {
		setTimeout(function(){
			console.log( $( '.elementor-element-72d3746' ).addClass('hi'));
			$( '.elementor-element-72d3746' ).css('background-color', 'red');
		}, 2000);
	} );
} )( jQuery );