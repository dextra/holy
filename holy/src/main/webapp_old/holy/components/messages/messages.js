$(document).ready(function(){
	$(".hlmsg").show();
	$(".hlmsg:empty").fadeOut("slow");
	$(".hlmsg li").click(function() {
		$(this).fadeOut("slow");
	});
	if ($(".hlmsg:empty")) {
		setTimeout(function() {
			$(".hlmsg").fadeOut(3000);
		}, 20000);
	};
});