/**
 * AJAX Request Queue
 *
 * - add()
 * - remove()
 * - run()
 * - stop()
 *
 * @since x.x.x
 */
var EHFAjaxQueue = (function() {

	var requests = [];

	return {

		/**
		 * Add AJAX request
		 *
		 * @since x.x.x
		 */
		add:  function(opt) {
		    requests.push(opt);
		},

		/**
		 * Remove AJAX request
		 *
		 * @since x.x.x
		 */
		remove:  function(opt) {
		    if( jQuery.inArray(opt, requests) > -1 )
		        requests.splice($.inArray(opt, requests), 1);
		},

		/**
		 * Run / Process AJAX request
		 *
		 * @since x.x.x
		 */
		run: function() {
		    var self = this,
		        oriSuc;

		    if( requests.length ) {
		        oriSuc = requests[0].complete;

		        requests[0].complete = function() {
		             if( typeof(oriSuc) === 'function' ) oriSuc();
		             requests.shift();
		             self.run.apply(self, []);
		        };

		        jQuery.ajax(requests[0]);

		    } else {

		      self.tid = setTimeout(function() {
		         self.run.apply(self, []);
		      }, 1000);
		    }
		},

		/**
		 * Stop AJAX request
		 *
		 * @since x.x.x
		 */
		stop:  function() {

		    requests = [];
		    clearTimeout(this.tid);
		}
	};

}());

