//first slider

const nextSliderButton = document.querySelector('.next-button')
const prevSliderButton = document.querySelector('.prev-button')
const slides = document.querySelector('.slides')

let scrolOffset = 0

nextSliderButton.addEventListener('click', event => {

    scrolOffset += 1400

    if(scrolOffset > 0){
        scrolOffset = -4200
    }

    slides.style.left = `${scrolOffset}px`
   
})

prevSliderButton.addEventListener('click', event => {

    scrolOffset -= 1400

    if(scrolOffset < -4200){
        scrolOffset = 0
    }

    slides.style.left = `${scrolOffset}px`
})

//second slider

const secondSlides = document.querySelector('.slider__slides')
const secondLeftButton = document.querySelector('.leftButton')
const secondRightButton = document.querySelector('.rightButton')
const indicates = document.querySelectorAll('.ind')

let secondScrollOffset = 0
let secondIdSlide = 0

secondLeftButton.addEventListener('click', event => {

    secondScrollOffset += 960
    indicates[secondIdSlide].classList.remove('active')
    secondIdSlide--

    if(secondScrollOffset > 0){
        secondScrollOffset = -2880
        secondIdSlide = 3
    }

    secondSlides.style.left = `${secondScrollOffset}px`
    indicates[secondIdSlide].classList.add('active')
})

secondRightButton.addEventListener('click', event => {

    secondScrollOffset -= 960
    indicates[secondIdSlide].classList.remove('active')
    secondIdSlide++

    if(secondScrollOffset < -2880){
        secondScrollOffset = 0
        secondIdSlide = 0
    }

    secondSlides.style.left = `${secondScrollOffset}px`
    indicates[secondIdSlide].classList.add('active')   
})

