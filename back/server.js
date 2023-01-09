require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/api/user");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const connection = require("./helpers/connection");

const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//allows cors
let origin = process.env.CLIENT_URL ? process.env.CLIENT_URL : "*";
app.use(cors({ credentials: true, origin: origin }));

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", origin);
  res.header("Access-Control-Allow-Headers", origin);
  next();
};
app.use(allowCrossDomain);

// const sessionOptions = {};
// let MS = MongoStore.create({
//   mongoUrl: process.env.CONNECTION_URL,
//   collectionName: "sessions",
//   secret: process.env.JWT_SECRET,
//   transformId: "test",
//   ttl: 60 * 60 * 24 * 7,
// });

// module.exports = { MS };
// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     store: MS,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       // cookie active for 1 week
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//       secure: false,
//     },
//   })
// );

app.use("/api/user", user);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
