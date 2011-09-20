(function($) {
	$(document).ready(function(){
		$('.message li').delegate('a', 'click', function(){
			$(this).parent('li').fadeOut();
		});	
	});
 })(jQuery);
