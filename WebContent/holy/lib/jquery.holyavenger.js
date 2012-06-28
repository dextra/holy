/*Copyright 2011/2012 Dextra Sistemas

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

	var execute = function(tags, context) {
		if(!tags.length) {
			return ;
		}
		var tag = tags.shift();
		var check = $(tag).attr('if');
		if(check) {
			check = [ '(function () { return (', check, '); })();' ].join('');
			var result = eval(check);
			if(!result) {
				return execute(tags, context);
			}
		}
		var parser = $.holyavenger.parsers[tag.nodeName];
		if (parser) {
			parser(tag, context, function() {
				return execute(tags, context);
			});
		} else {
			throw 'Parser for <' + tag.nodeName + '> not found.'
		}
	}
	
	$.holyavenger = {
		parseEngine : function(xmlDoc, context) {
			if (typeof (xmlDoc) == 'string') {
				xmlDoc = $.parseXML(xmlDoc);
			}
			if (!context) {
				context = {};
			}
			if (!context.hvars) {
				context.hvars = {};
			}
			var tags = $(xmlDoc).find('engine > *');
			tags = $.makeArray(tags);
			execute(tags, context);
		},
		parsers : {},
		addParsers : function(_parsers) {
			jQuery.extend($.holyavenger.parsers, _parsers);
		},
		parseAction : function(action, context, callback) {
			action = $(action);
			var selector = action.attr('id') ? '#' + action.attr('id') : action
					.attr('selector');
			if (action.attr('target')) {
				selector = eval(action.attr('target'));
			}
			if (!selector) {
				throw "<action> requires id or selector attribute";
			}
			if (!action.attr('append')) {
				$(selector).html('');
			}
			var text = $.holyavenger.readText(action);
			$(selector).append(text);
			callback();
		},
		parseScript : function(script, context, callback) {
			var text = $(script).text();
			text = [ 'var func = function () {', text, '}; func;' ].join('');
			var func = eval(text);
			func = $.proxy(func, context);
			$(func);
			callback();
		},
		parseText : function(text, context, callback) {
			var xml = $(text);
			var text = $.holyavenger.readText(xml);
			var name = xml.attr('name');
			context.hvars[name] = text;
			callback();
		},
		parseHoly : function(text, context, callback) {
			var xml = $(text);
			var src = xml.attr('src');
			$.ajax({
				url: src,
				dataType: 'holy',
				complete: callback
			});
		},
		readText : function(element) {
			var ret = [];
			$.each($(element).contents(), function(idx, child) {
				ret.push($.holyavenger.readChildrenText(child));
			});
			return ret.join('');
		},
		readChildrenText : function(element) {
			var ret = [];
			if (element.nodeType == 1) {
				// It is element
				ret.push('<', element.nodeName);
				var attrs = element.attributes;
				for ( var i = 0; i < attrs.length; i++) {
					var attr = attrs.item(i);
					ret.push(' ', attr.name, '="', attr.value, '"');
				}
				ret.push(">");
				ret.push($.holyavenger.readText(element));
				ret.push("</", element.nodeName, ">");
			} else if (element.nodeType == 3 || element.nodeType == 4) {
				// It is text or cdata
				ret.push(element.data);
			}
			return ret.join('');
		}
	};

	$.holyavenger.addParsers({
		'action' : $.holyavenger.parseAction,
		'script' : $.holyavenger.parseScript,
		'text' : $.holyavenger.parseText,
		'holy' : $.holyavenger.parseHoly
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
		return $.ajax({
			url : url,
			dataType : 'holy',
			context : context
		});
	}

	$.executeHoly = function(template, context) {
		return $.holyavenger.parseEngine(template, context);
	}

})(jQuery);