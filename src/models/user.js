// require("../db/mongose");
const mongoose = require("mongoose");

const passportMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  confession: String,
});

userSchema.plugin(passportMongoose, { usernameUnique: false });
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

module.exports = User;
