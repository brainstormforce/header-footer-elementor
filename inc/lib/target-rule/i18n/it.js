/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/it', [], function() {
		return { errorLoading() {
			return 'I risultati non possono essere caricati.';
		}, inputTooLong( e ) {
			let t = e.input.length - e.maximum,
				n = 'Per favore cancella ' + t + ' caratter'; return t !== 1 ? n += 'i' : n += 'e', n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'Per favore inserisci ' + t + ' o più caratteri'; return n;
		}, loadingMore() {
			return 'Caricando più risultati…';
		}, maximumSelected( e ) {
			let t = 'Puoi selezionare solo ' + e.maximum + ' element'; return e.maximum !== 1 ? t += 'i' : t += 'o', t;
		}, noResults() {
			return 'Nessun risultato trovato';
		}, searching() {
			return 'Sto cercando…';
		} };
	} ), { define: e.define, require: e.require };
}() );
