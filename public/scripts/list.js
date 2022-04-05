    const header = document.querySelector('header')
    const categories = ['Vegetables', 'Dairy', 'Meat']

    const ingredientsToGet = ['carrot', 'apple', 'steak', 'maple syrup']
    const ingredientsDone = []

    categories.forEach((category, index) => {
        header.insertAdjacentHTML('afterend', 
    `<section class="accordion list-ingredient-category">
        <input type="checkbox" name="collapse" id="handle${index}" class="expand">
        <div class="list-header-container list-flex">
            <div class="list-food-img-container list-flex">
                <i class="fa-solid fa-carrot"></i>
            </div>
            <label for="handle${index}">
                <h1 class="list-food-name">${category}</h1>
                <i id='list-expand-arrow'class="fa-solid fa-angle-right arrow"></i>
            </label>
        </div>
        <div class="content list-ingredients-container list-flex">
            <div class="list-ingredient list-flex">
                <input type="checkbox" class="list-checkbox">
                <p>${ingredientsToGet[index]}</p>
            </div>
            <div class="list-ingredient list-flex">
                <input type="checkbox" class="list-checkbox">
                <p>${ingredientsToGet[index]}</p>
            </div>
            <div class="list-ingredient list-flex">
                <input type="checkbox" class="list-checkbox">
                <p>${ingredientsToGet[index]}</p>
            </div>
        </div>
    </section>`)
    })
    
    const ingredientSections = (document.querySelectorAll('.list-ingredient-category'))
    const lastSection = ingredientSections[ingredientSections.length-1]

    lastSection.insertAdjacentHTML('afterend',
    `<section class="accordion list-ingredient-done">
    <input type="checkbox" name="collapse" id="handle99" class="expand">
    <div class="list-header-container list-flex">
        <div class="list-food-img-container list-flex">
            <i class="fa-solid fa-check"></i>
        </div>
        <label for="handle99">
            <h1 class="list-food-name">Done</h1>
            <i id='list-expand-arrow'class="fa-solid fa-angle-right arrow"></i>
        </label>
    </div>
    <div class="content list-ingredients-container list-flex">
        <div class="list-ingredient list-flex">

        </div>
        <div class="list-ingredient list-flex">
        </div>
        <div class="list-ingredient list-flex">
        </div>
    </div>
    </section>`
    )

    
    
    
    
    const headerLabel = document.querySelectorAll('label')
    const expandArrow = Array.from(document.querySelectorAll('i#list-expand-arrow'))

    headerLabel.forEach((label, index) => {
        label.addEventListener('click', () => {
            if (expandArrow[index].classList.contains("fa-angle-right")) {
                console.log(expandArrow[index].className)
                expandArrow[index].classList.replace('fa-angle-right', 'fa-angle-down')
            } 
            else {
                console.log(expandArrow[index].className)
                expandArrow[index].classList.replace('fa-angle-down', 'fa-angle-right')
            }
        })
    })



    const ingredientCheckboxes = Array.from(document.querySelectorAll('input.list-checkbox'))
    const doneCheckboxes = Array.from(document.querySelectorAll('input.list-checkbox-done'))
    const doneSection = Array.from(document.querySelectorAll('.list-ingredient-done .list-ingredient'))

    ingredientCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                ingredientsDone.push(checkbox.nextElementSibling.innerText)
                ingredientsToGet.pop(checkbox.nextElementSibling.innerText)
                checkbox.parentElement.innerHTML = ''
                doneSection[index].innerHTML = `<input type="checkbox" class="list-checkbox-done" checked>
                <p>${ingredientsDone}</p>`
                console.log(ingredientsToGet)
                console.log(ingredientsDone)  
            }
            else {
                ingredientsToGet.push(checkbox.nextElementSibling.innerText)
                ingredientsDone.pop(checkbox.nextElementSibling.innerText)
                console.log(ingredientsToGet)
                console.log(ingredientsDone)  
            }
        })
    })

    doneCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('click', () => {
            if (checkbox.checked === false) {
                ingredientsToGet.push(checkbox.nextElementSibling.innerText)
                ingredientsDone.pop(checkbox.nextElementSibling.innerText)
                checkbox.parentElement.innerHTML = ''
                ingredientSections.innerHTML = `<input type="checkbox" class="list-checkbox">
                <p>${ingredientsToGet}</p>`
                console.log(ingredientsToGet)
                console.log(ingredientsDone)  
            }
        })
    })
    
