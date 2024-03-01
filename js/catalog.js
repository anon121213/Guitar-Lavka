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
    
    const target = document.getElementById(targetData).classList.remove('hidden')
    const ArrowId = document.getElementById(`arrow-${targetData}`).style.transform = 'rotate(90deg)'
      
}))