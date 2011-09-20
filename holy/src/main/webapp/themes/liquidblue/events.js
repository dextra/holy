(function($) {
	$(document).ready(function(){
		$('#content').corner();
		
		$('.message').bind('new.message', function(evt, li) {
			$(li).corner('5px');
		});
	});
})(jQuery);