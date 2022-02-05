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