(function($) {

	$(window).hashchange(function() {
		if (!location.hash || location.hash == '#') {
			location = '#welcome';
			return;
		}
		var hash = location.hash.substring(1);
		$.holy('demos/' + hash + '.xml');
	})

	$(document).ready(function() {
		$('.dropdown').load('demos/menu.html', function() {
			$(this).children('ul').dropDown();
		});
		$('.message').messageMonitor();

		$(window).hashchange();
	});

})(jQuery);