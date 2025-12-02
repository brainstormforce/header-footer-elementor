/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/lt', [], function() {
		function e( e, t, n, r ) {
			return e % 10 === 1 && ( e % 100 < 11 || e % 100 > 19 ) ? t : e % 10 >= 2 && e % 10 <= 9 && ( e % 100 < 11 || e % 100 > 19 ) ? n : r;
		} return { inputTooLong( t ) {
			let n = t.input.length - t.maximum,
				r = 'Pašalinkite ' + n + ' simbol'; return r += e( n, 'į', 'ius', 'ių' ), r;
		}, inputTooShort( t ) {
			let n = t.minimum - t.input.length,
				r = 'Įrašykite dar ' + n + ' simbol'; return r += e( n, 'į', 'ius', 'ių' ), r;
		}, loadingMore() {
			return 'Kraunama daugiau rezultatų…';
		}, maximumSelected( t ) {
			let n = 'Jūs galite pasirinkti tik ' + t.maximum + ' element'; return n += e( t.maximum, 'ą', 'us', 'ų' ), n;
		}, noResults() {
			return 'Atitikmenų nerasta';
		}, searching() {
			return 'Ieškoma…';
		} };
	} ), { define: e.define, require: e.require };
}() );
