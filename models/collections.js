const mongoose = require('mongoose');

const RecipeSchema = require('./recipe').RecipeSchema;

const CollectionsSchema = new mongoose.Schema({
  collectionId: {
    type: String,
    required: true
  },
  //collectionId2: mongoose.Schema.Types.ProfileId,
  // allCollections: {
  //   type: [RecipeSchema],
  // }
  all: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ],
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ],
  addRecipe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ]

})

const Collection = mongoose.model('Collection', CollectionsSchema);

module.exports = { Collection, CollectionsSchema };