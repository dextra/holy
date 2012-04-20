/*Copyright 2011/2012 Dextra Sistemas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/

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
	};
	
	$.fn.maximize = function(method, reset) {
		var me = $(this);
		if(reset !== undefined) {
			me[method](reset);
		}
		var max = me.max(method);
		me[method](max+15);
	};
	
	$.fn.form = function(opts) {
		opts = $.extend({}, opts);
		var forms = $(this);
		forms.addClass('forms');
		//forms.find('ul li:has(textarea)').addClass('clear');
		
		$(this).find('input, textarea, select').live('focus', function() {
			$(this).addClass('focus');
		});
		$(this).find('input, textarea, select').live('blur', function() {
			$(this).removeClass('focus');
		});
		
		if(opts.liquid) {
			$(this).addClass('liquidForm');
		}
		$(this).find('.require label:first-child').prepend('<span class="required">*</span>');
	};
	
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

	// picklist

	$.fn.picklist = function(opts) {
		var plist = $(this);
		plist.addClass('picklist');
		var selectHeight = plist.find('select').height();
		plist.css('height', selectHeight + 10);
		plist.find('select').attr('multiple', 'multiple');
		$(this).find('select:first').after('<div class="pActions"><button class="pr">&gt;</button><button class="apr">&gt;&gt;</button><button class="apl">&lt;&lt;</button><button class="pl">&lt;</button></div>');
		plist.find('.pl').click(function() {
			var pselect = plist.find('select:last option:selected');
			pselect.remove();
			plist.find('select:first').append(pselect);
		});
		plist.find('.pr').click(function() {
			var pselect = plist.find('select:first option:selected');
			pselect.remove();
			plist.find('select:last').append(pselect);
		});
		plist.find('.apl').click(function() {
			var pselect = plist.find('select:last option');
			pselect.remove();
			plist.find('select:first').append(pselect);
		});
		plist.find('.apr').click(function() {
			var pselect = plist.find('select:first option');
			pselect.remove();
			plist.find('select:last').append(pselect);
		});
	};

	
})(jQuery);


