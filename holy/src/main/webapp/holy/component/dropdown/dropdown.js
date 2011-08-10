$('.dropdown li').hover(function(){
	$(this).children('ul').slideToggle();
	$(this).addClass('hover');
},function(){
	$(this).children('ul').fadeOut();
	$(this).removeClass('hover');
});