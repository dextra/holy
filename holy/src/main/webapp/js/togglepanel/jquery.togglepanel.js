(function($) {
	
	$.fn.togglePanel = function(opts) {
		opts = opts || {};
		var title = $(this).children(opts.title || 'h3');
		var effect = opts.effect || 'slideToggle';
		var delay = opts.delay;
		title.click(function() {
			var content = $(this).parent().children(opts.content || 'div');
			if (delay) {
				content[effect](delay);
			} else {
				content[effect]();
			}
		});
	}
	
	
}(jQuery));
