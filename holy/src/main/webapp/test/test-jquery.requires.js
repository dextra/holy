(function($) {

	$(document).ready(function() {

		module("jquery.requires.js");

		test("requires script", function() {
			ok(!$('#qunit-fixture').text());
			$.requires('test/echo.js', 'script');
			equal($('#qunit-fixture').text(), 'echo.js');
			$.requires('test/echo.js', 'script');
			equal($('#qunit-fixture').text(), 'echo.js');
		});

	});

})(jQuery);