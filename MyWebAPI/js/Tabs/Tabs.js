function CreateTabs(tabClass, content){
    const tab = document.querySelectorAll(`.${tabClass}`)
    const tabsContent = document.querySelectorAll(`.${content}`)

    tab.forEach(items => items.addEventListener('click', event => {

        let data = event.target.getAttribute('data-tab')

        tab.forEach(el => el.classList.remove('activeList'))

        items.classList.add('activeList')

        tabsContent.forEach(items => items.classList.add('hidden'))

        document.getElementById(data).classList.remove('hidden')

    }))
}