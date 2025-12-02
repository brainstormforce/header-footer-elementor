/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/sl', [], function() {
		return { errorLoading() {
			return 'Zadetkov iskanja ni bilo mogoče naložiti.';
		}, inputTooLong( e ) {
			let t = e.input.length - e.maximum,
				n = 'Prosim zbrišite ' + t + ' znak'; return t == 2 ? n += 'a' : t != 1 && ( n += 'e' ), n;
		}, inputTooShort( e ) {
			let t = e.minimum - e.input.length,
				n = 'Prosim vpišite še ' + t + ' znak'; return t == 2 ? n += 'a' : t != 1 && ( n += 'e' ), n;
		}, loadingMore() {
			return 'Nalagam več zadetkov…';
		}, maximumSelected( e ) {
			let t = 'Označite lahko največ ' + e.maximum + ' predmet'; return e.maximum == 2 ? t += 'a' : e.maximum != 1 && ( t += 'e' ), t;
		}, noResults() {
			return 'Ni zadetkov.';
		}, searching() {
			return 'Iščem…';
		} };
	} ), { define: e.define, require: e.require };
}() );
