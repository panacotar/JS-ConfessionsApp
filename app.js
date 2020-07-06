
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://" + process.env.DB_HOST + "/confessionsUserDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema )

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register")
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", (req, res) => {
  const newUser = new User({
      email: req.body.username,
      password: req.body.password
  })

  newUser.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("confessions");  
    }
  })  
});

app.post("/login", (req, res) => {
  const inputEmail = req.body.username;
  const inputPass = req.body.password;

  User.findOne({ email: inputEmail }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser){
        if (foundUser.password === inputPass) {
          res.render("confessions")
        }
      }
    }
  })
})




app.listen(3000, function() {
  console.log("server: port 3000")
});
