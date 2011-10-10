(function($) {
	$.fn.tabPanelShow = function(index) {
		$(this).find('> ul > li').eq(index).find('a').click();
	}
	$.fn.tabPanel = function(opts) {
		$(this).addClass('tabPanel');
		opts = opts || {};
		var effect = opts.effect || 'toggle';
		var delay = opts.delay;

		var tabpanel = $(this);
		tabpanel.children("div:gt(0)").hide();
		
		tabpanel.bind('open.tabPanel', function(evt, index) {
			var lis = tabpanel.children('ul').children('li');
			var divs = tabpanel.children('div');
			lis.removeClass('active');
			divs.removeClass('active');
			lis.eq(index).addClass('active');
			divs.eq(index).addClass('active');
			return false;
		});

		tabpanel.find("> ul > li a").click(function() {
			var me = $(this);
			var parent = me.parents("div:first");
			var index = me.closest("li").index();
			parent.show();
			parent.children("div:visible").hide();

			var toShow = parent.children("div").eq(index);
			if (delay) {
				toShow[effect](delay);
			} else {
				toShow[effect]();
			}
			parent.trigger("open.tabPanel", index);
		});
		
		if(tabpanel.find('> ul > li').length) {
			tabpanel.tabPanelShow(0);
		}
	}
}(jQuery));