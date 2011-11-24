(function($) {
	$.holyavenger.parseTemplate = function(template, context) {
		template = $(template);
		var selector = template.attr('id') ? '#' + template.attr('id')
				: template.attr('selector');
		if(template.attr('target')) {
			selector = eval(template.attr('target'));
		}		
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
		$(selector).append(result);
	}
	$.holyavenger.addParsers({
		'template' : $.holyavenger.parseTemplate
	});
})(jQuery);