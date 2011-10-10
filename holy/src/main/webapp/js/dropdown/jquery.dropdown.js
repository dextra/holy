( function($) {
	$.fn.dropDown = function(opts) {
		$(this).addClass('dropdown');
		$(this).find('li:has(ul) > a').append(' <span>&raquo;</span>');
		opts = opts || {};
		var effectIn = opts.effectIn || 'slideDown';
		var effectOut = opts.effectOut || 'slideUp';
		var duration = opts.duration == 0 ? 0 : opts.duration || 'fast';
		$(this).children('li').hover(function() {
			$(this).children('ul')[effectIn](duration).delay(100);
		}, function() {
			$(this).children('ul')[effectOut]('fast').delay(100);
		});
	}
}(jQuery));
