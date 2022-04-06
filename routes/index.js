const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
// const Profile = require("../models/profile").Profile;
// const Profile = require("../models/profile2").Profile;
const Post = require("../models/post").Post
const randomFood = require('../models/stub').arr;

//login page
router.get('/', (req, res) => {
  Post.find({}, (err, allPosts) => {
    res.render('addManualRecipe', { allposts: allPosts });
  })
})
//register page
router.get('/register', (req, res) => {
  res.render('register2');
})


const getProfileAndPopulate = function (id) {
  return Profile.findById(id).populate("posts")
}


const renderDashboardWithPosts = async function (req, res) {
  let posts = await getProfileAndPopulate(req.user.profile._id)

  res.render('homepage', {
    user: req.user,
    posts: posts
  });
}

router.get('/home', ensureAuthenticated, (req, res) => {
  if (!req.user.profile) {
    res.render('homepage', {
      user: req.user,
      food: randomFood
    });
  } else {
    //renderDashboardWithPosts(req, res)
    res.render('homepage', {
      user: req.user,
      food: randomFood
    });
  }
})



module.exports = router;