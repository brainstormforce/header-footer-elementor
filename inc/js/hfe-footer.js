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
                    console.log(elementorFrontend.documentsManager.documents);
                    jQuery.each(elementorFrontend.documentsManager.documents, function (index, document) {
                        var $documentElement = document.$element;
                        console.log($documentElement.data('elementor-title'));
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
