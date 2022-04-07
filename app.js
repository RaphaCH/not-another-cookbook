const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const fileupload = require('express-fileupload')
const dotenv = require('dotenv');
// const { myUpdatedRecipes } = require('./models/5recipes.mjs');
dotenv.config();



//passport config:
require('./config/passport')(passport)
// mongoose
mongoose.connect(process.env.DB_COOK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected,,'))
  .catch((err) => console.log(err));


//CLOUDINARY

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: ""
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "diogface",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

//EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//express session

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use(fileupload({ useTempFiles: true }))
app.use("/static", express.static("public"));
app.set("views", __dirname + "/views");



//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/profiles', require('./routes/profiles'));
app.use('/posts', require('./routes/posts'));
app.use('/recipes', require('./routes/recipes'));
// app.use('/5recipesTests', require('./routes/5recipesTests'));
app.use('/lists', require('./routes/lists'));









app.listen(process.env.PORT || 3000, () => { console.log('Server started on port 3000') });