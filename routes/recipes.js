const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Recipe = require("../models/recipe").Recipe;
const Collection = require('../models/collections').Collection;


router.get('/addRecipe', (req,res) => {
    res.render('addManualRecipe');
})


router.post('/newRecipe', ensureAuthenticated, async (req,res) => {
    console.log(req.body);
    res.redirect('/home');
    console.log(req.body.quantity[0]);
    // try {
    //     const newRecipe = new Recipe({
    //         scrapSource: 'user',
    //         category: req.body.category,
    //         mainIngredient: req.body.mainIngredient,
    //         title: req.body.title,
    //         servingAmount: req.body.portions,
    //         cookingTime: req.body.cookingTime,
    //         instructions: req.body.instructions,
    //         imageLink: req.body.image,
    //     })
    //     await newRecipe.save()
    //     await Collection.findOneAndUpdate({_id: req.user.profile._id}, { $push: { addRecipe: newRecipe._id } });
    // } catch (error) {
        
    // }
})

router.get('/random', function (req, res) {
    let posts = Recipe.find({}, function(err, recipes){
        if(err){
            console.log(err);
        }
        else {
            res.json(recipes);
            console.log(res)
        }
    });
});





module.exports = router;