let cookingTime = document.getElementById('addManualRecipe-cookingtime')
let title = document.getElementById('addManualRecipe-title')
let mainIngredient = document.getElementById('addManualRecipe-mainIngredient');
let portions = document.querySelector('div[id="addManualRecipe-portions"] > span')

let instructions = document.querySelector('.addManualRecipe-preparationtext');
let category = document.querySelector('div[id="img_category"] > span')
let image = document.getElementById('addManualRecipe-imageupload');
let doneBtn = document.getElementById('addRecipeBtn');



doneBtn.addEventListener('click', () => {
    alert('yo')
    let data = {}
    let ingredients = []

  

    document.querySelectorAll('.addManualRecipe-addingredients').forEach(element => {
        const ingredient = {
            name: element.querySelector('[name="ingredientname"]').value,
            quantity: element.querySelector('[name="quantity"]').value,
            unit: element.querySelector('[name="unit"]').value,

        }
        ingredients.push(ingredient);
    })


    data.cookingTime = cookingTime.value
    data.title = title.value
    data.mainIngredient = mainIngredient.value
    data.portions = portions.textContent
    data.instructions = instructions.textContent
    data.category = category.textContent
    data.image = image.value

    data.ingredients = ingredients
    postRecipe(data);
});

const postRecipe = (dataObject) => {
    fetch('/recipes/newRecipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
    })

    .then(response => window.location.href='/home')


};




