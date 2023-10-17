;(function($, window, document, undefined) {

	$.fn.parallax = function( options ) {

		// zakladne nastavenia
		var settings = $.extend({
			friction: 0.1
		}, options);

		// premenne

		var $win = $(window);

		// vratime object pre chaining
		return this.each(function(){

			var element = $(this);

			$win.on('scroll', function(){
				var bgTop = element.offset().top,
					bgCenter = element.height() *0.5 *-1,
					winTop = $win.scrollTop(),
					bgPositionLeft = element.css('backgroundPositionX'),
					newPosition = Math.floor( (bgTop - winTop) * settings.friction) + 'px';


				if (parallax === true){
					element.css({ backgroundPosition: bgPositionLeft + ' ' + newPosition});
				};

			});
		});

	}

})(jQuery, window, document);