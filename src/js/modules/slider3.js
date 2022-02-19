export default function Slider() {
    const slide = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        nextSlide = document.querySelector(".offer__slider-next"),
        prevSlide = document.querySelector(".offer__slider-prev"),
        sliderWrapper2 = document.querySelector(".offer__slider-wrapper-2"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        width = "650";
    //  лучше напрямую писать ширину родителя. Иначе в некоторых случаях 
    // ширина изменяется на, например, 559,1px и возникает ошибка. 

    // Табы создал через цикл. Все табы загнал в этот массив,
    // чтобы иметь возможность работать с ними через их индекс
    let liArrey = [];
    //1. Обязательные переменные
    let offset = 0,
        //  счетчик смещенения +560px Использую для смещения слайдов
        slideIndex = 1;
    //   счетчик слайдов. Использую в табло

    //Необязательный блок. Присваиваю стили
    slider.style.position = "relative";
    sliderWrapper2.style.width = `${slide.length * 100}%`;
    sliderWrapper2.style.transition = '0.5s all';

    //Необязательный блок. Табло счетчика слайдеров в формате 01.
    if (slide.length < 10) {
        //  Подставляет цифрцу к счетчику, чтобы формат 
        //  номера был 01
        total.textContent = `0${slide.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        //  Общее количество слайдов, через показ
        //   длины массива слайов
        total.textContent = slide.length;
        //   Номер текущего слайда
        current.textContent = slideIndex;
    }

    //2. Обязательный блок. Движение слайдов вперед. Содержит необязательные элементы.
    nextSlide.addEventListener('click', () => {
        //   Ограничитель движения слайда. +width.replace(/\D/g, "")
        //  это превращает 560px строка в 560 число
        if (offset == (+width.replace(/\D/g, "") * (slide.length - 1))) {
            offset = 0;
        } else {
            //   При листании вперед к offset прибавляется ширина следующего блока width.
            //   В width защита ширна слайда в виде строки “560px”, а нужно цифрой 560 без px. Поэтому offset //преобразую из строки в число (+whith) и отнимаю у этого числа два последних символа 
            offset += +width.replace(/\D/g, "");
        }
        sliderWrapper2.style.transform = `translateX(-${offset}px)`;

        //Необязательный блок. Счетчик слайдов
        if (slideIndex == slide.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        //3. Порядковый таб загарается соответственно порядковому номеру показываемого слайда
        //   Механизм: перебором все стили едины. Переменная из счетчика подставляется 
        //   в качестве индекса загараемого таба.
        liArrey.forEach(li => li.style.opacity = "0.5");
        liArrey[slideIndex - 1].style.opacity = "1";

        //Необязательный блок если слайдов меньше 10, то формат номера
        //01
        if (slide.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    //4. Кнопка движения назад. Действия аналогичны движению вперед.
    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, "") * (slide.length - 1);
        } else {
            offset -= +width.replace(/\D/g, "");
        }
        sliderWrapper2.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slide.length;
        } else {
            slideIndex--;
        }

        liArrey.forEach(li => li.style.opacity = "0.5");
        liArrey[slideIndex - 1].style.opacity = "1";

        if (slide.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });


    //5. Все, что ниже - это относится к создаюнию табов, нажатию на них и показу //соответствующего слайда, синхронизации счетчика слайдов и переменению слайдов не //через нажатия на соответствующие кнопки, а нажатию на таб. 
    //Загорание табов прописал в событии движений слайдов выше.

    //    5.1. Создаю список
    const ol = document.createElement("ol");
    //    5.2. Присваиваю в нему класс
    ol.classList.add("carousel-indicators");
    //    5.3. Посмещаю в нужное место
    slider.append(ol);

    //    5.3. Элементы списка создаю через цикл, заканчивающийся
    //    тогда, когда закончатся слайды i < slide.length. Это удобно, поскольку
    //   верстка эластична – в зависимости от количества слайдов.
    for (let i = 0; i < slide.length; i++) {
        const li = document.createElement("li");
        //     Начальное значение индекса = 1, чтобы было единообразие,
        //     атрибуты также начинаются с 1, а не с цифры 0, поэтому i + 1
        li.setAttribute("data-carousel-indicators", i + 1);
        li.classList.add("dot");
        ol.append(li);
        if (i == 0) {
            li.style.opacity = "1";
        }
        //     5.4. Все элементы списка поместил в пустой массив, чтобы иметь возможность
        //     работать через их индекс с каждым элементом.   
        liArrey.push(li);
    }

    //     5.5 Смещение слайда на тот, который по порядку соответствует нажимаемому 
    // индикатору. 

    liArrey.forEach(li => {
        li.addEventListener('click', () => {
            //            Получаю атрибут каждого из индикаторов
            let Attribute = li.getAttribute("data-carousel-indicators");
            //            Присваиваю к уже созданной переменной slideIndex. Даты-атрибут начинаются
            //            с 1, как и переменная slideIndex, так что действия будут ожидаемы
            slideIndex = Attribute;
            //            Для получение слайда не по порядку, а мгновенно, умножаю ширину слайда на  
            //            slideIndex и таким образом получается ширина нужного для перемещения 
            //            слайда.
            offset = +width.replace(/\D/g, "") * (Attribute - 1);
            sliderWrapper2.style.transform = `translateX(-${offset}px)`;
            liArrey.forEach(li => li.style.opacity = "0.5");
            li.style.opacity = "1";
            if (slide.length < 10) {
                current.textContent = `0${+slideIndex}`;
            } else {
                current.textContent = +slideIndex;
            }
        });
    });
}




// Преподавателя вариант прокрутки слайдера. Слайдер появляется не плавно

// // 1. Слайд c индексом 0
// // показывается сразу по умолчанию
// // см. 3.3. Остальные пунты в п 3 применяться
// // не будут
// showSlide(indexSlide);
// total.textContent = `0${slide.length}`;


// // 2. При нажатии вперед 
// // к indexSlide прибавляется либо отнимается 1
// nextSlide.addEventListener('click', () => {

//     showSlide(++indexSlide);
//     console.log(indexSlide);

// });

// prevSlide.addEventListener('click', () => {
//     showSlide(--indexSlide);
//     console.log(indexSlide);
// });
// // 3. showSlide запускается с цифрой 2 (то, 
// // что получилось в nextSlide)
// // Не записывать в функцию сам indexSlide, 
// // поскольку по какой-то причине к let не
// // присваивается новое значине при прокуртке 
// // по кругу.
// function showSlide(n) {
//     // 3.1 Прокрутка слайдов по кругу
//     // при достижении верхнего слайда
//     if (n > slide.length) {
//         //  Если то, что получилось в plusSlide
//         // больше общего количества слайлов, то
//         // возвращаемся к первому слайду            
//         indexSlide = 1;
//     }
//     // 3.1 При достижении ниже
//     // перого слайда
//     if (n < 1) {
//         indexSlide = slide.length;
//     }

//     // 3.2 Удаляем все слайды
//     slide.forEach(item => {
//         item.style.display = "none";

//     });

//     // Если цифры до 10, то они показываются
//     // на счетчике с формате 01
//     if (n < 10) {
//         current.textContent = `${0}${indexSlide}`;
//     } else {
//         current.textContent = indexSlide;
//     };

//     // 3.3. Показываем слайд с соответствующим 
//     // индексом. По умолчанию 1
//     slide[indexSlide - 1].style.display = "block";
//     /* добавляем один из по порядку */
//     // -1, поскольку первый слайд под
//     // индексом 0      
// }


// Мой вариант прокрутки слайдера. Слайдер появляется не плавно
// function hideSlide() {
//     slide.forEach(item => {
//         item.style.display = "none"; /* удаляем весь контент */
//     });
// }

// function showSlide(i = 0) {
//     slide[i].style.display = "block"; /* добавляем один из по порядку */
// }
// hideSlide();
// showSlide();

// slide.forEach((item, c) => {
//     total.textContent = `${0}${c + 1}`;
// });
// let i = 0,
//     /* переменная по прокрутке изображения */
//     b = 1;
// /* переменная по простановке цифры, отсчитывающей
//        изображение. Цифра не 0, чтобы было более привычней. */
// current.textContent = "01";

// sliderCounter.addEventListener("click", (e) => {
//     if (e.target && e.target.matches(`${".offer__slider-next"}, ${".offer__slide__next__img"}`)) {

//         if (i == 3) {
//             i = 0;
//             b = 1;
//             current.textContent = `${0}${b}`;
//             hideSlide();
//             showSlide(i);
//             sliderCounter.removeEventListener("click", (e));
//         } else if (i <= 3) {
//             i++;
//             b++;                   
//             if (i < 10) {
//                 current.textContent = `${0}${b}`;
//             } else {
//                 current.textContent = b;
//             }
//             hideSlide();
//             showSlide(i);
//         }
//     }

//     if (e.target && e.target.matches(`${".offer__slider-prev"}, ${".offer__slide__prev__img"}`)) {

//         if (i == 0) {
//             i = 3;
//             b = 4;
//             current.textContent = `${0}${b}`;
//             hideSlide();
//             showSlide(i);
//             sliderCounter.removeEventListener("click", (e));
//         } else if (i <= 3) {
//             i--;
//             b--;

//             if (i < 10) {
//                 current.textContent = `${0}${b}`;
//             } else {
//                 current.textContent = b;
//             }

//             hideSlide();
//             showSlide(i);
//         }
//     }
// });