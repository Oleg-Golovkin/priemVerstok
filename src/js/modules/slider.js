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