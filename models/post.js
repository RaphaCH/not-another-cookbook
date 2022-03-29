const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  post_content: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post, PostSchema };