/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/ar', [], function() {
		return { errorLoading() {
			return 'لا يمكن تحميل النتائج';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum; return 'الرجاء حذف ' + t + ' عناصر';
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length; return 'الرجاء إضافة ' + t + ' عناصر';
		}, loadingMore() {
			return 'جاري تحميل نتائج إضافية...';
		}, maximumSelected( e ) {
			return 'تستطيع إختيار ' + e.maximum + ' بنود فقط';
		}, noResults() {
			return 'لم يتم العثور على أي نتائج';
		}, searching() {
			return 'جاري البحث…';
		} };
	} ), { define: e.define, require: e.require };
}() );
