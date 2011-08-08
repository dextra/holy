(function($) {

	$.extend({
		requires : function(dataType, url, callback) {
			if ($.requires.loads[url]) {
				return;
			}
			var async = !!callback;
			console.info("x", async);
			$.ajax({
				url : url,
				async : async,
				dataType : dataType,
				success : callback
			});
			$.requires.loads[url] = true;
		}
	});
	
	$.requires.loads = {};

})(jQuery);