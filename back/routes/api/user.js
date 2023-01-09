const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { createUser, getAuth, handleLogin } = require("../../helpers/user");
const jwt = require("jsonwebtoken");
const MS = require("../../server");

router.post(
  "/",
  body("first").not().isEmpty(),
  body("last").isAlpha().not().isEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }).isAlphanumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await createUser(req.body);
    if (user) {
      res
        .cookie("access_token", user, { httpOnly: false })
        .status(200)
        .json({});
    } else res.status(400).json("Already registered or invalid registration");
  }
);
router.get("/", async (req, res) => {
  if (req.cookies && req.cookies.access_token) {
    let valid = await getAuth(req.cookies.access_token);
    if (valid) {
      res.json(valid);
      return;
    }
  }
  res.status(400);
  res.end();
});

router.post("/login", async (req, res) => {
  let data = await handleLogin(req.body);
  if (data) {
    res.cookie("access_token", user, { httpOnly: false }).status(200).json({});
  } else {
    res.status(400);
    res.end();
  }
});

module.exports = router;
