

    // <!------------------------- Меню гамбургер и выезжающее меню----------------------- -->

    const hamburgerLine = document.querySelectorAll(".hamburger__line"),
        hamburger = document.querySelector(".hamburger");

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