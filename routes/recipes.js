const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Recipe = require("../models/recipe").Recipe;


router.get('/addRecipe', (req,res) => {
    res.render('addManualRecipe');
})


router.post('/newRecipe', ensureAuthenticated, async (req,res) => {
    console.log(req.body);
    res.redirect('/home');
    // try {
    //     const newRecipe = new Recipe({
    //         scrapSource: 'user',
    //         cate
    //     })
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