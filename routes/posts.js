const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user")
const Post = require("../models/post").Post
const cloudinary = require("cloudinary");


// OUR CODE


router.post("/new", async (req, res) => {
  console.log(req.body)

  try {
    const fileStr = req.files.image;
    const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});
    console.log(uploadResponse);
    const url = uploadResponse.url
    const newPost = new Post({
      title: req.body.title,
      post_content: req.body.post_content,
      url: url
    })
    await newPost.save()
    await Profile.findOneAndUpdate({ _id: req.user.profile._id }, { $push: { posts: newPost._id } })
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    res.redirect("/dashboard")
  }

})

router.post("/upload-image", async (req, res) => {
  try {

    console.log(uploadResponse);
    res.json({ msg: 'yaya' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});





module.exports = router;