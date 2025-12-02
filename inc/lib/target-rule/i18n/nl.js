/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/nl', [], function() {
		return { errorLoading() {
			return 'De resultaten konden niet worden geladen.';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum,
				n = 'Gelieve ' + t + ' karakters te verwijderen'; return n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'Gelieve ' + t + ' of meer karakters in te voeren'; return n;
		}, loadingMore() {
			return 'Meer resultaten laden…';
		}, maximumSelected( e ) {
			let t = e.maximum == 1 ? 'kan' : 'kunnen',
				n = 'Er ' + t + ' maar ' + e.maximum + ' item'; return e.maximum != 1 && ( n += 's' ), n += ' worden geselecteerd', n;
		}, noResults() {
			return 'Geen resultaten gevonden…';
		}, searching() {
			return 'Zoeken…';
		} };
	} ), { define: e.define, require: e.require };
}() );
