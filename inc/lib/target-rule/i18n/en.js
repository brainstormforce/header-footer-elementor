/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/en', [], function() {
		return { errorLoading() {
			return 'The results could not be loaded.';
		}, inputTooLong( e ) {
			let t = e.input.length - e.maximum,
				n = 'Please delete ' + t + ' character'; return t != 1 && ( n += 's' ), n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'Please enter ' + t + ' or more characters'; return n;
		}, loadingMore() {
			return 'Loading more results…';
		}, maximumSelected( e ) {
			let t = 'You can only select ' + e.maximum + ' item'; return e.maximum != 1 && ( t += 's' ), t;
		}, noResults() {
			return 'No results found';
		}, searching() {
			return 'Searching…';
		} };
	} ), { define: e.define, require: e.require };
}() );
