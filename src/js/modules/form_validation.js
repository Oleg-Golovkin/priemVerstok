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
