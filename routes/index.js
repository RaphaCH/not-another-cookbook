const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Profile = require("../models/profile").Profile;
const Post = require("../models/post").Post

//login page
router.get('/', (req, res) => {
  Post.find({}, (err, allPosts) => {
    res.render('homepage2', { allposts: allPosts });
  })
})
//register page
router.get('/register', (req, res) => {
  res.render('register');
})


const getProfileAndPopulate = function (id) {
  return Profile.findById(id).populate("posts")
}


const renderDashboardWithPosts = async function (req, res) {
  let posts = await getProfileAndPopulate(req.user.profile._id)

  res.render('dashboard', {
    user: req.user,
    posts: posts
  });
}



router.get('/dashboard', ensureAuthenticated, (req, res) => {
  if (!req.user.profile) {
    res.render('dashboard', {
      user: req.user
    });
  } else {
    renderDashboardWithPosts(req, res)

  }
})
module.exports = router;