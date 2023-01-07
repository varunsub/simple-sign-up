const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { verifyPasswordsMatch, createUser } = require("../../helpers/user");

router.post(
  "/",
  body("first").not().isEmpty(),
  body("last").isAlpha().not().isEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }).isAlphanumeric(),
  // verifyPasswordsMatch,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await createUser(req.body);
    if (user) res.json(user);
    else res.status(400).json("Already registered or invalid registration");
  }
);

module.exports = router;
