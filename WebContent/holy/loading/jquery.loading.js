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
	
	jQuery.pushLoading = function(opts) {
		if (!$('.loading').length) {
			$('body').append('<div class="loading"><div class="load"></div><div class="overlay"></div></div>');
		}
		var stack = $('.loading').data('loading-ajax-stack');
		if(!stack) {
			stack = 0;
		}
		if (stack < 0) {
			throw 'error: stack < 0: ' + stack;
		}
		stack++;
		if (stack == 1) {
			$('.loading .load').center();
			$('.loading').show();
		}
		$('.loading').data('loading-ajax-stack', stack);
	}
	
	jQuery.popLoading = function(opts) {
		if (!$('.loading').length) {
			throw 'dom .loading not found';
		}
		var stack = $('.loading').data('loading-ajax-stack');
		if(!stack || stack < 0) {
			throw 'error: stack <= 0: ' + stack;
		}
		if (stack == 1) {
			$('.loading').hide();
		}
		stack--;
		$('.loading').data('loading-ajax-stack', stack);
	}
	
	jQuery.loading = function(opts) {

		var bgOver = opts.overlay;
		if (!bgOver) {
			bgOver = '#000000'
		}
		
		var overOpacity = opts.opacity;
		if (!overOpacity) {
			overOpacity = '50'
		}
		
		$('body').ajaxSend(function(evt, xhr, ajax) {
			if (!ajax.loading) {
				return;
			}
			if (ajax.loading === true) {
				$.pushLoading();
				return;
			}
			$(ajax.loading).each(function() {
				var stack = $(this).data('loading-ajax-stack');
				if (!stack) {
					stack = 0;
				}
				if (stack < 0) {
					throw 'error: stack < 0: ' + stack;
				}
				stack++;
				if (stack == 1) {
					var div = $('<div class="loading"><div class="load"></div><div class="overlayInside"></div></div>');
					div.css('position', 'absolute');
					div.css('left', $(this).position().left);
					div.css('top', $(this).position().top);
					div.css('width', $(this).width());
					div.css('height', $(this).height());
					$('body').append(div);
					$(this).data('loading-ajax', div);
				}
				$(this).data('loading-ajax-stack', stack);
			});
		});
		$("body").ajaxComplete(function(evt, xhr, ajax) {
			if (!ajax.loading) {
				return;
			}
			if (ajax.loading === true) {
				$.popLoading();
				return;
			}
			$(ajax.loading).each(function() {
				var stack = $(this).data('loading-ajax-stack');
				if (!stack || stack <= 0) {
					throw 'error: !stack || stack <= 0: ' + stack;
				}
				if (stack == 1) {
					var div = $(this).data('loading-ajax');
					$(this).data('loading-ajax', null);
					$(this).data('loading-ajax-stack', 0);
					div.remove();
				} else {
					stack--;
					$(this).data('loading-ajax-stack', stack);
				}
			});
		});
	}
})(jQuery);
