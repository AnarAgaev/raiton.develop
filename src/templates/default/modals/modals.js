$(document).ready(() => {
    $('[data-toggle="modal"]').click(e => {
        showModal(e.target);
    });

    window.showModal = function (el) {
        let modal = $(el).data('target');

        if (!modal) {
            modal = $(el)
                .closest('[data-toggle="modal"]')
                .data('target');
        }

        const video = $(modal).find('video')[0];

        $(modal).addClass('show');
        if (video) video.play();
    };

    $('.modal').click(e => {
       if (isActionNode(e.target)) {
           hideModal(e.target);
       }
    });

    const hideModal = function (el) {
        let modal = $(el).closest('.modal'),
            video = $(modal).find('video')[0],
            dialogs = $(modal).find('.modal__dialog');

        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        modal.removeClass('show');

        // Если в модальном окне несколько диалоговых окно,
        // оставляем видимым только первое
        if (dialogs.length > 1) {

            setTimeout(e => {
                $(dialogs[0])
                    .removeClass('modal__dialog_hide hidden');

                dialogs
                    .filter(idx => idx > 0)
                    .addClass('modal__dialog_hide hidden');
            }, 500);
        }
    };

    const isActionNode = function (el) {
        return $(el).hasClass('modal') || $(el).hasClass('modalCloseBtn');
    };
});