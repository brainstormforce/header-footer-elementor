( function( $ ) {

	/**
	 * Nav Menu handler Function.
	 *
	 */
	var WidgethfeNavMenuHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope )
			return;

		var id = $scope.data( 'id' );
		var wrapper = $scope.find('.elementor-widget-hfe-nav-menu ');		
		var layout = $( '.elementor-element-' + id + ' .hfe-nav-menu' ).data( 'layout' );
		var flyout_data = $( '.hfe-flyout-wrapper' ).data( 'flyout-class' );

		$( 'div.hfe-has-submenu-container' ).removeClass( 'sub-menu-active' );

		_toggleClick( id );

		if( 'horizontal' !== layout ){

			_eventClick( id );
		}else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 767px )" ).matches ) {

			_eventClick( id );
		}else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 1023px )" ).matches ) {

			_eventClick( id );
		}
		
		_borderClass( id );	

		$( '.elementor-element-' + id + ' .hfe-nav-menu-icon' ).off( 'click keyup' ).on( 'click keyup', function() {

			_openMenu( id );
		} );

		$( '.elementor-element-' + id + ' .hfe-flyout-close' ).off( 'click keyup' ).on( 'click keyup', function() {

			_closeMenu( id );
		} );

		$( '.elementor-element-' + id + ' .hfe-flyout-overlay' ).off( 'click' ).on( 'click', function() {

			_closeMenu( id );
		} );	


		$scope.find( '.sub-menu' ).each( function() {

			var parent = $( this ).closest( '.menu-item' );

			$scope.find( parent ).addClass( 'parent-has-child' );
			$scope.find( parent ).removeClass( 'parent-has-no-child' );
		});

		$( window ).resize( function(){ 

			if( 'horizontal' !== layout ) {

				_eventClick( id );
			}else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 767px )" ).matches ) {

				_eventClick( id );
			}else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 1023px )" ).matches ) {

				_eventClick( id );
			}

			if( 'horizontal' == layout && window.matchMedia( "( min-width: 977px )" ).matches){

				$( '.elementor-element-' + id + ' div.hfe-has-submenu-container' ).next().css( 'position', 'absolute');	
			}

			if( 'expandible' == layout || 'flyout' == layout ){

				_toggleClick( id );
			}else if ( 'vertical' == layout || 'horizontal' == layout ) {
				if( window.matchMedia( "( max-width: 767px )" ).matches && ($( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))){

					_toggleClick( id );					
				}else if ( window.matchMedia( "( max-width: 1023px )" ).matches && $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') ) {
					
					_toggleClick( id );
				}
			}

			_borderClass( id );	

		});

        // Acessibility functions

  		$scope.find( '.parent-has-child .hfe-has-submenu-container a').attr( 'aria-haspopup', 'true' );
  		$scope.find( '.parent-has-child .hfe-has-submenu-container a').attr( 'aria-expanded', 'false' );

  		$scope.find( '.hfe-nav-menu__toggle').attr( 'aria-haspopup', 'true' );
  		$scope.find( '.hfe-nav-menu__toggle').attr( 'aria-expanded', 'false' );

  		// End of accessibility functions

		$( document ).trigger( 'hfe_nav_menu_init', id );

		$( '.elementor-element-' + id + ' div.hfe-has-submenu-container' ).on( 'keyup', function(e){

			var $this = $( this );

		  	if( $this.parent().hasClass( 'menu-active' ) ) {

		  		$this.parent().removeClass( 'menu-active' );

		  		$this.parent().next().find('ul').css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );
		  		$this.parent().prev().find('ul').css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );

		  		$this.parent().next().find( 'div.hfe-has-submenu-container' ).removeClass( 'sub-menu-active' );
		  		$this.parent().prev().find( 'div.hfe-has-submenu-container' ).removeClass( 'sub-menu-active' );
			}else { 

				$this.parent().next().find('ul').css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );
		  		$this.parent().prev().find('ul').css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );

		  		$this.parent().next().find( 'div.hfe-has-submenu-container' ).removeClass( 'sub-menu-active' );
		  		$this.parent().prev().find( 'div.hfe-has-submenu-container' ).removeClass( 'sub-menu-active' );

				$this.parent().siblings().find( '.hfe-has-submenu-container a' ).attr( 'aria-expanded', 'false' );

				$this.parent().next().removeClass( 'menu-active' );
		  		$this.parent().prev().removeClass( 'menu-active' );

				event.preventDefault();

				$this.parent().addClass( 'menu-active' );

				if( 'horizontal' !== layout ){
					$this.addClass( 'sub-menu-active' );	
				}
				
				$this.find( 'a' ).attr( 'aria-expanded', 'true' );

				$this.next().css( { 'visibility': 'visible', 'opacity': '1', 'height': 'auto' } );

				if ( 'horizontal' !== layout ) {
						
		  			$this.next().css( 'position', 'relative');			
				} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 767px )" ).matches && ($( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))) {
										
  					$this.next().css( 'position', 'relative');		  					
				} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 1023px )" ).matches ) {
					
  					if ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') ) {

  						$this.next().css( 'position', 'relative');	
  					} else if ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-none') ) {
  						
  						$this.next().css( 'position', 'absolute');	
  					}
  				}		
			}
		});

		$( '.elementor-element-' + id + ' li.menu-item' ).on( 'keyup', function(e){
			var $this = $( this );

	 		$this.next().find( 'a' ).attr( 'aria-expanded', 'false' );
	 		$this.prev().find( 'a' ).attr( 'aria-expanded', 'false' );
	  		
	  		$this.next().find('ul').css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );
	  		$this.prev().find('ul').css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );
	  		
	  		$this.siblings().removeClass( 'menu-active' );
	  		$this.next().find( 'div.hfe-has-submenu-container' ).removeClass( 'sub-menu-active' );
		  	$this.prev().find( 'div.hfe-has-submenu-container' ).removeClass( 'sub-menu-active' );
		  		
		});
	};

	function _openMenu( id ) {

		var layout = $( '#hfe-flyout-content-id-' + id ).data( 'layout' );
		var layout_type = $( '#hfe-flyout-content-id-' + id ).data( 'flyout-type' );
		var wrap_width = $( '#hfe-flyout-content-id-' + id ).data( 'width' ) + 'px';
		var container = $( '.elementor-element-' + id + ' .hfe-flyout-container .hfe-side.hfe-flyout-' + layout );

		$( '.elementor-element-' + id + ' .hfe-flyout-overlay' ).fadeIn( 100 );

		if( 'left' == layout ) {

			$( 'body' ).css( 'margin-left' , '0' );
			container.css( 'left', '0' );

			if( 'push' == layout_type ) {

				$( 'body' ).addClass( 'hfe-flyout-animating' ).css({ 
					position: 'absolute',
					width: '100%',
					'margin-left' : wrap_width,
					'margin-right' : 'auto'
				});
			}		
		} else {

			$( 'body' ).css( 'margin-right', '0' );
			container.css( 'right', '0' );

			if( 'push' == layout_type ) {

				$( 'body' ).addClass( 'hfe-flyout-animating' ).css({ 
					position: 'absolute',
					width: '100%',
					'margin-left' : '-' + wrap_width,
					'margin-right' : 'auto',
				});
			}
		}		
	}

	function _closeMenu( id ) {

		var layout    = $( '#hfe-flyout-content-id-' + id ).data( 'layout' );
		var wrap_width = $( '#hfe-flyout-content-id-' + id ).data( 'width' ) + 'px';
		var layout_type = $( '#hfe-flyout-content-id-' + id ).data( 'flyout-type' );
		var container = $( '.elementor-element-' + id + ' .hfe-flyout-container .hfe-side.hfe-flyout-' + layout );

		$( '.elementor-element-' + id + ' .hfe-flyout-overlay' ).fadeOut( 100 );	

		if( 'left' == layout ) {

			container.css( 'left', '-' + wrap_width );

			if( 'push' == layout_type ) {

				$( 'body' ).css({ 
					position: '',
					'margin-left' : '',
					'margin-right' : '',
				});

				setTimeout( function() {
					$( 'body' ).removeClass( 'hfe-flyout-animating' ).css({ 
						width: '',
					});
				});
			}			
		} else {
			container.css( 'right', '-' + wrap_width );
			
			if( 'push' == layout_type ) {

				$( 'body' ).css({
					position: '',
					'margin-right' : '',
					'margin-left' : '',
				});

				setTimeout( function() {
					$( 'body' ).removeClass( 'hfe-flyout-animating' ).css({ 
						width: '',
					});
				});
			}
		}	
	}

	function _eventClick( id ){

		var layout = $( '.elementor-element-' + id + ' .hfe-nav-menu' ).data( 'layout' );

		$( '.elementor-element-' + id + ' div.hfe-has-submenu-container' ).off( 'click' ).on( 'click', function( event ) {

			var $this = $( this );
			
		  	if( $this.hasClass( 'sub-menu-active' ) ) {

		  		if( ! $this.next().hasClass( 'sub-menu-open' ) ) {

		  			$this.find( 'a' ).attr( 'aria-expanded', 'false' );

		  			if( 'horizontal' !== layout ){

						event.preventDefault();

		  				$this.next().css( 'position', 'relative' );	
					}else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 767px )" ).matches && ($( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))) {
						
						event.preventDefault();

		  				$this.next().css( 'position', 'relative' );	
					}else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 1023px )" ).matches && ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))) {
						
						event.preventDefault();	

		  				$this.next().css( 'position', 'relative' );	
					}	
	  			
					$this.removeClass( 'sub-menu-active' );
					$this.next().removeClass( 'sub-menu-open' );
					$this.next().css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );
					$this.next().css( { 'transition': 'none'} );										
		  		}else{

		  			$this.find( 'a' ).attr( 'aria-expanded', 'false' );
		  			
		  			$this.removeClass( 'sub-menu-active' );
					$this.next().removeClass( 'sub-menu-open' );
					$this.next().css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );
					$this.next().css( { 'transition': 'none'} );	
						  			  			
					if ( 'horizontal' !== layout ){

						$this.next().css( 'position', 'relative' );
					} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 767px )" ).matches && ($( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))) {
						
						$this.next().css( 'position', 'relative' );	
						
					} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 1023px )" ).matches && ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))) {
						
						$this.next().css( 'position', 'absolute' );				
					}	  								
		  		}		  											
			}else {

					$this.find( 'a' ).attr( 'aria-expanded', 'true' );
					if ( 'horizontal' !== layout ) {
						
						event.preventDefault();
			  			$this.next().css( 'position', 'relative');			
					} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 767px )" ).matches && ($( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))) {
						
						event.preventDefault();
	  					$this.next().css( 'position', 'relative');		  					
					} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 1023px )" ).matches ) {
						event.preventDefault();

	  					if ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') ) {

	  						$this.next().css( 'position', 'relative');	
	  					} else if ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-none') ) {
	  						
	  						$this.next().css( 'position', 'absolute');	
	  					}
	  				}	
	  					
				$this.addClass( 'sub-menu-active' );
				$this.next().addClass( 'sub-menu-open' );	
				$this.next().css( { 'visibility': 'visible', 'opacity': '1', 'height': 'auto' } );
				$this.next().css( { 'transition': '0.3s ease'} );								
			}
		});

		$( '.elementor-element-' + id + ' .hfe-menu-toggle' ).off( 'click keyup' ).on( 'click keyup',function( event ) {

			var $this = $( this );

		  	if( $this.parent().parent().hasClass( 'menu-active' ) ) {

	  			event.preventDefault();

				$this.parent().parent().removeClass( 'menu-active' );
				$this.parent().parent().next().css( { 'visibility': 'hidden', 'opacity': '0', 'height': '0' } );

				if ( 'horizontal' !== layout ) {
						
		  			$this.parent().parent().next().css( 'position', 'relative');			
				} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 767px )" ).matches && ($( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))) {
										
  					$this.parent().parent().next().css( 'position', 'relative');		  					
				} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 1023px )" ).matches ) {
					
  					if ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') ) {

  						$this.parent().parent().next().css( 'position', 'relative');	
  					} else if ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-none') ) {
  						
  						$this.parent().parent().next().css( 'position', 'absolute');	
  					}
  				}
			}else { 

				event.preventDefault();

				$this.parent().parent().addClass( 'menu-active' );

				$this.parent().parent().next().css( { 'visibility': 'visible', 'opacity': '1', 'height': 'auto' } );

				if ( 'horizontal' !== layout ) {
						
		  			$this.parent().parent().next().css( 'position', 'relative');			
				} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 767px )" ).matches && ($( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile'))) {
										
  					$this.parent().parent().next().css( 'position', 'relative');		  					
				} else if ( 'horizontal' === layout && window.matchMedia( "( max-width: 1023px )" ).matches ) {
					
  					if ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') ) {

  						$this.parent().parent().next().css( 'position', 'relative');	
  					} else if ( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-none') ) {
  						
  						$this.parent().parent().next().css( 'position', 'absolute');	
  					}
  				}		
			}
		});
	}

	function _borderClass( id ){

		$( '.elementor-element-' + id + ' nav').removeClass('hfe-dropdown');

		if ( window.matchMedia( "( max-width: 767px )" ).matches ) {

			if( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-mobile') || $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet')){
				
				$( '.elementor-element-' + id + ' nav').addClass('hfe-dropdown');
			}else{
				
				$( '.elementor-element-' + id + ' nav').removeClass('hfe-dropdown');
			}
		}else if ( window.matchMedia( "( max-width: 1023px )" ).matches ) {

			if( $( '.elementor-element-' + id ).hasClass('hfe-nav-menu__breakpoint-tablet') ) {
				
				$( '.elementor-element-' + id + ' nav').addClass('hfe-dropdown');
			}else{
				
				$( '.elementor-element-' + id + ' nav').removeClass('hfe-dropdown');
			}
		}
	}

	function _toggleClick( id ){

		if ( $( '.elementor-element-' + id + ' .hfe-nav-menu__toggle i' ).parent().parent().hasClass( 'hfe-active-menu-full-width' ) ){

			$( '.elementor-element-' + id + ' .hfe-nav-menu__toggle i' ).parent().parent().next().css( 'left', '0' );

			var width = $( '.elementor-element-' + id ).closest('.elementor-section').outerWidth();
			var sec_pos = $( '.elementor-element-' + id ).closest('.elementor-section').offset().left - $( '.elementor-element-' + id + ' .hfe-nav-menu__toggle i' ).parent().parent().next().offset().left;
		
			$( '.elementor-element-' + id + ' .hfe-nav-menu__toggle i' ).parent().parent().next().css( 'width', width + 'px' );
			$( '.elementor-element-' + id + ' .hfe-nav-menu__toggle i' ).parent().parent().next().css( 'left', sec_pos + 'px' );
		}

		$( '.elementor-element-' + id + ' .hfe-nav-menu__toggle .hfe-nav-menu-icon' ).off( 'click keyup' ).on( 'click keyup', function( event ) {

			var $this = $( this ).find( 'i' );

			if ( $this.parent().parent().hasClass( 'hfe-active-menu' ) ) {

				var layout = $( '.elementor-element-' + id + ' .hfe-nav-menu' ).data( 'layout' );
				var full_width = $this.parent().parent().next().data( 'full-width' );
				var toggle_icon = $( '.elementor-element-' + id + ' nav' ).data( 'toggle-icon' );

				$( '.elementor-element-' + id).find( '.hfe-nav-menu-icon i' ).attr( 'class', toggle_icon );

				$this.parent().parent().removeClass( 'hfe-active-menu' );
				$this.parent().parent().attr( 'aria-expanded', 'false' );
				
				if ( 'yes' == full_width ){

					$this.parent().parent().removeClass( 'hfe-active-menu-full-width' );
				
					$this.parent().parent().next().css( 'width', 'auto' );
					$this.parent().parent().next().css( 'left', '0' );
					$this.parent().parent().next().css( 'z-index', '0' );
				}				
			} else {

				var layout = $( '.elementor-element-' + id + ' .hfe-nav-menu' ).data( 'layout' );
				var full_width = $this.parent().parent().next().data( 'full-width' );
				var close_icon = $( '.elementor-element-' + id + ' nav' ).data( 'close-icon' );

				$( '.elementor-element-' + id).find( '.hfe-nav-menu-icon i' ).attr( 'class', close_icon );
				
				$this.parent().parent().addClass( 'hfe-active-menu' );
				$this.parent().parent().attr( 'aria-expanded', 'true' );

				if ( 'yes' == full_width ){

					$this.parent().parent().addClass( 'hfe-active-menu-full-width' );

					var width = $( '.elementor-element-' + id ).closest('.elementor-section').outerWidth();
					var sec_pos = $( '.elementor-element-' + id ).closest('.elementor-section').offset().left - $this.parent().parent().next().offset().left;
				
					$this.parent().parent().next().css( 'width', width + 'px' );
					$this.parent().parent().next().css( 'left', sec_pos + 'px' );
					$this.parent().parent().next().css( 'z-index', '9999' );
				}
			}

			if( $( '.elementor-element-' + id + ' nav' ).hasClass( 'menu-is-active' ) ) {

				$( '.elementor-element-' + id + ' nav' ).removeClass( 'menu-is-active' );
			}else {

				$( '.elementor-element-' + id + ' nav' ).addClass( 'menu-is-active' );
			}				
		} );
	}

	$( window ).on( 'elementor/frontend/init', function () {

		elementorFrontend.hooks.addAction( 'frontend/element_ready/navigation-menu.default', WidgethfeNavMenuHandler );

	});

} )( jQuery );
