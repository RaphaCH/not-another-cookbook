const mongoose = require('mongoose');

const IngredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true
  },
  nutrition: {
    calories: {type: Number},
    fats: {type: Number},
    carbs: {type: Number},
    protein: {type: Number},
  }
})

const Ingredients = mongoose.model('Ingredients', IngredientsSchema);

module.exports = { Ingredients, IngredientsSchema };

