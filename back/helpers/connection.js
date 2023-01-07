const mongoose = require("mongoose");
const CONNECTION_URL = process.env.CONNECTION_URL;

const connection = mongoose.createConnection(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection.on("connecting", () => {
  console.log("connected");
});

module.exports = connection;
