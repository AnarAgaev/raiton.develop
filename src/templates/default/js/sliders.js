$(document).ready(() => {

    // Слайдер с отзыывами
    new Swiper('.swiper_feedback', {
        slidesPerView: 1,
        speed: 300,
        preloadImages: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        autoHeight: false,
        pagination: {
            el: '.swiper-pagination-feedback',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            768: {
                centeredSlides: true,
                initialSlide: 1,
                slidesPerView: 3,
            }
        }
    });

    // Слайдер с результатами
    window.resultsSlider = undefined;

    const initResultSlider = () => {
        window.resultsSlider = new Swiper('.swiper_results', {
            slidesPerView: 1,
            speed: 300,
            preloadImages: true,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination-results',
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                768: {
                    spaceBetween: 20,
                    slidesPerView: 2,
                },
            }
        });
    };

    const destroyResultsSlider = () => {
        if (resultsSlider !== undefined) {
            resultsSlider.length
                ? resultsSlider.forEach(slider => slider.destroy())
                : resultsSlider.destroy();
        }
    };

    const checkResultsSlider = () => {
        const windowWidth = $(window).width(),
            breakPointXL = 1140;

        if (windowWidth > breakPointXL) {
            destroyResultsSlider();
            window.resultsSlider = undefined;
        } else {
            if (window.resultsSlider === undefined) {
                initResultSlider();
            }
        }
    };

    // Чекаем слайдер при первой загрузке
    checkResultsSlider();

    $(window).resize(checkResultsSlider);


    // Для десктопов при клике на Загрузить
    // ещё, показываем оставшиеся слайды
    $('#showMoreResultsItems').on(
        'click',
        e => {
            const arrInvisibleItems = getInvisibleItems();

            for (let i = 0; i < 3; i++) {
                const item = $(arrInvisibleItems[i]);

                item.show().addClass('hide');

                setTimeout(() => item.removeClass('hide'), i * 300);
            }

            checkShowMoreResultsBtn();
        }
    );

    const getInvisibleItems = () => {
        const arrItems = $('#resultSliderList .swiper-slide').toArray();

        return arrItems.filter(item => {
            return $(item).css('display') === 'none';
        });
    };

    const checkShowMoreResultsBtn = () => {
        if (getInvisibleItems().length === 0) {
            $('#showMoreResultsItems').hide();
        }
    };
});