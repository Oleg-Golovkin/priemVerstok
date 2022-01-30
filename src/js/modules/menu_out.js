
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
