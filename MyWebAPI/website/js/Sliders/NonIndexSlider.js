function CreateSlider(slidesClass, leftButton, rightButton){

    const slides = document.querySelector(`.${slidesClass}`)
    const prevSliderButton = document.querySelector(`.${leftButton}`)
    const nextSliderButton = document.querySelector(`.${rightButton}`)

    let scrollOffset = 0

    nextSliderButton.addEventListener('click', event => {

        scrollOffset += window.innerWidth

        if(scrollOffset > 0){
            scrollOffset = -scrollOffset * 3
        }

        slides.style.left = `${scrollOffset}px`

    })

    prevSliderButton.addEventListener('click', event => {

        scrollOffset -= window.innerWidth

        if(scrollOffset < -window.innerWidth * 3){
            scrollOffset = 0
        }

        slides.style.left = `${scrollOffset}px`
    })
}

