function CreateFiltersLogic(listButtonClass, listNameClass, arrowClass){
    const listButton = document.querySelectorAll(`.${listButtonClass}`)
    const list_name = document.querySelectorAll(`.${listNameClass}`)
    const Arrow = document.querySelectorAll(`.${arrowClass}`)

    listButton.forEach(item => item.addEventListener('click', event => {

        let targetData = event.target.getAttribute('data-list')

        list_name.forEach(items => items.classList.add('hidden'))
        Arrow.forEach(items => items.style.transform = 'rotate(0deg)')

        document.getElementById(targetData).classList.remove('hidden')
        document.getElementById(`arrow-${targetData}`).style.transform = 'rotate(90deg)'

    }))
}

