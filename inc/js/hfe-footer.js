(function($){

	EHF_Footer = {

        /**
		 * Binds events for the Elementor Header Footer.
		 *
		 * @since x.x.x
		 * @access private
		 * @method _bind
		 */
		init: function() {
			elementor.on( "document:loaded", function() {

                setTimeout( function() {
                    //console.log(elementorFrontend.documentsManager.documents);
                    jQuery.each(elementorFrontend.documentsManager.documents, function (index, document) {
                        var $documentElement = document.$element;
                        //console.log($documentElement.data('elementor-title'));
                        var json_parse = JSON.parse( hfe_admin.json_array );
           				var dummy_id = $documentElement.data('elementor-id');
                        
                        console.log( json_parse );

                        json_parse.forEach( function(item, index){
                        	console.log( json_parse[index].ID );
                        } );
                        // Update this selector - elementor-document-handle__title text.
                    });
                }, 1000 );
            });
		}
	};

	/**
	 * Initialize EHF_Footer
	 */
	$(function(){
		EHF_Footer.init();
	});

})(jQuery);
