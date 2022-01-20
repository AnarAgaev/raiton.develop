$(document).ready(() => {
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
            autoHeight: false,
            pagination: {
                el: '.swiper-pagination-results-items',
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                768: {
                    spaceBetween: 20,
                    slidesPerView: 2,
                },
                1140: {
                    spaceBetween: 20,
                    slidesPerView: 3,
                }
            }
        });
    };

    initResultSlider();

    // const destroyResultsSlider = () => {
    //     if (resultsSlider !== undefined) {
    //
    //         resultsSlider.length
    //             ? resultsSlider.forEach(slider => slider.destroy())
    //             : resultsSlider.destroy();
    //     }
    // };

    // $(window).resize(() => {
    //    const windowWidth = $(window).width(),
    //        breakPointXL = 1140,
    //        screenVersion = document.body.dataset.screen,
    //
    //        currentScreenVersion = (windowWidth > breakPointXL)
    //            ? 'desktop'
    //            : 'mobile';
    //
    //    if (screenVersion !== currentScreenVersion) {
    //        setScreenVersion();
    //        checkResultsSlider();
    //    }
    // });

    // const setScreenVersion = () => {
    //     const windowWidth = $(window).width(),
    //         breakPointXL = 1140;
    //
    //     document
    //         .body
    //         .dataset
    //         .screen = (windowWidth > breakPointXL)
    //         ? 'desktop'
    //         : 'mobile';
    // };

    // // Устанавливаем значение для
    // // ширины экрана при первой загрузке
    // setScreenVersion();

    // const checkResultsSlider = () => {
    //     const windowWidth = $(window).width(),
    //         breakPointXL = 1140;
    //
    //     windowWidth > breakPointXL
    //         ? destroyResultsSlider()
    //         : initResultSlider();
    // };

    // // Чекаем слайдер при первой загрузке
    // checkResultsSlider();

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
});