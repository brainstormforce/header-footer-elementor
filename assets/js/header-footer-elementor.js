jQuery(window).on('scroll', function(event) {
	win = jQuery(this);
	sticker = jQuery('.bhf-fixed-header');
	stickyFixer = jQuery('.bhf-ffixed-header-fixer');

	winTop = win.scrollTop();
	winWidth = win.outerWidth();
	stickerHeight = sticker.outerHeight();
	
	if ( winTop > 1 ) {
		sticker.addClass('bhf-fixed');
		stickyFixer.css({
			height: stickerHeight,
			width: winWidth,
			display: 'block',
		});
	} else {
		sticker.removeClass('bhf-fixed');
		stickyFixer.css('display', 'none');
	}

});