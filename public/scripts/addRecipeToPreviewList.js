import removeFromPreview from "./removeRecipeFromPreviewList.js"

// Adding recipe to preview list 

let addToPreviewListButton = document.querySelectorAll(".homepage-recipe-addtolist")

addToPreviewListButton.forEach(button=>{
    button.addEventListener('click', (e)=>{
        let data = {}
        let dataset = button.getAttribute('data-recipeId')
        console.log(dataset)
        data.recipeId = dataset
        //change add button in savedFloppy --> need to be a toggle and connected to the previewList
        if( e.target.parentElement.innerHTML === `<i class="lni lni-save" style="color: white;"></i>`){
            e.target.parentElement.innerHTML  = `<i class="lni lni-plus style="color: white;"></i>`
            removeFromPreview(data.recipeId)
        }else{
            console.log("add")
            addToPreview(data)
            e.target.parentElement.innerHTML = `<i class="lni lni-save" style="color: white;"></i>`
        }
        // .then(response => window.location.href='/home')
    


    })
})
const addToPreview = (dataObject) => {
fetch('/lists/addItemToPreview', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObject),
})
}
