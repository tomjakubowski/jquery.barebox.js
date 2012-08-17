(function($) {
    $.fn.extend({
    'barebox': function(options) {
        options = $.extend({
            centered: true,
            bodyClass: 'noscroll'
        }, options);

        var body = $('body');
        var target = $($(this).data('target'));
        var overlay = $('<div id="barebox_overlay">').appendTo(body);

        if (target.length < 1)
            target = $(this);

        var mother = target.parent();

        overlay.click(function(e) {
            if (e.target !== this && (options.centered && e.target.id !== "barebox_cell"))
                return;

            $(target).trigger('barebox_close');

            $(target).prependTo(mother);
            $(target).hide();
            body.removeClass(options.bodyClass);
            $(this).remove();
        });

        body.addClass(options.bodyClass);

        overlay.show();
        target.appendTo(overlay);
        target.show();
        target.data('barebox_modal', true);

        if (options.centered === true) {
            overlay.css('display', 'table');
            target.wrap($('<div id="barebox_cell">').css({ display: 'table-cell', 'vertical-align': 'middle', 'text-align': 'center' }));
            target.css('display', 'inline-block');
        }
        return target;
    }});
})(jQuery);
