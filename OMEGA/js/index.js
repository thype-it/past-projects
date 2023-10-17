(function ($) {

    var loc = window.location.hash,
        mobileMenu = $('.nav-overlay'),
        mobileMenuItems = mobileMenu.find("ul"),
        arrows = $(".arrow"),
        clients = $(".clients"),
        content = clients.find(".content"),
        texts = content.find("p"),
        phones = clients.find(".box img"),
        names = content.find('.headingSmall'),
        loader = $(".loader"),
        imagesList = loader.find(".images"),
        textList = loader.find(".texts"),
        nameList = loader.find('.names'),
        arrow;

    $(window).on("load", function () {
        $('html,body').animate({ scrollTop: 0 }, 100, function () {
            if ($(loc).length) {
                $("html, body").animate({ scrollTop: $(loc).offset().top }, 1000);
            }
        });
    });

    if (window.innerHeight <= 600) {
        $(".top-section .candle_bg").css({"top": "-20px"});
    }

    $("li.project-link a").add("a.project-link").on("click", function (event) {
        event.preventDefault();
        $('.menu-button').removeClass("menuIn");

        var id = this.hash;

        hideMenu();
        $("html, body").animate({ scrollTop: $(id).offset().top}, 1000, function () {
            window.location.hash = id;
        });
    });

    function hideMenu() {
        mobileMenuItems.fadeOut('fast');
        mobileMenu.animate({ 'width': "0%" }, 300, function () {
            $(this).hide();
        });
    }

    $(".button.scroll").on("click", function(event){
        var id = this.hash;
        $("html,body").animate({ scrollTop: $(id).offset().top }, 1000, function(){
            window.location.hash = id;
        });
        event.preventDefault();
    });

    //REVIEWS

    arrows.on("click", function(){
        if (!content.is(":animated")){
            arrow = $(this);

            phones.css({opacity:0});
            content.fadeOut(500, function(){
                $(this).fadeIn("slow");
                phones.css({ opacity: "unset" })

            });
            setTimeout(function(){

                if (arrow.hasClass("next")){
                    imagesList.children().first().appendTo(imagesList);
                    textList.children().first().appendTo(textList);
                    nameList.children().first().appendTo(nameList);
                }

                if (arrow.hasClass("prev")){
                    imagesList.children().last().prependTo(imagesList);
                    textList.children().last().prependTo(textList);
                    nameList.children().last().prependTo(nameList);
                }

                imagesList.children().first().children().each(function(i, el){
                    phones.eq(i).attr("src", $(el).attr("src"));
                });

                textList.children().first().children().each(function(i, el){
                    texts.eq(i).text($(el).text());
                });

                nameList.children().first().children().each(function(i, el){
                    names.eq(i).text($(el).text());
                });


            }, 500);
        }
    });

})(jQuery);