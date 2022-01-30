
    
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