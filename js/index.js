//first slider

const nextSliderButton = document.querySelector('.next-button')
const prevSliderButton = document.querySelector('.prev-button')
const slides = document.querySelector('.slides')

let scrolOffset = 0
const maxLeftOffset = -window.innerWidth * 3

nextSliderButton.addEventListener('click', event => {

    scrolOffset += window.innerWidth

    if(scrolOffset > 0){
        scrolOffset = -scrolOffset * 3
    }

    slides.style.left = `${scrolOffset}px`
   
})

prevSliderButton.addEventListener('click', event => {

    scrolOffset -= window.innerWidth

    if(scrolOffset < -6399){
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

//scroll button

const BackToStartPage = document.querySelector('.BackToStartPage')

BackToStartPage.addEventListener('click', event => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

})

addEventListener('scroll', event => {

    let scrollY = window.scrollY

    if(scrollY > 600){
        BackToStartPage.style.right = 100 + 'px'
    }
    else if(scrollY <= 600){
        BackToStartPage.style.right = -120 + 'px'
    }
})



