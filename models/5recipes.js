const fs = require("fs");
var parseIngredient = require("parse-ingredient")
let recipes = JSON.parse(fs.readFileSync("5recipes.json", "utf-8"));

let myFilter = "1 ("
let ingredients
let myUpdatedRecipes = []


//Loop 




recipes.forEach((recipe) => {

    ingredients = recipe.ingredients
    // console.log(ingredients)

    // console.log(ingredients.length)
    let ingrList = []
    for (i = 0; i < ingredients.length; i++) {
        // console.log('do the parse')
        let str = recipe.ingredients[i]
        if (str.includes(myFilter)) {
            str = str.split("1")
            str = str[1].replace(/[{()}]/g, '')
        }
        //push the parse in an array
        let myParse = parseIngredient(str)
        // console.log(myParse)
        finalIng = {} 

        if(myParse[0] && myParse[0].description){
            finalIng.name = myParse[0].description
        }else{
            finalIng.name = "/"
        }

        finalIng.category = "/"

        if(myParse[0] && myParse[0].quantity){
            finalIng.quantity = myParse[0].quantity
        }else{
            finalIng.quantity = "/"  
        }
        
        if(myParse[0] && myParse[0].unitOfMeasure){
            finalIng.unit = myParse[0].unitOfMeasure
        }else{
            finalIng.unit = "/"
        }
        //call to API
        finalIng.nutrition = "/"
        console.log(finalIng)
        ingrList.push(finalIng)
    }
    recipe.ingredients =  ingrList 

    myUpdatedRecipes.push(recipe)
});
// })


fs.writeFileSync("../models/5recipesCorr.json", JSON.stringify(myUpdatedRecipes))
