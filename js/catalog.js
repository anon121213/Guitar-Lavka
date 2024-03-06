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

// filters

const listButton = document.querySelectorAll('.listButton')
const list_name = document.querySelectorAll('.list_name')
const Arrow = document.querySelectorAll('.Arrow')

listButton.forEach(item => item.addEventListener('click', event => {

    let targetData = event.target.getAttribute('data-list')

    list_name.forEach(items => items.classList.add('hidden'))
    Arrow.forEach(items => items.style.transform = 'rotate(0deg)')
    
    let target = document.getElementById(targetData).classList.remove('hidden')
    let ArrowId = document.getElementById(`arrow-${targetData}`).style.transform = 'rotate(90deg)'

}))

// vue grid

const gridActive = document.querySelector('.grid_Active')
const gridNonActive = document.querySelector('.grid_nonActive') 
const listActive = document.querySelector('.list_Active')
const listNonActive = document.querySelector('.list_nonActive')
const list = document.getElementById('list')
const grid = document.getElementById('grid')

gridNonActive.addEventListener('click', e => {

    gridActive.classList.remove('hidden')
    gridNonActive.classList.add('hidden')
    listActive.classList.add('hidden')
    listNonActive.classList.remove('hidden')
    grid.classList.remove('hidden')
    list.classList.add('hidden')

})

listNonActive.addEventListener('click', e => {

    console.log(list)
    console.log(grid)
    gridActive.classList.add('hidden')
    gridNonActive.classList.remove('hidden')
    listActive.classList.remove('hidden')
    listNonActive.classList.add('hidden')
    grid.classList.add('hidden')
    list.classList.remove('hidden')

})


//nums

const nums = document.querySelectorAll('.nums')
const last = document.querySelector('.last')
const first = document.querySelector('.firstElement')
const start = document.querySelector('.start')
const finish = document.querySelector('.finish')
let numsId = null

start.addEventListener('click', event => {

    nums.forEach(items => items.classList.remove('box'))

    if(numsId < 2){
        numsId = nums.length + 1
    }

    nums[numsId - 2].classList.add('box')
    numsId--

})

finish.addEventListener('click', event => {

    nums.forEach(items => items.classList.remove('box'))

    if(numsId > nums.length - 1){
        numsId = 0
    }

    nums[numsId].classList.add('box')
    numsId++

})

nums.forEach(item => item.addEventListener('click', event => {

    nums.forEach(items => items.classList.remove('box'))
    event.target.classList.add('box')
    numsId = event.target.id

}))

last.addEventListener('click', event => {

    const lastel = nums.length - 1    
    nums.forEach(items => items.classList.remove('box'))
    nums[lastel].classList.add('box')
    numsId = nums.length

})

first.addEventListener('click', event => {
    
    nums.forEach(items => items.classList.remove('box'))
    nums[0].classList.add('box')
    numsId = 0

})

// favorites button

const nonActiveHeart = document.querySelectorAll('.nonActiveHeart')
const ActiveHeart = document.querySelectorAll('.ActiveHeart')
heartsId = null

nonActiveHeart.forEach(items => items.addEventListener('click', event => {
    heartsId = event.target.id
    nonActiveHeart[heartsId - 1].classList.add('hidden')
    ActiveHeart[heartsId - 1].classList.remove('hidden')
}))

ActiveHeart.forEach(items => items.addEventListener('click', event => {
    heartsId = event.target.id
    ActiveHeart[heartsId - 1].classList.add('hidden')
    nonActiveHeart[heartsId - 1].classList.remove('hidden')
}))

// buscket button

const ActiveBuscket = document.querySelectorAll('.ActiveBuscket')
const nonActiveBuscket = document.querySelectorAll('.nonActiveBuscket')
backetId = null

nonActiveBuscket.forEach(items => items.addEventListener('click', event => {
    backetId = event.target.id
    nonActiveBuscket[backetId - 1].classList.add('hidden')
    ActiveBuscket[backetId - 1].classList.remove('hidden')
}))




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