(function($){

	$ehfscope = {};

	$.fn.isInViewport = function() {

		// If not have the element then return false!
		if( ! $( this ).length ) {
			return false;
		}

		var elementTop = $( this ).offset().top;
		var elementBottom = elementTop + $( this ).outerHeight();

		var viewportTop = $( window ).scrollTop();
		var viewportBottom = viewportTop + $( window ).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	EHFBlocks = {

		templateData: {},
		log_file        : '',
		pages_list      : '',
		block_id : 0,
		requiredPlugins : [],
		canInsert : false,
		type : 'blocks',
		action : '',
		masonryObj : [],
		index : 0,
		blockCategory : '',

		_init: function() {
			this._bind();
		},

		/**
		 * Binds events for the Astra Sites.
		 *
		 * @since x.x.x
		 * @access private
		 * @method _bind
		 */
		_bind: function() {

			if ( elementorCommon ) {

				let add_section_tmpl = $( "#tmpl-elementor-add-section" );

				if ( add_section_tmpl.length > 0 ) {

					let action_for_add_section = add_section_tmpl.text();
					
					action_for_add_section = action_for_add_section.replace( '<div class="elementor-add-section-drag-title', '<div class="elementor-add-section-area-button elementor-add-ehf-button" title="Elementor Blocks"> <i class="eicon-folder"></i> </div><div class="elementor-add-section-drag-title' );

					add_section_tmpl.text( action_for_add_section );

					elementor.on( "preview:loaded", function() {

						let base_skeleton = wp.template( 'ehf-base-skeleton' );
						let header_template = $( '#tmpl-ehf-modal__header' ).text();

						EHFBlocks.blockCategory = ehf_blocks.type;

						$( 'body' ).append( base_skeleton() );
						$ehfscope = $( '#ehf-blocks-modal' );
						$ehfscope.find( '.ehf-blocks__content-wrap' ).before( header_template );

						$ehfscope.find( '.ehf-blocks__category' ).select2();

						$ehfscope.find( '.ehf-blocks__category' ).on( 'select2:select', EHFBlocks._categoryChange );

						$( elementor.$previewContents[0].body ).on( "click", ".elementor-add-ehf-button", EHFBlocks._open );

						// Click events.
						$( 'body' ).on( "click", ".ehf-blocks-modal__header__close", EHFBlocks._close );
						$( 'body' ).on( "click", "#ehf-blocks-modal .elementor-template-library-menu-item", EHFBlocks._libraryClick );
						$( 'body' ).on( "click", "#ehf-blocks-modal .theme-screenshot", EHFBlocks._preview );
						$( 'body' ).on( "click", "#ehf-blocks-modal .back-to-layout", EHFBlocks._goBack );

						$( document ).on( "click", "#ehf-blocks-modal .ehf-library-template-insert", EHFBlocks._insert );
						$( document ).on( 'click', '#ehf-blocks-modal .ehf-blocks__sync-wrap', EHFBlocks._sync );
						$( document ).on( 'click', '#ehf-blocks-modal .ehf-blocks-modal__header__logo__icon-wrapper, #ehf-blocks-modal .back-to-layout-button', EHFBlocks._goBack );

						// Other events.
						$ehfscope.find( '.ehf-blocks__content-wrap' ).scroll( EHFBlocks._loadLargeImages );
						$( document ).on( 'keyup input' , '#ehf-blocks-modal #wp-filter-search-input', EHFBlocks._search );

						// Triggers.
						$( document ).on( "ehf-blocks__elementor-open-after", EHFBlocks._initBlocks );
						$( document ).on( "ehf-blocks__elementor-open-before", EHFBlocks._beforeOpen );
						$( document ).on( 'ehf-blocks__elementor-close-before', EHFBlocks._beforeClose );
						$( document ).on( "ehf-blocks__elementor-plugin-check", EHFBlocks._pluginCheck );

						if ( '' != ehf_blocks.type ) {
							EHFBlocks._open();
						}

						// Plugin install & activate.
						$( document ).on( 'wp-plugin-install-success' , EHFBlocks._installSuccess );

					});
				}
			}

		},

		_categoryChange( event ) {
			var data = event.params.data;
			if ( '' !== $( this ).val() ) {
				EHFBlocks.blockCategory = ehf_blocks.block_categories[$( this ).val()].slug;
			} else {
				EHFBlocks.blockCategory = '';
			}
			$ehfscope.find( '#wp-filter-search-input' ).trigger( 'keyup' );
		},

		_beforeClose: function() {
			if ( EHFBlocks.action == 'insert' ) {
				$ehfscope.find( '.ehf-library-template-insert' ).removeClass( 'installing' );
				$ehfscope.find( '.ehf-library-template-insert' ).text( 'Imported' );
				$ehfscope.find( '.ehf-library-template-insert' ).addClass( 'action-done' );
			}
		},

		_sync: function( event ) {

			event.preventDefault();
			var button = $( this ).find( '.ehf-blocks__sync-library-button' );

			if( button.hasClass( 'updating-message') ) {
				return;
			}

			button.addClass( 'updating-message');
			console.log( 'Syncing template library in the background. The process can take anywhere between 2 to 3 minutes. We will notify you once done.' );

			$.ajax({
				url  : ehf_blocks.ajax_url,
				type : 'POST',
				data : {
					action : 'ehf-update-library',
				},
			})
			.fail(function( jqXHR ){
				console.log( jqXHR );
		    })
			.done(function ( response ) {
				button.removeClass( 'updating-message');

				// Import Blocks.
				$.ajax({
					url  : ehf_blocks.ajax_url,
					type : 'POST',
					data : {
						action : 'ehf-import-blocks',
					},
				})
				.fail(function( jqXHR ){
					console.log( jqXHR );
				});

				// Import Block Categories.
				$.ajax({
					url  : ehf_blocks.ajax_url,
					type : 'POST',
					data : {
						action : 'ehf-import-block-categories',
					},
				})
				.fail(function( jqXHR ){
					console.log( jqXHR );
				});
			});
		},

		_pluginCheck : function( e, data ) {

			var api_post = {
				slug: 'astra-blocks' + '/' + data['id']
			};

			var params = {
				method: 'GET',
				cache: 'default',
			};

			fetch( ehf_blocks.api_url + api_post.slug, params ).then( response => {
				if ( response.status === 200 ) {
					return response.json().then(items => ({
						items 		: items,
						items_count	: response.headers.get( 'x-wp-total' ),
						item_pages	: response.headers.get( 'x-wp-totalpages' ),
					}))
				} else {
					return response.json();
				}
			})
			.then(data => {
				if( 'object' === typeof data ) {
					if ( undefined !== data && undefined !== data['items'] ) {
						EHFBlocks.templateData = data['items'];
						if ( undefined !== EHFBlocks.templateData['post-meta']['astra-blocks-required-plugins'] ) {
							/**
							 * Enable Demo Import Button
							 * @type number
							 */
							EHFBlocks.requiredPlugins = EHFBlocks.templateData['post-meta']['astra-blocks-required-plugins'];
							EHFBlocks.canInsert = true;
							$ehfscope.find( '.ehf-block-import-template > div' ).removeClass( 'disabled' );
						}
					}
			   	}
			});
		},

		_importWPForm: function( wpforms_url, callback ) {

			if ( '' == wpforms_url ) {
				if( callback && typeof callback == "function"){
					callback( '' );
			    }
			    return;
			}

			$.ajax({
				url  : ehf_blocks.ajax_url,
				type : 'POST',
				dataType: 'json',
				data : {
					action      : 'ehf-blocks-import-wpforms',
					wpforms_url : wpforms_url,
					_ajax_nonce : ehf_blocks._ajax_nonce,
				},
				beforeSend: function() {
					console.log( 'Importing WP Forms..' );
				},
			})
			.fail(function( jqXHR ){
				console.log( jqXHR.status + ' ' + jqXHR.responseText, true );
		    })
			.done(function ( data ) {

				// 1. Fail - Import WPForms Options.
				if( false === data.success ) {
					console.log( data.data );
				} else {
					if( callback && typeof callback == "function"){
						callback( data );
				    }
				}
			});
		},

		/**
		 * Install All Plugins.
		 */
		_installAllPlugins: function( not_installed ) {

			$.each( not_installed, function(index, single_plugin) {

				console.log( 'Installing Plugin - ' + single_plugin.name );

				// Add each plugin activate request in Ajax queue.
				// @see wp-admin/js/updates.js
				wp.updates.queue.push( {
					action: 'install-plugin', // Required action.
					data:   {
						slug: single_plugin.slug
					}
				} );
			});

			// Required to set queue.
			wp.updates.queueChecker();
		},

		/**
		 * Activate All Plugins.
		 */
		_activateAllPlugins: function( activate_plugins ) {

			$.each( activate_plugins, function(index, single_plugin) {

				console.log( 'Activating Plugin - ' + single_plugin.name );

				EHFAjaxQueue.add({
					url: ehf_blocks.ajax_url,
					type: 'POST',
					data: {
						'action' : 'astra-required-plugin-activate',
						'init' : single_plugin.init,
					},
					success: function( result ){

						if( result.success ) {

							var pluginsList = EHFBlocks.requiredPlugins.inactive;

							// Reset not installed plugins list.
							EHFBlocks.requiredPlugins.inactive = EHFBlocks._removePluginFromQueue( single_plugin.slug, pluginsList );

							// Enable Demo Import Button
							EHFBlocks._enableImport();
						}
					}
				});
			});
			EHFAjaxQueue.run();
		},

		/**
		 * Remove plugin from the queue.
		 */
		_removePluginFromQueue: function( removeItem, pluginsList ) {
			return jQuery.grep(pluginsList, function( value ) {
				return value.slug != removeItem;
			});
		},

		/**
		 * Get plugin from the queue.
		 */
		_getPluginFromQueue: function( item, pluginsList ) {

			var match = '';
			for ( ind in pluginsList ) {
				if( item == pluginsList[ind].slug ) {
					match = pluginsList[ind];
				}
			}
			return match;
		},

		_bulkPluginInstallActivate: function() {

			if( 0 === EHFBlocks.requiredPlugins.length ) {
				return;
			}

			console.log( 'Bulk Plugin Install Process Started' );

			// If has class the skip-plugins then,
			// Avoid installing 3rd party plugins.
			var not_installed = EHFBlocks.requiredPlugins.notinstalled || '';
			var activate_plugins = EHFBlocks.requiredPlugins.inactive || '';

			// First Install Bulk.
			if( not_installed.length > 0 ) {
				EHFBlocks._installAllPlugins( not_installed );
			}

			// Second Activate Bulk.
			if( activate_plugins.length > 0 ) {
				EHFBlocks._activateAllPlugins( activate_plugins );
			}

			if( activate_plugins.length <= 0 && not_installed.length <= 0 ) {
				EHFBlocks._enableImport();
			}
		},

		_unescape: function( input_string ) {
			var title = _.unescape( input_string );

			// @todo check why below character not escape with function _.unescape();
			title = title.replace('&#8211;', '-' );

			return title;
		},

		_unescape_lower: function( input_string ) {
			input_string = $( "<textarea/>") .html( input_string ).text()
			var input_string = EHFBlocks._unescape( input_string );
			return input_string.toLowerCase();
		},

		_search: function() {

			let search_term = $( this ).val() || '';
			search_term = search_term.toLowerCase();

			var items = EHFBlocks._getSearchedBlocks( search_term );
			var blocks = [];

			if( search_term.length ) {
				$( this ).addClass( 'has-input' );
				blocks = items;
			} else {
				$( this ).removeClass( 'has-input' );
				blocks = ehf_blocks.blocks;
			}
			EHFBlocks._appendBlocks( blocks );
		},

		_getSearchedBlocks: function( search_term ) {

			var items = [];

			if( search_term.length ) {

				for( block_id in ehf_blocks.blocks ) {

					var current_site = ehf_blocks.blocks[block_id];

					// Check in site title.
					if( current_site['title'] ) {
						var site_title = EHFBlocks._unescape_lower( current_site['title'] );

						if( site_title.toLowerCase().includes( search_term ) ) {
							items[block_id] = current_site;
						}
					}

					// Check in site tags.
					if( Object.keys( current_site['tag'] ).length ) {
						for( site_tag_id in current_site['tag'] ) {
							var tag_title = EHFBlocks._unescape_lower( current_site['tag'][site_tag_id] );

							if( tag_title.toLowerCase().includes( search_term ) ) {
								items[block_id] = current_site;
							}
						}
					}
				}
			}

			return items;
		},

		_appendBlocks: function( data ) {

			let single_template = wp.template( 'ehf-blocks-list' );
			let blocks_list = single_template( data );
			$ehfscope.find( '.dialog-lightbox-message-block' ).show();
			$ehfscope.find( '.dialog-lightbox-content-block' ).html( blocks_list );
			EHFBlocks._masonry();
		},

		_masonry: function() {

			//create empty var masonryObj
			var masonryObj;
			var container = document.querySelector( '.dialog-lightbox-content-block' );
			// initialize Masonry after all images have loaded
			imagesLoaded( container, function() {
				masonryObj = new Masonry( container, {
					itemSelector: '.ehf-blocks-library-template'
				});
			});
		},

		_enableImport: function() {

			console.log( 'Import Enabled' );

			EHFBlocks._importWPForm( EHFBlocks.templateData['post-meta']['astra-site-wpforms-path'], function( form_response ) {
				EHFBlocks._insertDemo( EHFBlocks.templateData );
			});
		},

		_insert: function( e ) {

			if ( ! EHFBlocks.canInsert ) {
				return;
			}

			console.log( 'Insert Process Started' );

			EHFBlocks.canInsert = false;
			$( this ).addClass( 'installing' );
			$( this ).text( 'Importing Block...' );

			EHFBlocks.action = 'insert';

			EHFBlocks._bulkPluginInstallActivate();
		},

		_insertDemo: function( data ) {

			if ( undefined !== data && undefined !== data[ 'post-meta' ][ '_elementor_data' ] ) {

				// let templateModel = elementor.getPanelView().getCurrentPageView();
				let page_content = JSON.parse( data[ 'post-meta' ][ '_elementor_data' ]);
				let page_settings = '';
				let api_url = ehf_blocks.api_url + 'astra-blocks/' + data['id'] + '/?&track=true&site_url=' + ehf_blocks.site_url;

				$.ajax({
					url  : ehf_blocks.ajax_url,
					type : 'POST',
					data : {
						action : 'ehf-blocks-batch-process',
						id : elementor.config.document.id,
						url : api_url,
						_ajax_nonce : ehf_blocks._ajax_nonce,
					},
					beforeSend: function() {
						console.log( 'Demo Batch Process Started..' );
					},
				})
				.fail(function( jqXHR ){
					console.log( jqXHR );
				})
				.done(function ( response ) {

					page_content = response.data;

					console.log( page_content );

					if ( undefined !== page_content && '' !== page_content ) {
						//elementor.channels.data.trigger('template:before:insert', templateModel);
						elementor.getPreviewView().addChildModel( page_content, { at : EHFBlocks.index } || {} );
						//elementor.channels.data.trigger('template:after:insert', templateModel);
					}
					EHFBlocks._close();
				});
			}
		},

		_goBack: function( e ) {

			$ehfscope.find( '.ehf-blocks-step-1-wrap' ).show();
			$ehfscope.find( '.ehf-block-preview-actions-wrap' ).remove();
			
			// Reset site and page ids to null.
			EHFBlocks.block_id = '';
			EHFBlocks.requiredPlugins = [];
			EHFBlocks.templateData = {};
			EHFBlocks.canInsert = false;

			// Hide Back button.
			$ehfscope.find( '.back-to-layout' ).css( 'visibility', 'hidden' );
			$ehfscope.find( '.back-to-layout' ).css( 'opacity', '0' );

			// Hide Preview Page.
			$ehfscope.find( '.theme-preview-block' ).hide();
			$ehfscope.find( '.theme-preview-block' ).html( '' );
			$ehfscope.find( '.ehf-blocks__category-wrap' ).show();

			// Set listing HTML.
			EHFBlocks._appendBlocks( ehf_blocks.blocks );

			$ehfscope.find( '.dialog-lightbox-content-block' ).show();

			if ( '' !== $ehfscope.find( '#wp-filter-search-input' ).val() ) {
				$ehfscope.find( '#wp-filter-search-input' ).trigger( 'keyup' );
			}
		},

		_preview : function( e ) {

			EHFBlocks.block_id = $( this ).closest( '.ehf-block-theme' ).data( 'block-id' );

			$ehfscope.find( '.back-to-layout' ).css( 'visibility', 'visible' );
			$ehfscope.find( '.back-to-layout' ).css( 'opacity', '1' );

			$ehfscope.find( '.dialog-lightbox-content-block' ).hide();
			$ehfscope.find( '.theme-preview-block' ).show();
			$ehfscope.find( '.ehf-blocks__category-wrap' ).hide();

			let import_template = wp.template( 'ehf-block-preview' );
			let import_template_header = wp.template( 'ehf-blocks-preview-actions' );
			let template_object = ehf_blocks.blocks[ EHFBlocks.block_id ];

			template_object['id'] = EHFBlocks.block_id;

			preview_page_html = import_template( template_object );
			$ehfscope.find( '.theme-preview-block' ).html( preview_page_html );

			$ehfscope.find( '.ehf-blocks-step-1-wrap' ).hide();

			preview_action_html = import_template_header( template_object );
			$ehfscope.find( '.elementor-templates-modal__header__items-area' ).before( preview_action_html );
			EHFBlocks._masonry();

			let actual_id = EHFBlocks.block_id.replace( 'id-', '' );
			$( document ).trigger( 'ehf-blocks__elementor-plugin-check', { 'id': actual_id } );
		},

		_libraryClick: function( e ) {
			$ehfscope.find( ".elementor-template-library-menu-item" ).each( function() {
				$(this).removeClass( 'elementor-active' );
			} );
			$( this ).addClass( 'elementor-active' );
		},

		_loadLargeImage: function( el ) {

			if( el.hasClass('loaded') ) {
				return;
			}

			if( el.parents('.ehf-block-theme').isInViewport() ) {
				var large_img_url = el.data('src') || '';
				var imgLarge = new Image();
				imgLarge.src = large_img_url; 
				imgLarge.onload = function () {
					el.removeClass('loading');
					el.addClass('loaded');
					el.css('background-image', 'url(\''+imgLarge.src+'\'' );
				};
			}
		},

		_loadLargeImages: function() {
			$ehfscope.find('.theme-screenshot').each(function( key, el ) {
				EHFBlocks._loadLargeImage( $(el) );
			});
		},

		_close: function( e ) {
			$( document ).trigger( 'ehf-blocks__elementor-close-before' );
			setTimeout( function() { $ehfscope.fadeOut(); }, 300 );
			$( document ).trigger( 'ehf-blocks__elementor-close-after' );
		},

		_open: function( e ) {
			$( document ).trigger( 'ehf-blocks__elementor-open-before' );
			
			let add_section = $( this ).closest( '.elementor-add-section' );
			
			if ( add_section.hasClass( 'elementor-add-section-inline' ) ) {
				EHFBlocks.index = add_section.prevAll().length;
			} else {
				EHFBlocks.index = add_section.prev().children().length;
			}
			EHFBlocks._goBack();
			$ehfscope.fadeIn();
			$( document ).trigger( 'ehf-blocks__elementor-open-after' );
		},

		_beforeOpen: function( e ) {

			// Hide preview page.
			$ehfscope.find( '.theme-preview' ).hide();
			$ehfscope.find( '.theme-preview' ).html( '' );

			// Show site listing page.

			// Hide Back button.
			$ehfscope.find( '.back-to-layout' ).css( 'visibility', 'hidden' );
			$ehfscope.find( '.back-to-layout' ).css( 'opacity', '0' );
		},

		_initBlocks: function( e ) {
			EHFBlocks._appendBlocks( ehf_blocks.blocks );
			EHFBlocks._goBack();
		},

		/**
		 * Install Success
		 */
		_installSuccess: function( event, response ) {

			event.preventDefault();

			// Transform the 'Install' button into an 'Activate' button.
			var $init = $( '.plugin-card-' + response.slug ).data('init');
			var $name = $( '.plugin-card-' + response.slug ).data('name');

			// Reset not installed plugins list.
			var pluginsList = EHFBlocks.requiredPlugins.notinstalled;
			var curr_plugin = EHFBlocks._getPluginFromQueue( response.slug, pluginsList );

			EHFBlocks.requiredPlugins.notinstalled = EHFBlocks._removePluginFromQueue( response.slug, pluginsList );


			// WordPress adds "Activate" button after waiting for 1000ms. So we will run our activation after that.
			setTimeout( function() {

				console.log( 'Activating Plugin - ' + curr_plugin.name );

				$.ajax({
					url: ehf_blocks.ajax_url,
					type: 'POST',
					data: {
						'action' : 'astra-required-plugin-activate',
						'init' : curr_plugin.init,
					},
				})
				.done(function (result) {

					if( result.success ) {
						var pluginsList = EHFBlocks.requiredPlugins.inactive;

						console.log( 'Activated Plugin - ' + curr_plugin.name );

						// Reset not installed plugins list.
						EHFBlocks.requiredPlugins.inactive = EHFBlocks._removePluginFromQueue( response.slug, pluginsList );

						// Enable Demo Import Button
						EHFBlocks._enableImport();

					}
				});

			}, 1200 );

		},
	};

	/**
	 * Initialize EHFBlocks
	 */
	$(function(){
		EHFBlocks._init();
	});

})(jQuery);
