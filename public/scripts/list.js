import LoopIngredientArray from "./identifyCategory.js"
// (async () => await LoopIngredientArray())();

const content = await LoopIngredientArray();

    const categories = [
        {img: 'fa-solid fa-carrot', cat: 'Fruits & Vegetables', ingredients: content.FruitsVegetablesArr},
        {img: 'fa-solid fa-cow', cat: 'Dairy', ingredients: content.DairyArr}, 
        {img: 'fa-solid fa-bacon', cat: 'Meat & Seafood', ingredients: content.MeatSeafoodArr},
        {img: 'fa-solid fa-bread-slice', cat: 'Grain products & Nuts', ingredients: content.GrainNutsArr},
        {img: 'fa-solid fa-bowl-rice', cat: 'Pasta, Rice & Pulses', ingredients: content.PastaRicePulsesArr},
        {img: 'fa-solid fa-bowl-oil-can', cat: 'Fats & Oils', ingredients: content.FatsOilsArr},
        {img: 'fa-solid fa-bowl-pepper-hot', cat: 'Herbs & Spices', ingredients: content.HerbsSpicesArr},
        {img: "", cat: 'Sauce', ingredients: content.SaucesArr},
        {img: 'fa-solid fa-bottle-water', cat: 'Drinks', ingredients: content.DrinksArr},
        {img: 'fa-solid fa-wine-bottle', cat: 'Alcohol', ingredients: content.AlcoholArr},
        {img: 'fa-solid fa-question', cat: 'No Category Found', ingredients: content.noCategoryFound}
    ]

const header = document.querySelector('header')
const doneList = document.querySelector(".doneList")

const generateHeaders = (categories) => {

    categories.forEach((category, index) => {

        if (category.ingredients.length > 0) {
            header.insertAdjacentHTML('afterend', 
                `<section class="accordion list-ingredient-category">
                    <input type="checkbox" name="collapse" id="handle${index}" class="expand">
                    <div class="list-header-container list-flex">
                        <div class="list-food-img-container list-flex">
                            <i class="${category.img}"></i>
                        </div>
                        <label for="handle${index}">
                            <h1 class="list-food-name">${category.cat}</h1>
                            <i id='list-expand-arrow'class="fa-solid fa-angle-right arrow"></i>
                        </label>
                    </div>
                    <div class="content list-ingredients-container list-flex">
                        
                    </div>
                </section>`)
            }

        console.log(category)
        let ingredients = category.ingredients

        ingredients.forEach((ingredient) => {
            document.querySelector(".content.list-ingredients-container.list-flex").insertAdjacentHTML("beforeend", `<div class="list-ingredient list-checkbox list-flex">
            <input type="checkbox">
            <p>${ingredient.name} ${ingredient.quantity} ${ingredient.unit}</p>
        </div>`)
        })

        ingredients.forEach((ingredient) => {
            doneList.insertAdjacentHTML("beforeend", `<div class="list-ingredient list-checkbox-done list-flex">
            <input type="checkbox">
            <p>${ingredient.name} ${ingredient.quantity} ${ingredient.unit}</p>
        </div>`)
        })



    })
}

generateHeaders(categories)

const checkBoxEvent = () => {
    const ingredientDiv = Array.from(document.querySelectorAll('div.list-checkbox'))
    const doneDiv = Array.from(document.querySelectorAll('div.list-checkbox-done'))

    ingredientDiv.forEach((id, index) => {
        id.addEventListener('click', () => {
            if (id.firstElementChild.checked || id.firstElementChild.checked===false) {
                doneDiv.forEach((dd) => {
                    if(dd.lastElementChild.innerText === id.lastElementChild.innerText){
                        dd.style.display = "flex"
                        dd.firstElementChild.checked = true
                        id.style.display = "none"
                    }
                })
            }
        })
    })

    doneDiv.forEach((dd, index) => {
        dd.addEventListener('click', () => {
            ingredientDiv.forEach((id) => {
                if(id.lastElementChild.innerText === dd.lastElementChild.innerText){
                    id.style.display = "flex"
                    id.firstElementChild.checked = false
                    dd.style.display = "none"
                }
            })
        })
    })
}

const headerLabel = Array.from(document.querySelectorAll('label:not(.done, .homepage-hamb)'))
const expandArrow = Array.from(document.querySelectorAll('i#list-expand-arrow'))

const arrowEvent = () => {
    
    headerLabel.forEach((label, index) => {
        label.addEventListener('click', () => {
            if (expandArrow[index].classList.contains("fa-angle-right")) {
                // console.log(expandArrow[index].className)
                expandArrow[index].classList.replace('fa-angle-right', 'fa-angle-down')
            } 
            else {
                // console.log(expandArrow[index].className)
                expandArrow[index].classList.replace('fa-angle-down', 'fa-angle-right')
            }
        })
    })
}

const headerLabelDone = document.querySelector('label.done')
const expandArrowDone = document.querySelector('i#list-expand-arrow-done')

const arrowDoneEvent = () => {

    headerLabelDone.addEventListener('click', () => {
        if (expandArrowDone.classList.contains("fa-angle-right")) {
            // console.log(expandArrowDone.className)
            expandArrowDone.classList.replace('fa-angle-right', 'fa-angle-down')
        } 
        else {
            // console.log(expandArrowDone.className)
            expandArrowDone.classList.replace('fa-angle-down', 'fa-angle-right')
        }
    })
}

arrowEvent()
arrowDoneEvent()
checkBoxEvent()





