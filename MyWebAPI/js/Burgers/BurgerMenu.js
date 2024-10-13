function CreateBurgerLogic(burgerButtonClass, menu, contentClass, HideButton){
    const burgerButton = document.querySelector(`.${burgerButtonClass}`)
    const burgerMenu = document.querySelector(`.${menu}`)
    const content = document.querySelector(`.${contentClass}`)
    const hideBurgerButton = document.querySelector(`.${HideButton}`)

    burgerButton.addEventListener('click', event => {

        content.classList.add('hidden')
        burgerMenu.classList.remove('hidden')

    })

    hideBurgerButton.addEventListener('click', event => {

        content.classList.remove('hidden')
        burgerMenu.classList.add('hidden')

    })
}
