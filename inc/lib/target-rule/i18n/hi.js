/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/hi', [], function() {
		return { errorLoading() {
			return 'परिणामों को लोड नहीं किया जा सका।';
		}, inputTooLong( e ) {
			let t = e.input.length - e.maximum,
				n = t + ' अक्षर को हटा दें'; return t > 1 && ( n = t + ' अक्षरों को हटा दें ' ), n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'कृपया ' + t + ' या अधिक अक्षर दर्ज करें'; return n;
		}, loadingMore() {
			return 'अधिक परिणाम लोड हो रहे है...';
		}, maximumSelected( e ) {
			const t = 'आप केवल ' + e.maximum + ' आइटम का चयन कर सकते हैं'; return t;
		}, noResults() {
			return 'कोई परिणाम नहीं मिला';
		}, searching() {
			return 'खोज रहा है...';
		} };
	} ), { define: e.define, require: e.require };
}() );
