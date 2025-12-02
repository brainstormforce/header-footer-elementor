/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/hu', [], function() {
		return { errorLoading() {
			return 'Az eredmények betöltése nem sikerült.';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum; return 'Túl hosszú. ' + t + ' karakterrel több, mint kellene.';
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length; return 'Túl rövid. Még ' + t + ' karakter hiányzik.';
		}, loadingMore() {
			return 'Töltés…';
		}, maximumSelected( e ) {
			return 'Csak ' + e.maximum + ' elemet lehet kiválasztani.';
		}, noResults() {
			return 'Nincs találat.';
		}, searching() {
			return 'Keresés…';
		} };
	} ), { define: e.define, require: e.require };
}() );
