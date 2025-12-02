/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/hr', [], function() {
		function e( e ) {
			let t = ' ' + e + ' znak'; return e % 10 < 5 && e % 10 > 0 && ( e % 100 < 5 || e % 100 > 19 ) ? e % 10 > 1 && ( t += 'a' ) : t += 'ova', t;
		} return { errorLoading() {
			return 'Preuzimanje nije uspjelo.';
		}, inputTooLong( t ) {
			const n = t.input.length - t.maximum; return 'Unesite ' + e( n );
		}, inputTooShort( t ) {
			const n = t.minimum - t.input.length; return 'Unesite još ' + e( n );
		}, loadingMore() {
			return 'Učitavanje rezultata…';
		}, maximumSelected( e ) {
			return 'Maksimalan broj odabranih stavki je ' + e.maximum;
		}, noResults() {
			return 'Nema rezultata';
		}, searching() {
			return 'Pretraga…';
		} };
	} ), { define: e.define, require: e.require };
}() );
