(function($) {
	jQuery.loading = function(opts) {
		var loadTxt = opts.text;
		if(!loadTxt) {
			loadTxt = 'Loading...'
		}
		var bgOver = opts.overlay;
		if(!bgOver) {
			bgOver = '#000000'
		}
		var overOpacity = opts.opacity;
		if(!overOpacity) {
			overOpacity = '50'
		}
		$('body').append('<div id="loading"><div id="load" style="border:1px solid ' + bgOver + '; box-shadow: 0px 0px 10px ' + bgOver + ';"><p><img src="imgs/load.gif" align="middle" />' + loadTxt + '</p></div><div id="overlay" style="background:' + bgOver + '; opacity: 0.' + overOpacity + '; filter: alpha(opacity = ' + overOpacity + ');"></div></div>');
		$('#load').center();
		$('#loading').ajaxStart(function() {
			$(this).fadeIn('fast');
		});
		$("#loading").ajaxStop(function() {
			$(this).fadeOut('fast');
		});
	}
})(jQuery);
