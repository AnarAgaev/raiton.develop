$(document).ready(() => {

    const hideProgressBar = () => $('#progress').addClass('hide');

    const lazyLoadBackground = () => {
        $('[data-lazy-load-background]')
            .each((id, el) => {
                const src = $(el).data('lazyLoadBackground');

                $(el).attr('style', `background-image: url("${src}");`);
            })
    };

    const lazyLoadImg = () => {
        $('[data-lazy-load-img]')
            .each((id, el) => {
                const src = $(el).data('lazyLoadImg');

                $(el).attr('src', src);
            })
    };

    // Перключаем карты в результатах
    $('#maps .tabs__item').each((idx, el) => {
        $(el).on('click', () => {
            console.log()

            maps.dataset.activeMap = idx;
        });
    });

    // Скролл к слайдеру с результатами
    $('#goToResults').on('click', () => {
        let top = $('#resPlaceAnchor').offset().top;

        $('body,html').animate(
            { scrollTop: top },
            1000
        );
    });

    // Показываем премиум секции
    const showPremiumSections = () => {
        const isQualityHigh = STORE.quality[1] === 'Высокий уровень.';

        if (isQualityHigh) {
            $('.onlyPremium').removeClass('hidden');
        }
    }

    // Устанавливаем рейтинг в результатах (звёздочки)
    const setResultRating = () => {
        const rating = getRating();

        $('#rating').addClass(rating);
    }

    const getRating = () => {
        const quality = STORE.quality[1];

        if (quality === 'Простым и бюджетным.')
            return 'rating-low';

        if (quality === 'Баланс цены и качества.')
            return 'rating-middle';

        if (quality === 'Высокий уровень.')
            return 'rating-height';
    }








    window.initialResults = () => {
        hideProgressBar();
        lazyLoadBackground();
        lazyLoadImg();
        showPremiumSections();
        setResultRating();
    };







    // // Рассчитваем резьльтаты прохождения Квиза
// // и определяем какой блок результатов показывать

// window.getResultCard = () => {
//     if (checkResult_1()) {
//         if (IS_DEBUGGING) console.log('Подобран Рузультат #1');
//         return $('#result-1');
//     }


//     return console.log('!!! Ошибка определения результата!');
// };

// const checkResult_1 = () => {

//     const line1 =  (
//             // Вопрос 1: Бывает ли, что ваша кожа выглядит жирной и блестит?
//             // STORE.questionFirst[1]
//             (STORE.questionFirst[1] === "Жирный блеск у меня бывает только в Т-зоне."
//                 || STORE.questionFirst[1] === "Нет, у меня такого не бывает или бывает очень редко.")

//             // Вопрос 2: Какие у вас ощущения после умывания?
//             // STORE.questionSecond[1]
//             && (STORE.questionSecond[1] === "Комфорт и свежесть."
//                 || STORE.questionSecond[1] === "По-разному в разных зонах.")

//             // Вопрос 3: Характерны ли для вашей кожи такие проблемы? --- НЕ ИМЕЕТ ЗАНЧЕНИЯ!
//             // STORE.questionThird[1]

//             // Вопрос 4: Бывают ли у вас воспаления и подкожные прыщи?
//             // STORE.questionFourth[1]
//             && (STORE.questionFourth[1] === "Очень редко."
//                 || STORE.questionFourth[1] === "Ничего такого у меня нет.")

//             // Вопрос 5.1: Сколько воспалений на сегодняшний день? --- НЕ ИМЕЕТ ЗАНЧЕНИЯ!
//             // STORE.questionFifthOne[1]

//             // Вопрос 5.2: Бывают ли зуд и/или покраснения как реакция на ветер, холод, косметические средства?
//             // STORE.questionFifthTwo[1]
//             && (STORE.questionFifthTwo[1] === "Ничего такого у меня нет.")
//         ),

//         line2 = (
//             // Вопрос 1: Бывает ли, что ваша кожа выглядит жирной и блестит?
//             // STORE.questionFirst[1]
//             (STORE.questionFirst[1] === "Жирный блеск у меня бывает только в Т-зоне."
//                 || STORE.questionFirst[1] === "Нет, у меня такого не бывает или бывает очень редко.")

//             // Вопрос 2: Какие у вас ощущения после умывания?
//             // STORE.questionSecond[1]
//             && (STORE.questionSecond[1] === "Ощущение стянутости."
//                 || STORE.questionSecond[1] === "Кожа кажется жирной и липкой.")

//             // Вопрос 3: Характерны ли для вашей кожи такие проблемы? --- НЕ ИМЕЕТ ЗАНЧЕНИЯ!
//             // STORE.questionThird[1]

//             // Вопрос 4: Бывают ли у вас воспаления и подкожные прыщи?
//             // STORE.questionFourth[1]
//             && (STORE.questionFourth[1] === "Очень редко."
//                 || STORE.questionFourth[1] === "Ничего такого у меня нет.")

//             // Вопрос 5.1: Сколько воспалений на сегодняшний день? --- НЕ ИМЕЕТ ЗАНЧЕНИЯ!
//             // STORE.questionFifthOne[1]

//             // Вопрос 5.2: Бывают ли зуд и/или покраснения как реакция на ветер, холод, косметические средства?
//             // STORE.questionFifthTwo[1]
//             && (STORE.questionFifthTwo[1] === "Ничего такого у меня нет.")
//         );

//     return line1 || line2;
// };



});