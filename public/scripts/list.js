    const listHeader = document.querySelector('header')
    const categories = [{img: ['fa-solid fa-carrot'], cat: 'Vegetables', list: ['carrot', 'apple']}, {img: ['fa-solid fa-bacon'], cat: 'Meat', list: ['Steak', 'Chicken', 'Sausage']}, {img: ['fa-solid fa-cow'], cat: 'Dairy', list: ['Milk', 'Butter']}]
    const doneList = document.querySelector(".doneList")

    categories.forEach((category, index) => {
        listHeader.insertAdjacentHTML('afterend', 
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
    
  
    
    

    
        


        





    
