    // С какого устройство просматривается страница
    const body = document.body;

    // Определение, заходит ли с мобильного устройства
    // если заходим с декстопа, то тэгу body присваивается класс mouse
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // код для мобильных устройств
        document.body.classList.remove("mouse");
        document.body.classList.add("mobile");
        // scale.forEach(item => {

        // })

    } else {
        // код для обычных устройств
        document.body.classList.add("mouse");
        document.body.classList.remove("mobile");
    }
