// window.toggleQuestionDirection = undefined;

$(document).ready(() => {

    // Открываем и закрываем текст
    // подзаголовка в вопросе
    const toggleSubtitle = e => {
        const _this = e.target,
            container = $(_this)
                .closest('.question__subtitle');

        container.toggleClass('opened');
    };

    $('.question__subtitle button').on('click', toggleSubtitle);

    /* В этой константе храним время, нобходимое для
     * переключения с одного вопроса на другой для того
     * чтобы отсечь множественные клики на контроллеры
     */
    const BLOCKED_TOGGLE_QUESTIONS_TIMEOUT = 1000;

    let isUnlockedToggleStep = true;

    const blockToggleSteps = () => {
        isUnlockedToggleStep = false;
    }

    const unblockToggleSteps = () => {
        setTimeout(
            () => {
                isUnlockedToggleStep = true;
            },
            BLOCKED_TOGGLE_QUESTIONS_TIMEOUT
        )
    }

    // Обрабатываем клик по кнопке вперёд
    $('.btnNextStep').each((idx, el) => {
        $(el).click(
            e => {
                let _this = e.target;

                if (!$(_this).data('nextStepId')) {
                    _this = $(_this).closest('.btn');
                }

                handlerBtnToggleStep(_this, true);
            }
        );
    });

    // Обрабатываем клик по кнопке назад
    $('.btnPrevStep').each((idx, el) => {
        $(el).click(
            e => handlerBtnToggleStep(
                e.target,
                false
            )
        );
    });

    // Обрабатываем клик по кнопке с множественных ответом
    $('.pluralController').each((idx, el) => {
        $(el).on(
            'click',
            () => handlerClickOnPluralController(
                idx,
                el
            )
        );
    });

    const handlerClickOnPluralController = (idx, el) => {
        const isFirstGroupChecked = $('.pluralController.firstGroup:checked')
                .length > 0,

              isSecondGroupChecked = $('.pluralController.secondGroup:checked')
                .length > 0;

        if (isFirstGroupChecked && isSecondGroupChecked) {
            handlerBtnToggleStep(el, true);
        }
    }

    const handlerBtnToggleStep = (btn, direction) => {
        // if (isUnlockedToggleStep) {
        if (true) {

            const thisQuestion = $(btn).closest('.question'),
                nextQuestionId = $(btn).data('nextStepId'),
                nextQuestion = nextQuestionId ? $(nextQuestionId) : undefined,
                prevQuestionId = STORE.stepsMap[STORE.stepsMap.length - 2],
                prevQuestion = prevQuestionId ? $(prevQuestionId) : undefined;

            let animationDuration; // Время анимации вопросов в ситлях

            blockToggleSteps();
            scrollToQuestionsStart();
            animationDuration = hideQuestions(thisQuestion);

            if (direction) {
                updateQuestionWrapperHeight(nextQuestion);
                toggleQuestions(animationDuration, thisQuestion, nextQuestion);
                showQuestion(animationDuration, nextQuestion);
                pushQuestionToStepsMap(nextQuestion);
            } else {
                updateQuestionWrapperHeight(prevQuestion);
                toggleQuestions(animationDuration, thisQuestion, prevQuestion);
                showQuestion(animationDuration, prevQuestion);
                removeLastStepFromStepsMap();
                resetAllControllers();

                /* Удаляем ТЕКУЩИЕ ответы из STORE на тот случаей
                 * елси ПЕРЕШЛИ НАЗАД ИЗ ВОПРОСА с множественными
                 * ответами (с radio контроллерами)
                 */
                resetAnswerFromStore(thisQuestion);

                // Удаляем ПРЕДЫДУЩИЕ ответы из STORE
                // т.к. он будет выбран заново
                resetAnswerFromStore(prevQuestion);
            }

            unblockToggleSteps();
        }
    }

    const hideQuestions = question => {
        question.addClass('hide');

        return parseFloat(
            question
                .find('.animatible')
                .css('transition-duration')
        ) * 1000;
    }

    const toggleQuestions = (timeout, removedQuestion, addedQuestion) => {
        setTimeout(
            () => {
                removedQuestion
                    .removeClass('hide')
                    .addClass('hidden');

                addedQuestion
                    .removeClass('hidden')
                    .addClass('hide');
            },
            timeout
        );
    }

    const updateQuestionWrapperHeight = addedQuestion => {
        let height;

        addedQuestion.removeClass('hidden');
        height = addedQuestion.height();
        addedQuestion.addClass('hidden');

        $('#questionsWrap').css('maxHeight', height);
    }

    const showQuestion = (timeout, addedQuestion) => {
        setTimeout(
            () => addedQuestion.removeClass('hide'),
            timeout + 100
        );
    }

    const pushQuestionToStepsMap = question => {
        let id = $(question).attr('id');
        STORE.stepsMap.push(`#${id}`);
    }

    const removeLastStepFromStepsMap = () => {
        STORE.stepsMap.splice(-1, 1);
    }

    const resetAllControllers = () => {
        $('input.controller').prop('checked', false);
    }

    const resetAnswerFromStore = question => {
        let prop = question.find('.controller').attr('name');
        if (STORE[prop]) delete STORE[prop];
    }

//     // Показываем кнопку Далле и Показать результаты
//     $('.controller_btn-next').on('input', e => showNextButton(e));

//     const showNextButton = e => {
//         let step = $(e.target).closest('.step'),
//             maxHeight = parseFloat(step.css('maxHeight')) + 100,
//             btnWrap = $(step).find('.btnNextStep__wrap');


//         step.css('maxHeight', maxHeight + 'px');
//         btnWrap.addClass('show');

//     }

//     // Загружаем видео в виджет видео-презентаии
//     const uploadPresentVideo = () => {
//         let video = $('#videoBackground'),
//             source = video.find('source'),
//             videoModal = $('#videoPresentationModal video'),
//             sourceModal = video.find('videoModal'),
//             src = video.data('src');

//         video.attr('src', src);
//         source.attr('src', src);

//         videoModal.attr('src', src);
//         sourceModal.attr('src', src);
//     }
//     setTimeout(uploadPresentVideo, 1000);
});