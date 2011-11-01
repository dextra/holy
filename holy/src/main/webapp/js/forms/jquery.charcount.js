(function($) {
	$.fn.charCount = function(options) {

		var defaults = {
			allowed : 140,
			warning : 25,
			css : 'charCount',
			cssWarning : 'countWarning',
			cssExceeded : 'countExceeded',
			counterText : ''
		};

		var options = $.extend(defaults, options);

		function calculate(obj) {
			var count = $(obj).val().length;
			var available = options.allowed - count;
			if(available <= options.warning && available >= 0) {
				$(obj).next().addClass(options.cssWarning);
			} else {
				$(obj).next().removeClass(options.cssWarning);
			}
			if(available < 0) {
				$(obj).next().addClass(options.cssExceeded);
				$(obj).addClass(options.cssExceeded);
			} else {
				$(obj).next().removeClass(options.cssExceeded);
				$(obj).removeClass(options.cssExceeded);
			}
			$(obj).next().html(options.counterText + '<span>' + available + '</span>');
		};
		
		this.each(function() {
			$(this).after('<p class="' + options.css + '">' + options.counterText + '</p>');
			var labelW = $(this).prev('label').width();
			var countAlign = $(this).next('p');
			countAlign.css('marginLeft', labelW + 10);
			calculate(this);
			$(this).keyup(function() {calculate(this)
			});
			$(this).change(function() {calculate(this)
			});
		});
		
	};
})(jQuery);
