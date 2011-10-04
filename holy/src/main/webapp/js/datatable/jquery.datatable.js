( function($) {
	$.fn.datatable = function() {
		$(this).addClass('datatable');
		$('.datatable tbody tr td:last-child').addClass('lastCell');
		$('.datatable tbody tr:odd').addClass('odd');
		$('.datatable tbody tr').hover(function(ev) {
			$(this).addClass('hover');
		}, function(ev) {
			$(this).removeClass('hover');
		});
	}
}(jQuery));
