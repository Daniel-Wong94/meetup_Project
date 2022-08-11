const express = require("express");
const { validateLogin, validateSignup } = require("../../utils/validation");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Sign Up: POST /api/users/signup
router.post("/signup", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.signup({ firstName, lastName, email, password });

  user.dataValues.token = await setTokenCookie(res, user);

  return res.json(user);
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

// Get current session: GET /api/users/profile
router.get("/profile", restoreUser, requireAuth, async (req, res, next) => {
  const { user } = req;
  if (user) {
    return res.json(user);
  } else {
    res.json({});
  }
});

// Change Password or Email: PATCH /api/users/profile
router.patch("/profile", restoreUser, requireAuth, async (req, res, next) => {
  const { email: currentEmail } = req.user;
  const { newEmail, currentPassword, newPassword } = req.body;

  const user = await User.findOne({ where: { email: currentEmail } });

  await user.updateCredentials({
    currentEmail,
    newEmail,
    currentPassword,
    newPassword,
  });

  res.json({ message: "Successfully updated credentials" });
});

// Delete profile: DELETE /api/users/profile
router.delete("/profile", restoreUser, requireAuth, async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByPk(id);

  await user.destroy();
  res.clearCookie("token");

  res.json({ message: "Successfully deleted user" });
});

module.exports = router;
