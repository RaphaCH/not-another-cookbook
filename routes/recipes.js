const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Recipe = require("../models/recipe").Recipe;
const manualRecipe = require("../models/manualRecipe").manualRecipe;

const ingredientPerRecipe = require('../models/ingredientsPerRecipe').ingredientsPerRecipe;
const Ingredients = require('../models/ingredients').Ingredients;

const Collection = require('../models/collections').Collection;
const axios = require('axios');
const getIngredientInfo = require('../APIS/apiIngredient');



router.get('/addRecipe', (req, res) => {

    res.render('addManualRecipe');
})




router.post('/newRecipe', ensureAuthenticated, async (req, res) => {
    console.log(req.body);
    try {
        let ingredientReference = []

        for (const ingredient of req.body.ingredients) {
            console.log('inside de loop');
            let nameReferente
            if (ingredient.name) {
                let ingredientExists = await Ingredients.exists({ name: ingredient.name })
                if (ingredientExists) {
                    nameReferente = ingredientExists._id;
                    console.log('ingredient exists ' + ingredientExists._id);
                } else {

                    let ingredientInfo = await getIngredientInfo(ingredient.name)
                    let newIngredient = new Ingredients({
                        name: ingredient.name,

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
            const newIngredientsPerRecipe = new ingredientPerRecipe({
                quantity: ingredient.quantity,
                unit: ingredient.unit,
                ingredient: nameReferente
            })
            await newIngredientsPerRecipe.save()
            ingredientReference.push(newIngredientsPerRecipe._id)
            console.log('new created table was ' + newIngredientsPerRecipe._id);


        };
        const newRecipe = new manualRecipe({
            scrapSource: 'user',
            category: req.body.category,
            mainIngredient: req.body.mainIngredient,
            title: req.body.title,
            servingAmount: req.body.portions,
            cookingTime: req.body.cookingTime,
            instructions: req.body.instructions,
            imageLink: req.body.image,
        })
        await newRecipe.save()
        for (let ingredientRef of ingredientReference) {
            console.log('updating new recipe with first reference ' + ingredientRef);
            await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [ ingredientRef ] } })
        }
        console.log('time to go home');
        res.json({status: 200});

    } catch (error) {
        console.log(error);
        res.redirect('/home');
    }
})

router.get('/random', function (req, res) {
    let posts = Recipe.find({}, function (err, recipes) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(recipes);
            console.log(res)
        }
    });
});





module.exports = router;
