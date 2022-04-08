const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Recipe = require("../models/recipe").Recipe
const manualRecipe = require('../models/manualRecipe').manualRecipe
const ingredientsPerRecipe = require('../models/ingredientsPerRecipe').ingredientsPerRecipe
const ingredients = require('../models/ingredients').Ingredients

dotenv.config();

let myRecipesArr = []

// .limit(10);
// { 'mainIngredient': '_' }

const getRecipesFromDb = async () => {
    //console.log("get from db")
    try {


        myRecipesArr = await Recipe.find({ 'mainIngredient': '_' }).limit(50);
        console.log(myRecipesArr)


    } catch (error) {
        console.log(error)
    } finally {
    }
    return myRecipesArr
}

module.exports = { getMyRecipes: getRecipesFromDb }