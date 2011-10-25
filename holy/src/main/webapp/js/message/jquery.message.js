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
	}

	$('.message li').delegate('a', 'click', function() {
		$(this).parent('li').fadeOut();
	});
})(jQuery);