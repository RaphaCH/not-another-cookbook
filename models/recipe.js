const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
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
  ingredients:
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredients"
      }
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
    required: true
  },
  userImage: {
    data: Buffer,
    contentType: String,
    required: false
  },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe, RecipeSchema };