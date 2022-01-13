$(document).ready(() => {

    // Маски для всех телефонов сохраняем
    // в отдельный суперглобальный массив
    const PHONE_MASKS = [];

    // Маска для телефона одинакова
    // для всех телефонов
    const phoneMaskOptions = {
        mask: '+{7} ({9}00) 000-00-00',
        lazy: true,
        placeholderChar: '_'
    };

    // Котроллеры для телефонов - взаимозависимые поля
    window.updatePhones = (phone) => {
        $(PHONE_MASKS).each(
            idx => PHONE_MASKS[idx].unmaskedValue = phone
        );
    };

    // Котроллеры для телефонов - взаимозависимые поля
    window.updateEmails = (email) => {
        $('[type="email"]').val(email);
    };

    // Если телефон валидный,
    // разлокируем кнопки отправки формы
    const checkPhones = () => {
        $('[type="tel"]')
            .closest('form')
            .find('[type="submit"]')
            .prop({
                disabled: !validatePhone(STORE.phone)
            });
    };

    /* Вешаем маску на контроллер каждого телефона
     * и сохраняем все маски в массив PHONE_MASKS
     *
     * Также на каждом контроллере телефона
     * обрабатывается события фокус, потеря фокуса
     * и изменение значения
     *
     */
    const initialPhoneMasks = (idx, el) => {
        PHONE_MASKS.push(IMask(el, phoneMaskOptions));
        el.dataset.maskIdx = idx.toString();
    };

    const handlerPhoneFocus = e => {
        const _this = e.target,
            idx = $(_this).data('maskIdx');

        PHONE_MASKS[idx].updateOptions({
            lazy: false,
        });
    };

    const handlerPhoneBlur = e => {
        const _this = e.target,
            idx = $(_this).data('maskIdx');

        PHONE_MASKS[idx].updateOptions({
            lazy: true,
        });

        if (!validatePhone()) {
            STORE.phone = ''; // Нужно для организации взаимозависимых полей
            delete STORE.phone;
        }
    };

    const handlerPhoneInput = e => {
        const _this = e.target,
            idx = $(_this).data('maskIdx');

        STORE['phone'] = PHONE_MASKS[idx].unmaskedValue;
        checkPhones();
    };

    $('[type="tel"]')
        .each(initialPhoneMasks)
        .on('focus', handlerPhoneFocus)
        .on('blur', handlerPhoneBlur)
        .on('input', handlerPhoneInput);
});