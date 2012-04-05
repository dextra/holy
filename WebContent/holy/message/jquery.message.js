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

	var remove = function() {
		comp = $(this);
		comp.closest('ul').trigger('remove.message', comp);
		comp.fadeOut('slow', function() {
			$(this).remove();
		});
		return false;
	};
	var prepare = function(li) {
		li = $(li);
		if(li.hasClass('closable')) {
			li.append('<a href="#"/>');
			var a = li.children('a:last');
			a.text('x');
			a.click($.proxy(remove, li));
		}
		var ul = li.closest('ul');
		ul.trigger('remove.message', li);
		li.fadeIn('slow');
	}

	$.fn.messageMonitor = function(time, warning) {
		if(!time) {
			time = 20000;
		}
		if(!warning) {
			warning = Math.min(5000, time);
		}
		var me = $(this);
		if(me.data('messageMonitor')) {
			return;
		}
		me.data('messageMonitor', true);
		var clean = function() {
			var childs = me.children();
			childs.each(function() {
				var c = $(this);
				var t = c.data('messageMonitor');
				if(!t) {
					t = time;
					prepare(c);
				}
				t -= 1000;
				c.data('messageMonitor', t);
				if(t <= warning) {
					var span = c.children('span.time');
					if(!span.length) {
						c.append('<span class="time"/>');
						span = c.children('span.time');
						span.hide();
						span.fadeIn('slow');
					}
					span.text('' + (t / 1000) + 's');
				}
				if(t <= 0) {
					remove.apply(this);
				}
			})
			setTimeout(clean, 1000);
		}
		setTimeout(clean, 1000);
	}

	$.fn.message = function(msg, type, unclosable) {
		var ul = $(this);
		ul.prepend('<li />');
		var li = ul.children('li:first');
		li.hide();
		if(type) {
			li.addClass(type);
		}
		if(!unclosable) {
			li.addClass('closable');
		}
		li.text(msg);
		ul.delegate('li', 'click', function() {
			$(this).fadeOut();
		});
	}
	$('.message li').delegate('a', 'click', function() {
		$(this).parent('li').fadeOut();
	});
})(jQuery);
