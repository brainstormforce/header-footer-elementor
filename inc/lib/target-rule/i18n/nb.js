/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/nb', [], function() {
		return { errorLoading() {
			return 'Kunne ikke hente resultater.';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum; return 'Vennligst fjern ' + t + ' tegn';
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'Vennligst skriv inn ' + t + ' tegn til'; return n + ' tegn til';
		}, loadingMore() {
			return 'Laster flere resultater…';
		}, maximumSelected( e ) {
			return 'Du kan velge maks ' + e.maximum + ' elementer';
		}, noResults() {
			return 'Ingen treff';
		}, searching() {
			return 'Søker…';
		} };
	} ), { define: e.define, require: e.require };
}() );
