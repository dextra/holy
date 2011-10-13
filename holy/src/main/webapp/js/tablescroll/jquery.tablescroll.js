(function($) {
	var scrollbarWidth = 0;
	function getScrollbarWidth() {
		if(scrollbarWidth)
			return scrollbarWidth;
		var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>');
		$('body').append(div);
		var w1 = $('div', div).innerWidth();
		div.css('overflow-y', 'auto');
		var w2 = $('div', div).innerWidth();
		$(div).remove();
		scrollbarWidth = (w1 - w2);
		return scrollbarWidth;
	}
	$.fn.tableScroll = function(options) {
		if(options == 'undo') {
			var container = $(this).parent().parent();
			if(container.hasClass('tsWrapper')) {
				container.find('.tsHead thead').prependTo(this);
				container.find('.tsFooter tfoot').appendTo(this);
				container.before(this);
				container.empty();
			}
			return;
		}
		var settings = $.extend({}, $.fn.tableScroll.defaults, options);
		settings.scrollbarWidth = getScrollbarWidth();
		this.each(function() {
			var flush = settings.flush;
			var tb = $(this).addClass('tsBody');
			var wrapper = $('<div class="tsWrapper"></div>').insertBefore(tb).append(tb);
			if(!wrapper.parent('div').hasClass(settings.containerClass)) {
				$('<div></div>').addClass(settings.containerClass).insertBefore(wrapper).append(wrapper);
			}
			var width = settings.width ? settings.width : tb.outerWidth();
			wrapper.css({
				'width' : width + 'px',
				'height' : settings.height + 'px',
				'overflow' : 'auto'
			});
			tb.css('width', width + 'px');
			var wrapper_width = wrapper.outerWidth();
			var diff = wrapper_width - width;
			wrapper.css({
				width : ((width - diff) + settings.scrollbarWidth) + 'px'
			});
			tb.css('width', (width - diff) + 'px');
			if(tb.outerHeight() <= settings.height) {
				wrapper.css({
					height : 'auto',
					width : (width - diff) + 'px'
				});
				flush = false;
			}
			var has_thead = $('thead', tb).length ? true : false;
			var has_tfoot = $('tfoot', tb).length ? true : false;
			var thead_tr_first = $('thead tr:first', tb);
			var tbody_tr_first = $('tbody tr:first', tb);
			var tfoot_tr_first = $('tfoot tr:first', tb);

			var w = 0;

			$('th, td', thead_tr_first).each(function(i) {
				w = $(this).width();

				$('th:eq(' + i + '), td:eq(' + i + ')', thead_tr_first).css('width', w + 'px');
				$('th:eq(' + i + '), td:eq(' + i + ')', tbody_tr_first).css('width', w + 'px');
				if(has_tfoot)
					$('th:eq(' + i + '), td:eq(' + i + ')', tfoot_tr_first).css('width', w + 'px');
			});
			if(has_thead) {
				var tbh = $('<table class="tsHead" cellspacing="0"></table>').insertBefore(wrapper).prepend($('thead', tb));
			}
			if(has_tfoot) {
				var tbf = $('<table class="tsFooter" cellspacing="0"></table>').insertAfter(wrapper).prepend($('tfoot', tb));
			}
			if(tbh != undefined) {
				tbh.css('width', width + 'px');

				if(flush) {
					$('tr:first th:last, tr:first td:last', tbh).css('width', (w + settings.scrollbarWidth) + 'px');
					tbh.css('width', wrapper.outerWidth() + 'px');
				}
			}

			if(tbf != undefined) {
				tbf.css('width', width + 'px');

				if(flush) {
					$('tr:first th:last, tr:first td:last', tbf).css('width', (w + settings.scrollbarWidth) + 'px');
					tbf.css('width', wrapper.outerWidth() + 'px');
				}
			}
			$(".datatable").scrollLeft(100);
		});
		return this;
	};
	$.fn.tableScroll.defaults = {
		flush : true,
		width : null,
		height : 100,
		containerClass : 'datatable'
	};

})(jQuery);
