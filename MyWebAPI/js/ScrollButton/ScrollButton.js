function CreateScrollButton(startPageButton){
    const backToStartPage = document.querySelector(`.${startPageButton}`)

    backToStartPage.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

    })

    addEventListener('scroll', () => {

        let scrollY = window.scrollY

        if(scrollY > 600){
            backToStartPage.style.right = 100 + 'px'
        }
        else if(scrollY <= 600){
            backToStartPage.style.right = -120 + 'px'
        }
    })
}

