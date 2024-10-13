function CreateBasketButton( nonActiveButton, activeButton, nonActiveMobileButton, activeMobileButton, Mobile){
    const basketButton = document.querySelector(`.${nonActiveButton}`)
    const activeBasketButton = document.querySelector(`.${activeButton}`)
    
    basketButton.addEventListener('click', () => {
        basketButton.classList.add('hidden')
        activeBasketButton.classList.remove('hidden')
    })

    if (!Mobile)
        return;
    
    const mobile_basketButton = document.querySelector(`.${nonActiveMobileButton}`)
    const mobile_activeBasketButton = document.querySelector(`.${activeMobileButton}`)

    mobile_basketButton.addEventListener('click', () => {
        mobile_basketButton.classList.add('hidden')
        mobile_activeBasketButton.classList.remove('hidden')
    })
}