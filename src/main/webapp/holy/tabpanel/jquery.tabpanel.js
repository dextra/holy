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
	$.fn.tabPanelShow = function(index) {
		$(this).find('> ul > li').eq(index).find('a').click();
	}
	$.fn.tabPanel = function(opts) {
		$(this).addClass('tabPanel');
		opts = opts || {};
		var effect = opts.effect || 'fadeToggle';
		var delay = opts.delay;
		var tabpanel = $(this);
		var vertical = !!opts.vertical;
		if (vertical) {
			$(this).addClass('vtabPanel');
		} 
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
			return false;
		});
		
		if(tabpanel.find('> ul > li').length) {
			tabpanel.tabPanelShow(0);
		}
	}
}(jQuery));