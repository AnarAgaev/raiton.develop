$(document).ready(() => {
    window.initialResults = () => {
        hideProgressBar();
    };

    const hideProgressBar = () => $('#progress').addClass('hide');
});