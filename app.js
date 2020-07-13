
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportMongoose = require("passport-local-mongoose");


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://" + process.env.DB_HOST + "/confessionsUserDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportMongoose);

const User = new mongoose.model("User", userSchema );

passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register")
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/confessions", (req, res) => {
  if (req.isAuthenticated()){
    res.render("confessions");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", (req, res) => {

  User.register({username: req.body.username}, req.body.password, (err, user) => {
    if (err){
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/confessions");
      });
    }
  });

});

app.post("/login", (req, res) => {

});




app.listen(3000, function() {
  console.log("server: port 3000")
});
