(function($) {
	
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
		$('.buttons').css('marginLeft', labelW + 9);
		$(this).find('input').live('focus', function() {
			$(this).addClass('focus');
		});
		$(this).find('input').live('blur', function() {
			$(this).removeClass('focus');
		});
	}
	
})(jQuery);
