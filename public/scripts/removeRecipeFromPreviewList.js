//Removing recipe from the user's previewlist collection 

let removeFromPreviewListButton = document.querySelectorAll('.listPreview-recipeDelete')

removeFromPreviewListButton.forEach(removeButton =>{
    removeButton.addEventListener('click', ()=>{
        console.log("clicked the x sign", removeButton.dataset.recipeid)
        removeFromPreview(removeButton.dataset.recipeid)



    })

})

const removeFromPreview = (removeRecipe) => {
    fetch('/lists/removeItemFromPreview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({recipe: removeRecipe}),
    }).then(() => {
        location.reload()
    })
    }