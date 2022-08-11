const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");

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

router.use("/users", usersRouter);
router.use("/groups", groupsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});
module.exports = router;
