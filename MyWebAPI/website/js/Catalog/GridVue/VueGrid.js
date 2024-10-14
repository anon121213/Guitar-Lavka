function CreateGridLogic(gridActiveClass, gridNonActiveClass, listActiveClass, listNonActiveClass, listClass, gridClass){
    const gridActive = document.querySelector(`.${gridActiveClass}`)
    const gridNonActive = document.querySelector(`.${gridNonActiveClass}`)
    const listActive = document.querySelector(`.${listActiveClass}`)
    const listNonActive = document.querySelector(`.${listNonActiveClass}`)
    const list = document.getElementById(`${listClass}`)
    const grid = document.getElementById(`${gridClass}`)

    gridNonActive.addEventListener('click', e => {

        gridActive.classList.remove('hidden')
        gridNonActive.classList.add('hidden')
        listActive.classList.add('hidden')
        listNonActive.classList.remove('hidden')
        grid.classList.remove('hidden')
        list.classList.add('hidden')

    })

    listNonActive.addEventListener('click', e => {

        gridActive.classList.add('hidden')
        gridNonActive.classList.remove('hidden')
        listActive.classList.remove('hidden')
        listNonActive.classList.add('hidden')
        grid.classList.add('hidden')
        list.classList.remove('hidden')

    })
}

