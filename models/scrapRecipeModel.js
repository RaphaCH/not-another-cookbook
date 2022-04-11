const mongoose = require('mongoose');

const scrapRecipeSchema = new mongoose.Schema({
  scrapSource: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  mainIngredient: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  servingAmount: {
    type: Number,
    required: true
  },
  cookingTime: {
    type: String,
    required: true
  },
  ingredients: //"ingredients":["¼ cup olive oil","2 cloves garlic, minced","1 eggplant, peeled and cut into 1/2-inch cubes","1 (28 ounce) can plum tomatoes with juice, chopped","1 (16 ounce) package rigatoni pasta"]
    [
      { type: mongoose.Schema.Types.ObjectId, ref: "ingredientsPerRecipe" }
    ],
  instructions:
    [
      {
        type: String,
        required: true
      }
    ],
  imageLink: {
    type: String,
    required: true
  },
  nutrition: {
    type: String,
    required: false
  },
  userImage: {
    data: Buffer,
    contentType: String,
    required: false
  },
});

const scrapRecipe = mongoose.model('scrapRecipe', scrapRecipeSchema);

module.exports = { scrapRecipe,  scrapRecipeSchema };