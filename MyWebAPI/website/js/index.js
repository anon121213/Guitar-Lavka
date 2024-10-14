window.onload = function() {
    CreateSlider("slides", "prev-button", "next-button");
    CreateSliderLeftRight("slider__slides", "leftButton", "rightButton", "ind");
    CreateBurgerLogic("showBurger", "burger",
        "hideBurger", "hideBurgerButton");
    CreateScrollButton("BackToStartPage")
};