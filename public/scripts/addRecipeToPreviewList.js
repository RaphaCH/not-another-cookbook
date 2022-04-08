// const { default: fetch } = require("node-fetch")

let addToPreviewListButton = document.querySelectorAll(".homepage-recipe-addtolist")

addToPreviewListButton.forEach(button=>{
    button.addEventListener('click', (e)=>{
        let data = {}
        let dataset = button.getAttribute('data-recipeId')
        console.log(dataset)
        data.recipeId = dataset
        addToPreview(data)
    
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