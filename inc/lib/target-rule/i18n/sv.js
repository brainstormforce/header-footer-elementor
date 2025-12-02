/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/sv', [], function() {
		return { errorLoading() {
			return 'Resultat kunde inte laddas.';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum,
				n = 'Vänligen sudda ut ' + t + ' tecken'; return n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'Vänligen skriv in ' + t + ' eller fler tecken'; return n;
		}, loadingMore() {
			return 'Laddar fler resultat…';
		}, maximumSelected( e ) {
			const t = 'Du kan max välja ' + e.maximum + ' element'; return t;
		}, noResults() {
			return 'Inga träffar';
		}, searching() {
			return 'Söker…';
		} };
	} ), { define: e.define, require: e.require };
}() );
