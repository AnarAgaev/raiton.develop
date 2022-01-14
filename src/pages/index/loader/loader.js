$(document).ready(() => {
    window.initialProgressLoader = () => {
        setTimeout(() => {
            setLoaderCircle();
            setLoaderValue();
        }, 1500);
    };

    const setLoaderCircle = () => {
        $('.loader__circle').addClass('progressed');
    };

    const setLoaderValue = () => {
        let progressValueInterval,
            progressValueCurrent = 0;

        const STOP = 80;

        progressValueInterval = setInterval (
    () => {
                progressValueCurrent > STOP - 1
                ? clearInterval(progressValueInterval)
                : $('#loader .val').text(++progressValueCurrent);
            },
    33
        );
    };
});