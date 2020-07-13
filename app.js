
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

// mongoose.connect("mongodb://" + process.env.DB_HOST + "/confessionsUserDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Remote DB
mongoose.connect(
  "mongodb+srv://dario-admin:" +
    process.env.DB_PASS +
    "@cluster0-bhjc9.mongodb.net/confessionsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
  res.render("home", { currentUser: req.user});
});

app.get("/register", (req, res) => {
  res.render("register")
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/confessions", (req, res) => {
  if (req.isAuthenticated()){
    res.render("confessions", { currentUser: req.user});
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
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

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/login")
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/confessions");
      });
    }
  });

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("server at port 3000")
});
