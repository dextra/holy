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

( function($) {
	$.fn.dropDown = function(opts) {
		opts = $.extend({}, opts);
		if(opts.showlevel) {
			$(this).find('li:has(ul) > a').append(' <span>&raquo;</span>');
		}
		var effectIn = opts.effectIn || 'slideDown';
		var effectOut = opts.effectOut || 'slideUp';
		var vertical = !!opts.vertical;
		if (vertical) {
			$(this).addClass('vdropdown');
		} else {
			$(this).addClass('hdropdown');
		}
		var duration = opts.duration == 0 ? 0 : opts.duration || 'fast';
		var li = $(this).find('li');
		li.hover(function() {
			var ul = $(this).children('ul');
			ul.stop(true, true);
			ul[effectIn](duration);
			$(this).addClass('active');
		}, function() {
			var ul = $(this).children('ul');
			ul.stop(true, true);
			ul[effectOut]('fast');
			$(this).removeClass('active');
		});
	}
}(jQuery));
