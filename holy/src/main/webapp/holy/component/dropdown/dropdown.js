(function($) {
	$(document).ready(function(){
		$('.dropdown > li, .dropdown ul > li').live('hover', function(){
			$(this).children('ul').slideToggle('fast');
			$(this).addClass('hover');
		}, function(){
			$(this).children('ul').fadeOut('fast');
			$(this).removeClass('hover');	
		});
	
	});
 })(jQuery);
