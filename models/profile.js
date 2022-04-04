const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collections"//-> typeFav -> a unique array
    }
  ],
  all: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collections"
    }
  ],
  thisWeek: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collections"
    }
  ],
  addIngredients : [
    {}
  ],
  addRecipe: [
    {}
  ]
});
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = { Profile, ProfileSchema };