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

		var overColor = opts.overlay;
		if (!overColor) {
			overColor = 'none'
		}
		var alpha = opts.alpha;
		if (!alpha) {
			alpha = '5'
		}
		var dialogWidth = opts.width;
		if (!dialogWidth) {
			dialogWidth = 'auto'
		}

		$('body').append(
				'<div class="dOverlay" style="background:' + overColor
						+ '; opacity:0.' + alpha + '; filter: alpha(opacity = '
						+ alpha + '0);"></div>');

		var me = $(this)

		$(this).data('xdialog.parent', $(this).parent());
		$(this).appendTo('body');

		if(!opts.unclosable) {
			var close = '<a href="#" class="close">(x)</a>'
			me.prepend(close);
		}

		me.addClass('dialogBox');

		me.css('width', dialogWidth);

		me.center();

		me.fadeIn();

		if(!opts.unclosable) {
			if(opts.overlayClick) {
				me.prev('div.dOverlay').click(function() {
					$(this).find(' + .dialogBox a.close').click();
				});
			}
			me.find('a.close:first').click($.fn.xundialog);
		}
	}

	$.fn.xundialog = function() {
		var popup = $(this).closest('.dialogBox');
		var a = popup.children('a.close:first');
		var overlay = popup.prev('div.dOverlay');
		if(a.length) {
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
