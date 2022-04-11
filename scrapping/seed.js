const myRecipe = require("./robot/ingredientCorr_1.json")
// console.log(myRecipe[i][0])

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const scrapRecipe = require("../models/scrapRecipeModel").scrapRecipe
const Ingredients = require("../models/ingredients").Ingredients
const ingredientPerRecipe = require("../models/ingredientsPerRecipe").ingredientsPerRecipe
const getIngredientInfo = require('../APIS/apiIngredient')


dotenv.config();






const addRecipeToDb = async () => {
    console.log("adding to db")
    for (i = 20; i < 21; i++) {
        console.log(myRecipe[i].title)
        try {
            let ingredientReference = []

            for (const ingredient of myRecipe[i].ingredients) {
                // console.log('inside de loop');
                let nameReferente
                if (ingredient.name && ingredient.name != "_") {
                    let ingredientExists = await Ingredients.exists({ name: ingredient.name })
                    if (ingredientExists) {
                        nameReferente = ingredientExists._id;
                        // console.log('ingredient exists ' + ingredientExists._id);
                    } else {

                        let ingredientInfo = await getIngredientInfo(ingredient.name)
                        let newIngredient = new Ingredients({
                            name: ingredient.name,
                            category: ingredient.category,
                            nutrition: {
                                calories: ingredientInfo[0],
                                fats: ingredientInfo[1],
                                carbs: ingredientInfo[2],
                                protein: ingredientInfo[3]
                            }
                        })
                        await newIngredient.save()

                        nameReferente = newIngredient._id;
                        console.log('creating new one ' + newIngredient._id);
                    }
                    //at this point, we either have the ingredient or we created a new table with it.
                }
                console.log('create ingredients per recipe table');
                if (ingredient.quantity != "_" && ingredient.name != "_") {
                    if (ingredient.unit === "_") {
                        ingredient.unit = "piece(s)"
                    }
                    const newIngredientsPerRecipe = new ingredientPerRecipe({
                        quantity: ingredient.quantity,
                        unit: ingredient.unit,
                        ingredient: nameReferente
                    })
                    await newIngredientsPerRecipe.save()
                    ingredientReference.push(newIngredientsPerRecipe._id)
                }

                // console.log('new created table was ' + newIngredientsPerRecipe._id);


            };
            let myTextObj = myRecipe[i].instructions.toString()


            const myInstrucitonsArr = []

            myInstrucitonsArr.push(myTextObj)
            console.log('myArrInstruction')
            console.log(myInstrucitonsArr)
            const newRecipe = new scrapRecipe({
                scrapSource: myRecipe[i].scrapSource,
                category: myRecipe[i].category,
                mainIngredient: myRecipe[i].mainIngredient,
                title: myRecipe[i].title,
                servingAmount: myRecipe[i].servingAmount,
                cookingTime: myRecipe[i].cookingTime,
                instructions: myInstrucitonsArr,
                imageLink: myRecipe[i].imageLink,
            })
            await newRecipe.save()
            for (let ingredientRef of ingredientReference) {
                // console.log('updating new recipe with first reference ' + ingredientRef);
                await scrapRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [ingredientRef] } })
            }
            // console.log('time to go home');
        } catch (error) {
            console.log(error)
            mongoose.connection.close()
        } finally {
            // mongoose.connection.close()

        }
    }
    //mongoose.connection.close()


}

mongoose.connect("mongodb+srv://RaphaelCH:577uLumAb9wynY7@cluster0.zjqfk.mongodb.net/notAnotherCookBook?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
     addRecipeToDb()
    })
    .then(() => {

    })
    .catch((err) => console.log(err));



