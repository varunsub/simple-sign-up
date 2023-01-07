const mongoose = require("mongoose");
const connection = require("../helpers/connection");

const User = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  password: String,
  salt: String,
  token: String,
});

module.exports = connection.model("User", User);
