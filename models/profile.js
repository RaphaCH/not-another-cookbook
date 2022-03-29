const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  favorite_animal: {
    type: String,
    required: true
  },
  popularity_level: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = { Profile, ProfileSchema };