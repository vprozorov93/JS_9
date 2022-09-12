const checkBoxes = Array.from(document.querySelectorAll('.interest__check'))

function setChildren(element) {
    const value = element.querySelector('.interest__check').checked
    const children = element.querySelector('.interests_active')
    
    if (children) {
        Array.from(children.querySelectorAll('.interest__check')).forEach((checkBox) => 
        {checkBox.checked = value}
        )
    }
}

function setParent(element) {
    if (element.closest('.interests_active')) {
        const currentLevelCheckBoxes = Array.from(element.closest('.interests_active').querySelectorAll('.interest__check'))
        let checked = 0
        let indeterminate = 0
    
        currentLevelCheckBoxes.forEach((element) => {
            checked += element.checked
            indeterminate += element.indeterminate
        })
    
        const parentCheckBox = element.closest('.interests_active').closest('li').querySelector('.interest__check')
        
    
        if (checked === currentLevelCheckBoxes.length) {
            parentCheckBox.checked = true
            parentCheckBox.indeterminate = false
        } else if (checked > 0 || (checked === 0 && indeterminate > 0)) {
            parentCheckBox.checked = false
            parentCheckBox.indeterminate = true
        } else {
            parentCheckBox.checked = false
            parentCheckBox.indeterminate = false
        }
    
        setParent(parentCheckBox.closest('.interest'))
    }

    
}

function activator(event) {
    const element = event.currentTarget.closest('.interest')
    setChildren(element)
    setParent(element)
}

checkBoxes.forEach((element) => {
    element.addEventListener('click', activator)
})
