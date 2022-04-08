const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require("../models/recipe").Recipe

dotenv.config();

let myRecipesArr = []


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