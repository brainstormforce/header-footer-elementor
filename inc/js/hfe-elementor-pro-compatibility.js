(function($){

	EHF_EPRO_Compatibility = {

        /**
		 * Binds events for the Elementor Header Footer.
		 *
		 * @since 1.4.0
		 * @access private
		 * @method _bind
		 */
		init: function() {
			elementor.on( "document:loaded", function() {
                setTimeout( function() {
                    jQuery.each( elementorFrontend.documentsManager.documents, function ( index, document ) {
                        var $documentElement = document.$element;
                        var ids_array = JSON.parse( hfe_admin.ids_array );
                        ids_array.forEach( function( item, index ){
                        	var elementor_id = $documentElement.data( 'elementor-id' );
                        	if( elementor_id == ids_array[index].id ){
                        		$documentElement.find( '.elementor-document-handle__title' ).text( elementor.translate('edit_element', [ids_array[index].value] ) );
                        	}
                        } );
                    });
                }, 1000 );
            });

			/**
             * Scroll to Top.
             */
			elementor.on("panel:init", function() {

                function scrollToTop( changedValue ) {

                    var changedItem = Object.entries(this.model.changed)[0];
                    var attributes = this.model.attributes;
                    var scrolltop_data = {
                        'check': 'hfeMessage',
                        'changeValue': changedValue,
                        'changeItem': changedItem
                    };
                    if ('hfe_scroll_to_top_single_disable' != changedItem[0]) {
                        var data = {
                            'enable_global_hfe': attributes.hfe_scroll_to_top_global,
                            'media_type': attributes.hfe_scroll_to_top_media_type,
                            'icon': attributes.hfe_scroll_to_top_button_icon,
                            'image': attributes.hfe_scroll_to_top_button_image,
                            'text': attributes.hfe_scroll_to_top_button_text
                        };
                        scrolltop_data = Object.assign(scrolltop_data, data);
                    } else {
                        $e.run('document/save/update').then(_.debounce(function() {
                            elementor.reloadPreview();
                        }, 1500));
                    }
                    $("#elementor-preview-iframe")[0].contentWindow.postMessage(scrolltop_data);
                }

                var changeHandler = ["hfe_scroll_to_top_global", "hfe_scroll_to_top_media_type", "hfe_scroll_to_top_button_icon", "hfe_scroll_to_top_button_image", "hfe_scroll_to_top_button_text", "hfe_scroll_to_top_single_disable"];
                $.each(changeHandler, function(index, value) {
                    elementor.settings.page.addChangeCallback(value, scrollToTop);
                });
            });
		}
	};

	/**
	 * Initialize EHF_EPRO_Compatibility
	 */
	$(function(){
		EHF_EPRO_Compatibility.init();
	});

})(jQuery);
