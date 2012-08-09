(function($) {
    $.fn.barebox = function(options) {
        options = $.extend({
            target: $(this).data('target')
        }, options);

        var body = $('body');
        var target = $(options.target);
        var overlay = $('<div id="barebox_overlay">').appendTo(body);

        if (target.length < 1)
            target = $(this);

        overlay.click(function() {
            $('body, html').css({'overflow': 'auto'});
            $(target).hide();
            $(this).remove();
        });

        $('body, html').css({'overflow': 'hidden'});

        overlay.show();
        $(target).show();
        return target;
    };
})(jQuery);