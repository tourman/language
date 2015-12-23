(function() {
    var lang = {
        ru: window,
        tr: window,
        delay: 200,
        k: 85,
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
            setTimeout(lang.speak.bind(lang.tr, dualPhrase.tr), lang.delay + lang.k * dualPhrase.ru.length);
        },
        getDualPhrase: function() {
            return lang.dualPhrases[ Math.floor( Math.random() * (lang.dualPhrases.length - 1) ) ];
        },
        sequence: function() {
            var dualPhrase = lang.getDualPhrase();
            console.log(dualPhrase);
            lang.speakDual(dualPhrase);
            setTimeout(lang.sequence, 7000);
        },
        dualPhrases: [
            {
                tr: 'Affedersiniz.',
                ru: 'Простите.'
            },
            {
                tr: 'Affedersin.',
                ru: 'Извини.'
            },
            {
                tr: 'Bakar mısınız?',
                ru: 'Извините, не могли бы вы посмотреть?'
            },
            {
                tr: 'Özür dilerim.',
                ru: 'Прошу прощения, когда провинились.'
            },
            {
                tr: 'Ellerinize sağlık!',
                ru: 'Здоровья вашим ручкам, когда вкусно.'
            }
        ]
    };
    window.lang = lang;
})();
