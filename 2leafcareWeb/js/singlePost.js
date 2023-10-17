
(function ($) {

    //ALL VARIABLES

    var win = $(window),
        winHeight = window.innerHeight,
        content = $(".content-wrapper"),
        topSectionBottom = $('.bottom-half'),
        nav = $('nav.navigation'),
        contentHeight = content.innerHeight(),
        buttons = $('a.button');


    //---------------------------------------

    //CONTENT-WRAPPER A COLOR SWITCH SETTINGS

    menuColorSwith(true, "scroll");
    nav.addClass('scrollSwitch');



    function menuColorSwith(background, object) {
        if (background) {
            nav.css({ 'background-color': '#fff' });
        }
        nav.find('.container > *').addClass('switchAnimation');
        nav.addClass('nav-shadow');
        if (object == "button") {
            nav.addClass("buttonSwitch");
        }
        if (object == "scroll") {
            nav.addClass("scrollSwitch");
        }
    }

    // CHECK SITE WIDTH ON RESIZE5D

    window.onresize = function () {
        siteWidth = window.innerWidth;

        //desktop
        if (siteWidth >= 780) {
            // set content wrapper start point
            content.css({ 'top': winHeight * 0.83 + "px" });
            topSectionBottom.css({ 'top': winHeight * 0.1 + "px" });
            // console.log(winHeight * 2);
            //mobile
        } else {
            // set content wrapper start point
            content.css({ 'top': winHeight * 0.51 + "px" });
        }
    };

    //desktop
    if (siteWidth >= 780) {
        // set content wrapper start point
        content.css({ 'top': winHeight * 0.83 + "px" });
        topSectionBottom.css({ 'top': winHeight * 0.1 + "px" });

        //mobile
    } else {
        // set content wrapper start point
        content.css({ 'top': winHeight * 0.51 + "px" });

    }

})(jQuery);

