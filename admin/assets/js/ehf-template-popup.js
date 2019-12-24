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
		insertData: {},
		log_file        : '',
		pages_list      : '',
		insertActionFlag : false,
		block_id : 0,
		requiredPlugins : [],
		canImport : false,
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
						$( 'body' ).on( "click", EHFBlocks._closeTooltip );

						$( document ).on( "click", "#ehf-blocks-modal .ast-library-template-insert", EHFBlocks._insert );
						$( document ).on( "click", ".ast-import-elementor-template", EHFBlocks._importTemplate );
						$( 'body' ).on( "click", "#ehf-blocks-modal .astra-sites-tooltip-icon", EHFBlocks._toggleTooltip );
						$( document ).on( "click", ".elementor-template-library-menu-item", EHFBlocks._toggle );
						$( document ).on( 'click', '#ehf-blocks-modal .astra-sites__sync-wrap', EHFBlocks._sync );
						$( document ).on( 'click', '#ehf-blocks-modal .ehf-blocks-modal__header__logo__icon-wrapper, #ehf-blocks-modal .back-to-layout-button', EHFBlocks._home );
						$( document ).on( 'click', '#ehf-blocks-modal .notice-dismiss', EHFBlocks._dismiss );

						// Other events.
						$ehfscope.find( '.ehf-blocks__content-wrap' ).scroll( EHFBlocks._loadLargeImages );
						$( document ).on( 'keyup input' , '#ehf-blocks-modal #wp-filter-search-input', EHFBlocks._search );

						// Triggers.
						$( document ).on( "astra-sites__elementor-open-after", EHFBlocks._initSites );
						$( document ).on( "astra-sites__elementor-open-before", EHFBlocks._beforeOpen );
						$( document ).on( "astra-sites__elementor-plugin-check", EHFBlocks._pluginCheck );
						$( document ).on( 'astra-sites__elementor-close-before', EHFBlocks._beforeClose );

						$( document ).on( 'astra-sites__elementor-do-step-1', EHFBlocks._step1 );
						$( document ).on( 'astra-sites__elementor-do-step-2', EHFBlocks._step2 );

						$( document ).on( 'astra-sites__elementor-goback-step-1', EHFBlocks._goStep1 );
						$( document ).on( 'astra-sites__elementor-goback-step-2', EHFBlocks._goStep2 );

						// Plugin install & activate.
						$( document ).on( 'wp-plugin-installing' , EHFBlocks._pluginInstalling );
						$( document ).on( 'wp-plugin-install-error' , EHFBlocks._installError );
						$( document ).on( 'wp-plugin-install-success' , EHFBlocks._installSuccess );

					});
				}
			}

		},

		_categoryChange( event ) {
			var data = event.params.data;
			EHFBlocks.blockCategory = $( this ).val();
			$ehfscope.find( '#wp-filter-search-input' ).trigger( 'keyup' );
		},

		_dismiss: function() {

			$( this ).closest( '.ast-sites-floating-notice-wrap' ).removeClass( 'slide-in' );
			$( this ).closest( '.ast-sites-floating-notice-wrap' ).addClass( 'slide-out' );

			setTimeout( function() {
				$( this ).closest( '.ast-sites-floating-notice-wrap' ).removeClass( 'slide-out' );
			}, 200 );

			if ( $( this ).closest( '.ast-sites-floating-notice-wrap' ).hasClass( 'refreshed-notice' ) ) {
				$.ajax({
					url  : ehf_blocks.ajax_url,
					type : 'POST',
					data : {
						action : 'ehf-update-library-complete',
					},
				});
			}
		},

		_done: function( data ) {

			var str = ( EHFBlocks.type == 'pages' ) ? 'Template' : 'Block';
			$ehfscope.find( '.ast-import-elementor-template' ).removeClass( 'installing' );
			$ehfscope.find( '.ast-import-elementor-template' ).attr( 'data-demo-link', data.data.link );
			setTimeout( function() {
				$ehfscope.find( '.ast-import-elementor-template' ).text( 'View Saved ' + str );
				$ehfscope.find( '.ast-import-elementor-template' ).addClass( 'action-done' );
			}, 200 );
		},

		_beforeClose: function() {
			if ( EHFBlocks.action == 'insert' ) {
				$ehfscope.find( '.ast-library-template-insert' ).removeClass( 'installing' );
				$ehfscope.find( '.ast-library-template-insert' ).text( 'Imported' );
				$ehfscope.find( '.ast-library-template-insert' ).addClass( 'action-done' );

				if ( $ehfscope.find( '.ast-sites-floating-notice-wrap' ).hasClass( 'slide-in' ) ) {

					$ehfscope.find( '.ast-sites-floating-notice-wrap' ).removeClass( 'slide-in' );
					$ehfscope.find( '.ast-sites-floating-notice-wrap' ).addClass( 'slide-out' );

					setTimeout( function() {
						$ehfscope.find( '.ast-sites-floating-notice-wrap' ).removeClass( 'slide-out' );
					}, 200 );
				}
			}
		},

		_closeTooltip: function( event ) {

			if(
				event.target.className !== "ast-tooltip-wrap" &&
				event.target.className !== "dashicons dashicons-editor-help"
			) {
				var wrap = $ehfscope.find( '.ast-tooltip-wrap' );
				if ( wrap.hasClass( 'ast-show-tooltip' ) ) {
					$ehfscope.find( '.ast-tooltip-wrap' ).removeClass( 'ast-show-tooltip' );
				}
			}
		},

		_sync: function( event ) {

			event.preventDefault();
			var button = $( this ).find( '.astra-sites-sync-library-button' );

			if( button.hasClass( 'updating-message') ) {
				return;
			}

			button.addClass( 'updating-message');
			$ehfscope.find( '#ast-sites-floating-notice-wrap-id .ast-sites-floating-notice' ).html( '<span class="message">Syncing template library in the background. The process can take anywhere between 2 to 3 minutes. We will notify you once done.<span><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss</span></button>' );
			$ehfscope.find( '#ast-sites-floating-notice-wrap-id' ).addClass( 'slide-in' );

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

		_toggleTooltip: function( e ) {

			var wrap = $ehfscope.find( '.ast-tooltip-wrap' );


			if ( wrap.hasClass( 'ast-show-tooltip' ) ) {
				$ehfscope.find( '.ast-tooltip-wrap' ).removeClass( 'ast-show-tooltip' );
			} else {
				$ehfscope.find( '.ast-tooltip-wrap' ).addClass( 'ast-show-tooltip' );
			}
		},

		_toggle: function( e ) {
			$ehfscope.find( '.elementor-template-library-menu-item' ).removeClass( 'elementor-active' );

			$ehfscope.find( '.dialog-lightbox-content' ).hide();

			$ehfscope.find( '.theme-preview' ).hide();
			$ehfscope.find( '.theme-preview' ).html( '' );
			$ehfscope.find( '.theme-preview-block' ).hide();
			$ehfscope.find( '.theme-preview-block' ).html( '' );
			$ehfscope.find( '.ehf-blocks__category-wrap' ).show();

			$ehfscope.find( '.dialog-lightbox-content' ).hide();
			$ehfscope.find( '.dialog-lightbox-content-block' ).hide();

			$( this ).addClass( 'elementor-active' );
			let data_type = $( this ).data( 'template-type' );

			EHFBlocks.type = data_type;
			EHFBlocks._switchTo( data_type );
		},

		_home: function() {
			$ehfscope.find( '#wp-filter-search-input' ).val( '' );
			$ehfscope.find( '.elementor-template-library-menu-item:first-child' ).trigger( 'click' );
		},

		_switchTo: function( type ) {
			if ( 'pages' == type ) {
				EHFBlocks._initSites();
				$ehfscope.find( '.dialog-lightbox-content' ).show();
			} else {
				EHFBlocks._initBlocks();
				$ehfscope.find( '.dialog-lightbox-content-block' ).show();
			}
			$ehfscope.find( '.ehf-blocks__content-wrap' ).trigger( 'scroll' );
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
					action      : 'astra-sites-import-wpforms',
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

		_createTemplate: function( data ) {

			// Work with JSON page here
			$.ajax({
				url: ehf_blocks.ajax_url,
				type: 'POST',
				dataType: 'json',
				data: {
					'action' : 'astra-sites-create-template',
					'data'   : data,
					'title'  : ( EHFBlocks.type == 'pages' ) ? ehf_blocks.default_page_builder_sites[ EHFBlocks.site_id ]['title'] : '',
					'type'   : EHFBlocks.type,
					'_ajax_nonce' : ehf_blocks._ajax_nonce,
				},
				beforeSend: function() {
					console.log( 'Creating Template..' );
				}
			})
			.fail(function( jqXHR ){
				console.log( jqXHR );
			})
			.done(function ( data ) {
				EHFBlocks._done( data );
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

		_importTemplate: function( e ) {

			if ( ! EHFBlocks.canImport ) {
				if ( $( this ).attr( 'data-demo-link' ) != undefined ) {
					window.open( $( this ).attr( 'data-demo-link' ), '_blank' );
				}
				return;
			}

			EHFBlocks.canImport = false;

			var str = ( EHFBlocks.type == 'pages' ) ? 'Template' : 'Block';

			$( this ).addClass( 'installing' );
			$( this ).text( 'Saving ' + str + '...' );

			EHFBlocks.action = 'import';

			EHFBlocks._bulkPluginInstallActivate();
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

			if ( 'pages' == EHFBlocks.type ) {

				var items = EHFBlocks._getSearchedPages( search_term );

				if( search_term.length ) {
					$( this ).addClass( 'has-input' );
					EHFBlocks._addSites( items );
				} else {
					$( this ).removeClass( 'has-input' );
					EHFBlocks._appendSites( ehf_blocks.default_page_builder_sites );
				}
			} else {

				var items = EHFBlocks._getSearchedBlocks( search_term );

				if( search_term.length ) {
					$( this ).addClass( 'has-input' );
					EHFBlocks._appendBlocks( items );
				} else {
					$( this ).removeClass( 'has-input' );
					EHFBlocks._appendBlocks( ehf_blocks.astra_blocks );
				}
			}
		},

		_getSearchedPages: function( search_term ) {
			var items = [];
			search_term = search_term.toLowerCase();

			for( site_id in ehf_blocks.default_page_builder_sites ) {

				var current_site = ehf_blocks.default_page_builder_sites[site_id];

				// Check in site title.
				if( current_site['title'] ) {
					var site_title = EHFBlocks._unescape_lower( current_site['title'] );

					if( site_title.toLowerCase().includes( search_term ) ) {

						for( page_id in current_site['pages'] ) {

							items[page_id] = current_site['pages'][page_id];
							items[page_id]['type'] = 'page';
							items[page_id]['site_id'] = site_id;
							items[page_id]['astra-sites-type'] = current_site['astra-sites-type'] || '';
							items[page_id]['parent-site-name'] = current_site['title'] || '';
							items[page_id]['pages-count'] = 0;
						}
					}
				}

				// Check in site tags.
				if ( undefined != current_site['astra-sites-tag'] ) {

					if( Object.keys( current_site['astra-sites-tag'] ).length ) {
						for( site_tag_id in current_site['astra-sites-tag'] ) {
							var tag_title = current_site['astra-sites-tag'][site_tag_id];
								tag_title = EHFBlocks._unescape_lower( tag_title.replace('-', ' ') );

							if( tag_title.toLowerCase().includes( search_term ) ) {

								for( page_id in current_site['pages'] ) {

									items[page_id] = current_site['pages'][page_id];
									items[page_id]['type'] = 'page';
									items[page_id]['site_id'] = site_id;
									items[page_id]['astra-sites-type'] = current_site['astra-sites-type'] || '';
									items[page_id]['parent-site-name'] = current_site['title'] || '';
									items[page_id]['pages-count'] = 0;
								}
							}
						}
					}
				}

				// Check in page title.
				if( Object.keys( current_site['pages'] ).length ) {
					var pages = current_site['pages'];

					for( page_id in pages ) {

						// Check in site title.
						if( pages[page_id]['title'] ) {

							var page_title = EHFBlocks._unescape_lower( pages[page_id]['title'] );

							if( page_title.toLowerCase().includes( search_term ) ) {
								items[page_id] = pages[page_id];
								items[page_id]['type'] = 'page';
								items[page_id]['site_id'] = site_id;
								items[page_id]['astra-sites-type'] = current_site['astra-sites-type'] || '';
								items[page_id]['parent-site-name'] = current_site['title'] || '';
								items[page_id]['pages-count'] = 0;
							}
						}

						// Check in site tags.
						if ( undefined != pages[page_id]['astra-sites-tag'] ) {

							if( Object.keys( pages[page_id]['astra-sites-tag'] ).length ) {
								for( page_tag_id in pages[page_id]['astra-sites-tag'] ) {
									var page_tag_title = pages[page_id]['astra-sites-tag'][page_tag_id];
										page_tag_title = EHFBlocks._unescape_lower( page_tag_title.replace('-', ' ') );
									if( page_tag_title.toLowerCase().includes( search_term ) ) {
										items[page_id] = pages[page_id];
										items[page_id]['type'] = 'page';
										items[page_id]['site_id'] = site_id;
										items[page_id]['astra-sites-type'] = current_site['astra-sites-type'] || '';
										items[page_id]['parent-site-name'] = current_site['title'] || '';
										items[page_id]['pages-count'] = 0;
									}
								}
							}
						}

					}
				}
			}

			return items;
		},

		_getSearchedBlocks: function( search_term ) {

			var items = [];

			if( search_term.length ) {

				for( block_id in ehf_blocks.astra_blocks ) {

					var current_site = ehf_blocks.astra_blocks[block_id];

					// Check in site title.
					if( current_site['title'] ) {
						var site_title = EHFBlocks._unescape_lower( current_site['title'] );

						if( site_title.toLowerCase().includes( search_term ) ) {
							items[block_id] = current_site;
							items[block_id]['type'] = 'site';
							items[block_id]['site_id'] = block_id;
						}
					}

					// Check in site tags.
					if( Object.keys( current_site['tag'] ).length ) {
						for( site_tag_id in current_site['tag'] ) {
							var tag_title = EHFBlocks._unescape_lower( current_site['tag'][site_tag_id] );

							if( tag_title.toLowerCase().includes( search_term ) ) {
								items[block_id] = current_site;
								items[block_id]['type'] = 'site';
								items[block_id]['site_id'] = block_id;
							}
						}
					}
				}
			}

			return items;
		},

		_addSites: function( data ) {

			if ( data ) {
				let single_template = wp.template( 'ehf-search' );
				pages_list = single_template( data );
				$ehfscope.find( '.dialog-lightbox-content' ).html( pages_list );
				EHFBlocks._loadLargeImages();

			} else {
				$ehfscope.find( '.dialog-lightbox-content' ).html( wp.template('ehf-no-sites') );
			}
		},

		_appendSites: function( data ) {

			let single_template = wp.template( 'astra-sites-list' );
			pages_list = single_template( data );
			$ehfscope.find( '.dialog-lightbox-message-block' ).hide();
			$ehfscope.find( '.dialog-lightbox-message' ).show();
			$ehfscope.find( '.dialog-lightbox-content' ).html( pages_list );
			EHFBlocks._loadLargeImages();
		},

		_appendBlocks: function( data ) {

			let single_template = wp.template( 'ehf-blocks-list' );
			let blocks_list = single_template( data );
			$ehfscope.find( '.dialog-lightbox-message' ).hide();
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
					itemSelector: '.astra-sites-library-template'
				});
			});
		},

		_enableImport: function() {

			console.log( 'Import Enabled' );

			if ( 'pages' == EHFBlocks.type ) {

				EHFBlocks._importWPForm( EHFBlocks.templateData['astra-site-wpforms-path'], function( form_response ) {

					fetch( EHFBlocks.templateData['astra-page-api-url'] + '?&track=true&site_url=' + ehf_blocks.site_url ).then(response => {
						return response.json();
					}).then( data => {
						EHFBlocks.insertData = data;
						if ( 'insert' == EHFBlocks.action ) {
							EHFBlocks._insertDemo( data );
						} else {
							EHFBlocks._createTemplate( data );
						}
					}).catch( err => {
						console.log( err );
					});
				});

			} else {

				EHFBlocks._importWPForm( EHFBlocks.templateData['post-meta']['astra-site-wpforms-path'], function( form_response ) {
					EHFBlocks.insertData = EHFBlocks.templateData;
					if ( 'insert' == EHFBlocks.action ) {
						EHFBlocks._insertDemo( EHFBlocks.templateData );
					} else {
						EHFBlocks._createTemplate( EHFBlocks.templateData );
					}
				});


			}
		},

		_insert: function( e ) {

			if ( ! EHFBlocks.canInsert ) {
				return;
			}

			console.log( 'Insert Process Started' );

			if ( 'pages' == EHFBlocks.type ) {

				$ehfscope.find( '#ast-sites-floating-notice-wrap-id .ast-sites-floating-notice' ).html( 'Inserting this Page will add a common Page Setting as <strong>Starter Templates Settings</strong>. You can turn the setting off if you do not wish to use them. <button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss</span></button>' );
				$ehfscope.find( '#ast-sites-floating-notice-wrap-id' ).addClass( 'slide-in' );
			}


			EHFBlocks.canInsert = false;
			var str = ( EHFBlocks.type == 'pages' ) ? 'Template' : 'Block';

			$( this ).addClass( 'installing' );
			$( this ).text( 'Importing ' + str + '...' );

			EHFBlocks.action = 'insert';

			EHFBlocks._bulkPluginInstallActivate();
		},

		_insertDemo: function( data ) {

			if ( undefined !== data && undefined !== data[ 'post-meta' ][ '_elementor_data' ] ) {

				// let templateModel = elementor.getPanelView().getCurrentPageView();
				let page_content = JSON.parse( data[ 'post-meta' ][ '_elementor_data' ]);
				let page_settings = '';
				let api_url = '';

				if ( 'blocks' == EHFBlocks.type ) {
					api_url = ehf_blocks.ApiURL + 'astra-blocks/' + data['id'] + '/?&track=true&site_url=' + ehf_blocks.site_url;
				} else {
					api_url = EHFBlocks.templateData['astra-page-api-url'] + '?&track=true&site_url=' + ehf_blocks.site_url;
				}

				$.ajax({
					url  : ehf_blocks.ajax_url,
					type : 'POST',
					data : {
						action : 'astra-page-elementor-batch-process',
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

					if ( undefined !== data[ 'post-meta' ][ '_elementor_page_settings' ] ) {
						page_settings = PHP.parse( data[ 'post-meta' ][ '_elementor_page_settings' ] );
					}

					if ( '' != page_settings ) {
						if ( undefined != page_settings.astra_sites_page_setting_enable ) {
								page_settings.astra_sites_page_setting_enable = 'yes';
						}

						if ( undefined != page_settings.astra_sites_body_font_family ) {
							page_settings.astra_sites_body_font_family = page_settings.astra_sites_body_font_family.replace( /'/g, '' );
						}

						for ( var i = 1; i < 7; i++ ) {

							if ( undefined != page_settings['astra_sites_heading_' + i + '_font_family'] ) {
								page_settings['astra_sites_heading_' + i + '_font_family'] = page_settings['astra_sites_heading_' + i + '_font_family'].replace( /'/g, '' );
							}
						}
					}

					if ( undefined !== page_content && '' !== page_content ) {
						//elementor.channels.data.trigger('template:before:insert', templateModel);
						elementor.getPreviewView().addChildModel( page_content, { at : EHFBlocks.index } || {} );
						//elementor.channels.data.trigger('template:after:insert', templateModel);
						elementor.settings.page.model.setExternalChange( page_settings );
					}
					EHFBlocks.insertActionFlag = true;
					EHFBlocks._close();
				});
			}
		},

		_goBack: function( e ) {

			let step = $( this ).attr( 'data-step' );

			$ehfscope.find( '.astra-sites-step-1-wrap' ).show();
			$ehfscope.find( '.astra-preview-actions-wrap' ).remove();

			if ( 'pages' == EHFBlocks.type ) {

				if ( 3 == step ) {
					$( this ).attr( 'data-step', 2 );
					$( document ).trigger( 'astra-sites__elementor-goback-step-2' );
				} else if ( 2 == step ) {
					$( this ).attr( 'data-step', 1 );
					$( document ).trigger( 'astra-sites__elementor-goback-step-1' );
				}
			} else {
				$( this ).attr( 'data-step', 1 );
				$( document ).trigger( 'astra-sites__elementor-goback-step-1' );
			}

			$ehfscope.find( '.ehf-blocks__content-wrap' ).trigger( 'scroll' );
		},

		_goStep1: function( e ) {


			// Reset site and page ids to null.
			EHFBlocks.site_id = '';
			EHFBlocks.page_id = '';
			EHFBlocks.block_id = '';
			EHFBlocks.requiredPlugins = [];
			EHFBlocks.templateData = {};
			EHFBlocks.canImport = false;
			EHFBlocks.canInsert = false;

			// Hide Back button.
			$ehfscope.find( '.back-to-layout' ).css( 'visibility', 'hidden' );
			$ehfscope.find( '.back-to-layout' ).css( 'opacity', '0' );

			// Hide Preview Page.
			$ehfscope.find( '.theme-preview' ).hide();
			$ehfscope.find( '.theme-preview' ).html( '' );
			$ehfscope.find( '.theme-preview-block' ).hide();
			$ehfscope.find( '.theme-preview-block' ).html( '' );
			$ehfscope.find( '.ehf-blocks__category-wrap' ).show();

			// Show listing page.
			if( EHFBlocks.type == 'pages' ) {

				$ehfscope.find( '.dialog-lightbox-content' ).show();
				$ehfscope.find( '.dialog-lightbox-content-block' ).hide();

				// Set listing HTML.
				EHFBlocks._appendSites( ehf_blocks.default_page_builder_sites );
			} else {

				// Set listing HTML.
				EHFBlocks._appendBlocks( ehf_blocks.astra_blocks );

				$ehfscope.find( '.dialog-lightbox-content-block' ).show();
				$ehfscope.find( '.dialog-lightbox-content' ).hide();

				if ( '' !== $ehfscope.find( '#wp-filter-search-input' ).val() ) {
					$ehfscope.find( '#wp-filter-search-input' ).trigger( 'keyup' );
				}
			}
		},

		_goStep2: function( e ) {

			// Set page and site ids.
			EHFBlocks.site_id = $ehfscope.find( '#astra-blocks' ).data( 'site-id' );
			EHFBlocks.page_id = '';

			if ( undefined === EHFBlocks.site_id ) {
				return;
			}

			// Single Preview template.
			let single_template = wp.template( 'astra-sites-list-search' );
			let passing_data = ehf_blocks.default_page_builder_sites[ EHFBlocks.site_id ]['pages'];
			passing_data['site_id'] = EHFBlocks.site_id;
			pages_list = single_template( passing_data );
			$ehfscope.find( '.dialog-lightbox-content' ).html( pages_list );

			// Hide Preview page.
			$ehfscope.find( '.theme-preview' ).hide();
			$ehfscope.find( '.theme-preview' ).html( '' );
			$ehfscope.find( '.ehf-blocks__category-wrap' ).show();
			$ehfscope.find( '.theme-preview-block' ).hide();
			$ehfscope.find( '.theme-preview-block' ).html( '' );

			// Show listing page.
			$ehfscope.find( '.dialog-lightbox-content' ).show();
			$ehfscope.find( '.dialog-lightbox-content-block' ).hide();

			EHFBlocks._loadLargeImages();

			if ( '' !== $ehfscope.find( '#wp-filter-search-input' ).val() ) {
				$ehfscope.find( '#wp-filter-search-input' ).trigger( 'keyup' );
			}
		},

		_step1: function( e ) {

			if ( 'pages' == EHFBlocks.type ) {

				let passing_data = ehf_blocks.default_page_builder_sites[ EHFBlocks.site_id ]['pages'];

				var count = 0;
				var one_page = [];
				var one_page_id = '';

				for ( key in passing_data ) {
					if ( undefined == passing_data[ key ]['site-pages-type'] ) {
						continue;
					}
					if ( 'gutenberg' == passing_data[key]['site-pages-page-builder'] ) {
						continue;
					}
					count++;
					one_page = passing_data[ key ];
					one_page_id = key;
				}

				if ( count == 1 ) {

					// Logic for one page sites.
					EHFBlocks.page_id = one_page_id;

					$ehfscope.find( '.back-to-layout' ).css( 'visibility', 'visible' );
					$ehfscope.find( '.back-to-layout' ).css( 'opacity', '1' );

					$ehfscope.find( '.back-to-layout' ).attr( 'data-step', 2 );
					$( document ).trigger( 'astra-sites__elementor-do-step-2' );

					return;
				}


				let single_template = wp.template( 'astra-sites-list-search' );
				passing_data['site_id'] = EHFBlocks.site_id;
				pages_list = single_template( passing_data );
				$ehfscope.find( '.dialog-lightbox-content-block' ).hide();
				$ehfscope.find( '.astra-sites-step-1-wrap' ).show();
				$ehfscope.find( '.astra-preview-actions-wrap' ).remove();
				$ehfscope.find( '.theme-preview' ).hide();
				$ehfscope.find( '.theme-preview' ).html( '' );
				$ehfscope.find( '.ehf-blocks__category-wrap' ).show();
				$ehfscope.find( '.theme-preview-block' ).hide();
				$ehfscope.find( '.theme-preview-block' ).html( '' );
				$ehfscope.find( '.dialog-lightbox-content' ).show();
				$ehfscope.find( '.dialog-lightbox-content' ).html( pages_list );

				EHFBlocks._loadLargeImages();

			} else {

				$ehfscope.find( '.dialog-lightbox-content' ).hide();
				$ehfscope.find( '.dialog-lightbox-content-block' ).hide();
				$ehfscope.find( '.dialog-lightbox-message' ).animate({ scrollTop: 0 }, 50 );
				$ehfscope.find( '.theme-preview-block' ).show();
				$ehfscope.find( '.ehf-blocks__category-wrap' ).hide();

				// Hide.
				$ehfscope.find( '.theme-preview' ).hide();
				$ehfscope.find( '.theme-preview' ).html( '' );

				let import_template = wp.template( 'astra-sites-elementor-preview' );
				let import_template_header = wp.template( 'astra-sites-elementor-preview-actions' );
				let template_object = ehf_blocks.astra_blocks[ EHFBlocks.block_id ];

				template_object['id'] = EHFBlocks.block_id;

				preview_page_html = import_template( template_object );
				$ehfscope.find( '.theme-preview-block' ).html( preview_page_html );

				$ehfscope.find( '.astra-sites-step-1-wrap' ).hide();

				preview_action_html = import_template_header( template_object );
				$ehfscope.find( '.elementor-templates-modal__header__items-area' ).before( preview_action_html );
				EHFBlocks._masonry();

				let actual_id = EHFBlocks.block_id.replace( 'id-', '' );
				$( document ).trigger( 'astra-sites__elementor-plugin-check', { 'id': actual_id } );
			}
		},

		_step2: function( e ) {

			$ehfscope.find( '.dialog-lightbox-content' ).hide();
			$ehfscope.find( '.dialog-lightbox-message' ).animate({ scrollTop: 0 }, 50 );
			$ehfscope.find( '.theme-preview' ).show();

			if ( undefined === EHFBlocks.site_id ) {
				return;
			}

			let import_template = wp.template( 'astra-sites-elementor-preview' );
			let import_template_header = wp.template( 'astra-sites-elementor-preview-actions' );
			let template_object = ehf_blocks.default_page_builder_sites[ EHFBlocks.site_id ]['pages'][ EHFBlocks.page_id ];

			if ( undefined === template_object ) {
				return;
			}

			template_object['id'] = EHFBlocks.site_id;

			preview_page_html = import_template( template_object );
			$ehfscope.find( '.theme-preview' ).html( preview_page_html );

			$ehfscope.find( '.astra-sites-step-1-wrap' ).hide();

			preview_action_html = import_template_header( template_object );
				$ehfscope.find( '.elementor-templates-modal__header__items-area' ).before( preview_action_html );

			let actual_id = EHFBlocks.page_id.replace( 'id-', '' );
			$( document ).trigger( 'astra-sites__elementor-plugin-check', { 'id': actual_id } );
		},

		_preview : function( e ) {

			let step = $( this ).attr( 'data-step' );

			EHFBlocks.site_id = $( this ).closest( '.astra-theme' ).data( 'site-id' );
			EHFBlocks.page_id = $( this ).closest( '.astra-theme' ).data( 'template-id' );
			EHFBlocks.block_id = $( this ).closest( '.astra-theme' ).data( 'block-id' );

			$ehfscope.find( '.back-to-layout' ).css( 'visibility', 'visible' );
			$ehfscope.find( '.back-to-layout' ).css( 'opacity', '1' );

			if ( 1 == step ) {

				$ehfscope.find( '.back-to-layout' ).attr( 'data-step', 2 );
				$( document ).trigger( 'astra-sites__elementor-do-step-1' );

			} else {

				$ehfscope.find( '.back-to-layout' ).attr( 'data-step', 3 );
				$( document ).trigger( 'astra-sites__elementor-do-step-2' );

			}
		},

		_pluginCheck : function( e, data ) {

			var api_post = {
				slug: 'site-pages' + '/' + data['id']
			};

			if ( 'blocks' == EHFBlocks.type ) {
				api_post = {
					slug: 'astra-blocks' + '/' + data['id']
				};
			}


			var params = {
				method: 'GET',
				cache: 'default',
			};

			fetch( ehf_blocks.ApiURL + api_post.slug, params ).then( response => {
				if ( response.status === 200 ) {
					return response.json().then(items => ({
						items 		: items,
						items_count	: response.headers.get( 'x-wp-total' ),
						item_pages	: response.headers.get( 'x-wp-totalpages' ),
					}))
				} else {
					//$(document).trigger( 'astra-sites-api-request-error' );
					return response.json();
				}
			})
			.then(data => {
				if( 'object' === typeof data ) {
					if ( undefined !== data && undefined !== data['items'] ) {
						EHFBlocks.templateData = data['items'];
						if ( EHFBlocks.type == 'pages' ) {

							if ( undefined !== EHFBlocks.templateData['site-pages-required-plugins'] ) {
								EHFBlocks._requiredPluginsMarkup( EHFBlocks.templateData['site-pages-required-plugins'] );
							}
						} else {
							if ( undefined !== EHFBlocks.templateData['post-meta']['astra-blocks-required-plugins'] ) {
								EHFBlocks._requiredPluginsMarkup( EHFBlocks.templateData['post-meta']['astra-blocks-required-plugins'] );
							}
						}
					}
			   	}
			});
		},

		_requiredPluginsMarkup: function( requiredPlugins ) {

			if( '' === requiredPlugins ) {
				return;
			}

			if (
				EHFBlocks.type == 'pages' &&
				ehf_blocks.default_page_builder_sites[EHFBlocks.site_id]['astra-sites-type'] != undefined &&
				ehf_blocks.default_page_builder_sites[EHFBlocks.site_id]['astra-sites-type'] != 'free'
			) {

				if ( ! ehf_blocks.license_status ) {

					output = '<p class="ast-validate">' + ehf_blocks.license_msg + '</p>';

					$ehfscope.find('.required-plugins-list').html( output );
					$ehfscope.find('.ast-tooltip-wrap').css( 'opacity', 1 );
					$ehfscope.find('.astra-sites-tooltip').css( 'opacity', 1 );

					/**
					 * Enable Demo Import Button
					 * @type number
					 */
					EHFBlocks.requiredPlugins = [];
					EHFBlocks.canImport = true;
					EHFBlocks.canInsert = true;
					$ehfscope.find( '.astra-sites-import-template-action > div' ).removeClass( 'disabled' );
					return;
				}

			}

		 	// Required Required.
			$.ajax({
				url  : ehf_blocks.ajax_url,
				type : 'POST',
				data : {
					action           : 'astra-required-plugins',
					_ajax_nonce      : ehf_blocks._ajax_nonce,
					required_plugins : requiredPlugins
				},
			})
			.fail(function( jqXHR ){
				console.log( jqXHR );
			})
			.done(function ( response ) {

				var output = '';

				/**
				 * Count remaining plugins.
				 * @type number
				 */
				var remaining_plugins = 0;
				var required_plugins_markup = '';

				required_plugins = response.data['required_plugins'];				

				if( response.data['third_party_required_plugins'].length ) {
					output += '<li class="plugin-card plugin-card-'+plugin.slug+'" data-slug="'+plugin.slug+'" data-init="'+plugin.init+'" data-name="'+plugin.name+'">'+plugin.name+'</li>';
				}

				/**
				 * Not Installed
				 *
				 * List of not installed required plugins.
				 */
				if ( typeof required_plugins.notinstalled !== 'undefined' ) {

					// Add not have installed plugins count.
					remaining_plugins += parseInt( required_plugins.notinstalled.length );

					$( required_plugins.notinstalled ).each(function( index, plugin ) {
						if ( 'elementor' == plugin.slug ) {
							return;
						}
						output += '<li class="plugin-card plugin-card-'+plugin.slug+'" data-slug="'+plugin.slug+'" data-init="'+plugin.init+'" data-name="'+plugin.name+'">'+plugin.name+'</li>';
					});
				}

				/**
				 * Inactive
				 *
				 * List of not inactive required plugins.
				 */
				if ( typeof required_plugins.inactive !== 'undefined' ) {

					// Add inactive plugins count.
					remaining_plugins += parseInt( required_plugins.inactive.length );

					$( required_plugins.inactive ).each(function( index, plugin ) {
						if ( 'elementor' == plugin.slug ) {
							return;
						}
						output += '<li class="plugin-card plugin-card-'+plugin.slug+'" data-slug="'+plugin.slug+'" data-init="'+plugin.init+'" data-name="'+plugin.name+'">'+plugin.name+'</li>';
					});
				}

				/**
				 * Active
				 *
				 * List of not active required plugins.
				 */
				if ( typeof required_plugins.active !== 'undefined' ) {

					$( required_plugins.active ).each(function( index, plugin ) {
						if ( 'elementor' == plugin.slug ) {
							return;
						}
						output += '<li class="plugin-card plugin-card-'+plugin.slug+'" data-slug="'+plugin.slug+'" data-init="'+plugin.init+'" data-name="'+plugin.name+'">'+plugin.name+'</li>';
					});
				}

				if ( '' != output ) {
					output = '<li class="plugin-card-head"><strong>Install Required Plugins</strong></li>' + output;
					$ehfscope.find('.required-plugins-list').html( output );
					$ehfscope.find('.ast-tooltip-wrap').css( 'opacity', 1 );
					$ehfscope.find('.astra-sites-tooltip').css( 'opacity', 1 );
				}


				/**
				 * Enable Demo Import Button
				 * @type number
				 */
				EHFBlocks.requiredPlugins = response.data['required_plugins'];
				EHFBlocks.canImport = true;
				EHFBlocks.canInsert = true;
				$ehfscope.find( '.astra-sites-import-template-action > div' ).removeClass( 'disabled' );
			});
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

			if( el.parents('.astra-theme').isInViewport() ) {
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
			$( document ).trigger( 'astra-sites__elementor-close-before' );
			setTimeout( function() { $ehfscope.fadeOut(); }, 300 );
			$( document ).trigger( 'astra-sites__elementor-close-after' );
		},

		_open: function( e ) {
			$( document ).trigger( 'astra-sites__elementor-open-before' );
			
			let add_section = $( this ).closest( '.elementor-add-section' );
			
			if ( add_section.hasClass( 'elementor-add-section-inline' ) ) {
				EHFBlocks.index = add_section.prevAll().length;
			} else {
				EHFBlocks.index = add_section.prev().children().length;
			}
			EHFBlocks._home();
			$ehfscope.fadeIn();
			$( document ).trigger( 'astra-sites__elementor-open-after' );
		},

		_beforeOpen: function( e ) {

			// Hide preview page.
			$ehfscope.find( '.theme-preview' ).hide();
			$ehfscope.find( '.theme-preview' ).html( '' );

			// Show site listing page.
			$ehfscope.find( '.dialog-lightbox-content' ).show();

			// Hide Back button.
			$ehfscope.find( '.back-to-layout' ).css( 'visibility', 'hidden' );
			$ehfscope.find( '.back-to-layout' ).css( 'opacity', '0' );
		},

		_initSites: function( e ) {
			EHFBlocks._appendSites( ehf_blocks.default_page_builder_sites );
			EHFBlocks._goBack();
		},

		_initBlocks: function( e ) {
			EHFBlocks._appendBlocks( ehf_blocks.astra_blocks );
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

		/**
		 * Plugin Installation Error.
		 */
		_installError: function( event, response ) {

			// var $card = $( '.plugin-card-' + response.slug );
			// var $name = $card.data('name');

			// EHFBlocks._log_title( response.errorMessage + ' ' + EHFBlocks.ucwords($name) );


			// $card
			// 	.removeClass( 'button-primary' )
			// 	.addClass( 'disabled' )
			// 	.html( wp.updates.l10n.installFailedShort );

		},

		/**
		 * Installing Plugin
		 */
		_pluginInstalling: function(event, args) {
			// event.preventDefault();

			// var $card = $( '.plugin-card-' + args.slug );
			// var $name = $card.data('name');

			// EHFBlocks._log_title( 'Installing Plugin - ' + EHFBlocks.ucwords( $name ));

			// $card.addClass('updating-message');

		},
	};

	/**
	 * Initialize EHFBlocks
	 */
	$(function(){
		EHFBlocks._init();
	});

})(jQuery);
