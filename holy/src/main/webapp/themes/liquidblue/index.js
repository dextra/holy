(function($) {
	$(window).hashchange(function() {
		if(!location.hash || location.hash == '#') {
			location = '#home';
			return;
		}
		if(!location.hash || location.hash == '#!') {
			return;
		}
		var hash = location.hash.substring(1);
		$.holy('../../templates/' + hash + '.xml');
	});

	$(document).ready(function() {
		$.holy('../../templates/menu.xml');
		$('.message').messageMonitor();
		$(window).hashchange();
	});
})(jQuery);
