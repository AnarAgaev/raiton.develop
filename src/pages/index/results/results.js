$(document).ready(() => {

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
    }

    const buildResultItems = () => {
        if (STORE.forWhom[1] === 'Взрослый.') {
            buildAdultResultItems();
        } else {
            buildChildrenResultItems();
        }
    }

    const buildChildrenResultItems = () => {
        console.log('for children')
    }

    const buildAdultResultItems = () => {
        const quality = STORE.quality[1];

        switch (quality) {
            case 'Простым и бюджетным.':
                buildResultSlider(ITEMS.economy);
                break;
            case 'Баланс цены и качества.':
                buildResultSlider(ITEMS.medium);
                break;
            case 'Высокий уровень.':
                buildResultSlider(ITEMS.premium);
                break;
        }
    }

    const buildResultSlider = (arrItems) => {
        const slider = $('#resultSliderList')[0],
            countTxt = arrItems.length;

        $('#resultItemsCount')[0].innerHTML = `<span>${countTxt}</span> матрасов`;

        arrItems.forEach(slide => {

            const htmlNode = document.createElement('div');

            htmlNode.classList.add('swiper-slide');

            htmlNode.innerHTML = `<div class="results-item">
                <div class="results-item__caption">${slide.name}</div>
                <div class="results-item__picture">
                    <img class="results-item__picture-img" src="${slide.imgLink}" alt="${slide.name}">
                    <div class="results-item__picture-content">
                        <p class="results-item__picture-title">${slide.title}</p>
                        <p class="results-item__picture-subtitle">${slide.subtitle}</p>
                        <span class="results-item__picture-txt">${slide.weight}</span>
                    </div>
                </div>
                <div class="results-item__body">
                    <ul class="results-item__list">
                        <li><h6>${slide.guarantee}</h6></li>
                        <li>
                            <h6>${slide.hardness}</h6>
                            <p>${slide.hardnessComment}</p>
                        </li>
                        <li>
                            <h6>${slide.size}</h6>
                            <p>${slide.sizeComment}</p>
                        </li>
                        <li>
                            <h6>${slide.height}</h6>
                            <a class="button" href="${slide.descriptionLink}" target="_blank">Смотреть описание</a>
                        </li>
                    </ul>
                    <a class="btn" href="https://api.whatsapp.com/send?phone=79241764428&text=Здравствуйте!%20Я%20хочу%20получить%20чек-лист" target="_blank">уточнить стоимость<br>в whatsapp</a>
                </div>
            </div>`;

            slider.append(htmlNode);
        });
    }

    window.initialResults = () => {
        lazyLoadBackground();
        lazyLoadImg();
        showPremiumSections();
        setResultRating();
        buildResultItems();
    };
});