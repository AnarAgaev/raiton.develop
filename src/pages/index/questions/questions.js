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
    };

    const handlerBtnToggleStep = (btn, direction) => {
        const thisQuestion = $(btn).closest('.question'),
            nextQuestionId = $(btn).data('nextStepId'),
            nextQuestion = nextQuestionId ? $(nextQuestionId) : undefined,
            prevQuestionId = STORE.stepsMap[STORE.stepsMap.length - 2],
            prevQuestion = prevQuestionId ? $(prevQuestionId) : undefined;

        let animationDuration = hideQuestions(thisQuestion);

        scrollToQuestionsStart();

        if (direction) {
            updateQuestionWrapperHeight(nextQuestion);
            toggleQuestions(animationDuration, thisQuestion, nextQuestion);
            showQuestion(animationDuration, nextQuestion);
            pushQuestionToStepsMap(nextQuestion);
            setQuestionsToBody(animationDuration, nextQuestion);

            /* Чекаем слудующий вопрос и если
             * это Результаты, запускаем логику
             * для блока с результатами
             */
            if ($(nextQuestion).attr('id') === 'results') {
                initialResults();
            }

        } else {
            updateQuestionWrapperHeight(prevQuestion);
            toggleQuestions(animationDuration, thisQuestion, prevQuestion);
            showQuestion(animationDuration, prevQuestion);
            removeLastStepFromStepsMap();
            resetAllControllers();
            setQuestionsToBody(animationDuration, prevQuestion);

            /* Удаляем ТЕКУЩИЕ ответы из STORE на тот случаей
             * елси ПЕРЕШЛИ НАЗАД ИЗ ВОПРОСА с множественными
             * ответами (с radio контроллерами)
             */
            resetAnswerFromStore(thisQuestion);

            // Удаляем ПРЕДЫДУЩИЕ ответы из STORE
            // т.к. он будет выбран заново
            resetAnswerFromStore(prevQuestion);
        }
    };

    const hideQuestions = question => {
        question.addClass('hide');

        return parseFloat(
            question
                .find('.animatible')
                .css('transition-duration')
        ) * 1000;
    };

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
    };

    const updateQuestionWrapperHeight = addedQuestion => {
        let height;

        /* questionHelpMaxHeight компенсирует показ/скрывтие подскази
         * в заголовке вопроса. В этой переменной храним высоту от
         * масимально высокой подсказки
         */
        const questionHelpMaxHeight = 500;

        addedQuestion.removeClass('hidden');
        height = addedQuestion.height();
        addedQuestion.addClass('hidden');

        $('#questionsWrap').css('maxHeight', height + questionHelpMaxHeight);
    };

    const showQuestion = (timeout, addedQuestion) => {
        setTimeout(
            () => addedQuestion.removeClass('hide'),
            timeout + 100
        );
    };

    const pushQuestionToStepsMap = question => {
        let id = $(question).attr('id');
        STORE.stepsMap.push(`#${id}`);
    };

    const removeLastStepFromStepsMap = () => {
        STORE.stepsMap.splice(-1, 1);
    };

    const resetAllControllers = () => {
        $('input.controller').prop('checked', false);
    };

    const resetAnswerFromStore = question => {
        let prop = question.find('.controller').attr('name');
        if (STORE[prop]) delete STORE[prop];
    };

    const setQuestionsToBody = (timeout, question) => {
        const id = question.attr('id');

        const updateCurrentQuestion = () => {
            document
                .body
                .dataset
                .currentQuestion = id;
        };

        setTimeout(updateCurrentQuestion, timeout);
    };
});