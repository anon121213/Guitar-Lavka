function CreateMobileFilters(mobileSortClass, filtersButtonClass) {
    const mobileSort = document.querySelector(`.${mobileSortClass}`);
    const filtersButton = document.querySelector(`.${filtersButtonClass}`);
    let showfilters = false;

    filtersButton.addEventListener('click', () => {
        showfilters = !showfilters;
        if (showfilters) {
            mobileSort.classList.remove('hidden');
        } else {
            mobileSort.classList.add('hidden');
        }
    });
}
