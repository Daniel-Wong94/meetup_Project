const express = require("express");
const { validateLogin, validateSignup } = require("../../utils/validation");
const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");
const profileRouter = require("./profile/profile.js");

const router = express.Router();
router.use("/profile", profileRouter);

// Sign Up: POST /api/users/signup
router.post("/signup", validateSignup, async (req, res, next) => {
  const user = await User.signupUser(req.body);
  user.dataValues.token = await setTokenCookie(res, user);
  res.json(user);
});

// Log In: POST /api/users/login
router.post("/login", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.login({ email, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Invalid credentials";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  user.dataValues.token = await setTokenCookie(res, user);

  return res.json(user);
});

// Log Out: POST /api/users/logout
router.post("/logout", async (req, res, next) => {
  if (req.cookies.token) {
    res.clearCookie("token");
    return res.json({ message: "Successfully logged out" });
  } else {
    const err = new Error("No user currently logged in");
    err.title = "No user currently logged in";
    err.status = 401;
    next(err);
  }
});

module.exports = router;
