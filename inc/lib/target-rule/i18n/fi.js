/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/fi', [], function() {
		return { errorLoading() {
			return 'Tuloksia ei saatu ladattua.';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum; return 'Ole hyvä ja anna ' + t + ' merkkiä vähemmän';
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length; return 'Ole hyvä ja anna ' + t + ' merkkiä lisää';
		}, loadingMore() {
			return 'Ladataan lisää tuloksia…';
		}, maximumSelected( e ) {
			return 'Voit valita ainoastaan ' + e.maximum + ' kpl';
		}, noResults() {
			return 'Ei tuloksia';
		}, searching() {
			return 'Haetaan…';
		} };
	} ), { define: e.define, require: e.require };
}() );
