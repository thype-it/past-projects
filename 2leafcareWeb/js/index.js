
(function ($) {


    var win = $(window),
        winHeight = window.innerHeight,
        // content = $(".content-wrapper"),
        content = $(".scroll-content"),
        portal = $('.portal'),
        portalWindow = $('.portal-window'),
        topSection = $('.top-half'),
        topSectionBottom = $('.bottom-half'),
        nav = $('nav.navigation'),
        contentHeight = content.innerHeight(),
        productList = $('.slider ul.products'),
        arrowNext = $('.arrow.next'),
        arrowPrev = $('.arrow.back'),
        addtocart = $('.addtocart'),
        userIcon = $('.user-icon'),
        catOverlay = $('.categories-overlay'),
        mobileScroll = false,
        contentChange = true,
        products = productList.find('li');

    window.slideSize = products.outerWidth(true);
    window.slideCount = 0;
    localStorage.setItem("clickedCategoryProducts", "");


    window.onload = function(){
        $('html,body').animate({ scrollTop: 0}, function(){
            customScroll();
        });
    };

    //SETTINGS

    var contentPositionMobile = winHeight + (winHeight * 1.2),
        contentPositionDesktop = winHeight * 1.85;

    // CHECK SITE WIDTH ON RESIZED

    window.onresize = function () {
        siteWidth = window.innerWidth;
        //desktop
        if (siteWidth >= 780) {
            // set content wrapper start point
            content.css({ 'top': contentPositionDesktop + "px" });
            topSectionBottom.css({ 'top': winHeight * 0.25 + "px" });
            //mobile
        } else {
            // set content wrapper start point
            // content.css({ 'top': contentPositionMobile + "px" });
        }
    };

    //desktop
    if (siteWidth >= 780) {
        // set content wrapper start point
        content.css({ 'top': contentPositionDesktop + "px" });
        topSectionBottom.css({ 'top': winHeight * 0.25 + "px" });

        //mobile
    } else {
        // set content wrapper start point
        // content.css({ 'top': contentPositionMobile + "px" });

    }



    //CONTENT SCROLL +  MENU COLOR SWAP ON SCROLL

    // basic variables

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



    //mobile --> DESKTOP media-query point
    if (siteWidth > 780) {

        win.on("scroll", function(){

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

    // $(".jebo").on("click", function(){
    //     portal.css({ 'pointer-events': "auto" });

    //     console.log("jeah");
    // });

    // $('.top-section').on("click mousedown", function(){
    //     console.log("caus");
    //     portal.css({ 'pointer-events': "auto" });
    // });

    // portal.on("mouseup change", function(){
    //     console.log("ahoj");
    //     portal.css({ 'pointer-events': "none" });
    // });

    // $('html').on("mousemove", function(){
    //     console.log("raz");
    // })
    // $('html').on("click", function(){
    //     console.log("dva");
    // });

    // $('.top-section').on('mousedown mouseup', function mouseState(e) {
    //     if (e.type == "mousedown") {
    //         //code triggers on hold
    //         console.log("hold");
    //     }
    // });

    // $('html').on('mousedown', function(){
    //     $(this).css({"height": "800vh"});
    // });


    //CUSTOM SCROLL

    function customScroll() {

        portal.on("scroll", function () {

            // portal.css({'pointer-events': "auto"});

            //variables for custom scroll speeds
            var contentTop = content.offset().top *-1 ,
                // scrollspeed for bottom section minus topped portion of content
                scrollSpeedBottom = (contentTop) *-0.1,
                // embed he setting into translate
                location2 = "translate3D(0px," + scrollSpeedBottom + "px ,0px)",
                switchPoint = -1*(portalWindow.offset().top);

            console.log(contentTop);

            console.log(switchPoint, "switch");

            console.log(portalWindow.innerHeight(), "heigt");


            //MOBILE version
            if (siteWidth <= 780){

                //zmena farieb menu na content scroll
                if (switchPoint + 60 >= portalWindow.innerHeight()) {
                    console.log("kot");
                    if (!(nav.hasClass("buttonSwitch"))) {
                        menuColorSwith(true, "scroll");
                    }
                } else {
                    if (!(nav.hasClass("buttonSwitch"))) {
                        menuColorSwithWhite();
                    }
                }


                //TOP SECTION ANIMATIONS ON SCROLL

                //(the number 7 represents 7px that user must scroll before animation occurs)
                //(when changing input number one must keep in mind to always search for mirror input numbers in diffrent parts of the script)
                // If the scrollTop is grater than 7 and lesser than 200 and has not been marked with scroll class:
                if (contentTop >  7 && contentTop < 200 && (!topSection.hasClass('scrollHeightSwitch'))) {

                    console.log('fungi');

                    //Restore overscrolled body to proper position
                    contentTop = contentPositionMobile;
                    //Disable the scroll to prevent more disruption
                    portal.css({ 'overflow-y': 'hidden' });

                    // Intro animation of categories after overlay fadeOut
                    topSectionBottom
                        .stop()
                        .css({ 'top': winHeight * 0.2 + "px" })
                        .animate({ 'top': winHeight * 0.05 + "px" }, 1200, function () {
                            //After animation enable categories scroll
                            mobileScroll = true;
                            // Re-enable body scroll
                            portal.css({ 'overflow-y': 'scroll' });
                        });

                    contentChange = false;

                    // HEIGHT CHANGE OF TOP HALF
                    topSection
                        .stop()
                        .addClass('scrollHeightSwitch') // mark element with scroll class
                        .animate({ height: '48%' }, 350, function () {

                            // overlay fadeOut functionality
                            catOverlay.find('.headingBig').removeClass('categories-animation-rev').addClass('categories-animation');
                            catOverlay.fadeOut('slow');


                        })
                        .find('.content-holder').fadeOut('normal');
                }

                // if scrollTop is lesser than 7

                if ( contentTop <= 0 ) {

                    //Disable the scroll to prevent more disruption
                    portal.css({ 'overflow-y': 'hidden' });

                    topSection
                        .stop()
                        .removeClass('scrollHeightSwitch')
                        .animate({ height: '63%' }, 400, function () {
                            // Re-enable body scroll
                            portal.css({ 'overflow-y': 'scroll' });

                            contentChange = true;

                        })
                        .find('.content-holder').fadeIn('normal');
                    catOverlay
                        .fadeIn('slow')
                        .find('.headingBig').removeClass('categories-animation').addClass('categories-animation-rev');

                    mobileScroll = false
                }

                //SCROLL SPODNEJ CASTI TOP SECTION
                if (contentTop > 0) {
                    topSectionBottom.css({ 'transform': location2 });
                } else {
                    topSectionBottom.css({ 'transform': "translate3D(0px, 0px, 0px)" });

                }
            }
        });
    }


    setTimeout(function () {
        setInterval(function () {
           if (contentChange){
               topNext();
           }
        }, 8000);
    }, 1000);

    // PRODUCT SLIDER

    win.resize(function () {
        slideSize = products.outerWidth(true);
    });

    productList.css({ left: -slideSize });

    function sliderNext(section) {
        if (!section.is(':animated')) {

            section.animate({ left: -slideSize * 2 }, 250, function () {
                $(this)
                    .css({ left: -slideSize })
                    .children(':first-child').appendTo(section);
            });
        }
    }

    function sliderPrev(section){
      if (!section.is(':animated')) {

          section.animate({ left: 0 }, 250, function () {
              $(this)
                  .css({ left: -slideSize })
                  .children(':last-child').prependTo(section);
          })
      }
    }

    arrowNext.on("click", function(){
        sliderNext(productList);
        slideCount += 1;
        dotsFunction(productList);
    });

    arrowPrev.on("click", function(){
        sliderPrev(productList);
        slideCount -= 1;
        dotsFunction(productList);
    });


    // var firstY = null;
    // var lastY = null;
    // var currentY = null;
    // var vertScroll = false;
    // var initAdjustment = 0;




    // // record the initial position of the cursor on start of the touch
    // productList.on("touchstart", function (event) {
    //     lastY = currentY = firstY = event.originalEvent.touches[0].pageY;
    // });

    // // fires whenever the cursor moves
    // productList.on("touchmove", function (event) {
    //     currentY = event.originalEvent.touches[0].pageY;
    //     var adjustment = lastY - currentY;

    //     // Mimic native vertical scrolling where scrolling only starts after the
    //     // cursor has moved up or down from its original position by ~30 pixels.
    //     if (vertScroll == false && Math.abs(currentY - firstY) > 30) {
    //         vertScroll = true;
    //         initAdjustment = currentY - firstY;
    //     }

    //     // only apply the adjustment if the user has met the threshold for vertical scrolling
    //     if (vertScroll == true) {
    //         window.scrollBy(0, adjustment + initAdjustment);
    //         lastY = currentY + adjustment;
    //     }

    // });

    // // when the user lifts their finger, they will again need to meet the
    // // threshold before vertical scrolling starts.
    // productList.on("touchend", function (event) {
    //     vertScroll = false;
    // });

    var x1 = 0,
        direction = "";

    productList.draggable({

        axis: "x",
        contaiment: "parent",
        drag: function (e, ui) {
            x1 = ui.position.left;
            if (x1 >= -slideSize){
                direction = "prev";
                if (x1 >= 0) {
                    ui.position.left = 0;
                }
            }
            if (x1 < -slideSize ){
                direction = "next";
                if (x1 <= -(slideSize * 2)) {
                    ui.position.left = -(slideSize * 2);
                }
            }
        },

        stop: function (e, ui) {
            if (direction == "next") {
                sliderNext(productList);
                slideCount += 1;
            }
            if (direction == "prev") {
                sliderPrev(productList);
                slideCount -=1
            }

            dotsFunction(productList);
        }
    });

    // DOTS FUNCTIONALITY

    function dotsFunction(list){
        var dots = list.parent().parent().find('.dots'),
            dot1 = dots.children(':first-child'),
            dot2 = dots.children(':nth-child(2)'),
            dot3 = dots.children(':last-child'),
            elementsCount = list.children().length,
            change = Math.floor(elementsCount / 3);

        if (slideCount >= elementsCount || slideCount <= -elementsCount){
            slideCount = 0;
        }

        //plus
        if (slideCount >= 0 && slideCount < change){
            dotChange(dot1, dots);
        }
        if (slideCount >= change * 2) {
            dotChange(dot3, dots);
        }

        //middle interval
        if (slideCount >= change && slideCount < change*2 || slideCount <= -change){
            dotChange(dot2, dots);
        }

        //minus
        if (slideCount < 0 && slideCount >= -change ){
            dotChange(dot3, dots);

        }
        if (slideCount < -change*2){
            dotChange(dot1, dots);
        }

    }

    function dotChange(dot, dots) {
        dots.children().removeClass('selected-dot');
        dot.addClass('selected-dot');
    }

    // OVERLAY ARTICLES INTRO ANIMATIONS

    var articlesPosition = $('.articles').offset().top;

    portal.on("scroll", function () {

        // ENABLE OVERLAY
        if ((content.offset().top - contentPositionMobile) * -1 + 2.2 * $('.articles').height() >= articlesPosition ){
            $('.articles .right-row .overlay').show();
        }

        //RESTORE OVERLAY TO DISABLED ON SCROLL BACK ON TOP
        if ((content.offset().top - contentPositionMobile) * -1 + 3.3 * $('.articles').height() < articlesPosition) {
            $('.articles .right-row .overlay').hide();
        }

    });

    win.on("scroll", function(){

        // ENABLE OVERLAY
        if (win.scrollTop() + $('.articles').height() * 1.6 >= $('.articles').offset().top) {
            $('.articles .right-row .overlay').show();
        }

        //RESTORE OVERLAY TO DISABLED ON SCROLL BACK ON TOP
        if (win.scrollTop() + $('.articles').height() * 2.3 < $('.articles').offset().top) {
            $('.articles .right-row .overlay').hide();
        }

    });


    // TOP SECTION CONTENT CHANGE SWIPE

    var contentFun = $('.content-fun'),
        contentCalm = $('.content-calm'),
        contentPure = $('.content-pure'),
        gradient = $('.gradient'),
        contents = $('.contents'),
        topSectionContent,
        currentContent,
        contentNext;

    // topSectionContent.each(function(i,el){

    // })

    // console.log(topSectionContent.first().next());

    function topNext () {

        topSectionContent = topSection.find('.content'),
        currentContent = topSectionContent.first(),
        contentNext = currentContent.next();
        currentCategory = getCategory(currentContent),
        categoryNext = getCategory(contentNext);

        gradient
            .removeClass("animationPrev")
            .addClass("animationNext");

        topSectionContent.animate({ left: "-50%", opacity: 0}, 400, function(){
            currentContent.appendTo(contents);



            topSection
                .add(addtocart)
                .add(userIcon)
                .removeClass(currentCategory).addClass(categoryNext);

            dotsFunction(contents);

            topSectionContent
                .css({ left: "100%"})
                .animate({ left: "0", opacity: 1}, 600, function(){
                    gradient.fadeOut(500, function(){
                        gradient.removeClass(currentCategory).addClass(categoryNext);
                    });
                });
        });
        gradient.show();
        slideCount += 1;

    }

    console.log(contents.children());

    function getCategory(content) {

        if (content.hasClass("calm")){
            return "calm";
        }
        if (content.hasClass("fun")){
            return "fun";
        }
        if (content.hasClass("pure")){
            return "pure";
        }

    }


})(jQuery);

