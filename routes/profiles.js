const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user")

// OUR CODE


router.post("/new", async (req, res) => {
  const newProfile = new Profile(req.body)
  // newProfile.save();
  try {
    await newProfile.save()
    await User.findOneAndUpdate({ _id: req.user._id }, { profile: newProfile })
    res.redirect('/dashboard')

  } catch (err) {
    console.log(err)
    res.redirect('/dashboard')
  }
})


router.post("/search", async (req, res) => {
  console.log(req.body)
  const profiles = await Profile.find({ "username": { $regex: req.body.user_input } })
  res.send({ data: profiles })

})

const getUserProfileAndPosts = function (id) {
  return Profile.findById(id).populate("posts")
}


const renderProfileWithPosts = async function (id, req, res) {

  const posts = await getUserProfileAndPosts(id)
  console.log(posts)
  res.render('profile', {
    user: req.user,
    posts: posts
  })
}


router.get('/show/:id', (req, res) => {
  renderProfileWithPosts(req.params.id, req, res)
})




module.exports = router;