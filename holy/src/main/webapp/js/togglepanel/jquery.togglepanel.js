( function($) {
	
	$.fn.tooglePanelShow = function() {
		var opts = $(this).data('tooglepanel.opts');
		opts = $.extend({}, opts);
		var effect = opts.effect || 'slideToggle';
		var delay = opts.delay;
		var content = $(this).children(opts.content || 'div');
		var trigger = function() {
			$(this).parent().trigger("toggle.togglePanel");
		} 
		if(delay) {
			content[effect](delay, trigger);
		} else {
			content[effect](trigger);
		}
	}
	
	$.fn.togglePanel = function(opts) {
		$(this).addClass('togglePanel');
		opts = opts || {};
		$(this).data('tooglepanel.opts', opts);
		var title = $(this).children(opts.title || 'h3');
		title.click(function() {
			$(this).parent().tooglePanelShow();
		});
		$(this).bind('toggle.togglePanel', function() {
			if($(this).children('div:visible').length) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
		$(this).trigger("toggle.togglePanel");
	}
}(jQuery));
