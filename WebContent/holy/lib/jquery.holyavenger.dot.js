/*Copyright 2013 Dextra Sistemas

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/

(function($) {
	$.holyavenger.parseDoT = function(template, context, callback) {
		template = $(template);
		var selector = template.attr('id') ? '#' + template.attr('id')
				: template.attr('selector');

		var domSelector = template.attr('dom');

		var dom;
		if (template.attr('target')) {
			selector = eval(template.attr('target'));
		}

		if (domSelector && context[domSelector]) {
			dom = context[domSelector];
		} else if (selector) {
			dom = $(selector);
		} else if (!template.attr('optional')) {
			throw "<dot> requires id, selector or dom (in context)";
		}

		if (dom) {
			if (!template.attr('append')) {
				dom.html('');
			}
			var text = $.holyavenger.readText(template);
			template = doT.template(text);
			context.window = window;
			var result = template(context);
			if (result.exception) {
				throw result.exception;
			}
			dom.append(result);
		}
		callback();
	}
	$.holyavenger.addParsers({
		'dot' : $.holyavenger.parseDoT
	});
	
	$.fn.doT = function(template, ctx) {
		var templateParsed = doT.template(template);
		var result = templateParsed(ctx);
		$(this).html(result);
		return this;
	}

	$.fn.appendDoT = function(template, ctx) {
		var templateParsed = doT.template(template);
		var result = templateParsed(ctx);
		$(this).append(result);
		return this;
	}
})(jQuery);