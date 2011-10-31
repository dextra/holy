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
