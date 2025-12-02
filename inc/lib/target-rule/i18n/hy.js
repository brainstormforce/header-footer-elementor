/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/hy', [], function() {
		return { errorLoading() {
			return 'Արդյունքները հնարավոր չէ բեռնել։';
		}, inputTooLong( e ) {
			const t = e.input.length - e.maximum,
				n = 'Խնդրում ենք հեռացնել ' + t + ' նշան'; return n;
		}, inputTooShort( e ) {
			const t = e.minimum - e.input.length,
				n = 'Խնդրում ենք մուտքագրել ' + t + ' կամ ավել նշաններ'; return n;
		}, loadingMore() {
			return 'Բեռնվում են նոր արդյունքներ․․․';
		}, maximumSelected( e ) {
			const t = 'Դուք կարող եք ընտրել առավելագույնը ' + e.maximum + ' կետ'; return t;
		}, noResults() {
			return 'Արդյունքներ չեն գտնվել';
		}, searching() {
			return 'Որոնում․․․';
		} };
	} ), { define: e.define, require: e.require };
}() );
