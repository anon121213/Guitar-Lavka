function CreateNumsLogic(numsClass, lastClass, firstClass, startClass, finishClass){
    const nums = document.querySelectorAll(`.${numsClass}`)
    const last = document.querySelector(`.${lastClass}`)
    const first = document.querySelector(`.${firstClass}`)
    const start = document.querySelector(`.${startClass}`)
    const finish = document.querySelector(`.${finishClass}`)
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
}

