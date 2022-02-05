    // 1. Функция таба
    function tabsDo({
        // Родитель табов (кнопок, активирующих показ
        //     соответствующего контента)
        headerSliderSelector,
        // Сам таб
        tabsSelector,
        // Изображение, находящееся внутрие таба     
        btnIMGSelector,
        // Ссылка, находящееся внутри таба
        linkSelektor,
        // Блок контента, который показывается при нажатии
        // на таб
        contentSelector,

    }) { // Родитель табов (кнопок, активирующих показ
        //     соответствующего контента)
        const header = document.querySelector(headerSliderSelector),
            // Сам таб
            tabs = document.querySelectorAll(tabsSelector),
            // Изображение, находящееся внутрие таба   
            btnIMG = document.querySelectorAll(btnIMGSelector),
            // Ссылка, находящееся внутри таба 
            link = document.querySelectorAll(linkSelektor),
            // Блок контента, который показывается при нажатии
            // на таб
            content = document.querySelectorAll(contentSelector);
        // Скрытие всего контента и удаление класса
        // активности со всех ссылок табов по умоланию
        function hideTab() {
            content.forEach(content => {
                content.classList.add('hide');
                content.classList.remove('show');
            });

            link.forEach(link => {
                link.parentNode.classList.remove('after_click');
            });
        }

        // При нажатии на таб его индекс присваивается к 
        // соответствующему контенту, который будет показываться.
        function showTab(i = 0) {
            content[i].classList.add('show');
            content[i].classList.remove('hide');
        }
        hideTab();
        showTab();
        // Делегирование облочки таба, на изображение btnIMGSelector и 
        // ссылку linkSelektor, находящееся в нем.
        // btnIMGSelector селектор, btnIMG - переменная этого селектора
        // linkSelektor селектор, link - переменная этого селектора
        header.addEventListener('click', (e) => {
            const target = e.target;
            if (target && (target.matches(tabsSelector) ||
                    target.matches(tabsSelector))) {
                tabs.forEach((tab, i) => {
                    if (target == tab) {
                        hideTab();
                        showTab(i);
                    }
                });
            }
        });
    }

    // 2. Вызов функции таба на один из табов
    tabsDo({
        headerSliderSelector: '.tabheader__items',
        tabsSelector: '.tabheader__item',
        btnIMGSelector: '.glazing_block img',
        linkSelektor: '.glazing_block a',
        contentSelector: '.tabcontent',
    });