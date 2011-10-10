(function($) {
	$(document).ready(function() {
		$('#content, #load').corner();

		$('.message').bind('new.message', function(evt, li) {
			$(li).corner('5px');
		});
		$.loading({
			text : 'Carregando...',
			overlay : '#23557E',
			opacity: '60'
		});
	});
})(jQuery);
