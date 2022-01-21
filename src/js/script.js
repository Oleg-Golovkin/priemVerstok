document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    //----------------------- slader----------------//

    const productContent = document.querySelectorAll(".product__content"),
        productDetails = document.querySelectorAll(".product__details"),
        productList = document.querySelectorAll(".product__list"),
        productBack = document.querySelectorAll(".product__back");

    function Tab(i) {
        productContent[i].classList.toggle("product__content_active");
        productList[i].classList.toggle("product__list_active");
    }

    function TabNext(selector) {
        selector.forEach((item, i) => {
            item.addEventListener("click", (e) => {
                /* присваиваем всем селекторам событие */
                e.preventDefault(); /*  Отменяем действие по умолчанию */
                Tab(i); /* индекс того элемента, который нажали, присваиваем к классу */
            });
        });
    }
    TabNext(productDetails); /* поскольку действия однотипные, все обернул в функцию */
    TabNext(productBack);


    // ----------------------------------slader2-------------//
    const tabHeaderItems = document.querySelector(".tabheader__items"),
        tabHeaderItem = document.querySelectorAll(".tabheader__item"),
        tabContent = document.querySelectorAll(".tabcontent");

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove('show', 'fade');
        });

        tabHeaderItem.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabHeaderItem[i].classList.add("tabheader__item_active");
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
    }

    hideTabContent();
    showTabContent();

    tabHeaderItems.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("tabheader__item")) {
            tabHeaderItem.forEach((item, i) => {
                if (e.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    //------------------------------ slader3--------------------
    // -------------------Слайдер-----------------------////
    const wrapper = document.querySelector(".offer__slider-wrapper"),
        slide = document.querySelectorAll(".offer__slide"),
        sliderCounter = document.querySelector(".offer__slider-counter"),
        sliderPrev = document.querySelector(".offer__slider-prev"),
        sliderNext = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total");

    function hideSlide() {
        slide.forEach(item => {
            item.style.display = "none"; /* удаляем весь контент */
        });
    }

    function showSlide(i = 0) {
        /* чтобы сразу первая картинка показывалась */
        slide[i].style.display = "block"; /* добавляем один из по порядку */
    }
    hideSlide(); /* запустить по умолчанию */
    showSlide(); /* запустить по умолчанию */

    function scrollSlide() {
        let i = 0,
            /* переменная по прокрутке изображения */
            b = 1;
        /* переменная по простановке цифры, отсчитывающей
               изображение. Цифра не 0, чтобы было более привычней. */
        current.textContent = "1";
        total.textContent = "4";

        sliderCounter.addEventListener("click", (e) => {
            if (e.target && e.target.matches(`${".offer__slider-next"}, ${".offer__slide__next__img"}`)) {
                if (i == 3) {
                    sliderCounter.removeEventListener("click", (e));
                } else if (i <= 3) {
                    i++;
                    b++;
                    current.textContent = b;
                    hideSlide();
                    showSlide(i);
                }
            }

            if (e.target && e.target.matches(`${".offer__slider-prev"}, ${".offer__slide__prev__img"}`)) {
                if (i == 0) {
                    sliderCounter.removeEventListener("click", (e));
                } else if (i <= 3) {
                    i--;
                    b--;
                    current.textContent = b;
                    hideSlide();
                    showSlide(i);
                }
            }
        });
    }
    scrollSlide();

    // progress-bar

    window.addEventListener("scroll", () => {
        var scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    });

    window.addEventListener("scroll", () => {

        if (window.pageYOffset == 400) {
            showModal();
        }
    });


    //------------------------------Modals--------------
    // -------------------Модальные окна-----------------------////

    const windows = document.querySelector(".windows"),
        close = document.querySelectorAll(".window-close"),
        windowsConsultation = document.querySelector(".windows-consultation"),
        product_order = document.querySelector(".product_order"),
        order = document.querySelector("#order"),
        btn_product = document.querySelectorAll(".btn_product"),
        product__title = document.querySelectorAll(".product__title");

    function hideModals() {
        windows.classList.add("hide");
        windows.classList.remove("show");
        windowsConsultation.classList.add("hide");
        windowsConsultation.classList.remove("show");
        product_order.classList.add("hide");
        product_order.classList.remove("show");
    }
    hideModals();

    function showModals(wapperSelector, selector) {
        wapperSelector.classList.remove("hide");
        wapperSelector.classList.add("show");
        selector.classList.remove("hide");
        selector.classList.add("show");
    }

    btn_product.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            if (e.target === item) {
                showModals(windows, product_order);
                order.innerText = product__title[i].innerText
                /* клонирование текста селектора product__title[i]
                     в селектор order */
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && windows.classList.contains("show")) {
            hideModals();
        }

    });


    document.querySelector(".windows").addEventListener("click", (e) => {
        if (e.target == windows) {
            hideModals();
        }
        close.forEach(item => {
            if (e.target == item) {
                hideModals();
            }
        });
    });



    // const ModalTime = setInterval(showModalTime, 2000);

    function showModalTime() {
        showModal();
        clearInterval(ModalTime);
    }

    // window.addEventListener("scroll", () => {            
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         showModal();
    //     }
    // });


    // -------------------forms_sample-----------------------////
    // -------------------Валидация форм-----------------------////

    const form = document.querySelector("#forms_sample"),
        regularEmail = /^[^@]+@[^@.]+\.[^@]+$/,
        regularUser = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
        // регулярка по проверке имени пользователя
        regularPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
        exampleInputPassword1 = form.querySelector('#exampleInputPassword1'),
        // обращаемся к первому окну ввода пароля
        passwordConfirmation = form.querySelector('#password_confirmation');
    // обращаемся ко второму окну ввода пароля

    let validateName,
        validateEmail,
        validatePassword1,
        validatePassword2,
        validatePassword3,
        validatePassword4,
        validateInputValue;

    // Только ключевое слово let (Значение переменной будет меняться)
    // Эту переменную ставим со значением false (где ошибка) и true 
    // (в остальных случаях). Таким образом, можно проверкить, что
    // все поля input заполнены и провеверны на валидность.


    // ----------------------------   Проверка на регулярку ----------------------//

    // 1 часть. Проверка на регулярные выражения.
    form.querySelectorAll("input").forEach((input) => {
        // выделяем из тэга form его input, чтобы дальше работать только с ним
        if (!input.classList.contains("form-check-input") && input.tagName != "BUTTON") {
            // отсекаем ненужные элементы, в данном случае checkbox и button
            if (input.value == "") {
                // и если оставшиеся элементы не заполнены          
                input.addEventListener('blur', () => {
                    validateInput(input);
                });
                // закрепляем также на все input обработчик
                // его тело выводим за перебор. Так удобнее читать
            }
        }
    });

    // 2 часть. Проверка на регулярные выражения.
    const validateInput = (input) => {
        if (input.name == "name") {
            // Обращаемся к input name. Проверка имени пользователя      
            if (!regularUser.test(input.value) &&
                input.value != '') {
                // если не соответствует эталону (регулярному выражению) то
                // проверка на валидность && и валидность проверяется, если 
                // не пустая строка. Последнее, чтобы сообщение об ошибке не
                // появлялось при загр. страницы.          
                input.nextElementSibling.textContent = "Неверное имя пользователя";
                validateName = false;
            } else {
                input.nextElementSibling.textContent = "";
                // если дозаполняем, то текст ошибки удаляется
                validateName = true;
            }
        }

        if (input.name == "email") {
            if (!regularEmail.test(input.value) &&
                input.value != '') {
                // проверка на валидность && и валидность проверяется, 
                // если не пустая строка
                input.nextElementSibling.textContent = "Неверный email";
                validateEmail = false;
            } else {
                input.nextElementSibling.textContent = "";
                // если дозаполняем, то текст ошибки удаляется
                validateEmail = true;
            }
        }

        // Валидация пароля
        // 1. Валидация только на основное окно пороля
        if (input.name == "password") {
            if (!regularPassword.test(input.value) &&
                input.value != "") {
                // проверка на валидность && и валидность проверяется, если не пустая строка
                input.nextElementSibling.textContent = "Неверный пароль";
                validatePassword1 = false;
            } else {
                input.nextElementSibling.textContent = "";
                // если дозаполняем, то текст ошибки удаляется
                validatePassword1 = true;
            }
        }

        // 2. Обращаемся к первому окну заполнения
        if (input.name == "password") {
            // 2.1 Проверка равенства обоих окон заполнения
            if (exampleInputPassword1.value != passwordConfirmation.value &&
                passwordConfirmation.value != "") {
                //  Если пароль первого окна не равен второму поролю и одновременно заполнено 
                // второе окно пороля 
                passwordConfirmation.nextElementSibling.textContent = "Пароль не совпадает";
                exampleInputPassword1.nextElementSibling.textContent = "Пароль не совпадает";
                validatePassword2 = false;
            } else {
                passwordConfirmation.nextElementSibling.textContent = "";
                exampleInputPassword1.nextElementSibling.textContent = "";
                validatePassword2 = true;
            }
            // 2.2. Повторная провка на валидность окон пороля
            if (!regularPassword.test(input.value) &&
                input.value != "") {
                console.log('gdsfg');
                // проверка на валидность && и валидность проверяется, если не пустая строка
                input.nextElementSibling.textContent = "Неверный пароль";
                validatePassword3 = false;
            } else {
                input.nextElementSibling.textContent = "";
                // если дозаполняем, то текст ошибки удаляется
                validatePassword3 = true;
            }

        }

        // 3. Обращаемся ко второму окну заполнения
        if (input.name == "password_confirmation") {
            // Только проверка равенства обоих окон заполнения
            if (passwordConfirmation.value != exampleInputPassword1.value &&
                exampleInputPassword1.value != "") {
                passwordConfirmation.nextElementSibling.textContent = "Пароль не совпадает";
                exampleInputPassword1.nextElementSibling.textContent = "Пароль не совпадает";
                validatePassword4 = false;
            } else {
                passwordConfirmation.nextElementSibling.textContent = "";
                exampleInputPassword1.nextElementSibling.textContent = "";
                validatePassword4 = true;
            }

        }
    };

    // ----------------------------   Маска телефона ----------------------//
    //  Не разбирал

    // В верстке должно быть это:
    //   <body>
    //     <input type="tel" id="tel" maxlength="18" />
    // </body>

    var phoneInputs = document.querySelectorAll('#tel');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    };

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    };

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    };
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    };
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }


    // ----------------------------   Проверка на заполненность всех полей ---//

    // Проверка на заполненность поля
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.querySelectorAll("input").forEach((input) => {
            if (!input.classList.contains("form-check-input") && input.tagName != "BUTTON") {
                // отсекаем ненужные элементы, в данном случае checkbox и button
                if (input.value == "") {
                    // и если оставшиеся элементы не заполнены
                    input.nextElementSibling.textContent = "Данное поле не заполнено!";
                    // то у этого незаполненного элемента сосед nextElementSibling 
                    // будет показывать указанный текст
                    // в верстке под каждым инпутом добавить div, в который и будет
                    // записываться этот текст
                    validateInputValue = false;
                } else {
                    input.nextElementSibling.textContent = "";
                    // если дозаполняем, то текст ошибки удаляется
                    validateInputValue = true;
                }
            }
        });
        // Условие по проверке того, нажата ли галочка о согласии
        // с условиями. Ставим за пределами перебора input


        if (validateName &&
            validateEmail &&
            validatePassword1 &&
            validatePassword2 &&
            validatePassword3 &&
            validatePassword4 &&
            validateInputValue) {
            // если все их этих переменных == true 
            // т.е. если все поля input заполнены и провеверны на валидность
            // т.е. нигде из этих переменных не присвоен false   
            if (form.querySelector(".form-check-input").checked) {
                // если галочка нажата (обращаемся к своейству checked, в
                //   котором при нажатой галочке записывается булиновое значение)
                function dataSend() {
                    // Тут пишется код отправки данных на сервер
                    // Тело этой функции можно вынести за пределы 
                    alert("Данные отправлены");
                }
                dataSend();
                // вызов функции о том, что данные отправлены
                form.querySelector("form").reset();
                // стираем то, что было введено в input. Чтобы
                // // после отправки форма обновилась. Срабатывает
                // только на тэге form!

            } else {
                alert("Согласитесь с условиями");
            }
        }
    });

    //--------------------------------- Scroll--------------------//

    // Скрытие иконки прокрутки
    const sroll = document.querySelector(".scroll");

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop < 900) {
            sroll.classList.add("hide");
            sroll.classList.remove("show");
        } else {
            sroll.classList.add("show");
            sroll.classList.remove("hide");
        }
    });

    //-------------------------Плавная прокрутка------------------------------

    const up = document.querySelector('.scroll__img');
    // 1.	Получаем переменную с ссылкой м заданный атрибутом с заглушкой #

    up.addEventListener('click', (e) => {
        // 2.	Вешаем обработчик события на эту переменную (также можно перебрать все ссылки
        e.preventDefault();
        const upAttribut = e.target.parentNode.getAttribute("href").substr(1);
        // Получаем атрибут href нажимаемой ссылки. Обращаюсь через parentNode, поскольку
        // нажимаю не на ссылку, на изображение в ней.
        // - В обработчике событий получаем атрибут нажимаемой ссылки без значка #, 
        // чтобы можно было получить только слово, которое присвоено к id, куда нужно переместиться.  
        // Этот атрибут присваиваем к переменной.
        document.getElementById(upAttribut).scrollIntoView({
            // Полученный атрибут  с обрезанным substr(1) первым символом. помеащем в поиск по id. 
            // Т.е. будем искать id с этим же атрибутом, но без #
            // Создаем перемещение к этому атрибуту (месту в док. с этим же атрибутом слово)
            // Получаем элемент, к которому мы ранее присвоили только атрибут слово без значка #, и присваиваем 
            // к нему метод скролла c двумя параметрами .scrollIntoView({
            // })
            behavior: "smooth",
            block: 'start' /* к какому месту блока нужно переместиться */
        });
        //     3.	Метод .scrollIntoView работает не во всех браузерах. Чтобы работал во всех на сайте 
        // npm скачиваем файл js из репозитория smoothscroll-polyfill.
        // npm I smoothscroll-polyfill –save но с файлом надежнее
        // Можно этот файл (обычный файл js) напрямую скачать из репозитория и подключить его 
        // как обычный js перед основным js
    });

    const scrollUpButton = document.querySelector('.backToTop');

    if (scrollUpButton) {
        scrollUpButton.addEventListener('click', function name() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });

        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;

            if (scrolled >= 1) {
                scrollUpButton.classList.add('backToTop_visible');
            } else {
                scrollUpButton.classList.remove('backToTop_visible');
            }
        });
    }



    // С какого устройство просматривается страница
    const body = document.body;

    // Определение, заходит ли с мобильного устройства
    // если заходим с декстопа, то тэгу body присваивается класс mouse
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // код для мобильных устройств
        document.body.classList.remove("mouse");
        document.body.classList.add("mobile");
        // scale.forEach(item => {

        // })

    } else {
        // код для обычных устройств
        document.body.classList.add("mouse");
        document.body.classList.remove("mobile");
    }

    //--------------------- Выпадающее меню--------------------------------------------//

    const dropDown = document.querySelector(".drop-down"),
        topmenu = dropDown.querySelector(".topmenu"),
        a = dropDown.querySelectorAll("a"),
        submenu = dropDown.querySelectorAll(".submenu"),
        home = dropDown.querySelectorAll(".home");

    a.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
        });
    });

    // Событие на оболочку меню
    dropDown.addEventListener("click", (e) => {
        // Перебираем элементы меню, на которые будем кликать, 
        // чтобы их порядковый номер присвоить к содержемуся
        // в нем подменю
        home.forEach((item, i) => {
            // Вешаем событие на каждый элемент меню     
            if (e.target && e.target === item) {
                // Скрываем все подменю
                submenu.forEach((item) => {
                    item.style.cssText = "transform: scaleY(0)";
                })
                // Показываем только то подменю, которого индекс совпадает
                // с его родителем - элементом меню
                submenu[i].style.cssText = "transform: scaleY(1)";
            }
        });
        // Скрываем элементы подменю при нажатии на любое свободное пространство
        if (e.target.matches(".drop-down") || e.target.matches(".topmenu")) {
            submenu.forEach((item) => {
                item.style.cssText = "transform: scaleY(0)";
            });
        }
    });

    // <!------------------------- Меню гамбургер и выезжающее меню----------------------- -->

    const hamburgerLine = document.querySelectorAll(".hamburger__line"),
        promo = document.querySelector(".promo"),
        hamburger = document.querySelector(".hamburger"),
        container = document.querySelector(".container");

    function show(selector) {
        document.querySelector(selector).classList.remove("hide");
        document.querySelector(selector).classList.add("show");
    }

    function hide(selector) {
        document.querySelector(selector).classList.remove("show");
        document.querySelector(selector).classList.add("hide");
    }

    document.addEventListener("click", (e) => {
        //----------------------------active menu------------------------------------//
        function activeHamburger(selector) {
            if (e.target && e.target.matches(selector)) {
                hamburgerLine.forEach(item => {
                    item.classList.add("hamburger__line_active");
                });
                document.querySelector(".menu-lateral").classList.add("menu-lateral__active");
                show(".menu-lateral__blackout");
            }
        }
        activeHamburger(".hamburger");
        activeHamburger(".hamburger__line");

        //----------------------------deactivation menu --------------------------//
        if (e.target.matches(".close") || e.target.matches(".menu-lateral__blackout")) {
            hamburgerLine.forEach(item => {
                item.classList.remove("hamburger__line_active");
            });
            document.querySelector(".menu-lateral").classList.remove("menu-lateral__active");
            hide(".menu-lateral__blackout");
        }
    });


    // <!-------------------------- Динамическая шкала --------------------->
    const workLevel = document.querySelectorAll(".work__level"),
        input = document.querySelectorAll(".input"),
        scale = document.querySelectorAll(".work__scale");

    input.forEach(function (item, i) {
        item.value = "85";
        scale[i].style.width = `${item.value}%`
    });

    workLevel.forEach(function (item, i) {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.target && e.target === item) {
                if (input[i].value > 100) {
                    input[i].value = "100"
                }
                scale[i].style.width = `${input[i].value}%`;
            }
        });
    });

    // "browser-sync": "^2.26.14",

    // "gulp": "^4.0.2",
     // "gulp-cli": "^2.3.0",

    // "gulp-sass": "^4.1.0"

});