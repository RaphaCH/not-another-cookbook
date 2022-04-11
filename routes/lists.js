const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe").Recipe;
const manualRecipe = require("../models/manualRecipe").manualRecipe;

const { ensureAuthenticated } = require('../config/auth');


const ingredientPerRecipe =
  require("../models/ingredientsPerRecipe").ingredientsPerRecipe;
const Ingredients = require("../models/ingredients").Ingredients;
const previewList = require("../models/shoppingListPreview").previewList;

const getPreviewListAndPopulate = function (id) {

    // return previewList.findById(id).populate("ingredients")
    return previewList.findById(id).populate({ path: 'ingredients', model: ingredientPerRecipe, populate: { path: 'ingredient', model: Ingredients } })
  }
  

  
  const renderPreviewListWithIngredients = async function (req, res) {
    // let posts = await getProfileAndPopulate(req.user.profile._id)
    let previewList = await getPreviewListAndPopulate(req.user.previewList._id)
    console.log(previewList);
    res.render('listPreview', {
      user: req.user,
      list: previewList
    });
  }


 
const renderPreviewListWithIngredients = async function (req, res) {
  // let posts = await getProfileAndPopulate(req.user.profile._id)
  let previewList = await getPreviewListAndPopulate(req.user.previewList._id);

  res.render("listPreview", {
    user: req.user,
    list: previewList,
  });
};


router.post("/addItemToPreview", async (req, res) => {
  // console.log(req.body)
  // console.log(req.user.previewList)
  try {
    let foundRecipe = await manualRecipe.findById(req.body.recipeId);
    // console.log(foundRecipe)
    // console.log(foundRecipe.title);
    await previewList.findByIdAndUpdate(
      { _id: req.user.previewList },
      { $push: { recipes: foundRecipe._id } }
    );

    for (let i = 0; i < foundRecipe.ingredients.length; i++) {
      await previewList.findByIdAndUpdate(
        { _id: req.user.previewList },
        { $push: { ingredients: foundRecipe.ingredients[i]._id } }
      );
    }
    // await manualRecipe.findById(req.body.recipeId)
  } catch (error) {}
});


router.get('/listPreview', (req,res) => {
    // res.render('listPreview');
    renderPreviewListWithIngredients(req, res)
})

router.get('/list', ensureAuthenticated, (req,res) => {
    res.render('list');
})

router.get('/getFinalList', async (req,res) => {
  let previewList = await getPreviewListAndPopulate(req.user.previewList._id)
  console.log(previewList.ingredients[0].ingredient.name);
  res.send({recipes: previewList.ingredients})
})


  router.post("/removeItemFromPreview", async (req, res) =>{
  console.log(req.body)
  console.log(req.user.previewList)
  try {
    let recipe = await manualRecipe.findById(req.body.recipe)
    let userPreviewList = await previewList.findById(req.user.previewList)
    console.log(userPreviewList.ingredients)
    for (let i= 0; i < recipe.ingredients.length; i++) {
      const ingredient = recipe.ingredients[i];
      for (let index = 0; index < userPreviewList.ingredients.length; index++) {
        const userIngredient = userPreviewList.ingredients[index];
        if (ingredient.toString() === userIngredient.toString()) {
          console.log("deleting")
         await previewList.findByIdAndUpdate( req.user.previewList,{ $pull: { ingredients:ingredient} }) 
       } 
      } 
    await previewList.findByIdAndUpdate( req.user.previewList,{ $pull: { recipes: recipe._id} })
    res.redirect("/lists/listPreview");
  } catch (error) {
    
  }


})

module.exports = router;
