(function($) {
	jQuery.fn.xdialog = function(opts) {
		opts = $.extend({}, opts);

		var overColor = opts.overlay;
		if(!overColor) {
			overColor = 'none'
		}
		var alpha = opts.alpha;
		if(!alpha) {
			alpha = '5'
		}
		var dialogWidth = opts.width;
		if(!dialogWidth) {
			dialogWidth = 'auto'
		}
		
		$('body').append('<div class="dOverlay" style="background:' + overColor + '; opacity:0.' + alpha + '; filter: alpha(opacity = ' + alpha + '0);"></div>');

		var me = $(this)

		var close = '<a href="#" class="close">(x)</a>'

		$(this).data('xdialog.parent', $(this).parent());
		$(this).appendTo('body');

		me.prepend(close);

		me.addClass('dialogBox');

		me.css('width', dialogWidth);

		me.center();

		me.fadeIn();
		
		me.prev('div.dOverlay').click(function() {
			$(this).find(' + .dialogBox a.close').click();
		});

		me.find('.close').click(function() {
			var me = $(this);
			var popup = me.closest('.dialogBox');
			var overlay = popup.prev('div.dOverlay');
			me.remove();
			if(popup.length) {
				popup.hide();
				popup.data('xdialog.parent').append(popup);
			}
			if(overlay.length) {
				overlay.remove();
			}
			return false;
		});
		
	}
})(jQuery);
