const modal_universal = () => {

    // Верстка такова, что скрываем и показываем
    // фон модального окна (его подложку)    
    //-------------------1. Функции---------------------------------------//
    // 1.1. Скрытие, показ модального окна 
    function actionModal({
        /* кнопка, открываюая мод. окно */
        selectorButton,
        /* Подложка (фон) конкретного модального окна */
        selectorModal,
        /* Подложки (фон) всех модальных окон */
        // Чтобы закрывать все окна на случай вызова модального
        // окна через другое модальное окно, а не через верстку.
        // В обратном случае два открытых окна будут мешаться
        // друг другу.
        selectorModals,
        /* кнопка, скрывающая фон модального окна
        вместе с модальным окном */
        selectorClose,
        /* класс, присваивающий display: block; */
        selectorShow,
        dataModals = true,
        dataValidation = false,
    }) {

        const button = document.querySelectorAll(selectorButton),
            modal = document.querySelector(selectorModal),
            modals = document.querySelectorAll(selectorModals),
            close = document.querySelectorAll(selectorClose);


        // Прописать класс показывающий и скрывающий модальное окно
        function closeModal() {
            modal.classList.remove(selectorShow);
            // Окно не прокручивается
            document.body.style.overflow = "";
        }

        function showModal() {
            // Все окна закрываются
            modals.forEach(item => {
                item.classList.remove(selectorShow);
            });
            // Открывается только заданное модальное окно
            modal.classList.add(selectorShow);
            // Окно прокручивается
            document.body.style.overflow = "hidden";
        }

        


        // Событие все кнопоки
        button.forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();               
                if (e.target && dataValidation) {
                    if (e.target) {
                        modals.forEach(item => {
                            item.classList.remove(selectorShow);
                        });
                        showModal();
                    } else {
                        let statusMessage = document.createElement('div');
                        statusMessage.classList.add('status');
                        statusMessage.textContent = "Не все выбрано";
                        document.querySelector('.popup_calc_content').appendChild(statusMessage);
                        setTimeout(function () {
                            statusMessage.remove();
                        }, 2000);
                    }
                    if (e.target) {
                        modals.forEach(item => {
                            item.classList.remove(selectorShow);
                        });
                        showModal();
                    } else {
                        console.log('Нет');
                    }

                } else if (e.target && !dataValidation) {
                    // Все окна закрываются
                    modals.forEach(item => {
                        item.classList.remove(selectorShow);
                    });
                    showModal();
                }
            });
        });

        // Клик на крестики - окно исчезает
        close.forEach(close => {
            close.addEventListener("click", (e) => {
                // Все окна закрываются
                modals.forEach(item => {
                    item.classList.remove(selectorShow);
                });
                closeModal();
                document.body.style.overflow = "";
            });
        });

        // Клик на подложку - окно исчезает
        modal.addEventListener("click", (e) => {
            // Если кликаем только на подложку,
            // а не на само модальное окно
            if (e.target === modal && dataModals) {
                // Все окна закрываются
                modals.forEach(item => {
                    item.classList.remove(selectorShow);
                });
                closeModal();
                document.body.style.overflow = "";
            }
        });

        // Закрытие окна на клавишу 
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains(selectorShow)) {
                closeModal();
                document.body.style.overflow = "";
            }
        });
    }

    //1.2.Через время открываются не все, а конкретное окно
    function timerShowModal({
        selectorModal,
        time,
        selectorShow
    }) {
        setTimeout(function () {
            document.querySelector(selectorModal).classList.add(selectorShow);
        }, time);
    }

    


    //-------------------2. Вызовы функций---------------------------------------//
    // 
    // 2.1. Вызов открытия конкретного окна через время
    // timerShowModal({
    //     selectorModal: ".popup_engineer",
    //     time: 3000,
    //     selectorShow: 'show'
    // });

    // 2.2. Выбрать замерщика
    actionModal({
        /* кнопка, открываюая мод. окно */
        selectorButton: ".popup_engineer_btn",
        /* Подложка (фон) модального окна */
        selectorModal: '.popup_engineer',
        /* кнопка, закрывающая модальное окно */
        selectorClose: '.popup_close',
        /* класс (без точки), присваивающий display: block; */
        selectorShow: 'show'
    });


};

export default modal_universal;