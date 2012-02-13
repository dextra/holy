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
	var sort = function(comp, how) {
		if(!how) {
			how = comp.data('sortChildren');
			if(!how) {
				how = $.fn.sortChildren.how;
			}
		}
		var array = $.makeArray(comp.children(comp));
		array.sort(how);
		$.each(array, function() {
			comp.append(this);
		});
		$(comp).trigger('sorted.sortChildren');
	}

	$.fn.sortChildren = function(how) {
		$(this).each(function() {
			var comp = $(this);
			sort(comp, how);
		});
	}

	$.fn.sortChildren.how = function(a, b) {
		if(!a || !b) {
			a = !!a;
			b = !!b;
			return (a < b ? -1 : (a > b ? 1 : 0));
		}

		if(a.compareTo) {
			return a.compareTo(b);
		}

		var ta = $(a).html();
		var tb = $(b).html();
		var a = ta.toUpperCase();
		var b = tb.toUpperCase();

		var ret = (a < b ? -1 : (a > b ? 1 : 0));
		if(ret == 0) {
			a = ta;
			b = tb;
			ret = (a < b ? -1 : (a > b ? 1 : 0));
		}
		return ret;
	}

	$.fn.sortChildren.createHow = function(order) {
		return function(a, b) {
			if(!a || !b) {
				a = !!a;
				b = !!b;
				return (a < b ? -1 : (a > b ? 1 : 0));
			}

			if(a.compareTo) {
				return a.compareTo(b);
			}

			var ac = $(a).children();
			var bc = $(b).children();

			var ret = 0;
			for(var i = 0; i < order.length; i++) {
				var o = order[i];
				var ae = ac.eq(o.index);
				var be = bc.eq(o.index);
				ret = $.fn.sortChildren.how(ae, be);
				if(ret != 0) {
					if(!o.asc) {
						ret = ret * -1;
					}
					return ret;
				}
			}

			return ret;
		}
	}
}(jQuery));
