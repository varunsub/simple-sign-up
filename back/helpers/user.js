const { check } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
  return user;
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
