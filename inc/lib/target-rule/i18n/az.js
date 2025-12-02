/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/az', [], function() {
		return { inputTooLong( e ) {
			const t = e.input.length - e.maximum; return t + ' simvol silin';
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length; return t + ' simvol daxil edin';
		}, loadingMore() {
			return 'Daha çox nəticə yüklənir…';
		}, maximumSelected( e ) {
			return 'Sadəcə ' + e.maximum + ' element seçə bilərsiniz';
		}, noResults() {
			return 'Nəticə tapılmadı';
		}, searching() {
			return 'Axtarılır…';
		} };
	} ), { define: e.define, require: e.require };
}() );
