export default function Slider({
    slideWapper,
    slideItem,
    nextSlideItem,
    prevSlideItem
}) {
    const slide = document.querySelectorAll(slideItem),
        slider = document.querySelector(slideWapper),
        nextSlide = document.querySelector(nextSlideItem),
        prevSlide = document.querySelector(prevSlideItem),
        sliderWrapper2 = document.querySelector(".offer__slider-wrapper-2"),
        sliderWrapper = document.querySelector(".offer__slider-wrapper"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        width = window.getComputedStyle(sliderWrapper).width;
    let liArrey = [];

    let offset = 0,
        slideIndex = 1;

    function offsetSlide(str) {
        return +str.replace(/\D/g, '');
    }

    slider.style.position = "relative";
    sliderWrapper2.style.width = `${slide.length * 100}%`;
    sliderWrapper2.style.transition = '0.5s all';

    if (slide.length < 10) {
        total.textContent = `0${slide.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slide.length;
        current.textContent = slideIndex;
    }




    nextSlide.addEventListener('click', () => {
        if (offset == offsetSlide(width) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += offsetSlide(width);
        }
        sliderWrapper2.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slide.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        liArrey.forEach(li => li.style.opacity = "0.5");
        liArrey[slideIndex - 1].style.opacity = "1";

        if (slide.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = offsetSlide(width) * (slide.length - 1);

        } else {
            offset -= offsetSlide(width);
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

    const ol = document.createElement("ol");
    ol.classList.add("carousel-indicators");
    slider.append(ol);

    for (let i = 0; i < slide.length; i++) {
        const li = document.createElement("li");
        li.setAttribute("data-carousel-indicators", i + 1);
        li.classList.add("dot");
        ol.append(li);
        if (i == 0) {
            li.style.opacity = "1";
        }
        liArrey.push(li);
    }


    liArrey.forEach(li => {
        li.addEventListener('click', () => {
            let Attribute = li.getAttribute("data-carousel-indicators");
            slideIndex = Attribute;
            offset = offsetSlide(width) * (Attribute - 1);
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