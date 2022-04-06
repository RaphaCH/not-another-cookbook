
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
    // let quantityArray = Array.from(document.querySelectorAll('.addManualRecipeform-field.addManualRecipe-quantity'));
    // let unitArray = Array.from(document.querySelectorAll('.addManualRecipeform-field.addManualRecipe-unit'));
    // let ingredientNameArray = Array.from(document.querySelectorAll('.addManualRecipeform-field.addManualRecipe-ingredientname'));

    // let horizontal = turn3VerticalArraysIntoAnObjectInsideAHorizontalArray(ingredientNameArray, quantityArray, unitArray);

    document.querySelectorAll('.addManualRecipe-addingredients').forEach(element => {
        const ingredient = {
            quantity: element.querySelector('[name="quantity"]').value,
            unity: element.querySelector('[name="unit"]').value,
            name: element.querySelector('[name="ingredientname"]').value
        }
        ingredients.push(ingredient);
    })


    // let quantity = []
    // let unit = []
    // let ingredientName = []
    data.cookingTime = cookingTime.value
    data.title = title.value
    data.mainIngredient = mainIngredient.value
    data.portions = portions.textContent
    data.instructions = instructions.textContent
    data.category = category.textContent
    data.image = image.value
    //  data.ingredientsList = horizontal
    // quantityArray.forEach(item => quantity.push(item.value))
    // unitArray.forEach(item => unit.push(item.value))
    // ingredientNameArray.forEach(item => ingredientName.push(item.value))
    // data.quantity = quantity
    // data.unit = unit
    // data.ingredientName = ingredientName
    data.ingredients = ingredients
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

};


// function turn3VerticalArraysIntoAnObjectInsideAHorizontalArray(ingredient, quantity, unit) {
//     let horizontalArray = []
//     for (let i = 0; i < ingredient.length; i++) {
//         for (let j = 0; j < quantity[i].length; j++) {
//             for (let k = 0; k < unit[i][j].length; k++) {
//                 let object = {}
//                 object.name = ingredient[i][j][k]
//                 object.quantity = quantity[i + 1][j][k]
//                 object.unit = unit[i + 2][j][k]
//                 horizontalArray.push(object)
//             }
//         }
//     }
//     return horizontalArray
// }

// let verticalOne = [1, 2, 3, 4]
// let verticalTwo = ["A", "B", "C", "D"]
// let verticalThree = [10, 20, 30, 40]

// let sizeOfEachArray = 4

// let finalVerticalArray = []

// for(let i=0;i<sizeOfEachArray;i++){
//     finalVerticalArray.push([verticalOne[i], verticalTwo[i], verticalThree[i]])
// }

// console.log(finalVerticalArray)



