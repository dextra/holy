( function($) {
	$.fn.datatable = function() {
		$(this).children('tbody tr td:last-child').addClass('lastCell');
		$(this).children('tbody tr:odd').addClass('odd');
	}
}(jQuery));
