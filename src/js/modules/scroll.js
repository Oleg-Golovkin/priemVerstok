
    // <!-------------------------- Динамическая шкала --------------------->
    const workLevel = document.querySelectorAll(".work__level"),
        input = document.querySelectorAll(".input"),
        scale = document.querySelectorAll(".work__scale");

    input.forEach(function (item, i) {
        item.value = "85";
        scale[i].style.width = `${item.value}%`
    });

    workLevel.forEach(function (item, i) {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.target && e.target === item) {
                if (input[i].value > 100) {
                    input[i].value = "100"
                }
                scale[i].style.width = `${input[i].value}%`;
            }
        });
    });
