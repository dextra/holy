(function($) {
	"use strict";
	$.holyavenger.parseTemplate = function(template, context) {
		var selector, text, result, modified;
		template = $(template);
		selector = template.attr('id') ? '#' + template.attr('id')
				: template.attr('selector');
		if (!selector) {
			throw "<template> requires id or selector attribute";
		}
		if (!template.attr('append')) {
			$(selector).html('');
		}
		text = $.holyavenger.readText(template);
		template = TrimPath.parseTemplate(text);
		result = template.process(context);
		if (result.exception) {
			throw result.exception;
		}
		modified = $(selector).append(result);
		$(window).trigger('holyavenger.docmod', [modified]);
	};
	$.holyavenger.addParsers({
		'template' : $.holyavenger.parseTemplate
	});
})(jQuery);