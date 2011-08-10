(function($) {

	$.extend({
		requires : function(url, dataType) {
			if ($.requires.loads[url]) {
				return;
			}
			if (!dataType) {
				dataType = 'script';
			}
			console.info('load', dataType, url);
			if (dataType == 'script') {
				$('head').append(
						'<script type="text/javascript" src="' + url
								+ '"></script>');
			} else if (dataType == 'css') {
				$('head').append(
						'<link rel="stylesheet" href="' + url
								+ '" type="text/css" media="screen" />');
			}
			$.requires.loads[url] = true;
		}
	});

	$.requires.loads = {};

})(jQuery);