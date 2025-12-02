/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/ro', [], function() {
		return { errorLoading() {
			return 'Rezultatele nu au putut fi incărcate.';
		}, inputTooLong( e ) {
			let t = e.input.length - e.maximum,
				n = 'Vă rugăm să ștergeți' + t + ' caracter'; return t !== 1 && ( n += 'e' ), n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'Vă rugăm să introduceți ' + t + ' sau mai multe caractere'; return n;
		}, loadingMore() {
			return 'Se încarcă mai multe rezultate…';
		}, maximumSelected( e ) {
			let t = 'Aveți voie să selectați cel mult ' + e.maximum; return t += ' element', e.maximum !== 1 && ( t += 'e' ), t;
		}, noResults() {
			return 'Nu au fost găsite rezultate';
		}, searching() {
			return 'Căutare…';
		} };
	} ), { define: e.define, require: e.require };
}() );
