(function($) {

	var win = $(window),
		winHeight = win.height(),
		pos1 = winHeight * .65 + "px",
		pos2 = winHeight * .77 + "px",
		pos3 = winHeight * 1.2 + "px",
		siteWidth = window.innerWidth;

	win.on("resize", function () {
		siteWidth = window.innerWidth;
		//desktop
		if (siteWidth >= 780) {
			pos1 = winHeight * .65 + "px";
			pos2 = winHeight * .77 + "px";
			pos3 = winHeight * 1.2 + "px";
			//mobile
		} else {
			pos1 = winHeight * .7 + "px";
			pos2 = winHeight * .82 + "px";
			pos3 = winHeight * 1.7 + "px";
		}
	});

	//desktop
	if (siteWidth >= 780) {
		pos1 = winHeight * .65 + "px";
		pos2 = winHeight * .77 + "px";
		pos3 = winHeight * 1.2 + "px";
		//mobile
	} else {
		pos1 = winHeight * .85 + "px";
		pos2 = winHeight * 1 + "px";
		pos3 = winHeight * 1.5 + "px";
	}

	window.parallax = true;

	win.on("scroll", function(){
		if (win.scrollTop()>= (winHeight * 0.49)){
			window.parallax = false;
		}else {
			window.parallax = true;
		}
	})

	$(".people.dark")
		.css({'backgroundPositionY': pos3})
		.parallax({friction: 1.6});
	$(".people.middle")
		.css({'backgroundPositionY': pos2})
		.parallax({friction: .6});
	$(".people.light")
		.css({'backgroundPositionY': pos1})
		.parallax({friction: .3});


})(jQuery);