import "./modules/form_validation";
import "./modules/identification_device";
import "./modules/menu_hamburger";
import "./modules/menu_out";
import "./modules/modal";
import modal_universal from './modules/modal_universal';
import "./modules/timer_universal";
import "./modules/scroll";
import "./modules/scroll_icon";
import "./modules/scroll_smooth";
import "./modules/slider";
import "./modules/tab_universal";
import Slider from "./modules/slider3";
document.addEventListener("DOMContentLoaded", () => {
    modal_universal();
    Slider({
        slideItem: ".offer__slide",
        nextSlideItem: ".offer__slider-next",
        prevSlideItem: ".offer__slider-prev",
        slideWapper: ".offer__slider"
    });


});