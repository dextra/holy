(function($) {
	$(document).ready(function(){
		// put * if field is requery
		$('.forms ul .require label').prepend('<span>*</span>');
		// calculate 
		console.log(listWidth);
		var listWidth = $.map($('.forms ul li label'),function(val){
			return $(val).width();
		});
		maxLabel = Math.max.apply( Math, listWidth );
		
		$('.forms ul li label').css('width', maxLabel);
		
	});
 })(jQuery);
