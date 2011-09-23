(function($) {
	$.fn.dropDown = function(opts) {
		opts = opts || {};
		var effect = opts.effect || 'slideToggle';
		var delay = opts.delay == 0 ? 0 : opts.delay || 'fast';
		$(this).delegate('li', 'hover', function(){
			if (delay) {
				$(this).children('ul')[effect](delay);
			} else {
				$(this).children('ul')[effect]();
			}
		});
	}
}(jQuery));