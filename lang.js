/*
//To paste onto ivona.com
var script = document.createElement('script');
script.setAttribute('src', 'https://rawgit.com/tourman/language/master/lang.js');
document.getElementsByTagName('head')[0].appendChild(script);
//Or compressed
var s=document.createElement("script");s.setAttribute("src","https://rawgit.com/tourman/language/master/lang.js"),document.getElementsByTagName("head")[0].appendChild(s);
*/
(function() {
    var lang = {
        ru: window,
        tr: window,
        delay: 200,
        k: 85,
        openWindow: function(name) {
            var iframe = window.document.createElement('iframe');
            iframe.src = window.document.location;
            iframe.name = name;
            window.document.getElementsByTagName('body')[0].appendChild(iframe);
            return window[name];
        },
        openWindows: function() {
            lang.ru = lang.openWindow('ru');
            lang.tr = lang.openWindow('tr');
        },
        setLanguage: function(language) {
            var $ = this.jQuery;
            $('a.item:contains(' + language + ')').click();
        },
        setLanguages: function() {
            lang.setLanguage.call(lang.ru, 'Russian');
            lang.setLanguage.call(lang.tr, 'Turkish');
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
        verb: function() {
            lang.speakVerb();
            setTimeout(lang.verb, 5000);
        },
        speakVerb: function() {
            var form =      lang.getVerbForm(),
                person =    lang.getVerbPerson(),
                number =    lang.getVerbNumber(),
                sentence =  lang.getVerbSentence();
            var plural,
                particle,
                y,
                possessive;
            /*
                        plr   prt   y   poss
            ---------------------------------
            ben   | . |  -  |  -  | - | um
            biz   | . |  -  |  -  | - | uz
            sen   | . |  -  |  -  | - | sun
            siz   | . |  -  |  -  | - | sunuz
            o     | . |  -  |  -  | - | -
            onlar | . | lar |  -  | - | -
            ben   | ? |  -  |  mu | y | um
            biz   | ? |  -  |  mu | y | uz
            sen   | ? |  -  |  mu | - | sun
            siz   | ? |  -  |  mu | - | sunuz
            o     | ? |  -  |  mu | - | -
            onlar | ? | lar |  mı | - | -
            */
            plural =        lang.getPlural      (person, number, sentence);
            particle =      lang.getParticle    (person, number, sentence);
            y =             lang.getY           (person, number, sentence);
            possessive =    lang.getPossessive  (person, number, sentence);

            phrase = form + plural + particle + y + possessive + sentence;
            phrase = phrase.charAt(0).toUpperCase() + phrase.slice(1);

            lang.speak.call(window, phrase);
            console.log(phrase);
        },
        getVerbForm: function() {
            var index = Math.floor( Math.random() * lang.verbs.forms.length );
            return lang.verbs.forms[ index ];
        },
        getVerbPerson: function() {
            var index = Math.floor( Math.random() * 3 );
            return '' + (index + 1);
        },
        getVerbNumber: function() {
            var index = Math.floor( Math.random() * 2 );
            return index ? 'singular' : 'plural';
        },
        getVerbSentence: function() {
            var index = Math.floor( Math.random() * 2 );
            return index ? '.' : '?';
        },
        getPlural: function(person, number, sentence) {
            var plural;
            if (person == '3' && number == 'plural') {
                plural = lang.verbs.possessive['3'].plural;
            } else {
                plural = '';
            }
            return plural;
        },
        getParticle: function(person, number, sentence) {
            var particle;
            if (sentence == '.') {
                particle = '';
            } else if (person == '3' && number == 'plural') {
                particle = ' ' + lang.verbs.particles[1];
            } else {
                particle = ' ' + lang.verbs.particles[0];
            }
            return particle;
        },
        getY: function(person, number, sentence) {
            var y;
            if (sentence == '?' && person == '1') {
                y = 'y';
            } else {
                y = '';
            }
            return y;
        },
        getPossessive: function(person, number, sentence) {
            var possessive;
            if (person == '3') {
                possessive = '';
            } else {
                possessive = lang.verbs.possessive[person][number];
            }
            return possessive;
        },
        verbs: {
            forms: [
                'alıyor',
                'almıyor',
                'alamıyor',
                'alabiliyor',
                'almayabiliyor'
            ],
            possessive: {
                '1': {
                    singular: 'um',
                    plural: 'uz'
                },
                '2': {
                    singular: 'sun',
                    plural: 'sunuz'
                },
                '3': {
                    plural: 'lar'
                }
            },
            particles: ['mu', 'mı'],
            sentences: [
                '.',
                '?'
            ]
        },
        dualPhrases: [
            {ru:"Здравствуйте!", tr:"Merhaba!"},
            {ru:"Привет!", tr:"Selam!"},
            {ru:"Доброе утро.", tr:"Günaydın."},
            {ru:"Добрый день.", tr:"Iyi günler."},
            {ru:"Добрый вечер.", tr:"Iyi akşamlar."},
            {ru:"Доброй ночи", tr:"Iyi geceler."},
            {ru:"Как у тебя дела?", tr:"Nasılsın?"},
            {ru:"Как у вас дела?", tr:"Nasılsınız?"},
            {ru:"Как дела?", tr:"Ne var ne yok?"},
            {ru:"Что нового?", tr:"Ne haber?"},
            {ru:"Что делаешь?", tr:"Ne yapıyorsun?"},
            {ru:"Хорошо.", tr:"Iyiyim."},
            {ru:"Очень хорошо", tr:"Çok iyiyim."},
            {ru:"Супер.", tr:"Süper."},
            {ru:"Так себе.", tr:"Şöyle böyle."},
            {ru:"Нормально.", tr:"Normal."},
            {ru:"Всё путем.", tr:"Her şey yolunda."},
            {ru:"Неплохо.", tr:"Fena değilim."},
            {ru:"Хорошо.", tr:"Güzel."},
            {ru:"Очень плохо", tr:"Çok kötüyüm."},
            {ru:"Увидимся!", tr:"Görüşürüz."},
            {ru:"До свидания.", tr:"Görüşmek üzüre."},
            {ru:"До свидания.", tr:"Hoşçakal."},
            {ru:"До свидания.", tr:"Hoşçakalın."},
            {ru:"Пока.", tr:"Güle güle."},
            {ru:"Пусть у вас всё будет хорошо.", tr:"Kolay gelsin."},
            {ru:"Извините.", tr:"Affedersiniz."},
            {ru:"Извини.", tr:"Affedersin."},
            {ru:"Извините, не могли бы вы посмотреть.", tr:"Bakar mısınız."},
            {ru:"Прошу прощения, когда провинились.", tr:"Özür dilerim."},
            {ru:"Пожалуйста, когда приглашают войти, посмотреть, что-то дают.", tr:"Buyrun."},
            {ru:"Будьте здоровы, спасибо.", tr:"Çok yaşa! Siz de görün."},
            {ru:"Будьте здоровы, спасибо.", tr:"Çok yaşa! Siz de görün."},
            {ru:"Будьте здоровы, спасибо.", tr:"Çok yaşa! Hep beraber."},
            {ru:"Приятного аппетита.", tr:"Afiyet olsun."},
            {ru:"Здоровья вашим ручкам.", tr:"Ellerinize sağlık."},
            {ru:"Я хочу пить.", tr:"Ben içmek istiyorum."},
            {ru:"Я хочу спать.", tr:"Ben uyumak istiyorum."},
            {ru:"Я хочу поплавать.", tr:"Ben üzmek istiyorum."},
            {ru:"Я хочу что-нибудь сладкое.", tr:"Ben birşey tatlı istiyorum."},
            {ru:"Я хочу мясо.", tr:"Ben et istiyorum."},
            {ru:"Я хочу пиво.", tr:"Ben bira istiyorum."},
            {ru:"Я хочу есть.", tr:"Ben yemek yemek istiyorum."},
            {ru:"Мне нужен душ.", tr:"Bana duş lazım."},
            {ru:"Мне нужен гастроном.", tr:"Bana market lazım."},
            {ru:"Мне нужен магазин.", tr:"Bana mağaza lazım."},
            {ru:"Мне нужно отдохнуть.", tr:"Bana dinlenmek lazım."},
            {ru:"Мне нужен доктор.", tr:"Bana doktor lazım."},
            {ru:"Мне нужен старший менеджер.", tr:"Bana müdür lazım."},
            {ru:"Мне нужна вода.", tr:"Bana su lazım."},
            {ru:"Помогите.", tr:"Yardım edin."},
            {ru:"Который час?", tr:"Saat kaç?"},
            {ru:"Я не курю.", tr:"Sigara içmiyorum."},
            {ru:"Сколько это стоит?", tr:"Bu ne kadar? Bu kaç para?"},
            {ru:"Вы сошли с ума?", tr:"Siz deli misiniz?"},
            {ru:"Это слишком дорого! Я хочу скидку!", tr:"Bu fazla pahalı! Ben indirim istiyorum!"},
            {ru:"Я возьму это.", tr:"Bunu alacam."},
            {ru:"Я не понял.", tr:"Anlamadım."},
            {ru:"Я ничего не понимаю.", tr:"Hiç bir şey anlamıyorum."},
            {ru:"У меня нет денег.", tr:"Bende para yok."},
            {ru:"Я ничего не хочу покупать.", tr:"Ben hiç bir şey almak istemiyorum."},
            {ru:"Держись от меня подальше.", tr:"Benden uzak dur."},
            {ru:"Держитесь от меня подальше.", tr:"Benden uzak durun."},
            {ru:"Что вы хотите?", tr:"Ne istiyorsunuz?"},
            {ru:"Не говори ерунды.", tr:"Saçmalama."},
            {ru:"Может быть.", tr:"Olabilir."},
            {ru:"Дай-то Бог.", tr:"Inşallah."},
            {ru:"Что случилось?", tr:"Neyin var?"},
            {ru:"Ты очень уставший, отдохни немного.", tr:"Sen çok yorgunsun, biraz dinlen."},
            {ru:"Во сколько будет завтрак?", tr:"Kaçta kahvaltı olacak?"},
            {ru:"Это очень рано.", tr:"Bu çok erken!"},
            {ru:"Это очень поздно.", tr:"Bu çok geç!"},
            {ru:"Молодец, хвалю!", tr:"Аferin!"},
            {ru:"Ура!", tr:"Oh be!"},
            {ru:"Пожелание процветания.", tr:"Hayırlı olsun."},
            {ru:"Всё будет хорошо, как соболезнование.", tr:"Geçmiş olsun."},
            {ru:"Я люблю бананы.", tr:"Muza bayılırım."},
            {ru:"Тебе нравится вкус лимона?", tr:"Limon tadını sever misin?"},
            {ru:"Марии нравится по утрам есть ананас.", tr:"Maria sabahları ananas yemeyi sever."},
            {ru:"Моя сестра и я терпеть не можем вкуса персикa.", tr:"Kız kardeşim ve ben şeftali tadından nefret ederiz."},
            {ru:"Вам нравятся спелые абрикосы?", tr:"Olgun kayısı sever misin?"},
            {ru:"Они предпочитают зелёные яблоки.", tr:"Onlar yeşil elmayı tercih ederler."},
            {ru:"Марии арбузы нравятся больше, чем дыня", tr:"Maria karpuzu kavundan daha çok sever. "},
            {ru:"Я люблю есть дыни", tr:"Kavun yemeye bayılırım. "},
            {ru:"Сколько стоят груши?", tr:"Armut ne kadar? "},
            {ru:"Один килограмм киви стоит 3€.", tr:"Kivinin kilosu 3 avro. "},
            {ru:"Сколько стоит килограмм винограда?", tr:"Bir kilo üzüm ne kadar? "},
            {ru:"Один килограмм инжира стоит 2,50 €.", tr:"Bir kilo incir 2.50 avro. "},
            {ru:"Вы можете дать мне килограмм слив?", tr:"Bana bir kilo erik verebilir misiniz? "},
            {ru:"Апельсины больше мандаринов", tr:"Portakallar mandalinalardan daha büyüktür. "},
            {ru:"Мандарины меньше апельсинов.", tr:"Mandalinalar portakallardan daha küçüktür. "},
            {ru:"Клубника со сливками очень вкусная.", tr:"Çilek ve krema lezzetlidir. "},
            {ru:"Вишня стоит дешевле красной смородины.", tr:"Kiraz frenküzümünden daha ucuzdur. "},
            {ru:"Малина стоит очень дорого", tr:"Ahududu çok pahalıdır. "},
            {ru:"Ягоды красной смородины меньше, чем клубника.", tr:"Frenk üzümü çilekten daha küçüktür. "},
            {ru:"Почему бы нам не испечь торт с ежевикой?", tr:"Neden böğürtlenli pasta yapmıyoruz? "},
            {ru:"Почему бы тебе не расколоть кокос?", tr:"Neden hindistan cevizini açmıyorsun? "},
            {ru:"Хочешь добавить авокадо в салат?", tr:"Salataya avakado eklemek ister misin? "},
            {ru:"А что если нам купить манго на обед?", tr:"Öğle yemeği için mango almaya ne dersin? "},
            {ru:"Ты предпочитаешь зелёные или спелые бананы?", tr:"Yeşil mi yoksa olgun muz mu tercih edersin?"},
            {ru:"Эти яблоки гнилые.", tr:"Bu elmalar çürümüş."},
            {ru:"Мне очень нравится город Барселона", tr:"Ben Barselona şehrini çok severim."},
            {ru:"Я живу в центре города.", tr:"Ben şehir merkezinde yaşıyorum."},
            {ru:"Павел живёт в окрестности города.", tr:"Paul şehrin kenar mahallelerinde yaşıyor."},
            {ru:"Деревня меньше, чем город.", tr:"Köy şehirden daha küçüktür."},
            {ru:"Мне нравится район, в котором я живу.", tr:"Ben yaşadığım mahalleyi seviyorum."},
            {ru:"Я живу в Вене", tr:"Ben Viena'da yaşıyorum."},
            {ru:"Дети не любят ходить в школу.", tr:"Çocuklar okula gitmeyi sevmez."},
            {ru:"Я учусь в мадридском университете Комплутенсе.", tr:"Ben Madrid'in Complutense Üniversitesi'nde okuyorum."},
            {ru:"Моей маме нравится покупать фрукты на рынке.", tr:"Annem marketten meyve almayı sever."},
            {ru:"Супермаркет открыт до 23.00.", tr:"Süpermarket 11'e kadar açık."},
            {ru:"В моей деревне много магазинов.", tr:"Köyümde bir sürü mağaza var."},
            {ru:"Ты можешь взять деньги в банке.", tr:"Bankadan para çekebilirsin."},
            {ru:"Ты можешь купить марки на почте.", tr:"Postanede pul satın alabilirsin."},
            {ru:"Я всегда сажусь в автобус на этой автобусной остановке.", tr:"Otobüse her zaman şu otobüs durağından binerim."},
            {ru:"Железнодорожная станция Аточа очень большая.", tr:"Atocha tren istasyonu çok büyük."},
            {ru:"Рядом с моим домом есть станция метро.", tr:"Evimin yakınında bir metro istasyonu var."},
            {ru:"Мне нравится ходить в кино с моими друзьями.", tr:"Arkadaşlarımla sinemaya gitmeyi severim."},
            {ru:"В моeй деревне нет театра", tr:"Köyümde hiç tiyatro yok."},
            {ru:"В музее Прадо много картин.", tr:"Prado müzesinde bir sürü resim var."},
            {ru:"В Испании много баров.", tr:"İspanya'da bir sürü bar var."},
            {ru:"Мне нравится обедать в этом китайском ресторане.", tr:"Ben şu Çin restoranında yemek yemeye bayılırım."},
            {ru:"Мне нравится ходить танцевать на дискотеку.", tr:"Diskoya dansa gitmeyi severim."},
            {ru:"Я не хочу идти в больницу.", tr:"Hastaneye gitmek istemiyorum."},
            {ru:"Ты можешь купить лекарства в аптеке.", tr:"Eczaneden ilaç satın alabilirsin."},
            {ru:"Бутылка воды", tr:"Bir şişe su"},
            {ru:"Упаковка сока", tr:"Bir kutu meyve suyu"},
            {ru:"буханка хлеба", tr:"Bir somun ekmek"},
            {ru:"Упаковка печенья", tr:"Bir paket bisküvi"},
            {ru:"mısır gevreği – зерновые хлопья ", tr:"Литр молока"},
            {ru:"Коробка зерновых хлопьев", tr:"Bir kutu mısır gevreği"},
            {ru:"Четыре йогурта.", tr:"Dört yoğurt"},
            {ru:"Пачка соли.", tr:"Bir paket tuz"},
            {ru:"Один килограмм сахара.", tr:"Bir kilo şeker"},
            {ru:"Пол-литра уксуса.", tr:"Yarım litre sirke"},
            {ru:"Бутылка оливкового масла", tr:"Bir șișe zeytin yağı"},
            {ru:"200 грамм ветчины", tr:"200 gram jambon"},
            {ru:"Одна дюжина яиц", tr:"Bir düzine yumurta"},
            {ru:"Один килограмм риса.", tr:"Bir kilo pirinç"},
            {ru:"Упаковка макарон", tr:"Bir paket makarna"},
            {ru:"Полкило куриного филе.", tr:"Yarım kilo tavuk fileto"},
            {ru:"Полкило свиной отбивной", tr:"Yarım kilo domuz pirzola"},
            {ru:"Один килограмм говядины.", tr:"Bir kilo sığır eti"},
            {ru:"Банка тунца.", tr:"Bir kutu tonbalığı"},
            {ru:"Плитка шоколада.", tr:"Bir kalıp çikolata"},
            {ru:"Коробка мороженого.", tr:"Bir kutu dondurma"},
            {ru:"2-х рулонная упаковка туалетной бумаги.", tr:"2 rulolu bir paket tuvalet kağıdı"},
            {ru:"Бутылка моющего средства.", tr:"Bir şişe deterjan"},
            {ru:"Кусок мыла.", tr:"Bir kalıp sabun"},
            {ru:"Бутылка шампуня.", tr:"Bir şişe şampuan"},
            {ru:"Да ладно, не может быть!", tr:"Yok ya!"},
            {ru:"Ты гонишь, обманываешь!", tr:"Atıyorsun!"},
            {ru:"Да разве такое возможно?", tr:"Olur mu öyle şey?"},
            {ru:"Серьёзно? правда?", tr:"Sahi mi?"},
            {ru:"Ты серьезно?", tr:"Ciddi misin?"},
            {ru:"Да неужели!", tr:"Yok, canım!"},
            {ru:"Удивительно!", tr:"Hayret!"},
            {ru:"Ты обратился не по адресу.", tr:"Yanlış adrese geldin."},
            {ru:"Короче говоря.", tr:"Sözün kısası."},
            {ru:"Брось эту ерунду и займись делом!", tr:"Bırak şu boku da işine bak!"},
            {ru:"Ты переходишь всякие границы", tr:"Çok oluyorsun!"},
            {ru:"Легко сказать.", tr:"Dile kolay."},
            {ru:"У меня отнялся язык.", tr:"Dilim tutuldu."},
            {ru:"Наконец-то до тебя дошло.", tr:"Jeton geç düştü."},
            {ru:"Мне очень нравятся твои брюки", tr:"Pantolonunu gerçekten sevdim. "},
            {ru:"Джинсы очень удобные", tr:"Kot pantolonlar çok rahat. "},
            {ru:"Эта юбка очень короткая", tr:"Şu etek çok kısa. "},
            {ru:"Мне нравится эта синяя рубашка", tr:"Mavi gömleği beğendim. "},
            {ru:"Он всегда носит футболки. ", tr:"O her zaman tişört giyer. "},
            {ru:"Этот свитер очень удобный. ", tr:"Kazak çok rahat. "},
            {ru:"Этот пиджак дорогой", tr:"Ceket pahalı. "},
            {ru:"Мне нравится твоя пижама. ", tr:"Pijamalarını sevdim. "},
            {ru:"Эти туфли мне велики. ", tr:"Bu ayakkabılar benim için çok büyük. "},
            {ru:"Мне очень нравятся твои носки", tr:"Çoraplarına bayıldım. "},
            {ru:"Эта примерочная занята", tr:"Deneme kabini dolu. "},
            {ru:"У меня 38 размер", tr:"Ben 38 beden giyiyorum. "},
            {ru:"Я ношу очень тёплый пиджак", tr:"Çok sıcak tutan bir ceket giyiyorum. "},
            {ru:"Можно мне это примерить? ", tr:"Onu deneyebilir miyim? "},
            {ru:"Хорошо ли оно на тебе сидит?", tr:"Sana nasıl oldu?"},
            {ru:"Если он мне не подойдёт, могу ли я его вернуть?", tr:"Eğer bu olmazsa, geri getirebilir miyim?"},
            {ru:"Оно немного узко.", tr:"Bu biraz sıkıyor."},
            {ru:"У вас есть такой же другого цвета?", tr:"Bunun bașka rengi var mı?"},
            {ru:"Мне понравилось!", tr:"Hoşuma geldi."},
            {ru:"Я очень обрадовалась!", tr:"Çok sevindim!"},
            {ru:"Не могли бы вы сделать скидку?", tr:"Indirim yapar mısınız?"},
            {ru:"Какова последняя цена?", tr:"Son fiyatı ne?"}
        ]
    };
    window.lang = lang;
})();
