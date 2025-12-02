/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/sk', [], function() {
		const e = { 2( e ) {
			return e ? 'dva' : 'dve';
		}, 3() {
			return 'tri';
		}, 4() {
			return 'štyri';
		} }; return { errorLoading() {
			return 'Výsledky sa nepodarilo načítať.';
		}, inputTooLong( t ) {
			const n = t.input.length - t.maximum; return n == 1 ? 'Prosím, zadajte o jeden znak menej' : n >= 2 && n <= 4 ? 'Prosím, zadajte o ' + e[ n ]( ! 0 ) + ' znaky menej' : 'Prosím, zadajte o ' + n + ' znakov menej';
		}, inputTooShort( t ) {
			const n = t.minimum - t.input.length; return n == 1 ? 'Prosím, zadajte ešte jeden znak' : n <= 4 ? 'Prosím, zadajte ešte ďalšie ' + e[ n ]( ! 0 ) + ' znaky' : 'Prosím, zadajte ešte ďalších ' + n + ' znakov';
		}, loadingMore() {
			return 'Načítanie ďalších výsledkov…';
		}, maximumSelected( t ) {
			return t.maximum == 1 ? 'Môžete zvoliť len jednu položku' : t.maximum >= 2 && t.maximum <= 4 ? 'Môžete zvoliť najviac ' + e[ t.maximum ]( ! 1 ) + ' položky' : 'Môžete zvoliť najviac ' + t.maximum + ' položiek';
		}, noResults() {
			return 'Nenašli sa žiadne položky';
		}, searching() {
			return 'Vyhľadávanie…';
		} };
	} ), { define: e.define, require: e.require };
}() );
