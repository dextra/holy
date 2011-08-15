(function($) {
	$(document).ready(function(){
		$('.dropdown').delegate('li', 'hover', function(){
			$(this).children('ul').slideToggle('fast');
		});	
	});
 })(jQuery);
