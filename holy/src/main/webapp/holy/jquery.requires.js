(function($) {

	$.extend({
		requires : function(url, dataType, callback) {
			if ($.requires.loads[url]) {
				return;
			}
			console.info('load', url);
			$('head').append(
					'<script type="text/javascript" src="' + url
							+ '"></script>');
			$.requires.loads[url] = true;
		}
	});

	$.requires.loads = {};

})(jQuery);