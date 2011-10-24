(function($) {
	jQuery.fn.xdialog = function(opts) {
		
		opts = $.extend({}, opts);
		
		// dialog options \o/
		
		var overColor = opts.overlay;
		if(!overColor) {
			overColor = '#000000'
		}
		
		var alpha = opts.alpha;
		if(!alpha) {
			alpha = '7'
		}
		
		// if overlay is on
		$('body').append('<div class="dOverlay" style="background:'+ overColor +'; opacity:0.'+ alpha +'; filter: alpha(opacity = '+ alpha +'0);"></div>');
		
		// VARS =)
		var me = $(this)
		
		var close = '<a href="#" class="close">(x)</a>'
		
		
		$(this).appendTo('body');
		
		me.prepend(close); // add close button on dialog box.
		
		me.addClass('dialogBox'); // add class to identify dialog box style
		
		me.center(); // centralize dialog box
		
		me.fadeIn();
		
		
		$(".dOverlay, .dialogBox .close").click(function() {
			$('.dOverlay').fadeOut();
			$('.dialogBox').fadeOut();
			$('.dialogBox .close').remove();
			return false;
		});
		
	}
})(jQuery);