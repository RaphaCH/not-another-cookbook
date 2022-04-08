const express = require('express');
const router = express.Router();
const Recipe = require("../models/recipe").Recipe;
const manualRecipe = require("../models/manualRecipe").manualRecipe;

const ingredientPerRecipe = require('../models/ingredientsPerRecipe').ingredientsPerRecipe;
const Ingredients = require('../models/ingredients').Ingredients;
const previewList = require('../models/shoppingListPreview').previewList

const getPreviewListAndPopulate = function (id) {
    // return previewList.findById(id).populate("ingredients")
    return previewList.findById(id).populate({ path: 'ingredients', model: ingredientPerRecipe, populate: { path: 'ingredient', model: Ingredients } })
  }
  

  
  const renderPreviewListWithIngredients = async function (req, res) {
    // let posts = await getProfileAndPopulate(req.user.profile._id)
    let previewList = await getPreviewListAndPopulate(req.user.previewList._id)
  
    res.render('listPreview', {
      user: req.user,
      list: previewList
    });
  }



router.get('/listPreview', (req,res) => {
    

    // res.render('listPreview');
    renderPreviewListWithIngredients(req, res)
})

router.get('/list', (req,res) => {
    res.render('list');
})

router.post('/addItemToPreview', async (req, res) =>{
    // console.log(req.body)
    // console.log(req.user.previewList)
    try {
        let foundRecipe = await manualRecipe.findById(req.body.recipeId)
        // console.log(foundRecipe)
           console.log(foundRecipe.title)
           await previewList.findByIdAndUpdate({_id: req.user.previewList}, {$push: {title: foundRecipe.title}} )
    
        for (let i = 0; i< foundRecipe.ingredients.length; i++) {
            
           await previewList.findByIdAndUpdate({_id: req.user.previewList}, {$push: { ingredients: foundRecipe.ingredients[i]._id}})

        }
        // await manualRecipe.findById(req.body.recipeId)
        console.log("hello")
    } catch (error) {
        
    }


})

module.exports = router;