/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/et', [], function() {
		return { inputTooLong( e ) {
			let t = e.input.length - e.maximum,
				n = 'Sisesta ' + t + ' täht'; return t != 1 && ( n += 'e' ), n += ' vähem', n;
		}, inputTooShort( e ) {
			let t = e.minimum - e.input.length,
				n = 'Sisesta ' + t + ' täht'; return t != 1 && ( n += 'e' ), n += ' rohkem', n;
		}, loadingMore() {
			return 'Laen tulemusi…';
		}, maximumSelected( e ) {
			let t = 'Saad vaid ' + e.maximum + ' tulemus'; return e.maximum == 1 ? t += 'e' : t += 't', t += ' valida', t;
		}, noResults() {
			return 'Tulemused puuduvad';
		}, searching() {
			return 'Otsin…';
		} };
	} ), { define: e.define, require: e.require };
}() );
