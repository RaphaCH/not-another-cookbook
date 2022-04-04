const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ]
});
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = { Profile, ProfileSchema };