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
	holyDomain = 'http://holy.dextra-sw.com';

	$(window).hashchange(function() {
		if (!location.hash || location.hash == '#') {
			location = '#home';
			return;
		}
		if (!location.hash || location.hash == '#!') {
			return;
		}
		var hash = location.hash.substring(1);
		$.holy('./templates/' + hash + '.xml');
	});

	$(document).ready(function() {
		$.ajax({
			url : 'props/version.txt',
			dataType : 'text',
			success : function(version) {
				$.holy.version = $.trim(version);
			},
			complete : function() {
				$(window).hashchange();
			}
		});

		$.holy('./templates/menu.xml');
		$.holy('./templates/userbar.xml');
		$('.message').messageMonitor();
	});
})(jQuery);
