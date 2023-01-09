const mongoose = require("mongoose");
const connection = require("../helpers/connection");

const Session = new mongoose.Schema({
  token: String,
  user_id: String,
});

module.exports = connection.model("Session", Session);
