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
        const quality = STORE.quality[1];

        switch (quality) {
            case 'Простым и бюджетным.':
                buildResultSlider(ITEMS.filter(i => i.price === 'economy'));
                break;
            case 'Баланс цены и качества.':
                buildResultSlider(ITEMS.filter(i => i.price === 'medium'));
                break;
            case 'Высокий уровень.':
                buildResultSlider(ITEMS.filter(i => i.price === 'premium'));
                break;
        }
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