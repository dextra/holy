
( function($) {
	$.fn.dropDown = function(opts) {
		opts = $.extend({}, opts);
		if(opts.showlevel) {
			$(this).find('li:has(ul) > a').append(' <span>&raquo;</span>');
		}
		var effectIn = opts.effectIn || 'slideDown';
		var effectOut = opts.effectOut || 'slideUp';
		var vertical = !!opts.vertical;
		if (vertical) {
			$(this).addClass('vdropdown');
		} else {
			$(this).addClass('hdropdown');
		}
		var duration = opts.duration == 0 ? 0 : opts.duration || 'fast';
		var li = $(this).find('li');
		li.hover(function() {
			var ul = $(this).children('ul');
			ul.stop(true, true);
			ul[effectIn](duration);
			$(this).addClass('active');
		}, function() {
			var ul = $(this).children('ul');
			ul.stop(true, true);
			ul[effectOut]('fast');
			$(this).removeClass('active');
		});
	}
}(jQuery));
