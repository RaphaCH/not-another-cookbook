const data = require("./5recipesCorr.json")
console.log(data[0])

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require("../models/recipe").Recipe
// const Ingredients = require("../models/ingredient").Ingredients

dotenv.config();




const addRecipeToDb = async () => {
    console.log("adding to db")
    try {
        const newRecipe = new Recipe(data[1])
        await newRecipe.save()
    } catch (error) {
        console.log(error)
        mongoose.connection.close()
    }finally
    {
        mongoose.connection.close()

    }


}

mongoose.connect("mongodb+srv://RaphaelCH:577uLumAb9wynY7@cluster0.zjqfk.mongodb.net/notAnotherCookBook?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
     addRecipeToDb()
    })
    .then(() => {
        // mongoose.connection.close()
    })
    .catch((err) => console.log(err));



