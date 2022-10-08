const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");
const venuesRouter = require("./venues.js");
const eventsRouter = require("./events.js");
const imagesRouter = require("./images.js");
const mapsRouter = require("./maps.js");

router.use(restoreUser);

router.use("/maps", mapsRouter);
router.use("/users", usersRouter);
router.use("/groups", groupsRouter);
router.use("/venues", venuesRouter);
router.use("/events", eventsRouter);
router.use("/images", imagesRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
