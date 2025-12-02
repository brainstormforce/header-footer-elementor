/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/de', [], function() {
		return { errorLoading() {
			return 'Die Ergebnisse konnten nicht geladen werden.';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum; return 'Bitte ' + t + ' Zeichen weniger eingeben';
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length; return 'Bitte ' + t + ' Zeichen mehr eingeben';
		}, loadingMore() {
			return 'Lade mehr Ergebnisse…';
		}, maximumSelected( e ) {
			let t = 'Sie können nur ' + e.maximum + ' Eintr'; return e.maximum === 1 ? t += 'ag' : t += 'äge', t += ' auswählen', t;
		}, noResults() {
			return 'Keine Übereinstimmungen gefunden';
		}, searching() {
			return 'Suche…';
		} };
	} ), { define: e.define, require: e.require };
}() );
