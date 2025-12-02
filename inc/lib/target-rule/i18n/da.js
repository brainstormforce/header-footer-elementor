/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/da', [], function() {
		return { errorLoading() {
			return 'Resultaterne kunne ikke indlæses.';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum; return 'Angiv venligst ' + t + ' tegn mindre';
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length; return 'Angiv venligst ' + t + ' tegn mere';
		}, loadingMore() {
			return 'Indlæser flere resultater…';
		}, maximumSelected( e ) {
			let t = 'Du kan kun vælge ' + e.maximum + ' emne'; return e.maximum != 1 && ( t += 'r' ), t;
		}, noResults() {
			return 'Ingen resultater fundet';
		}, searching() {
			return 'Søger…';
		} };
	} ), { define: e.define, require: e.require };
}() );
