
(function ($) {

    var win = $(window),
        winHeight = window.innerHeight,
        content = $(".content-wrapper"),
        topSectionBottom = $('.bottom-half'),
        nav = $('nav.navigation'),
        portal = $('.portal'),
        descriptionMobile =  $('.description-mobile'),
        arrowNext = $('.arrow.next'),
        arrowPrev = $('.arrow.back'),
        descriptionText = descriptionMobile.find('.text'),
        gallery = $('ul.gallery');




    //SETTINGS

    var contentPositionMobile = winHeight - (winHeight * 0.37),
        contentPositionDesktop = winHeight * 1.85;

    // CHECK SITE WIDTH ON RESIZE5D

    // CHECK SITE WIDTH ON RESIZE5D

    window.onresize = function () {
        siteWidth = window.innerWidth;

        //desktop
        if (siteWidth >= 780) {
            // set content wrapper start point
            content.css({ 'top': winHeight - (winHeight * 0.17) + "px" });
            //mobile
        } else {
            // set content wrapper start point
            content.css({ 'top':  contentPositionMobile + "px" });
        }
    };

    //desktop
    if (siteWidth >= 780) {
        // set content wrapper start point
        content.css({ 'top': winHeight - (winHeight * 0.17) + "px" });

        //mobile
    } else {
        // set content wrapper start point
        content.css({ 'top':  contentPositionMobile + "px" });

    }



    //mobile --> DESKTOP media-query point
    if (siteWidth > 780) {

        win.on("scroll", function () {

            var winTop = win.scrollTop(),
                location2 = "translate3D(0px," + -0.15 * winTop + "px ,0px)";

            //zmena farieb menu na content scroll
            if (winTop >= 80) {
                menuColorSwith(true, "scroll");
            } else {
                menuColorSwithWhite();
            }

            topSectionBottom.css({ 'transform': location2 });

        });
    }


    //CUSTOM SCROLL

    portal.on("scroll", function () {

        //variables for custom scroll speeds
        var contentTop = content.offset().top;

            //MOBILE version
            if (siteWidth <= 780){

                //zmena farieb menu na content scroll
                if (contentTop <= 60 ) {
                    if (!(nav.hasClass("buttonSwitch"))) {
                        menuColorSwith(true, "scroll");
                    }
                } else {
                    if (!(nav.hasClass("buttonSwitch"))) {
                        menuColorSwithWhite();
                    }
                }

                // DESCRIPTION SCRIPTS
                // For safe text vs site scrolling, turn on and of overflow scrolling

                if ((contentTop - contentPositionMobile) * -1 >= descriptionText.offset().top && (contentTop - contentPositionMobile) * -1 < descriptionText.offset().top * 3.6){
                    console.log("fungujem");
                    descriptionText.css({ 'overflow-y': 'scroll' });
                }else {
                    descriptionText.css({ overflow: 'hidden' });
                }
            }
    });

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
    function menuColorSwithWhite() {
        nav.css({ 'background-color': 'transparent' });
        nav.find('.container > *').removeClass('switchAnimation');
        nav.removeClass('nav-shadow');
        if (nav.hasClass("buttonSwitch")) {
            nav.removeClass("buttonSwitch");
        }
        if (nav.hasClass("scrollSwitch")) {
            nav.removeClass("scrollSwitch");
        }
    }



    //-------------------------
    // SINGLE PRODUCT SCRIPT

    window.slideSize = gallery.children().outerWidth(true);
    window.slideCount = 0;

    window.onresize = function () {
        slideSize = gallery.children().outerWidth(true);
    }

    var elementsCount = gallery.children().length;
    gallery.css({width: 100 * elementsCount + "%"});
    gallery.children().css({width: 100 / elementsCount + "%"});


    gallery.css({ left: -slideSize });

    function sliderNext(section) {
        if (!section.is(':animated')) {

            section.animate({ left: -slideSize * 2 }, 250, function () {
                $(this)
                    .css({ left: -slideSize })
                    .children(':first-child').appendTo(section);
            });
        }
    }

    function sliderPrev(section) {
        if (!section.is(':animated')) {

            section.animate({ left: 0 }, 250, function () {
                $(this)
                    .css({ left: -slideSize })
                    .children(':last-child').prependTo(section);
            })
        }
    }


    arrowNext.on("click", function () {
        sliderNext(gallery);
        slideCount += 1;
        dotsFunction(gallery);
    });

    arrowPrev.on("click", function () {
        sliderPrev(gallery);
        slideCount -= 1;
        dotsFunction(gallery);
    });


    var x1 = 0,
        direction = "";

    gallery.draggable({

        axis: "x",
        drag: function (e, ui) {
            x1 = ui.position.left;
            if (x1 >= -slideSize) {
                direction = "prev";
                if (x1 >= 0) {
                    ui.position.left = 0;
                }
            }
            if (x1 < -slideSize) {
                direction = "next";
                if (x1 <= -(slideSize * 2)) {
                    ui.position.left = -(slideSize * 2);
                }
            }
        },

        stop: function (e, ui) {
            if (direction == "next") {
                sliderNext(gallery);
                slideCount += 1;
            }
            if (direction == "prev") {
                sliderPrev(gallery);
                slideCount -= 1
            }

            dotsFunction(gallery);
            console.log(slideCount, "slide");
        }
    });



    // DOTS FUNCTIONALITY

    function dotsFunction(list) {
        var dots = list.parent().parent().find('.dots'),
            dot1 = dots.children(':first-child'),
            dot2 = dots.children(':nth-child(2)'),
            dot3 = dots.children(':last-child'),
            elementsCount = list.children().length,
            change = Math.floor(elementsCount / 3);

        console.log(slideCount, "slide", elementsCount, "ele");
        if (slideCount >= elementsCount || slideCount <= -elementsCount) {
            slideCount = 0;
        }

        //plus
        if (slideCount >= 0 && slideCount < change) {
            dotChange(dot1, dots);
        }
        if (slideCount >= change * 2) {
            dotChange(dot3, dots);
        }

        //middle interval
        if (slideCount >= change && slideCount < change * 2 || slideCount <= -change) {
            dotChange(dot2, dots);
        }

        //minus
        if (slideCount < 0 && slideCount >= -change) {
            dotChange(dot3, dots);

        }
        if (slideCount < -change * 2) {
            dotChange(dot1, dots);
        }

    }

    function dotChange(dot, dots) {
        console.log(dot, dots);
        dots.children().removeClass('selected-dot');
        dot.addClass('selected-dot');
    }


})(jQuery);
