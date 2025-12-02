/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */

( function() {
	if ( jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd ) {
		var e = jQuery.fn.select2.amd;
	} return e.define( 'select2/i18n/ru', [], function() {
		function e( e, t, n, r ) {
			return e % 10 < 5 && e % 10 > 0 && e % 100 < 5 || e % 100 > 20 ? e % 10 > 1 ? n : t : r;
		} return { errorLoading() {
			return 'Невозможно загрузить результаты';
		}, inputTooLong( t ) {
			let n = t.input.length - t.maximum,
				r = 'Пожалуйста, введите на ' + n + ' символ'; return r += e( n, '', 'a', 'ов' ), r += ' меньше', r;
		}, inputTooShort( t ) {
			let n = t.minimum - t.input.length,
				r = 'Пожалуйста, введите еще хотя бы ' + n + ' символ'; return r += e( n, '', 'a', 'ов' ), r;
		}, loadingMore() {
			return 'Загрузка данных…';
		}, maximumSelected( t ) {
			let n = 'Вы можете выбрать не более ' + t.maximum + ' элемент'; return n += e( t.maximum, '', 'a', 'ов' ), n;
		}, noResults() {
			return 'Совпадений не найдено';
		}, searching() {
			return 'Поиск…';
		} };
	} ), { define: e.define, require: e.require };
}() );
