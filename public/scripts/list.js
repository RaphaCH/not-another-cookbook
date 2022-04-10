import LoopIngredientArray from "./identifyCategory.js"

   const content = (async () => await LoopIngredientArray())();



   content
   .then((ingredients)=> {

    const categories = [
        {img: 'fa-solid fa-carrot', cat: 'Fruits & Vegetables', list: ingredients.FruitsVegetablesArr},
        {img: 'fa-solid fa-cow', cat: 'Dairy', list: ingredients.DairyArr}, 
        {img: 'fa-solid fa-bacon', cat: 'Meat & Seafood', list: ingredients.MeatSeafoodArr},
        {img: 'fa-solid fa-bread-slice', cat: 'Grain products & Nuts', list: ingredients.GrainNutsArr},
        {img: 'fa-solid fa-bowl-rice', cat: 'Pasta, Rice & Pulses', list: ingredients.PastaRicePulsesArr},
        {img: 'fa-solid fa-bowl-oil-can', cat: 'Fats & Oils', list: ingredients.FatsOilsArr},
        {img: 'fa-solid fa-bowl-pepper-hot', cat: 'Herbs & Spices', list: ingredients.HerbsSpicesArr},
        {img: "", cat: 'Sauce', list: ingredients.SaucesArr},
        {img: 'fa-solid fa-bottle-water', cat: 'Drinks', list: ingredients.DrinksArr},
        {img: 'fa-solid fa-wine-bottle', cat: 'Alcohol', list: ingredients.AlcoholArr},
        {img: 'fa-solid fa-question', cat: 'No Category Found', list: ingredients.noCategoryFound}
    ]



        console.log('content', content)
       generateHeaders(categories)
   })
   .then(()=>{
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
   
    checkBoxEvent()
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
   })
   .catch((e)=> {console.log(e)})

    const header = document.querySelector('header')
    const doneList = document.querySelector(".doneList")


const generateHeaders = (categories) => {
        // categories.forEach((category, index) => {
        //     console.log("0")
        // })
        console.log(categories)
        categories.forEach((category, index) => {
            console.log("category", category)
            console.log("categorie : ", category.list.length)
            if (category.list.length > 0) {
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
        category.list.forEach((listItem) => {
            document.querySelector(".content.list-ingredients-container.list-flex").insertAdjacentHTML("beforeend", `<div class="list-ingredient list-checkbox list-flex">
            <input type="checkbox">
            <p>${listItem}</p>
        </div>`)
        })

        category.list.forEach((listItem) => {
            doneList.insertAdjacentHTML("beforeend", `<div class="list-ingredient list-checkbox-done list-flex">
            <input type="checkbox">
            <p>${listItem}</p>
        </div>`)
        })
    
    

    })
}


    
  
    
    

    
        


        





    
