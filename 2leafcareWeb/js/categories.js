
(function ($) {

    //ALL VARIABLES

    var win = $(window),
        winHeight = window.innerHeight,
        content = $(".content-wrapper"),
        topSectionBottom = $('.bottom-half'),
        nav = $('nav.navigation'),
        contentHeight = content.innerHeight(),
        buttons = $('a.button'),
        clickedCategoryProducts = localStorage.getItem("clickedCategoryProducts"),
        products = $('ul.products');


    //---------------------------------------

    //CONTENT-WRAPPER A COLOR SWITCH SETTINGS

    menuColorSwith(true, "scroll");
    nav.addClass('scrollSwitch');



    function menuColorSwith(background, object) {
        if (background) {
            nav.css({ 'background-color': '#fff' });
        }
        nav.find('.container > *').addClass('switchAnimation');
        nav.find('.cart').css({ 'background-image': 'url(img/cart_black.png)' });
        nav.find('a.logo').css({ 'background-image': 'url(img/logo_black.png)' });
        nav.addClass('nav-shadow');
        if (object == "button") {
            nav.addClass("buttonSwitch");
        }
        if (object == "scroll") {
            nav.addClass("scrollSwitch");
        }
    }

    //------------------------------------


    // CHECK SITE WIDTH ON RESIZE5D

    window.onresize = function () {
        siteWidth = window.innerWidth;

        //desktop
        if (siteWidth >= 780) {
            // set content wrapper start point
            content.css({ 'top': 200 + "px" });
            topSectionBottom.css({ 'top': winHeight * 0.1 + "px" });
            // console.log(winHeight * 2);
            //mobile
        } else {
            // set content wrapper start point
            content.css({ 'top': 170 + "px" });
        }
    };

    //desktop
    if (siteWidth >= 780) {
        // set content wrapper start point
        content.css({ 'top': 200 + "px" });
        topSectionBottom.css({ 'top': winHeight * 0.1 + "px" });

        //mobile
    } else {
        // set content wrapper start point
        content.css({ 'top': 170 + "px" });

    }

    //------------------------------------

    // CATEGORIES SCRIPT

    buttons.on("click", function (event) {
        event.preventDefault();
        buttons.removeClass('selected');
        $(this).addClass('selected');
        if ($(this).hasClass('pure')) {
            choosePure();
        }
        if ($(this).hasClass('fun')) {
            chooseFun();
        }
        if ($(this).hasClass('calm')) {
            chooseCalm();
        }
        if ($(this).hasClass('all')) {
            products.find('li').show();
        }
    })

    function choosePure() {

        products.find('.pure').show();
        products.find('.fun').hide();
        products.find('.calm').hide();
    }

    function chooseFun() {
        products.find('.pure').hide();
        products.find('.fun').show();
        products.find('.calm').hide();
    }

    function chooseCalm() {
        products.find('.pure').hide();
        products.find('.fun').hide();
        products.find('.calm').show();
    }


    if (!clickedCategoryProducts == "") {
        buttons.removeClass('selected');
        buttons.parent().find('a.button.' + clickedCategoryProducts).addClass("selected");
        console.log(clickedCategoryProducts, "hh");
        if (clickedCategoryProducts == "calm") {
            chooseCalm();
        }
        if (clickedCategoryProducts == "pure") {
            choosePure();
        }
        if (clickedCategoryProducts == "fun") {

            chooseFun();
        }

    }

})(jQuery);

