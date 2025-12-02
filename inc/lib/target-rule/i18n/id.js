/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/id', [], function() {
		return { errorLoading() {
			return 'Data tidak boleh diambil.';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum; return 'Hapuskan ' + t + ' huruf';
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length; return 'Masukkan ' + t + ' huruf lagi';
		}, loadingMore() {
			return 'Mengambil data…';
		}, maximumSelected( e ) {
			return 'Anda hanya dapat memilih ' + e.maximum + ' pilihan';
		}, noResults() {
			return 'Tidak ada data yang sesuai';
		}, searching() {
			return 'Mencari…';
		} };
	} ), { define: e.define, require: e.require };
}() );
