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
	$.fn.xdialog = function(opts) {
		opts = $.extend({}, opts);
		opts.overlay = $.extend({
			background : 'none',
			opacity : 0.5
		}, opts.overlay);

		if (typeof (opts.overlay.opacity) == 'string') {
			opts.overlay.opacity = parseFloat(opts.overlay.opacity);
		}
		if (opts.overlay.opacity == null) {
			opts.overlay.opacity = 0.5;
		}
		opts.overlay.filter = 'alpha(opacity=' + (opts.overlay.opacity * 100) + ')';

		// $('body').append(
		// '<div class="dOverlay" style="background:' + overColor
		// + '; opacity:0.' + alpha + '; filter: alpha(opacity = '
		// + alpha + '0);"></div>');
		var dOverlay = $('body').append('<div/>').find('div:last');
		dOverlay.addClass('dOverlay');
		dOverlay.css(opts.overlay);

		var me = $(this);

		$(this).data('xdialog.opts', dOverlay);
		$(this).data('xdialog.overlay', dOverlay);
		$(this).data('xdialog.parent', $(this).parent());
		$(this).appendTo('body');

		if (!opts.unclosable) {
			var close = '<a href="#" class="close">(x)</a>'
			me.prepend(close);
		}

		me.addClass('dialogBox');

		if (!me.css('width')) {
			me.css('width', 'auto');
		}

		me.center();

		if (!opts.unclosable) {
			if (opts.overlayClick) {
				me.prev('div.dOverlay').click(function() {
					$(this).find(' + .dialogBox a.close').click();
				});
			}
			me.find('a.close:first').click($.fn.xundialog);
		}
		
		var evt = jQuery.Event("open.xdialog");
		me.trigger(evt);
		if(evt.isDefaultPrevented() || evt.isPropagationStopped() || evt.isImmediatePropagationStopped()) {
			return $(this);
		}
		
		me.fadeIn();
		
		return $(this);
	}

	$.fn.xundialog = function() {
		var popup = $(this).closest('.dialogBox');
		var a = popup.children('a.close:first');
		var overlay = popup.prev('div.dOverlay');

		var evt = jQuery.Event("close.xdialog");
		popup.trigger(evt);
		if(evt.isDefaultPrevented() || evt.isPropagationStopped() || evt.isImmediatePropagationStopped()) {
			return false;
		}

		if (a.length) {
			a.remove();
		}
		if (popup.length) {
			popup.hide();
			popup.data('xdialog.parent').append(popup);
		}
		if (overlay.length) {
			overlay.remove();
		}
		return false;
	}

})(jQuery);
