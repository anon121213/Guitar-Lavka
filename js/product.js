// scroll button

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


// search

const loopButton = document.querySelector('.loop')
const inputLine = document.querySelector('.input')
const logo = document.querySelector('.logo')

loopButton.addEventListener('click', event => {

    loopButton.classList.add('hidden')
    inputLine.classList.remove('hidden')

    if(window.innerWidth < 550){
        logo.classList.add('hidden')
    }
    
})

// burger

const burgerButton = document.querySelector('.burgerButton')
const burgerMenu = document.querySelector('.burger')
const content = document.querySelector('.content')
const hideBurgerButton = document.querySelector('.hideBurgerButton')

burgerButton.addEventListener('click', event => {

    content.classList.add('hidden')
    burgerMenu.classList.remove('hidden')

})

hideBurgerButton.addEventListener('click', event => {

    content.classList.remove('hidden')
    burgerMenu.classList.add('hidden')

})

// busket button

const busketButton = document.querySelector('.nonActiveBuscket')
const activeBuscketButton = document.querySelector('.ActiveBuscket')

busketButton.addEventListener('click', event => {
    busketButton.classList.add('hidden')
    activeBuscketButton.classList.remove('hidden')
})

// tabs

const tab = document.querySelectorAll('.tab')
const tabsContent = document.querySelectorAll('.tabsContent')

tab.forEach(items => items.addEventListener('click', event => {

    let data = event.target.getAttribute('data-tab')

    tab.forEach(el => el.classList.remove('activeList'))

    items.classList.add('activeList')

    tabsContent.forEach(items => items.classList.add('hidden'))

    document.getElementById(data).classList.remove('hidden')

}))

// slider

const secondSlides = document.querySelector('.slider__slides')
const secondLeftButton = document.querySelector('.leftButton')
const secondRightButton = document.querySelector('.rightButton')
const indicates = document.querySelectorAll('.ind')

let secondScrollOffset = 0
let secondIdSlide = 0

secondLeftButton.addEventListener('click', event => {

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

secondRightButton.addEventListener('click', event => {

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



// player

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        'autoplay': 0,
        'disablekb': 0,   
        videoId: 'z0DnBiM3DtQ',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}
