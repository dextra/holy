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
		if(!$('.loading').length) {
			$('body').append('<div class="loading"><div class="load"><p>Carregando...</p></div><div class="overlay"></div></div>');
		}
		$('.loading .load').center();
		$('.loading').ajaxStart(function() {
			$(this).fadeIn('fast');
		});
		$(".loading").ajaxStop(function() {
			$(this).fadeOut('fast');
		});
	}
})(jQuery);
