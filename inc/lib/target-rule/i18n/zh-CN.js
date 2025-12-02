/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/zh-CN', [], function() {
		return { errorLoading() {
			return '无法载入结果。';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum,
				n = '请删除' + t + '个字符'; return n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = '请再输入至少' + t + '个字符'; return n;
		}, loadingMore() {
			return '载入更多结果…';
		}, maximumSelected( e ) {
			const t = '最多只能选择' + e.maximum + '个项目'; return t;
		}, noResults() {
			return '未找到结果';
		}, searching() {
			return '搜索中…';
		} };
	} ), { define: e.define, require: e.require };
}() );
