function CreateSliderLeftRight(slides, leftButton, rightButton, indexes){
    
    const secondSlides = document.querySelector(`.${slides}`)
    const secondLeftButton = document.querySelector(`.${leftButton}`)
    const secondRightButton = document.querySelector(`.${rightButton}`)
    const indicates = document.querySelectorAll(`.${indexes}`)

    let secondScrollOffset = 0
    let secondIdSlide = 0

    secondLeftButton.addEventListener('click', () => {

        secondScrollOffset += 240
        indicates[secondIdSlide].classList.remove('active')
        secondIdSlide--

        if(secondScrollOffset > 0){
            secondScrollOffset = -960
            secondIdSlide = 4
        }

        secondSlides.style.left = `${secondScrollOffset}px`
        indicates[secondIdSlide].classList.add('active')
    })

    secondRightButton.addEventListener('click', () => {

        secondScrollOffset -= 240
        indicates[secondIdSlide].classList.remove('active')
        secondIdSlide++

        if(secondScrollOffset < -960){
            secondScrollOffset = 0
            secondIdSlide = 0
        }

        secondSlides.style.left = `${secondScrollOffset}px`
        indicates[secondIdSlide].classList.add('active')
    })
    
}

