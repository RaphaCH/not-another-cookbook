const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { myUpdatedRecipes } = require('../models/5recipes.mjs');
const Recipe = require("../models/recipe").Recipe;




router.get('/addRecipe', (req,res) => {
    res.render('addManualRecipe');
})


router.post('/newRecipeTest', ensureAuthenticated, async (req,res) => {
    console.log("inside")
    const newRecipe = new Recipe({
       
    })
    console.log(req.body);
    // res.redirect('/home');
    // try {
    //     const newRecipe = new Recipe({
    //         scrapSource: 'user',
    //         cate
    //     })
    // } catch (error) {
        
    // }
})



module.exports = router;