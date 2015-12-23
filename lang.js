(function() {
    var lang = {
        ru: window,
        tr: window,
        openWindow: function() {
            return window.open(document.location, '_blank');
        },
        openWindows: function() {
            lang.ru = lang.openWindow();
            lang.tr = lang.openWindow();
        },
        speak: function(phrase) {
            var $ = this.jQuery;
            $('#VoiceTesterForm_text').val(phrase);
            $('#voiceTesterLogicpbut').click();
        },
        speakDual: function(dualPhrase) {
            lang.speak.call(lang.ru, dualPhrase.ru);
            lang.speak.call(lang.tr, dualPhrase.tr);
        },
        dualPhrases: [
            {
                ru: 'Здравствуйте!',
                tr: 'Merhaba!'
            },
            {
                ru: 'Дела хорошо.',
                tr: 'iyiyim.'
            }
        ]
    };
    window.lang = lang;
})();
