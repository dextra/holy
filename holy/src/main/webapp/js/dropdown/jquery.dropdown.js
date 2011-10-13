( function($) {
	$.fn.dropDown = function(opts) {
		$(this).addClass('dropdown');
		$(this).find('li:has(ul) > a').append(' <span>&raquo;</span>');
		opts = opts || {};
		var effectIn = opts.effectIn || 'slideDown';
		var effectOut = opts.effectOut || 'slideUp';
		var duration = opts.duration == 0 ? 0 : opts.duration || 'fast';
		var li = $(this).children('li');
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
