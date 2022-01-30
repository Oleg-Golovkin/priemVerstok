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