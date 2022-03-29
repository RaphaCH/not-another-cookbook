const mongoose = require('mongoose');

const ProfileSchema = require("./profile").ProfileSchema


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  profile: ProfileSchema

});
const User = mongoose.model('User', UserSchema);

module.exports = User;