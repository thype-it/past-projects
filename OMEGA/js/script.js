(function ($) {

    var tools = $(".tools ul li"),
        menuButton = $('.menu-button'),
        mobileMenu = $('.nav-overlay'),
        mobileMenuItems = mobileMenu.find("ul"),
        dd = $('.faq dd');

    tools.on("click", function () {
        tools.removeClass("selected");
        $(this).addClass("selected");
    })

    mobileMenu.add(mobileMenuItems).hide();

    menuButton.on("click", function () {

        if (!mobileMenu.is(':animated')) {

            $(this).toggleClass("menuIn");

            if (mobileMenu.is(":visible")) {
                hideMenu();
            } else {
                mobileMenu.css({ display: "flex" }).animate({ width: "100vw" }, 300);
                setTimeout(function () {
                    mobileMenuItems.fadeIn();
                }, 100);
            }
        }
    });

    dd.hide();

    $('.faq dt').on("click", function () {
        $(this).next().slideToggle();

        if ($(this).hasClass("open")) {
            $(this).removeClass("open");

        } else {
            $(this).addClass("open");
        }
    });

    function hideMenu() {
        mobileMenuItems.fadeOut('fast');
        mobileMenu.animate({ 'width': "0%" }, 300, function () {
            $(this).hide();
        });
    }

    function scrollto(el) {
        el.on("click,", function (event) {
            $("html,body").animate({ scrollTop: $(this.hash).offset().top }, 1000);
            event.preventDefault();
        });
    }


})(jQuery);