function CreateFavoritesLogic(activeButton, nonActiveButton){
    const nonActiveHeart = document.querySelectorAll(`.${nonActiveButton}`)
    const ActiveHeart = document.querySelectorAll(`.${activeButton}`)
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
}
