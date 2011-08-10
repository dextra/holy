(function($) {
	$.holyavenger.parseTemplate = function(template, context) {
		template = $(template);
		var selector = template.attr('id') ? '#' + template.attr('id')
				: template.attr('selector');
		if (!selector) {
			throw "<template> requires id or selector attribute";
		}
		if (!template.attr('append')) {
			$(selector).html('');
		}
		var text = $.holyavenger.readText(template);
		template = TrimPath.parseTemplate(text);
		var result = template.process(context);
		if (result.exception) {
			throw result.exception;
		}
		var modified = $(selector).append(result);
		$(window).trigger('holyavenger.docmod', [modified]);
	}
	$.holyavenger.addParsers({
		'template' : $.holyavenger.parseTemplate
	});
})(jQuery);