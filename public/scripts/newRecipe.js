
let cookingTime = document.getElementById('addManualRecipe-cookingtime')
let title = document.getElementById('addManualRecipe-title')
let mainIngredient = document.getElementById('addManualRecipe-mainIngredient');
let portions = document.querySelector('div[id="addManualRecipe-portions"] > span')
let instructions = document.querySelector('.addManualRecipe-preparationtext');
let category = document.querySelector('div[id="img_category"] > span')
let image = document.getElementById('addManualRecipe-imageupload');
let doneBtn = document.getElementById('addRecipeBtn');



doneBtn.addEventListener('click', () => {
    let quantityArray = Array.from(document.querySelectorAll('.addManualRecipeform-field.addManualRecipe-quantity'));
    let unitArray = Array.from(document.querySelectorAll('.addManualRecipeform-field.addManualRecipe-unit'));
    let ingredientNameArray = Array.from(document.querySelectorAll('.addManualRecipeform-field.addManualRecipe-ingredientname'));

    let data = {}
    let quantity = []
    let unit = []
    let ingredientName = []
    data.cookingTime = cookingTime.value;
    data.title = title.value;
    data.mainIngredient = mainIngredient.value;
    data.portions = portions.textContent;
    data.instructions = instructions.textContent;
    data.category = category.textContent;
    data.image = image.value;
    quantityArray.forEach(item => quantity.push(item.value))
    unitArray.forEach(item => unit.push(item.value))
    ingredientNameArray.forEach(item => ingredientName.push(item.value))
    data.quantity = quantity;
    data.unit= unit;
    data.ingredientName = ingredientName;
    console.log(data);
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
    .then(response => console.log(response.json()))
}


