(function($) {
	$.fn.datatable = function() {
		$(this).addClass('datatable');
		$(this).children('tbody').datatableOddEven();
		$(this).find(' > tbody > tr').hover(function(ev) {
			$(this).addClass('hover');
		}, function(ev) {
			$(this).removeClass('hover');
		});
	}

	$.fn.datatableOddEven = function() {
		$(this).find('> tr > td').removeClass('lastCell');
		$(this).find('> tr > td:last-child').addClass('lastCell');
		$(this).children('tr:even').removeClass('odd');
		$(this).children('tr:even').addClass('even');
		$(this).children('tr:odd').removeClass('even');
		$(this).children('tr:odd').addClass('odd');
	}

	$.fn.datatableSortable = function() {
		var tbody = $(this).children('tbody');
		tbody.data('datatableSort', []);
		tbody.data('sortChildren', function(a, b) {
			var tbody = $(a).parent();
			var order = tbody.data('datatableSort');
			var ret = 0;
			for ( var i = 0; i < order.length; i++) {
				var o = order[i];
				var f = $.fn.sortChildren.createHow(order);
				var ret = f(a, b);
				return ret;
			}
		});

		tbody.bind('sorted.sortChildren', function() {
			$(this).datatableOddEven();
			return false;
		});

		$(this).find('> thead > tr > th.sortable').click(function() {
			var header = $(this);
			var index = header.prevAll().length;
			var table = $(this).closest('table');
			var tbody = table.children('tbody');
			var order = tbody.data('datatableSort');
			var entry = null;
			for ( var i = 0; i < order.length; i++) {
				var o = order[i];
				if (o.index == index) {
					entry = o;
					order.splice(i, 1);
					break;
				}
			}
			if (!entry) {
				entry = {
					index : index
				}
			}
			entry.asc = !entry.asc;
			header.removeClass('asc desc');
			header.addClass(entry.asc ? 'asc' : 'desc');
			order.unshift(entry);
			tbody.sortChildren();
		});

	}

}(jQuery));
