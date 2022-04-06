const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require("../models/recipe").Recipe
// const Ingredients = require("../models/ingredient").Ingredients

dotenv.config();

let myRecipesArr = []


const getRecipesFromDb = async () => {
    console.log("get from db")
    try {

        
      myRecipesArr = await Recipe.find({ 'mainIngredient':'_' }).limit(10);
        console.log(myRecipesArr)
    } catch (error) {
        console.log(error)
        // mongoose.connection.close()
    }finally
    {
        // mongoose.connection.close()

    }
    return myRecipesArr

}

// mongoose.connect("mongodb+srv://RaphaelCH:577uLumAb9wynY7@cluster0.zjqfk.mongodb.net/notAnotherCookBook?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//      getRecipesFromDb()
//     })
//     .then(() => {
//         // mongoose.connection.close()
//     })
//     .catch((err) => console.log(err));

// exports.arr = myRecipesArr
// exports.getRecipesFromDb() = getRecipesFromDB()
module.exports = {getMyRecipes :getRecipesFromDb()}