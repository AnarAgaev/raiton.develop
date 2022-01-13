// Блокируем зум экрана на IOS
document.addEventListener(
    'touchmove',
    function(event) {
        event = event.originalEvent || event;

        if (event.scale !== 1) {
            event.preventDefault();
        }
    },
    false
);

window.IS_DEBUGGING = true;

window.validatePhone = (phone = STORE.phone) => {
    let regular = /^(\+7)?(\d{3}?)?[\d]{11}$/;
    return regular.test(phone);
};

window.validateEmail = (email = STORE.email) => {
    // Регулярка для email проверяет только
    // наличие @ и точки
    let regular = /.+@.+\..+/i;
    return regular.test(email);
};

/* В суперглобальной переменной STORE храним
 * все дынные, введенные пользователем
 * С помощью проксирования, слушаем
 * изменение структуры данных
 */
window.STORE = {
    // connect: "WhatsApp",

    stepsMap: [
        '#forWhom',
    ]
};

STORE = new Proxy(STORE, {
    set: function (target, prop, val) {

        const removeAnswerFromStore = ([question, answer]) => {
            let prop = getPropFromController(question, answer),
                arrAnswers = target[prop][1],
                idxOfAnswer = arrAnswers.indexOf(answer);

            arrAnswers.splice(idxOfAnswer, 1);
        };

        const addAnswerToStore = ([question, answer]) => {
            let prop = getPropFromController(question, answer);

            target[prop]
                ? target[prop][1].push(answer)
                : target[prop] = [question, [answer]];
        };

        if (isPluralController(val)) {
            // Если в STORE уже есть целевой ответ,
            // удаляем его, иначе добавляем
            isAnswerInStore(val)
                ? removeAnswerFromStore(val)
                : addAnswerToStore(val);
        } else {
            target[prop] = val;
        }

        /*
         * Если в СТОРЕ меняется телефон, то сразу меняем
         * телефон во всех полях ввода телефона.
         */
        if (prop === 'phone') {
            updatePhones(val);
        }

        /*
         * Если в СТОРЕ меняется email, то сразу меняем
         * email во всех полях ввода email адреса.
         */
        if (prop === 'email') {
            updateEmails(val);
        }

        if (IS_DEBUGGING) {
            setTimeout(() => console.log(target), 100);
        }

        return true;
    },

    deleteProperty: function(target, prop) {
        delete target[prop];

        if (IS_DEBUGGING) {
            setTimeout(() => console.log(target), 100);
        }

        return true;
    }
});

const isPluralController = ([question, answer]) => {
    return $(`[data-question="${question}"][data-answer="${answer}"]`)
        .attr('type') === 'checkbox';
};

const isAnswerInStore = ([question, answer]) => {
    let prop = getPropFromController(question, answer);

    if (STORE[prop]) {
        return STORE[prop][1].includes(answer);
    }
};

const getPropFromController = (question, answer) => {
    return $(`[data-question="${question}"][data-answer="${answer}"]`)
        .attr('name');
};

// // Если email валидный, разблокируем
// // кнопки отправки формы
// const checkEmail = () => {
//     $('[type="email"]')
//         .closest('form')
//         .find('[type="submit"]')
//         .prop({
//             disabled: !validateEmail(STORE.email)
//         });
// };

$(document).ready(() => {

//     const handlerEmailInput = e => {
//         STORE['email'] = $(e.target).val();
//         checkEmail();
//     };

//     const handlerEmailBlur = e => {
//         if (!validateEmail()) {
//             STORE.email = ''; // Нужно для организации взаимозависимых полей
//             delete STORE.email;
//         }
//     };

//     $('[type="email"]')
//         .on('blur', handlerEmailBlur)
//         .on('input', handlerEmailInput);

//     /* Слушаем изменение каждого input
//      * В случае всплытия события,
//      * пушим данные в STORE
//      *
//      */

//     $('input.controller').on('input', e => {
//         let _this = e.target,
//             prop = $(_this).attr('name'),
//             question = $(_this).data('question'),
//             answer = $(_this).data('answer');

//         STORE[prop] = [question, answer];

//         removeProgressBar();
//         setTimeout(initialProgressBar, 300);
//         resetAllCheckboxControllers(_this);
//     });

//     const resetAllCheckboxControllers = (el) => {
//         if ($(el).attr('type') === 'radio') {
//             $('input:checkbox').prop('checked', false);
//         }
//     };

    // Скролл к первому вопросу
    $('.go-to-quiz').click(() => {
        let top = $('#progress').offset().top;

        $('body,html').animate(
            { scrollTop: top },
            1000
        );
    });

    // Блокируем отправку всех форм.
    // Данные всегда отправляются асинхронно.
    $('form').submit(function (e) {
        e.preventDefault();

        const form = e.target,
            submit = $(this).find('[type="submit"]'),
            formType = $(this).find('[name="form"]').val();

        if (!submit.attr('disabled'))  {

            const request = $.ajax({
                method: 'post',
                url: 'https://quiz24.ru/portfolio/raiton/forms-handler.php',
                data: $(form).serialize(),
                dataType: 'json'
            });

            request.done(response => {
                if (IS_DEBUGGING) console.log(response);

                if (response.error) {
                    if (formType === 'consultation') {
                        const dialogs = $(form)
                            .closest('.modal')
                            .find('.modal__dialog');

                        $(dialogs[0]).addClass('modal__dialog_hide');

                        setTimeout(() => {
                            $(dialogs[0]).addClass('hidden');
                            $(dialogs[1]).removeClass('hidden');
                        }, 300);

                        setTimeout(() => {
                            $(dialogs[1]).removeClass('modal__dialog_hide');
                        }, 400);
                    }

                    // } else if (formType === 'consultation') {
                    //     showModal($(form).find('[type="submit"]')[0]);
                    // }



                } else {
                    console.log('Ошибка отправки сообщения в обработчике формы!')
                }
            });

            request.fail(function( jqXHR, textStatus ) {
                console.log("Request failed: " + jqXHR + " --- " + textStatus);
            });
        }
    });
});