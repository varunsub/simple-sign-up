const { check } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const MS = require("../server");
const Session = require("../models/Session");
const jwt = require("jsonwebtoken");

exports.verifyPasswordsMatch = (req, res, next) => {
  const { cpassword } = req.body;
  return check("password")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters")
    .equals(cpassword);
};

exports.createUser = async (body) => {
  const userExists = await User.findOne({ email: body.email });
  if (userExists !== null) {
    return false;
  }

  delete body.cpassword;
  body.password = await hashPassword(body.password);
  let user = new User(body);
  await user.save();
  delete user.password;
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  let sesh = new Session({ user_id: user._id, token: token });
  sesh.save();
  return token;
};

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(parseInt(process.env.SALT_NUM), (error, salt) => {
      if (error) return reject(error);
      bcrypt.hash(password, salt, (error, hash) =>
        error ? reject(error) : resolve(hash)
      );
    });
  });
}

exports.getAuth = async (token) => {
  try {
    let ver = await jwt.verify(token, process.env.JWT_SECRET);
    let exists = await Session.findOne({ user_id: ver.id, token: token });
    let user = await User.findOne({ id: ver.id }).lean();
    if (user) delete user.password;
    if (exists && user) return user;
    return false;
  } catch (e) {
    return false;
  }
};

exports.handleLogin = async (body) => {
  let user = await User.findOne({ email: body.email });
  let a = await hashCompare(body.password, user.password);
  if (a) {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    let sesh = new Session({ user_id: user._id, token: token });
    await sesh.save();
    return token;
  } else return false;
};

function hashCompare(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) =>
      error ? reject(error) : resolve(result)
    );
  });
}
