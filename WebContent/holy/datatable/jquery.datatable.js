/*Copyright 2011/2012 Dextra Sistemas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/     

( function($) {
	$.fn.datatable = function(opts) {
		opts = $.extend({}, opts);
		$(this).addClass('datatable');
		$(this).children('tbody').datatableOddEven();
		$(this).find(' > tbody > tr').hover(function(ev) {
			$(this).addClass('hover');
		}, function(ev) {
			$(this).removeClass('hover');
		});
		if(opts.toogle) {
			$(this).find('tbody tr:odd').hide().addClass('tcontent');
			$(this).find('tbody tr:even').addClass('tline');
			$(this).find('thead tr').prepend('<th class="sortable"></th>');
			$(this).find('tbody tr:even').prepend('<td class="opentt"><button>+</button><button class="close">-</button></td>');
			$(this).find('.opentt button').click(function() {
				$(this).parents().next('.tcontent').fadeToggle('slow');
				$(this).parents('td').toggleClass('open');
			});
		}
    var nActions = $(this).find('> tbody > tr:first .action a').length;
    var wActions = nActions + 4 * $(this).find('> tbody > tr .action a').width();
    $(this).find('.action').width(wActions);
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
			for(var i = 0; i < order.length; i++) {
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
			for(var i = 0; i < order.length; i++) {
				var o = order[i];
				if(o.index == index) {
					entry = o;
					order.splice(i, 1);
					break;
				}
			}
			if(!entry) {
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
