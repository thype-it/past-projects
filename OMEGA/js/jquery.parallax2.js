; (function ($, window, document, undefined) {

    $.fn.parallax = function (options) {

        // zakladne nastavenia
        var settings = $.extend({
            friction: 0.1
        }, options);

        // premenne

        var $win = $(window);

        // vratime object pre chaining
        return this.each(function () {

            var element = $(this),
                startingPosition = {
                    left: element.css('backgroundPosition').split(' ')[0],
                    top: parseInt(element.css('backgroundPosition').split(' ')[1], 10)
                }
            $win.on('scroll', function () {
                var bgTop = element.offset().top + startingPosition.top,
                    winTop = $win.scrollTop(),
                    // bgPositionLeft = element.css('backgroundPositionX'),
                    newPosition = Math.floor((bgTop - winTop) * settings.friction - (settings.friction * bgTop) + startingPosition.top ) + 'px';

                if (parallax === true) {
                    // element.css({ backgroundPosition: bgPositionLeft + ' ' + newPosition});
                    element.css({ backgroundPosition: startingPosition.left + ' ' + newPosition });
                };
            });
        });
    }

})(jQuery, window, document);