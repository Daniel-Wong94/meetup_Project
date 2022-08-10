const router = require("express").Router();
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const { User } = require("../../db/models");

// Test setTokenCookie()
// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       email: "john_doe@email.com",
//     },
//   });

//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// Test restoreUser()
// router.use(restoreUser);
// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });

// Test requireAuth()
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

router.use(restoreUser);

module.exports = router;
