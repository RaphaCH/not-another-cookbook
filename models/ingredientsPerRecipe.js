const mongoose = require('mongoose');

const ingredientsPerRecipeSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredients"
  },
  // nutritionTimesQuantity: {
  //   calories: {type: Number},
  //   fats: {type: Number},
  //   carbs: {type: Number},
  //   protein: {type: Number},
  // }
})

const ingredientsPerRecipe = mongoose.model('ingredientsPerRecipe', ingredientsPerRecipeSchema);

module.exports = { ingredientsPerRecipe, ingredientsPerRecipeSchema };