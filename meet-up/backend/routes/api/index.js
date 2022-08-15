const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");

router.use(restoreUser);

router.use("/users", usersRouter);
router.use("/groups", groupsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
