$(document).ready(() => {
    window.initialResults = () => {
        lazyLoadBackground();
        lazyLoadImg();
        showPremiumSections();
        setResultRating();
        buildResultItems();
        checkShowMoreResultsBtn();
    };

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
        if (STORE.forWhom[1] === 'Взрослый.') {
            const isQualityHigh = STORE.quality[1] === 'Высокий уровень.';

            if (isQualityHigh) {
                $('.onlyPremium').removeClass('hidden');
            }
        }
    }

    // Устанавливаем рейтинг в результатах (звёздочки)
    const setResultRating = () => {
        const rating = getRating();

        $('#rating').addClass(rating);
    }

    const getRating = () => {
        if (STORE.forWhom[1] === 'Взрослый.') {
            const quality = STORE.quality[1];

            if (quality === 'Простым и бюджетным.')
                return 'rating-low';

            if (quality === 'Баланс цены и качества.')
                return 'rating-middle';

            if (quality === 'Высокий уровень.')
                return 'rating-height';
        }

        const caption = $('#resultsCaption'),
            rating = $('#rating'),
            title = caption.prev();

        title.addClass('mb-5 pb-md-4');
        rating.hide();
        caption.hide();
    };

    const buildResultItems = () => {
        if (STORE.forWhom[1] === "Ребенок."
            && (STORE.childrenAge[1] === "0-5"
                || STORE.childrenAge[1] === "6-13"
                || STORE.childrenAge[1] === "Покажите все варианты.")) {

            buildChildrenResultItems();
        } else {
            buildAdultResultItems();
        }
    }

    const buildChildrenResultItems = () => {
        let arrItems;

        // Фильтруем дети взрослые
        arrItems = ITEMS.filter(i => i.age === 'children');

        // Фильтруем жесткость
        switch (STORE.hardnessChildren[1]) {
            case "Жесткий." :
                arrItems = arrItems.filter(i => i.hardnessHard);
                break;
            case "Средний." :
                arrItems = arrItems.filter(i => i.hardnessMiddle);
                break;
            case "Мягкий." :
                arrItems = arrItems.filter(i => i.hardnessMiddle); // Для магких показываем средние
                break;
            case "Двусторонний. Одна сторана мягкая, другая жесткая." :
                arrItems = arrItems.filter(i => i.twoSides);
                break;
        }

        // Удаляем лишние размеры
        switch (STORE.childrenAge[1]) {
            case "0-5" :
                arrItems.forEach(i => delete i.size['612']);
                break;
            case "6-13" :
                arrItems.forEach(i => delete i.size['6']);
                break;
        }

        buildResultSlider(arrItems);
    }

    const buildAdultResultItems = () => {
        let arrItems, weight;

        // Фильтруем дети взрослые
       arrItems = ITEMS.filter(i => i.age === 'adult');

        // Фильтруем максимальный вес
        const getWeight = (stringWeight) => {
            switch (stringWeight) {
                case "До 100 кг." :
                    return 100;
                case "До 120 кг." :
                    return 120;
                case "Больше 120 кг." :
                    return 150;
            }
        };

        // Получаем максимальный вес для одного или двух
        if (STORE.forWhom[1] === "Ребенок.") {
            weight = 100; // Для ребенка ставим макс. вес в 100 кг.
        } else {
            if (STORE.hasOwnProperty('weightOne')) {
                weight = getWeight(STORE.weightOne[1]);
            } else {
                let weightFirst = getWeight(STORE.weightTwoFirst[1]),
                    weightSecond = getWeight(STORE.weightTwoSecond[1]);

                weight = Math.max(weightFirst, weightSecond);
            }
        }

        /* Фильтруем по весу:
        * Если человек весит до 100 кг., показываем матрасы до 110 кг.
        * Если человек весит до 120 кг., показваем матрасы от 120 и до 130 кг.
        * Если человек весит более 120 кг, показываем матрасы более 120 кг.
        * */
        switch (weight) {
            case 100 :
                arrItems = arrItems.filter(i => i.weightMax <= 110);
                break;
            case 120 :
                arrItems = arrItems.filter(i => (i.weightMax >= 120 && i.weightMax <= 130));
                break;
            case 150 :
                arrItems = arrItems.filter(i => i.weightMax >= 125);
                break;
        }

        // Фильтруем жесткость
        switch (STORE.hardnessAdult[1]) {
            case "Жесткий." :
                arrItems = arrItems.filter(i => i.hardnessHard);
                break;
            case "Средний." :
                arrItems = arrItems.filter(i => i.hardnessMiddle);
                break;
            case "Мягкий." :
                arrItems = arrItems.filter(i => i.hardnessMiddle); // Для магких показываем средние
                break;
            case "Двусторонний. Одна сторана мягкая, другая жесткая." :
                arrItems = arrItems.filter(i => i.twoSides);
                break;
        }

        // Фильтруем по цене
        const quality = STORE.quality[1];

        switch (quality) {
            case 'Простым и бюджетным.':
                arrItems = arrItems.filter(i => i.price === 'economy');
                break;
            case 'Баланс цены и качества.':
                arrItems = arrItems.filter(i => i.price === 'medium');
                break;
            case 'Высокий уровень.':
                arrItems = arrItems.filter(i => i.price === 'premium');
                break;
        }

        // Удаляем лишние размеры
        if (STORE.forWhom[1] === "Ребенок.") {
            arrItems.forEach(i => {
                delete i.size['1'];
                delete i.size['2'];
                delete i.size['3'];
            });
        } else {
            switch (STORE.numberOfPersons[1]) {
                case "1 человек." :
                    arrItems.forEach(i => {
                        delete i.size['1418'];
                        delete i.size['2'];
                        delete i.size['3'];
                    });
                    break;
                case "Двое." :
                    arrItems.forEach(i => {
                        delete i.size['1418'];
                        delete i.size['1'];
                        delete i.size['3'];
                    });
                    break;
                case "Двое, и иногда ребенок с нами." :
                    arrItems.forEach(i => {
                        delete i.size['1418'];
                        delete i.size['1'];
                        delete i.size['2'];
                    });
                    break;
            }
        }

        buildResultSlider(arrItems);
    }

    const buildResultSlider = (arrItems) => {
        const slider = $('#resultSliderList')[0],
            count = arrItems.length;

        $('#resultItemsCount')[0].innerHTML = `<span>${count}</span> ${getCountWordForm(count)}`;

        arrItems.forEach(slide => {

            let sizes = '';

            for (let key in slide.size) {
                slide.size[key].forEach(vals =>
                    sizes += vals[0] + 'x' + vals[1] + 'см. '
                );
            }

            let hardness = ''; // очень высокая, высокая, средняя, низкая

            hardness += slide.hardnessToHard ? ', очень высокая' : '';
            hardness += slide.hardnessHard ? ', высокая' : '';
            hardness += slide.hardnessMiddle ? ', средняя' : '';
            hardness += slide.hardnessSoft ? ', низкая' : '';
            hardness = hardness.substring(1);

            const htmlNode = document.createElement('div');

            htmlNode.classList.add('swiper-slide');

            htmlNode.innerHTML = `<div class="results-item">
                <div class="results-item__caption">${slide.name}</div>
                <div class="results-item__picture">
                    <img class="results-item__picture-img" src="${slide.imgLink}" alt="${slide.name}" title="${slide.name}">
                    <div class="results-item__picture-content">
                        <p class="results-item__picture-title">${slide.title}</p>
                        <p class="results-item__picture-subtitle">${slide.subtitle}</p>
                        <span class="results-item__picture-txt">Max. вес на 1 спальное место: ${slide.weightMax} кг.</span>
                    </div>
                </div>
                <div class="results-item__body">
                    <ul class="results-item__list">
                        <li><h6>Гарантия ${slide.guarantee.toString().replace('.', ',')} года</h6></li>
                        <li>
                            <h6>Жёсткость: ${hardness}</h6>
                            <p>${slide.hardnessComment}</p>
                        </li>
                        <li>
                            <h6>${sizes}</h6>
                            <p>${slide.sizeComment}</p>
                        </li>
                        <li>
                            <h6>Высота: ${slide.height} см.</h6>
                            <a class="button" href="${slide.descriptionLink}" target="_blank">Смотреть описание</a>
                        </li>
                    </ul>
                    <a class="btn" href="https://api.whatsapp.com/send?phone=79241653043&text=" target="_blank">уточнить стоимость<br>в whatsapp</a>
                </div>
            </div>`;

            slider.append(htmlNode);
        });
    }

    // Просто менеджер - https://api.whatsapp.com/send?phone=79241653043&text=
    // Получить подарок Чеклист - https://api.whatsapp.com/send?phone=79241764428&text=Здравствуйте!%20Я%20хочу%20получить%20чек-лист
});