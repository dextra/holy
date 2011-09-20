(function($) {
	$.fn.dialog = function(opts) {
		var me = $(this);
		opts = opts || {};
		var effect = opts.effect || 'slideToggle';
		var overlayClass = opts.overlayClass || 'dialogOverlay';
		var delay = opts.delay;
		var closable = opts.closable;

		me.data("dialog.css.position", me.css("position"));
		me.data("dialog.position", me.position());
		me.data("dialog.parent", me.parent());
		me.data("dialog.state", true);

		if (!me.data("dialog.overlaydiv")) {
			var overlayDiv = $("<div></div>");
			overlayDiv.addClass(overlayClass);
			if (closable) {
				overlayDiv.bind('click', {obj: me}, function(event) {
					event.data.obj.undialog();
				});
			}

			if (!me.parent().length) {
				me.appendTo("body");
			}

			overlayDiv.prependTo("body");
			me.data("dialog.overlaydiv", overlayDiv);
		}

		me.center();
		me.hide();

		if (delay) {
			me[effect](delay);
		} else {
			me[effect]();
		}

		$(window).bind("scroll.dialog", function() {
			me.center();
		});

		me.trigger("dialog.dialog", opts);

		return me;
	};

	$.fn.undialog = function() {
		var me = $(this);

		me.css("position", me.data("dialog.css.position"));
		me.position(me.data("dialog.position"));

		me.data("dialog.overlaydiv").remove();

		me.data("dialog.state", null);
		me.data("dialog.overlaydiv", null);
		me.data("dialog.position", null);
		me.data("dialog.css.position", null);

		if (!me.data("dialog.parent").length) {
			me.remove();
		}

		$(window).unbind("scroll.dialog");
		me.trigger("undialog.dialog");
	};

	$.fn.isDialog = function() {
		return $(this).data("dialog.state");
	}

}(jQuery));