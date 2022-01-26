$(document).ready(() => {
    window.initialProgressLoader = () => {
        setLoaderCircle();
        setLoaderValue();
        showBuildingStates();
    };

    const setLoaderCircle = () => {
        $('.loader__circle').addClass('progressed');
    };

    const setLoaderValue = () => {
        let progressValueInterval,
            progressValueCurrent = 0;

        const STOP = 100;

        progressValueInterval = setInterval (
    () => {
                progressValueCurrent > STOP - 1
                ? clearInterval(progressValueInterval)
                : $('#loader .val').text(++progressValueCurrent);
            },
    33
        );
    };

    const showBuildingStates = () => {
        setTimeout(
            () => $('#buildingResults').addClass('show'),
            1300
        );
    };

    // Показываем лодер если в поле
    // с именем введены какие либо
    // данные
    $('#showLoader').on(
        'click',
        () => {
            showLoader();
            setTimeout(initialProgressLoader, 500);
            setTimeout(toggleLoaderTitle, 4500);
            setTimeout(showResults, 4800);
        }
    );

    const showLoader = () => {
        const form = $('#getNameForm'),
            loader = $('#getNameLoader');

        form.toggleClass('hide');
        loader.toggleClass('hide');
    };

    const toggleLoaderTitle = () => {
        $('.get-name__title span').toggleClass('hide');
    };

    const showResults = () => {
        $('#showResults').click();
    };
});