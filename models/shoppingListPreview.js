const mongoose = require('mongoose');

const previewListSchema = new mongoose.Schema({

  recipes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "manualRecipe" }
  ],  
  ingredients: //"ingredients":["¼ cup olive oil","2 cloves garlic, minced","1 eggplant, peeled and cut into 1/2-inch cubes","1 (28 ounce) can plum tomatoes with juice, chopped","1 (16 ounce) package rigatoni pasta"]
    [
      { type: mongoose.Schema.Types.ObjectId, ref: "ingredientsPerRecipe" }
    ]
 
});

const previewList = mongoose.model('previewList', previewListSchema);

module.exports = { previewList, previewListSchema };