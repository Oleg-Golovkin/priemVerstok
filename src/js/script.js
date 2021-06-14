"use strict";

// slader

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


// slader2
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


// slader3
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


//Modals

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