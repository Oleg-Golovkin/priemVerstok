
    //--------------------------------- Scroll--------------------//

    // Скрытие иконки прокрутки
    const sroll = document.querySelector(".scroll");

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop < 900) {
            sroll.classList.add("hide");
            sroll.classList.remove("show");
        } else {
            sroll.classList.add("show");
            sroll.classList.remove("hide");
        }
    });
