/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/ja', [], function() {
		return { errorLoading() {
			return '結果が読み込まれませんでした';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum,
				n = t + ' 文字を削除してください'; return n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = '少なくとも ' + t + ' 文字を入力してください'; return n;
		}, loadingMore() {
			return '読み込み中…';
		}, maximumSelected( e ) {
			const t = e.maximum + ' 件しか選択できません'; return t;
		}, noResults() {
			return '対象が見つかりません';
		}, searching() {
			return '検索しています…';
		} };
	} ), { define: e.define, require: e.require };
}() );
