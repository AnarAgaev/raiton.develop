$(document).ready(() => {
    $('[name="connect"]').on('input', e => {

        const _this = e.target;

        cloneConnectType(_this);

    });

    const cloneConnectType = (controller) => {
        const connectType = $(controller).data('answer'),

            wraps = $(`[data-answer="${connectType}"]`)
                .closest('.connectWrap');

        cleanAllConnectWraps();
        checkConnectWraps(wraps);
        unlockPhoneControllers();
        checkBtnGoToResults();
    };

    const cleanAllConnectWraps = () =>
        $('.connectWrap').removeClass('checked');

    const checkConnectWraps = (wraps) =>
        wraps.addClass('checked');

    const unlockPhoneControllers = () =>
        $('[type="tel"]')
            .closest('.form__group')
            .removeClass('hide');

    const checkBtnGoToResults = () => {
        const btns = $('.form_get-contact .btnNextStep');

        btns.prop({disabled: !validatePhone(STORE.phone)});
    }

});