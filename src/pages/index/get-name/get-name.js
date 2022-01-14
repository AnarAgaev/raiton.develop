$(document).ready(() => {

    const handlerNameInput = e => {
        const _this = e.target,
            name = $(_this).val();

        copyNameToTargetPlace(name);

        if (name === '') {
            removeNameFromStore();
            toggleBtn(_this, true);
        } else {
            pushNameToStore(name);
            toggleBtn(_this, false);
        }
    };

    const pushNameToStore = name => STORE.name = name;

    const removeNameFromStore = () => delete STORE.name;

    const toggleBtn = (controller, direction) => {
        $(controller)
            .closest('form')
            .find('[type="button"]')
            .prop({ disabled: direction })
    };

    const copyNameToTargetPlace = name => $('#namePlace').text(name);

    $('#name').on('input', handlerNameInput);
});
