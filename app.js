
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/register", function(req, res) {
  // res.render("register")
  console.log("here will be the register view")
});

app.get("/login", function(req, res) {
  // res.render("login");
  console.log("here will be the login view")
});






app.listen(3000, function() {
  console.log("server: port 3000")
});
