/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/ps', [], function() {
		return { errorLoading() {
			return 'پايلي نه سي ترلاسه کېدای';
		}, inputTooLong( e ) {
			let t = e.input.length - e.maximum,
				n = 'د مهربانۍ لمخي ' + t + ' توری ړنګ کړئ'; return t != 1 && ( n = n.replace( 'توری', 'توري' ) ), n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'لږ تر لږه ' + t + ' يا ډېر توري وليکئ'; return n;
		}, loadingMore() {
			return 'نوري پايلي ترلاسه کيږي...';
		}, maximumSelected( e ) {
			let t = 'تاسو يوازي ' + e.maximum + ' قلم په نښه کولای سی'; return e.maximum != 1 && ( t = t.replace( 'قلم', 'قلمونه' ) ), t;
		}, noResults() {
			return 'پايلي و نه موندل سوې';
		}, searching() {
			return 'لټول کيږي...';
		} };
	} ), { define: e.define, require: e.require };
}() );
