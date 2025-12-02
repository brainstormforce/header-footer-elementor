/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/pl', [], function() {
		const e = [ 'znak', 'znaki', 'znaków' ],
			t = [ 'element', 'elementy', 'elementów' ],
			n = function( t, n ) {
				if ( t === 1 ) {
					return n[ 0 ];
				} if ( t > 1 && t <= 4 ) {
					return n[ 1 ];
				} if ( t >= 5 ) {
					return n[ 2 ];
				}
			}; return { errorLoading() {
			return 'Nie można załadować wyników.';
		}, inputTooLong( t ) {
			const r = t.input.length - t.maximum; return 'Usuń ' + r + ' ' + n( r, e );
		}, inputTooShort( t ) {
			const r = t.minimum - t.input.length; return 'Podaj przynajmniej ' + r + ' ' + n( r, e );
		}, loadingMore() {
			return 'Trwa ładowanie…';
		}, maximumSelected( e ) {
			return 'Możesz zaznaczyć tylko ' + e.maximum + ' ' + n( e.maximum, t );
		}, noResults() {
			return 'Brak wyników';
		}, searching() {
			return 'Trwa wyszukiwanie…';
		} };
	} ), { define: e.define, require: e.require };
}() );
