(function($) {
	// CENTRALIZE FUNCTION - Use this to center absolute box in the browser
	jQuery.fn.center = function() {
		this.css("position", "absolute");
		this.css("top", ($(window).height() - this.height() ) / 2.5 + $(window).scrollTop() + "px");
		this.css("left", ($(window).width() - this.width() ) / 2 + $(window).scrollLeft() + "px");
		return this;
	}
})(jQuery);