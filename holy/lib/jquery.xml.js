(function($) {

	$.fn.isXml = function() {
		var me = $(this);
		if (!me.length) {
			return false;
		}
		return $.isXMLDoc(me[0]);
	}

	$.fn.xml = function() {
		var me = $(this);
		if (!me.isXml()) {
			return me.html();
		}
		var doc = me[0];
		if (window.ActiveXObject) {
			return doc.xml;
		} else {
			return (new XMLSerializer()).serializeToString(doc);
		}
	}

})(jQuery);