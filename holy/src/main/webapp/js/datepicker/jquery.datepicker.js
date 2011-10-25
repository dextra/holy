(function($) { 

	var today = new Date(); // used in defaults
    var months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',');
	var monthlengths = '31,28,31,30,31,30,31,31,30,31,30,31'.split(',');
  	var dateRegEx = /^\d{1,2}\/\d{1,2}\/\d{2}|\d{4}$/;
	var yearRegEx = /^\d{4,4}$/;

    $.fn.simpleDatepicker = function(options) {
		var opts = jQuery.extend({}, jQuery.fn.simpleDatepicker.defaults, options);
		setupYearRange();
		function setupYearRange () {
			var startyear, endyear;  
			if (opts.startdate.constructor == Date) {
				startyear = opts.startdate.getFullYear();
			} else if (opts.startdate) {
				if (yearRegEx.test(opts.startdate)) {
				startyear = opts.startdate;
				} else if (dateRegEx.test(opts.startdate)) {
					opts.startdate = new Date(opts.startdate);
					startyear = opts.startdate.getFullYear();
				} else {
				startyear = today.getFullYear();
				}
			} else {
				startyear = today.getFullYear();
			}
			opts.startyear = startyear;
			
			if (opts.enddate.constructor == Date) {
				endyear = opts.enddate.getFullYear();
			} else if (opts.enddate) {
				if (yearRegEx.test(opts.enddate)) {
					endyear = opts.enddate;
				} else if (dateRegEx.test(opts.enddate)) {
					opts.enddate = new Date(opts.enddate);
					endyear = opts.enddate.getFullYear();
				} else {
					endyear = today.getFullYear();
				}
			} else {
				endyear = today.getFullYear();
			}
			opts.endyear = endyear;	
		}
		
		function newDatepickerHTML () {
			var years = [];
			for (var i = 0; i <= opts.endyear - opts.startyear; i ++) years[i] = opts.startyear + i;
			var table = $('<table class="datepicker" cellpadding="0" cellspacing="0"></table>');
			table.append('<thead></thead>');
			table.append('<tfoot></tfoot>');
			table.append('<tbody></tbody>');
				var monthselect = '<select name="month">';
				for (var i in months) monthselect += '<option value="'+i+'">'+months[i]+'</option>';
				monthselect += '</select>';
				var yearselect = '<select name="year">';
				for (var i in years) yearselect += '<option>'+years[i]+'</option>';
				yearselect += '</select>';
			$("thead",table).append('<tr class="controls"><th colspan="7"><span class="prevMonth">&laquo;</span>&nbsp;'+monthselect+yearselect+'&nbsp;<span class="nextMonth">&raquo;</span></th></tr>');
			$("thead",table).append('<tr class="days"><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>');
			for (var i = 0; i < 6; i++) $("tbody",table).append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');	
			return table;
		}
		function findPosition (obj) {
			var curleft = curtop = 0;
			if (obj.offsetParent) {
				do { 
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
				return [curleft,curtop];
			} else {
				return false;
			}
		}
		function loadMonth (e, el, datepicker, chosendate) {
			var mo = $("select[name=month]", datepicker).get(0).selectedIndex;
			var yr = $("select[name=year]", datepicker).get(0).selectedIndex;
			var yrs = $("select[name=year] option", datepicker).get().length;
			if (e && $(e.target).hasClass('prevMonth')) {				
				if (0 == mo && yr) {
					yr -= 1; mo = 11;
					$("select[name=month]", datepicker).get(0).selectedIndex = 11;
					$("select[name=year]", datepicker).get(0).selectedIndex = yr;
				} else {
					mo -= 1;
					$("select[name=month]", datepicker).get(0).selectedIndex = mo;
				}
			} else if (e && $(e.target).hasClass('nextMonth')) {
				if (11 == mo && yr + 1 < yrs) {
					yr += 1; mo = 0;
					$("select[name=month]", datepicker).get(0).selectedIndex = 0;
					$("select[name=year]", datepicker).get(0).selectedIndex = yr;
				} else { 
					mo += 1;
					$("select[name=month]", datepicker).get(0).selectedIndex = mo;
				}
			}
			if (0 == mo && !yr) $("span.prevMonth", datepicker).hide(); 
			else $("span.prevMonth", datepicker).show(); 
			if (yr + 1 == yrs && 11 == mo) $("span.nextMonth", datepicker).hide(); 
			else $("span.nextMonth", datepicker).show(); 
			
			var cells = $("tbody td", datepicker).unbind().empty().removeClass('date');
			
			var m = $("select[name=month]", datepicker).val();
			var y = $("select[name=year]", datepicker).val();
			var d = new Date(y, m, 1);
			var startindex = d.getDay();
			var numdays = monthlengths[m];
			
			if (1 == m && ((y%4 == 0 && y%100 != 0) || y%400 == 0)) numdays = 29;
			
			if (opts.startdate.constructor == Date) {
				var startMonth = opts.startdate.getMonth();
				var startDate = opts.startdate.getDate();
			}
			if (opts.enddate.constructor == Date) {
				var endMonth = opts.enddate.getMonth();
				var endDate = opts.enddate.getDate();
			}
			
			for (var i = 0; i < numdays; i++) {
			
				var cell = $(cells.get(i+startindex)).removeClass('chosen');
				
				if ( 
					(yr || ((!startDate && !startMonth) || ((i+1 >= startDate && mo == startMonth) || mo > startMonth))) &&
					(yr + 1 < yrs || ((!endDate && !endMonth) || ((i+1 <= endDate && mo == endMonth) || mo < endMonth)))) {
				
					cell
						.text(i+1)
						.addClass('date')
						.hover(
							function () { $(this).addClass('over'); },
							function () { $(this).removeClass('over'); })
						.click(function () {
							var chosenDateObj = new Date($("select[name=year]", datepicker).val(), $("select[name=month]", datepicker).val(), $(this).text());
							closeIt(el, datepicker, chosenDateObj);
						});
						
					if (i+1 == chosendate.getDate() && m == chosendate.getMonth() && y == chosendate.getFullYear()) cell.addClass('chosen');
				}
			}
		}
		
		function closeIt (el, datepicker, dateObj) { 
			if (dateObj && dateObj.constructor == Date)
				el.val(jQuery.fn.simpleDatepicker.formatOutput(dateObj));
			datepicker.remove();
			datepicker = null;
			jQuery.data(el.get(0), "simpleDatepicker", { hasDatepicker : false });
		}

        return this.each(function() {
			
			if ( $(this).is('input') && 'text' == $(this).attr('type')) {

				var datepicker; 
				jQuery.data($(this).get(0), "simpleDatepicker", { hasDatepicker : false });
				
				$(this).click(function (ev) {
											 
					var $this = $(ev.target);
					
					if (false == jQuery.data($this.get(0), "simpleDatepicker").hasDatepicker) {
						
						// store data telling us there is already a datepicker
						jQuery.data($this.get(0), "simpleDatepicker", { hasDatepicker : true });
						
						// validate the form's initial content for a date
						var initialDate = $this.val();
						
						if (initialDate && dateRegEx.test(initialDate)) {
							var chosendate = new Date(initialDate);
						} else if (opts.chosendate.constructor == Date) {
							var chosendate = opts.chosendate;
						} else if (opts.chosendate) {
							var chosendate = new Date(opts.chosendate);
						} else {
							var chosendate = today;
						}
							
						datepicker = newDatepickerHTML();
						$("body").prepend(datepicker);
						
						var elPos = findPosition($this.get(0));
						var x = (parseInt(opts.x) ? parseInt(opts.x) : 0) + elPos[0] - 18;
						var y = (parseInt(opts.y) ? parseInt(opts.y) : 0) + elPos[1] - 61;
						$(datepicker).css({ position: 'absolute', left: x, top: y });
					
						$("select", datepicker).bind('change', function () { loadMonth (null, $this, datepicker, chosendate); });
						$("span.prevMonth", datepicker).click(function (e) { loadMonth (e, $this, datepicker, chosendate); });
						$("span.nextMonth", datepicker).click(function (e) { loadMonth (e, $this, datepicker, chosendate); });
						$("span.today", datepicker).click(function () { closeIt($this, datepicker, new Date()); });
						$("span.close", datepicker).click(function () { closeIt($this, datepicker); });
						
						$("select[name=month]", datepicker).get(0).selectedIndex = chosendate.getMonth();
						$("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, chosendate.getFullYear() - opts.startyear);
						loadMonth(null, $this, datepicker, chosendate);
					}
					
				});
			}

        });

    };

	jQuery.fn.simpleDatepicker.formatOutput = function (dateObj) {
		return (dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();	
	};
	
	jQuery.fn.simpleDatepicker.defaults = {
		chosendate : today,
		startdate : today.getFullYear(), 
		enddate : today.getFullYear() + 1,
		
		x : 18, // must be in px
		y : 18 // must be in px
	};
	
})(jQuery);