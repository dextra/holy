(function($) {
	
	// Form Organizer
	
	$.fn.max = function(method) {
		if( typeof (method) == 'string') {
			var m = method;
			method = function() {
				return $(this)[m]();
			}
		}
		var ret = null;
		$(this).each(function() {
			var num = method.apply(this);
			if(!ret || num > ret) {
				ret = num;
			}
		});
		return ret;
	}
	
	$.fn.maximize = function(method, reset) {
		var me = $(this);
		if(reset !== undefined) {
			me[method](reset);
		}
		var max = me.max(method);
		me[method](max);
	}
	
	$.fn.form = function() {
		var forms = $(this);
		forms.addClass('forms');
		var list = forms.find('.require label');
		if(!list.find('span.required').length) {
			list.prepend('<span class="required">*</span>');
		}
		forms.find('label').maximize('width', '');
		var labelW = forms.find('ul li label').width();
		$('.buttons').css('marginLeft', labelW + 5);
		$(this).find('input, textarea, select').live('focus', function() {
			$(this).addClass('focus');
		});
		$(this).find('input, textarea, select').live('blur', function() {
			$(this).removeClass('focus');
		});
	}
	
	// charCounter
	
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


