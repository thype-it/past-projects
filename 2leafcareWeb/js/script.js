(function ($) {



    // ALL SCRIPT VARIABLES

    var menuButton = $('.menu-button'),
        mobileMenu = $('.nav-overlay-mobile'),
        mobileMenuItems = mobileMenu.find("ul"),
        blackOverlay = $('.black-overlay'),
        burger = $('.burger span'),
        burger1 = $('.burger span:first-child'),
        burger2 = burger1.next(),
        burger3 = burger2.next(),
        reviewList = $('.review-list'),
        reviews = reviewList.find('li'),
        cart = $('.cart-axo'),
        cartMenu = $('.cart-menu'),
        cartClose = cartMenu.find("i").add(blackOverlay),
        cartMenuItems = cartMenu.find('.container > *'),
        portal = $('.portal'),
        plus = $(".plus"),
        counter = $('.counter'),
        minus = $(".minus"),
        categoryProducts = $('.category'),
        currencies = ("$", "€"),
        currency = "€",
        cartSum = cartMenu.find('.sum-price'), // medzisucet v carte
        cartFees = cartMenu.find('.fee'), // doprava, dalsie poplatky
        cartTotal = cartMenu.find('.total-price'), //vysledna cena
        menuDesktop = $('.menu.desktop');

    var win = $(window),
        winHeight = window.innerHeight,
        content = $(".content-wrapper"),
        topSectionBottom = $('.bottom-half'),
        nav = $('nav.navigation'),
        contentHeight = content.innerHeight();


    window.siteWidth = win.width();
    window.clickedCategoryProducts = "";


    /// REVIEWS SCRIPTS

    reviews.hide();
    if (siteWidth < 1225) {
        reviewList.children(':first-child').show();
    }else {
        reviewList.children(':first-child').add(reviewList.children(':nth-child(2)')).add(reviewList.children(':nth-child(3)')).show();
    }

    function reviewSlide() {
        setInterval(function(){
            if (siteWidth < 1225){
                var firstReview = reviewList.children(':first-child');
                reviewList.animate({ left: "-100%" }, 550, function () {
                    firstReview.next().fadeIn('slow');
                    firstReview.hide().appendTo(reviewList);
                    reviewList
                        .css({ left: "100%" })
                        .animate({ left: "0%" }, 700);
                });
            }else {
                var firstReviews = reviewList.children(':first-child').add(reviewList.children(':nth-child(2)')).add(reviewList.children(':nth-child(3)'));
                reviewList.animate({ left: "-100%" }, 550, function () {
                    firstReviews.hide().appendTo(reviewList);
                    reviewList.children(':first-child').add(reviewList.children(':nth-child(2)')).add(reviewList.children(':nth-child(3)')).fadeIn('slow');

                    reviewList
                        .css({ left: "100%" })
                        .animate({ left: "0%" }, 700);
                });
            }
        }, 6500);
    };

    reviewSlide();

    //DISABLE SCROLL

    var pushWidth = +(menuDesktop.css('right').replace(/[^0-9.]/g, ''));

    function scrollOff(){
     setTimeout(function (){
         $('body').css({ 'height': '100%', 'overflow': 'hidden' });
         if (siteWidth >= 1000) {
             $('html').css({ 'margin-right': '16px' });
            menuDesktop.css({ 'right':  pushWidth + 16 + 'px' });
         } else {
             $('html').css({ 'margin-right': '10px' });
            menuDesktop.css({ 'right': pushWidth + 10 + 'px' });
         }
     }, 200);

    }
    function scrollOn(){

        $('body').css({'height':'auto','overflow':'visible'});
        $('html').css({ 'margin-right': '0' });
       menuDesktop.css({ 'right': pushWidth + 'px' });
    }

    // SEND CATEGORY MESSAGE

    categoryProducts.on("click", function (event) {

        if ($(this).hasClass('pure')) {
            localStorage.setItem("clickedCategoryProducts", "pure");
        }
        if ($(this).hasClass('calm')) {
            localStorage.setItem("clickedCategoryProducts", "calm");
        }
        if ($(this).hasClass('fun')) {
            localStorage.setItem("clickedCategoryProducts", "fun");
        }
    })

    // MOBILE MENU AND CART

    mobileMenu.add(mobileMenuItems).add(cartMenu).hide();

    menuButton.on("click", function () {

        if (!mobileMenu.is(':animated')) {

            //menu button
            if (burger.hasClass("burgerXout")) {

                if (!(nav.hasClass('scrollSwitch'))) {
                    menuColorSwith(false, "button");
                }
                burger.removeClass('burgerXout');
                burger1.addClass('burgerXin1');
                burger2.css({ opacity: 0 });
                burger3.addClass('burgerXin2');
                if (nav.hasClass('scrollSwitch')){
                    nav.removeClass('scrollSwitch');
                    nav.addClass('buttonSwitch switch');
                }

            } else {

                if (nav.hasClass('switch')) {
                    nav
                        .addClass('scrollSwitch')
                        .removeClass('buttonSwitch')
                        .removeClass('switch');
                }

                burger1.add(burger3).addClass('burgerXout');
                burger2.animate({ opacity: 1 }, 200, function(){
                    if (!(nav.hasClass('scrollSwitch'))){
                        menuColorSwithWhite();
                    }
                });
                burger1.removeClass('burgerXin1');
                burger3.removeClass('burgerXin2');

            }

            //menu content
            if (mobileMenu.is(":visible")) {
                scrollOn();
                mobileMenuItems.fadeOut('fast');
                mobileMenu.animate({ 'width': "0%" }, 400, function () {
                    $(this).hide();
                });
            } else {
                scrollOff();
                mobileMenu.show().animate({ width: "100vw" }, 300);
                setTimeout(function () {
                    mobileMenuItems.fadeIn();
                }, 100);
            }
        }
    });

    cart.on("click", function(){

        if(!cartMenu.is(':animated')){

            if(cartMenu.is(":visible")){
                cartMenu.animate({width: "0"}, 400, function(){
                    $(this).hide();
                })
            } else {
                cartMenu.show().animate({ right: "0"}, 300);
                scrollOff();
                if (siteWidth >= 780) {
                    setTimeout(function (){
                        blackOverlay.fadeIn(200);
                    }, 15);
                }
                setTimeout(function () {
                    cartMenuItems.fadeIn();
                }, 100);

            }

        }
    });


    cartClose.on("click", function(){
        scrollOn();
        cartMenuItems.fadeOut('fast');
        if (siteWidth >= 780) {
            blackOverlay.fadeOut('fast');
        }
        cartMenu.animate({ right: "-100%" }, 400, function () {
            $(this).hide();
        })
    });


    //CART FUNCTIONALITY

    // PLUS AND MINUS

    // function counterAdd(element){
    //     var count = +(element.prev().text());

    //     if (count < 99999) {
    //         element.prev().text(count + 1);
    //     }
    // }

    // function counterRemove(element){
    //     var count = +(element.next().text());

    //     if (count > 1) {
    //         element.next().text(count - 1);
    //     }
    // }

    // counter.find('.plus').on("click", function(){
    //     counterAdd($(this));
    // });

    // counter.find('.minus').on("click", function(){
    //     counterRemove($(this));
    // });

    // //  CART CHECKOUT IFNORMATION

    // function checkoutPrice(currency){

    //     var cartItems = cartMenu.find('li'),
    //         sum = 0,
    //         fees = 0;

    //     // vyberie vsetky elementy s clasom fee a spocita ich
    //     cartFees.each(function(e,el){
    //         var fee = +($(el).text().replace(currencies, '').replace(",", ".").replace(/\s/g, ''));
    //         fees = fees + fee;
    //     });


    //     cartItems.each(function(i,el){

    //         //vsetky li okrem helpera
    //         if (!($(el).hasClass('helper'))) {

    //             var totalPrice = +($(el).find('.price').text().replace(currencies, '').replace(/\s/g, '').replace(",",".")),
    //                 totalCount = +($(el).find('.amount .number').text());
    //             sum = sum + (totalPrice * totalCount);
    //         }
    //     });

    //     sum = Math.round(sum * 100) / 100;

    //     // nastavi vyslednu sumu zaokrehlenu na 2 desatinne miesta a prida currency si
    //     cartSum.text(sum + currency);
    //     // nastavi konecnu sumu po pripocitani vsetkych poplatkov
    //     cartTotal.text(sum + fees + currency);

    // }

    // //ADD TO CART

    // var addButtons = $('.addtocart'),
    //     cartList = $('.cart-menu .product-list'),
    //     cartListHelper = cartList.find('.helper');



    // addButtons.on("click", function () {


    //     //Zadefinovanie elementov na ktore sme klikli
    //     var newItem = cartListHelper.clone(), // naklonovanie helpere, vyvotvorenie noveho product listu
    //         clicked = $(this).parent().parent().parent(), // li element na kory sme klikli
    //         clickedImg = clicked.find(' > .img img').attr("src"),
    //         clickedText = clicked.find('.text'),
    //         clickedName = clickedText.find('.headingSmall').text(),
    //         itemName = clickedName.replace(/\s/g, ''), // vytvorenie classi z nazvu produktu
    //         clickedPrice = clickedText.find('.price').text(),
    //         clickedCategory = clicked.attr("class"),
    //         clickedCount = 1, // pomocna premmena cislo pri detailne produktu
    //         cartItems = cartMenu.find('li'); // li znoznamu v carte


    //     // zmena v definicii premennych pri kliku v detaile produktu
    //     if ($(this).hasClass('product-detail')){

    //         clickedCount = +($('.content .number').text());

    //         clickedImg = $('.gallery .img').css("background-image");
    //         clickedName = $('.content > .headingSmall:first-of-type').text();
    //         itemName = clickedName.replace(/\s/g, '');
    //         clickedPrice = $('.description .price').text();
    //         clickedCategory = $('.content > .headingBig:first-of-type').text();

    //     }

    //     // ked pridavame element ktory uz v karte je
    //     if (cartItems.hasClass(itemName)) {

    //         console.log("duplicate");
    //         var count = +(cartMenu.find("." + itemName + " .number").text());
    //         count = count + clickedCount - 1;
    //         cartMenu.find("." + itemName + " .number").text(count + 1);
    //         checkoutPrice(currency);




    //     // pridavanie noveho li do cart zoznamu
    //     } else {
    //         // vyvorenie noveho li v cart zozname
    //         newItem.removeClass('helper').addClass(itemName).prependTo(cartList);
    //         //pripisanie patricnych hodnot
    //         newItem.find('.img').css({ 'background-image': clickedImg });
    //         newItem.find('.price').text(clickedPrice);
    //         newItem.find('.row:first-child .headingSmall').text(clickedName).prepend(clickedCategory + "-");
    //         newItem.find('.number').text(clickedCount);
    //         checkoutPrice(currency);

    //         // reset listenerov na plus elementy v carte
    //         cartMenu.find('.plus').unbind().on("click", function () {
    //             counterAdd($(this));
    //             checkoutPrice(currency);

    //         });

    //         // reset listenerov na minus elementy v carte
    //         cartMenu.find('.minus').unbind().on("click", function () {
    //             counterRemove($(this));
    //             checkoutPrice(currency);

    //         });

    //         // reset listenerov a delete funkcionalita
    //         cartMenu.find('.delete').unbind().on("click", function(){
    //            $(this).parent().parent().parent().css({'position':'relative'}).animate({'left': "100%"}).fadeOut('fast', function(){
    //                $(this).remove();
    //                checkoutPrice(currency);
    //            });
    //         });
    //     }

    // });

    //CONTENT SCROLL +  MENU COLOR SWAP ON SCROLL

    // basic variables

    function menuColorSwith(background, object){
        if (background){
            nav.css({ 'background-color': '#fff' });
        }
        nav.find('.container > *').addClass('switchAnimation');
        nav.addClass('nav-shadow');
        if (object == "button"){
            nav.addClass("buttonSwitch");
        }
        if (object == "scroll") {
            nav.addClass("scrollSwitch");
        }
    }
    function menuColorSwithWhite(){
        nav.css({ 'background-color': 'transparent' });
        nav.find('.container > *').removeClass('switchAnimation');
        nav.removeClass('nav-shadow');
        if (nav.hasClass("buttonSwitch")){
            nav.removeClass("buttonSwitch");
        }
        if (nav.hasClass("buttonSwitch")){
            nav.removeClass("scrollSwitch");
        }
    }


    // CREMOVE PORTAL SETTINGS ON DESKTOP ON RESIZE
    win.on("resize", function () {
        siteWidth = window.innerWidth;
        //desktop
        if (siteWidth >= 780) {
            portal.removeClass('portal-settings');
            //mobile
        } else {
            portal.addClass('portal-settings');
        }
    });

    //desktop
    if (siteWidth >= 780) {
        portal.removeClass('portal-settings');
        //mobile
    } else {
        portal.addClass('portal-settings');
    }


    // INSTAGRAM IMAGES

    var posts = $(".instagram a"),
        image1 = 'url(img/sample3.jpg)',
        image2 = 'url(img/sample4.jpg)',
        image3 = 'url(img/sample5.jpg)',
        image4 = 'url(img/sample6.jpg)',
        postsOverlay = posts.find('.overlay');


    posts.eq(0).css({"background-image":image1 });
    posts.eq(1).css({"background-image":image2 });
    posts.eq(2).css({"background-image":image3 });
    posts.eq(3).css({"background-image":image4 });


    // OVERLAY PREEFOTER INTRO ANIMATIONS +  iPHONE OVERSCROLL BUG FIX

    win.on("scroll", function(){

        if (win.scrollTop() + $('section.instagram .wrapper').height() * 1.2 >= $('section.instagram .wrapper').offset().top){
            $('.instagram .row2 a:last-child() .overlay').show();


        }

        if (win.scrollTop() + $('section.instagram .wrapper').height() * 2 < $('section.instagram .wrapper').offset().top){
            $('.instagram .row2 a:last-child() .overlay').hide();
        }
    });

    var instagramPosition = 0,
        portal = $('.portal'),
        contentPositionMobile = "";


    $(document).ready( function(){
        instagramPosition = $('section.instagram .wrapper').offset().top;
        contentPositionMobile = content.offset().top;
    });

    portal.on("scroll", function () {

        // ENABLE OVERLAY
        if ((content.offset().top - contentPositionMobile) * -1 + 0.7 * $('section.instagram .wrapper').height() >= instagramPosition) {
            $('.instagram .row2 a:last-child() .overlay').show()

            // iPHONE OVERSCROLL BUG FIX
            $('.top-section').addClass('iphone-bottom');
        } else {
            $('.top-section').removeClass('iphone-bottom');

        }

        //RESTORE OVERLAY TO DISABLED ON SCROLL BACK ON TOP
        if ((content.offset().top - contentPositionMobile) * -1 + 1.3 * $('section.instagram .wrapper').height() < instagramPosition) {
            $('.instagram .row2 a:last-child() .overlay').hide()
        }

    });

    function prefooterHover (statical, dynamic, section){
       dynamic.on("mouseenter mouseover click", function () {

            statical.find('.overlay').addClass('overlayOut');
        });
       section.on("mouseleave", function () {
            statical.find('.overlay').removeClass('overlayOut');
        });
        statical.on("mouseenter mouseover click", function () {
            statical.find('.overlay').removeClass('overlayOut');
        });
    }

    prefooterHover($('.articles .right-row'), $('.articles .left-row'), $('.articles'));
    prefooterHover($('.instagram .row2 a:last-child()'), posts.not($('.instagram .row2 a:last-child()')), $('section.instagram'));


    // OVERFLOW ARROW SIGN


    function addArrow(element){

        var height = element.height(),
            heightParrent = element.parent().height();

        // console.log(height, "height");
        // console.log(heightParrent, "heightParrent");
    };


    addArrow($('.top-half .row3 p'));

    // console.log($('.top-half .row3 p'));

    //zistime offset overflow element a containeru pokial spodok kontaijnera je vyssie ako spodok overflow elementu, tak zo zobrazi arrow, funkcia na scroll overflow elementu

    //opravit koniec scroluu, pri prechode ofset btoom fotru noekde pred nim sa doanimuje scroll na koniec, rychlo. opodmienkovat  aby sa dinamicky vipol trenslate.

    //spravit fuknciu kotra bude spomalovat pohyb tihi trnaslatu na sekcie ked prejdu onojsmerne, plus potom skonbinovat s paralaxom



    // console.log($(window).height(), "browser viewport");

    // // returns height of browser viewport

    // console.log($(document).height(), "html odcument height");

    // console.log($('.content-wrapper').height(), "conenttwrapper height");


    // LANGUAGES ANIMATION

    var languages = $('.languages'),
    languagesList = languages.find('ul'),
    languagesListEl = languagesList.find('li');

    languagesListEl.fadeOut(100);

    languages.on('click', function(){

        if (!languagesList.is(':animated')){

            if (languages.hasClass('languagesAnimation')){
                languagesListEl.fadeOut(100);
                languagesList.animate({ height: 0 }, 150);
                languages.removeClass('languagesAnimation');

            }else {
                languagesList.animate({ height: "87px" }, 200);
                languages.addClass('languagesAnimation');
                languagesListEl.fadeIn('slow');
            }
        }
    });


    // LOADING ICON

    var loadingScreen = $(".loading");

    // win.load(function() {

    // });

    win.on("load", function(){
        loadingScreen.fadeOut('slow', function () {
            loadingScreen.removeClass('loading-screen');
        });
    })

    function loading (elementsList, loadedElements) {
        elementsList.on("click", function(){
            $(".loading").fadeIn('fast');
            loadedElements.load(function(){
                $(".loading").fadeOut('fast');
            });
        });
    }

    // loading($('.tocospustaloadingikonkunaklik'), $('.tocosaloaduje'));


})(jQuery);