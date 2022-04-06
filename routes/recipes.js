const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Recipe = require("../models/recipe").Recipe;
const Ingredients = require('../models/ingredients').Ingredients;
const Collection = require('../models/collections').Collection;
const axios = require('axios');
const getIngredientInfo = require('../APIS/apiIngredient');



router.get('/addRecipe', (req,res) => {
    res.render('addManualRecipe');
})


router.post('/newRecipe', ensureAuthenticated, async (req,res) => {
    console.log(req.body);
    
    try {
        // const newRecipe = new Recipe({
        //     scrapSource: 'user',
        //     category: req.body.category,
        //     mainIngredient: req.body.mainIngredient,
        //     title: req.body.title,
        //     servingAmount: req.body.portions,
        //     cookingTime: req.body.cookingTime,
        //     instructions: req.body.instructions,
        //     imageLink: req.body.image,
        // })
        // await newRecipe.save()
        for(let i = 0; i <= req.body.ingredientName.length; i++) {
        let {data} = Ingredients.findOne({name: req.body.ingredientName[i]})
            if(!data) {
                getIngredientInfo(req.body.ingredientName[i])
            }
        }
        //await Collection.findOneAndUpdate({_id: req.user.profile._id}, { $push: { addRecipe: newRecipe._id } });
        res.redirect('/home');
    } catch (error) {
        console.log(error);
        res.redirect('/home');
    }
})



module.exports = router;