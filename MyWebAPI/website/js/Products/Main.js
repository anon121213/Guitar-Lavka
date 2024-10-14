window.onload = function() {
    CreateSliderLeftRight("slider__slides", "leftButton", "rightButton", "ind");
    CreateFiltersLogic("listButton", "list_name", "Arrow");
    CreateMobileFilters("mobileSort", "filtersButton");
    CreateFinderLogic("loop", "input", "logo");
    CreateBurgerLogic("burgerButton", "burger", 
        "content", "hideBurgerButton");
    CreateTabs("tab", "tabsContent");
    CreateBasketButton("nonActiveBuscket", "ActiveBuscket",
        "mobile-nonActiveBuscket", "mobile-ActiveBuscket", true);
    CreatePlayer("https://www.youtube.com/iframe_api");
};