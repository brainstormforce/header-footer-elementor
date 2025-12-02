/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/af', [], function() {
		return { errorLoading() {
			return 'Die resultate kon nie gelaai word nie.';
		}, inputTooLong( e ) {
			let t = e.input.length - e.maximum,
				n = 'Verwyders asseblief ' + t + ' character'; return t != 1 && ( n += 's' ), n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'Voer asseblief ' + t + ' of meer karakters'; return n;
		}, loadingMore() {
			return 'Meer resultate word gelaai…';
		}, maximumSelected( e ) {
			let t = 'Kies asseblief net ' + e.maximum + ' item'; return e.maximum != 1 && ( t += 's' ), t;
		}, noResults() {
			return 'Geen resultate gevind';
		}, searching() {
			return 'Besig…';
		} };
	} ), { define: e.define, require: e.require };
}() );
