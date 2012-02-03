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
	$.fn.picklist = function(opts) {
		var plist = $(this);
		
		plist.addClass('picklist');
		
		var selectHeight = plist.find('select').height();
		
		plist.css('height', selectHeight + 10);
		
		plist.find('select').attr('multiple', 'multiple');
		
		$(this).find('select:first').after('<div class="pActions"><button class="pr">&gt;</button><button class="apr">&gt;&gt;</button><button class="apl">&lt;&lt;</button><button class="pl">&lt;</button></div>');

		plist.find('.pl').click(function() {
			var pselect = plist.find('select:last option:selected');
			pselect.remove();
			plist.find('select:first').append(pselect);
		});

		plist.find('.pr').click(function() {
			var pselect = plist.find('select:first option:selected');
			pselect.remove();
			plist.find('select:last').append(pselect);
		});

		plist.find('.apl').click(function() {
			var pselect = plist.find('select:last option');
			pselect.remove();
			plist.find('select:first').append(pselect);
		});

		plist.find('.apr').click(function() {
			var pselect = plist.find('select:first option');
			pselect.remove();
			plist.find('select:last').append(pselect);
		});
	}
}(jQuery));
