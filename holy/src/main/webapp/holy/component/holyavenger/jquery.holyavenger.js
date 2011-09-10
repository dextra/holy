(function($) {
	"use strict";
	$.holyavenger = {
		parseEngine : function(xmlDoc, context) {
			if (typeof (xmlDoc) === 'string') {
				xmlDoc = $.parseXML(xmlDoc);
			}
			var tags = $(xmlDoc).find('engine > *');
			$.each(tags, function(idx, tag) {
				var parser = $.holyavenger.parsers[tag.nodeName];
				if (parser) {
					parser(tag, context);
				} else {
					throw 'Parser for <' + tag.nodeName + '> not found.';
				}
			});
		},
		parsers : {},
		addParsers : function(aParsers) {
			jQuery.extend($.holyavenger.parsers, aParsers);
		},
		parseAction : function(action) {
			var selector, text, modified;
			action = $(action);
			selector = action.attr('id') ? '#' + action.attr('id') : action.attr('selector');
			if (!selector) {
				throw "<action> requires id or selector attribute";
			}
			if (!action.attr('append')) {
				$(selector).html('');
			}
			text = $.holyavenger.readText(action);
			modified = $(selector).append(text);
			$(window).trigger('holyavenger.docmod', [ modified ]);
		},
		parseScript : function(script, context) {
			var text, func;
			text = $(script).text();
			text = [ 'var func = function () {', text, '}; func;' ].join('');
			func = eval(text);
			func = $.proxy(func, context);
			$(func);
		},
		readText : function(element, keepStructure) {
			var ret = [];
			$.each($(element).contents(), function(idx, child) {
				ret.push($.holyavenger.readChildrenText(child, keepStructure));
			});
			return ret.join('');
		},
		readChildrenText : function(element, keepStructure) {
			var ret = [];
			if (element.nodeType === 1) {
				// It is element
				ret.push('<', element.nodeName);
				var attrs = element.attributes;
				for ( var i = 0; i < attrs.length; i++) {
					var attr = attrs.item(i);
					ret.push(' ', attr.name, '="', attr.value, '"');
				}
				ret.push(">");
				ret.push($.holyavenger.readText(element, keepStructure));
				ret.push("</", element.nodeName, ">");
			} else if (element.nodeType === 3) {
				// It is text
				ret.push(element.data);
			} else if (element.nodeType === 4) {
				// It is cdata
				if (keepStructure) {
					ret.push('<![CDATA[');
				}
				ret.push(element.data);
				if (keepStructure) {
					ret.push(']]>');
				}
			}
			return ret.join('');
		}
	};

	$.holyavenger.addParsers({
		'action' : $.holyavenger.parseAction,
		'script' : $.holyavenger.parseScript
	});

	$.ajaxSetup({
		converters : {
			'xml holyavenger' : true,
			'xml holy' : true
		}
	});

	$.ajaxPrefilter(function(options, originalOpts, jqXHR) {
		var dataType = originalOpts.dataType;
		if (dataType && (dataType === 'holy' || dataType === 'holyavenger')) {
			var callback = options.success;
			var holyCallback = function(doc) {
				var context = this;
				$.holyavenger.parseEngine(doc, context);
				if (callback) {
					callback = $.proxy(callback, context);
					callback(arguments);
				}
			};
			options.success = holyCallback;
			return 'xml';
		}
	});

	$.holy = function(url, context) {
		$.ajax({
			url : url,
			dataType : 'holy',
			context : context
		});
	}
})(jQuery);