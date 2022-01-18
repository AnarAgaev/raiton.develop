$(document).ready(() => {
    // Слайдер с результатами
    window.resultsSlider = new Swiper('.swiper_results', {
        slidesPerView: 1,
        speed: 300,
        preloadImages: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        autoHeight: false,
        //spaceBetween: 15,
        pagination: {
            el: '.swiper-pagination-results-items',
            clickable: true,
            dynamicBullets: true,
        }
    });

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