(function($) {
    $.fn.extend({
    'barebox': function(options) {
        options = $.extend({
            centered: true,
            bodyClass: 'noscroll'
        }, options);

        var body = $('.bareboxed').last();
        if (body.length < 1)
            body = $('body');

        var target = $($(this).data('target'));
        var overlay = $('<div class="barebox_overlay">').appendTo(body);

        if (target.length < 1)
            target = $(this);

        var mother = target.parent();

        overlay.click(function(e) {
            if (e.target !== this && (options.centered && !$(e.target).hasClass('barebox_cell')))
                return;

            target.barebox_close();
            return false;
        });

        body.addClass(options.bodyClass);

        overlay.show();
        target.appendTo(overlay);
        target.show();
        target.addClass('bareboxed');
        target.data({
            barebox_options: options,
            barebox_mother: mother });

        if (options.centered === true) {
            overlay.css('display', 'table');
            target.wrap($('<div class="barebox_cell">').css({
                display: 'table-cell',
                'vertical-align': 'middle',
                'text-align': 'center' }));
            target.css('display', 'inline-block');
        }
        return target;
    },
    'barebox_close': function() {
        var target = $(this);
        if (target.length < 1)
            return;

        var overlay = target.parents('.barebox_overlay').first();
        var mother = target.data('barebox_mother');
        var options = target.data('barebox_options');

        if (overlay.length < 1)
            throw 'barebox_close() must only be called on an active barebox';

        target.trigger('barebox_close');
        target.prependTo(mother);
        target.hide();
        target.removeClass('bareboxed');
        $(target).find('.bareboxed').barebox_close();

        $('body').removeClass(options.bodyClass);
        overlay.remove();
    }});
})(jQuery);
