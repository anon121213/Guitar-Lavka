function CreateFinderLogic(button, input, logoClass){
    const loopButton = document.querySelector(`.${button}`)
    const inputLine = document.querySelector(`.${input}`)
    const logo = document.querySelector(`.${logoClass}`)
    console.log(loopButton)
    console.log(inputLine)
    console.log(logo)

    loopButton.addEventListener('click', () => {

        loopButton.classList.add('hidden')
        inputLine.classList.remove('hidden')

        if(window.innerWidth < 550){
            logo.classList.add('hidden')
        }

    })
}

