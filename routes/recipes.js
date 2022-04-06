const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Recipe = require("../models/recipe").Recipe;
const manualRecipe = require("../models/manualRecipe").manualRecipe;
const Ingredients = require("../models/ingredients").Ingredients;
const Collection = require('../models/collections').Collection;
const axios = require('axios');
const getIngredientInfo = require('../APIS/apiIngredient');



router.get('/addRecipe', (req, res) => {
    res.render('addManualRecipe');
})



// finalVertical.forEach( ingredient =>{
//     for(let i=0; i<3; i++){
//        switch (i) {
//            case 0:
//                updateRecipeQuantity()
//                break;
//             case 1:
//                 checkIngredient()
//                 break;
//             case 2:
//                 updateUnit()
//                 break;
//            default:
//                break;
//        }

//     }
// })


router.post('/newRecipe', ensureAuthenticated, async (req, res) => {
    console.log(req.body);
    try {
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
        for (const ingredient of req.body.ingredients) {
            if (ingredient.quantity) {
                await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [{ quantity: ingredient.quantity }] } })
            } if (ingredient.unity) {
                await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [{ unit: ingredient.unity }] } })
            } if (ingredient.name) {
                let ingredientExists = await Ingredients.exists({ name: ingredient.name })
                if (!ingredientExists) {
                    let ingredientInfo = await getIngredientInfo(ingredient.name)
                    let newIngredient = new Ingredients({
                        name: ingredient.name,
                        quantity: '100',
                        unit: 'grams',
                        nutrition: {
                            calories: ingredientInfo[0],
                            fats: ingredientInfo[1],
                            carbs: ingredientInfo[2],
                            protein: ingredientInfo[3]
                        }
                    })
                    await newIngredient.save()
                    await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [{ name: newIngredient._id }] } })
                } else {
                    await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [{ name: ingredientExists._id }] } })
                }
            }
        };
        // for (let i = 0; i < req.body.ingredientName.length; i++) {
        //     if (req.body.ingredientName[i] !== '') {
        //         let ingredientExists = await Ingredients.exists({ name: req.body.ingredientName[i] })
        //         if (!ingredientExists) {
        //             let ingredientInfo = await getIngredientInfo(req.body.ingredientName[i])
        //             let newIngredient = new Ingredients({
        //                 name: req.body.ingredientName[i],
        //                 quantity: '100',
        //                 unit: 'grams',
        //                 nutrition: {
        //                     calories: ingredientInfo[0],
        //                     fats: ingredientInfo[1],
        //                     carbs: ingredientInfo[2],
        //                     protein: ingredientInfo[3]
        //                 }
        //             })
        //             await newIngredient.save()
        //             await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [{ name: newIngredient._id }] } })
        //         } else {
        //             await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [{ name: ingredientExists._id }] } })
        //         }
        //     }
        // }
        // for (let i = 0; i < req.body.quantity.length; i++) {
        //     await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [{ quantity: req.body.quantity[i] }] } })
        // }
        // for (let i = 0; i < req.body.unit.length; i++) {
        //     await manualRecipe.findOneAndUpdate({ _id: newRecipe._id }, { $push: { ingredients: [{ unit: req.body.unit[i] }] } })
        // }
        // await Collection.findOneAndUpdate({ _id: req.user.profile._id }, { $push: { addRecipe: newRecipe._id } });
        res.redirect('/home');
    } catch (error) {
        console.log(error);
        res.redirect('/home');
    }
})



module.exports = router;
