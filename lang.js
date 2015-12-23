(function($) {
    var lang = {
        iframes: function() {
            var $div = $('div')
                .attr({
                    id: 'iframes'
                })
                .css({
                    position: 'absolute',
                    zIndex: 1000,
                    width: '100%',
                    height: '100%'
                });
            $('body').prepend($div);
            $div.append(lang.$getIframe()).append(lang.$getIframe());
        },
        $getIframe: function() {
            var $iframe = $('iframe')
                .attr({
                    src: 'https://www.ivona.com/us/'
                })
                .css({
                    display: 'block',
                    width: '100%',
                    height: '50%'
                });
            return $iframe;
        }
    };
    lang.iframes();
})(jQuery);
