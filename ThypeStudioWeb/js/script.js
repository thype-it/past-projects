(function ($) {


    var win = $(window),
        winHeight = win.height();
        winTop = win.scrollTop(),
        shapeGamesL = $(".shape.projects:not('.right') img"),
        shape3 = $(".shape.footer img"),
        shapeGamesR = $(".shape.projects.right img")
        animationL = { "transform": "translate3d(-50%, 0,0)", opacity: 0 },
        animationR = { "transform": "translate3d(50%, 0,0)", opacity: 0 },
        smaller = 0.8,
        smallerMobile = 0.67,
        mobile = false;

    window.onresize = function () {
        siteWidth = window.innerWidth;
        if (siteWidth >= 780) {
        } else {
            smaller = smallerMobile;
        }
        if (siteWidth >= 990){
            mobile = true;
        }else {
            mobile = false;
        }
    };

    siteWidth = window.innerWidth;
    if (siteWidth >= 780) {
    } else {
        smaller = smallerMobile;
    }
    if (siteWidth <= 990) {
        mobile = true;
    }else {
        mobile = false;
    }



    // win.on("load", function () {



    //     shapeGamesL.css(animationR);
    //     shapeGamesR.css(animationL);
    //     shape3.css(animationL);

    //     win.on("scroll", function () {
    //         winTop = win.scrollTop();
    //         isInView(shapeGamesL);
    //         isInView(shape3);
    //         isInView(shapeGamesR);
    //     });

    //     function isInView(el) {
    //         let elTop = el.offset().top;
    //         if (winTop > elTop * smaller) {
    //             if (el.hasClass("shapeMove")) {
    //                 return;
    //             } else {
    //                 el.addClass("shapeMove");
    //             }
    //             return;
    //         }
    //     }

    // });

    // // Remove the transition class
    // const square = document.querySelector('.shape.footer img');
    // square.classList.remove('shapeMove');

    // // Create the observer, same as before:
    // const observer = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             square.classList.add('shapeMove');
    //             return;
    //         }

    //         square.classList.remove('shapeMove');
    //     });
    // });

    // observer.observe(document.querySelector('.shape.footer img'));



    var menuButton = $('.menu-button'),
        mobileMenu = $('.nav-overlay'),
        mobileMenuItems = mobileMenu.find("ul"),
        burger = $('.burger span'),
        burger1 = $('.burger span:first-child'),
        burger2 = burger1.next(),
        burger3 = burger2.next(),
        menuLinksD = $("ul.menu.desktop"),
        menuLinksM = $("ul.menu.mobile");

    // siteWidth = window.innerWidth;

    mobileMenu.add(mobileMenuItems).hide();

    menuButton.add($(".filter-thype")).on("click", function () {

        if (!mobileMenu.is(':animated')) {

            if (burger.hasClass("burgerXout")) {
                burger.removeClass('burgerXout');
                burger1.addClass('burgerXin1');
                burger2.css({ opacity: 0 });
                burger3.addClass('burgerXin2');
            } else {
                burger1.add(burger3).addClass('burgerXout');
                burger2.animate({ opacity: 1 }, 200);
                burger1.removeClass('burgerXin1');
                burger3.removeClass('burgerXin2');
            }

            if (mobileMenu.is(":visible")) {
                hideMenu();
            } else {
                scrollOff();
                mobileMenu.css({ display: "flex" }).animate({ width: "100vw" }, 300);
                setTimeout(function () {
                    mobileMenuItems.fadeIn();
                }, 100);
            }
        }
    });

    function hideMenu() {
        scrollOn();
        mobileMenuItems.fadeOut('fast');
        mobileMenu.animate({ 'width': "0%" }, 400, function () {
            $(this).hide();
        });
    }

    function scrollto(el) {
        el.on("click,", function (event) {
            $("html,body").animate({ scrollTop: $(this.hash).offset().top }, 1000);
            event.preventDefault();
        });
    }


    //DISABLE SCROLL

    function scrollOff() {
        setTimeout(function () {
            $('body').css({ 'height': '100%', 'overflow-y': 'hidden' });
        }, 200);
    }
    function scrollOn() {

        $('body').css({ 'height': 'auto', 'overflow-y': 'visible' });
    }

    //MENU SCROLL ANIMATION

    var winHalf = window.innerHeight * 0.2;

    $(".contact-link").on("click", function (event) {
        event.preventDefault();
        if ($(this).hasClass("mobile")) {
            hideMenu();
            burger1.add(burger3).addClass('burgerXout');
            burger2.animate({ opacity: 1 }, 200);
            burger1.removeClass('burgerXin1');
            burger3.removeClass('burgerXin2')
        }

        $("html, body").animate({ scrollTop: $("section.contact").offset().top - winHalf }, 1000);
    });

    $("li.project-link a").add("a.project-link").on("click", function (event) {
        event.preventDefault();
        if ($(this).hasClass("mobile")) {
            hideMenu();
            burger1.add(burger3).addClass('burgerXout');
            burger2.animate({ opacity: 1 }, 200);
            burger1.removeClass('burgerXin1');
            burger3.removeClass('burgerXin2')
        }

        var id = this.hash;

        $("html, body").animate({ scrollTop: $(id).offset().top - winHalf }, 1000, function () {
            window.location.hash = id;
        });
    });


    // LOADING ICON

    var loadingScreen = $(".loading");

    // win.load(function() {

    // });

    win.on("load", function () {
        loadingScreen.fadeOut('slow', function () {
            loadingScreen.removeClass('loading-screen');
        });
    })

    function loading(elementsList, loadedElements) {
        elementsList.on("click", function () {
            $(".loading").fadeIn('fast');
            loadedElements.load(function () {
                $(".loading").fadeOut('fast');
            });
        });
    }

    //ADD DOTS ANIMATION

    var dots = $(".dotsBG"),
        timeOut = dots.length;

    function dotsMove() {


        dots.removeClass("dotsBGMove")

        $.each($(".dotsBG"), function (i, el) {

            setTimeout(function () {

                $(el).addClass("dotsBGMove");
            }, 1500 + (i * 1750));
        });

        setTimeout(dotsMove, 3250 + (1750 * timeOut));
    }

    dotsMove();



    // function bonuses() {
    //     //desktop
    //     if (siteWidth >= 780) {
    //     } else {
    //         bonusList.animate({ left: "-50%" }, 900, 'easeInOutQuint', function () {
    //             $(this).css({ left: 0 }).children().first().appendTo($(this));
    //         });
    //     }
    //     bonuseses = setTimeout(bonuses, 3000);
    // }


    // GAME GALLERY

    var games = $("ul.games li"),
        gamesMain = games.find(".main-content"),
        current;

    function mobileSwitch(el, heightInfo) {
        var element = el.find(".main-content .images"),
            height = element.height();
            console.log(height);

        if (heightInfo){
            return height;
        }else {
            element
                .css({ "height": 0})
                .animate({height: height + "px"}, 1000);
        }

    }

    gamesMain.hide();

    games.on("click", function () {
        var el = $(this),
            preview = el.find(".preview"),
            current = preview.find("img"),
            main = el.find(".main-content");

        current
            .css({ opacity: 1, animation: "", transform: "" });
        $(this).addClass("preview-from");

        if (mobile) {
            var height = mobileSwitch(el, true);
            preview.animate({ height: height + "px" }, 600);
        }

        // el.find(".preview .content").fadeOut("fast");
        preview.find(".content").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function () {
            // $(this).removeClass('lightboxOut').hide();
            console.log("fungi");
            el.find(".preview").hide();
            main.show();
            main.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function (){
                    $(this).addClass("pseudoClear");
            });

            if (mobile){
                mobileSwitch(el, false);
                scrollto(el);
            }
        });

    });

    function scrollto(el) {
        $("html,body").animate({ scrollTop: el.offset().top - winHeight *.1 }, 1000);
    }


})(jQuery);