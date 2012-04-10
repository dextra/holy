(function($) {

	var reqs = {};

	var dispatch = function(func, opts, args) {
		for ( var i in opts._modulator.reqs) {
			if (opts._modulator.reqs[i][func]) {
				opts._modulator.reqs[i][func].apply(opts._modulator.reqs[i],
						args);
			}
		}
	}

	var prepare = function(opts) {
		if (!opts._modulator.reqs) {
			opts._modulator.reqs = reqs[opts._modulator.key];
			reqs[opts._modulator.key] = null;
			delete (reqs[opts._modulator.key]);
		}
	}

	var callbacks = {
		success : function() {
			prepare(this);
			dispatch('success', this, arguments);
		},
		complete : function(xhr) {
			prepare(this);
			dispatch('complete', this, arguments);
		},
		error : function() {
			prepare(this);
			dispatch('error', this, arguments);
		}
	};

	var create = function(type) {
		return function(opts, original, xhr) {
			if (!opts.modulate || opts._modulator) {
				return;
			}
			if (opts._modulator || opts.type.toUpperCase() != 'GET') {
				return;
			}
			var key = '' + opts.dataType + ' ' + opts.type + ' ' + opts.url
					+ '?' + opts.data;
			if (!reqs[key]) {
				reqs[key] = [];
			}
			reqs[key].push(opts);
			xhr.abort();
			if (reqs[key].length == 1) {
				var nopts = $.extend({}, opts, callbacks, {
					_modulator : {
						key : key
					},
					dataType : type
				});
				$.ajax(nopts);
			}
		};
	}

	$.ajaxPrefilter('xml', create('xml'));
	$.ajaxPrefilter('json', create('json'));

	var test = function() {
		var v = function() {
			$.getJSON('/r/feed/uolindex', function(a) {
				console.info('xxxx', a)
			});
			$.getJSON('/r/feed/uolindex', function(a) {
				console.info('yyyy', a)
			});
		}
		setTimeout(v, 1000);
		setTimeout(v, 3000);
	}

})(jQuery);
