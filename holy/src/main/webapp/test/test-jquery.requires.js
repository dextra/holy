(function($) {

	$(document).ready(function() {

		module("jquery.requires.js");

		test("requires script", function() {
			ok(!$('#qunit-fixture').text());
			$.requires('test/echo.js', 'script');
			equal('echo.js', $('#qunit-fixture').text());
			$.requires('test/echo.js', 'script');
			ok('echo.js', $('#qunit-fixture').text());
		});

	});

})(jQuery);