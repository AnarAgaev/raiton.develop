//     // Показываем кнопку Далле и Показать результаты
//     $('.controller_btn-next').on('input', e => showNextButton(e));

//     const showNextButton = e => {
//         let step = $(e.target).closest('.step'),
//             maxHeight = parseFloat(step.css('maxHeight')) + 100,
//             btnWrap = $(step).find('.btnNextStep__wrap');


//         step.css('maxHeight', maxHeight + 'px');
//         btnWrap.addClass('show');

//     }