function CreateMobileFilters(mobileSortClass, filtersButtonClass){
    const mobileSort = document.querySelectorAll(`.${mobileSortClass}`)
    const filtersButton = document.querySelectorAll(`.${filtersButtonClass}`)
    let showfilters = false

    filtersButton.addEventListener('click', evet => {
        showfilters = !showfilters

        if(showfilters){
            mobileSort.classList.remove('hidden')
        }else if(!showfilters) {
            mobileSort.classList.add('hidden')
        }
    })
}
