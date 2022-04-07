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
        type: mongoose.Schema.Types.Array,
        ref: "Ingredients"
      }
    ],
  instructions:
    [
      {
        type: Array,
        required: true
      }
    ],
  imageLink: {
    type: String,
    required: false
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

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe, RecipeSchema };