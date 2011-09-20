(function($) {
	$.fn.center = function() {
		var me = $(this);
		var doc = $(document);

		var scrollTop = doc.scrollTop();
		var scrollLeft = doc.scrollLeft();

		var win = $(window);
		var y = scrollTop + ((win.height() - me.innerHeight()) / 2);

		var x = scrollLeft + ((win.width() - me.innerWidth()) / 2);

		me.css("position", "absolute");
		me.offset( {
			left : x,
			top : y
		});
	};
}(jQuery));