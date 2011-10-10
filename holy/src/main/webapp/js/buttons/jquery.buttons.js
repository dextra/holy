(function($) {
	$(".buttons li").delegate('hover', 'a',function() {
		$(this).animate({opacity : '1'}, 500);
	}, function() {
		$(this).animate({opacity : '0.7'}, 500);
	});
})(jQuery);
