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
            setTimeout(lang.speak.bind(lang.ru, dualPhrase.ru), 0);
            setTimeout(lang.speak.bind(lang.tr, dualPhrase.tr), 3000);
        },
        getDualPhrase: function() {
            return lang.dualPhrases[ Math.round( Math.random() * (lang.dualPhrases.length - 1) ) ];
        },
        sequence: function() {
            var dualPhrase = lang.getDualPhrase();
            console.log(dualPhrase);
            lang.speakDual(dualPhrase);
            setTimeout(lang.sequence, 7000);
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
