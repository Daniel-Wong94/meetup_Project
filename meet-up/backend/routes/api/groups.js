const express = require("express");
const router = express.Router();
const { Group, User } = require("../../db/models");
const { validateGroup } = require("../../utils/validation.js");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");

// Get a group by groupId: GET /api/groups/:groupId
router.get("/:groupId", async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);
    const user = await group.getUser({
      attributes: ["id", "firstName", "lastName"],
    });

    const payload = {
      ...group.dataValues,
      Organizer: user,
    };

    res.json(payload);
  } catch (e) {
    const err = new Error("Group couldn't be found.");
    err.status = 404;
    next(err);
  }
});

// Update an existing group by id: PATCH /api/groups/:groupId
router.patch("/:groupId", restoreUser, requireAuth, async (req, res, next) => {
  try {
    const { name, about, type, private, city, state } = req.body;
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    await group.update({
      name: name || group.name,
      about: about || group.about,
      type: type || group.type,
      private: private || group.private,
      city: city || group.city,
      state: state || group.state,
    });

    res.json(group);
  } catch (e) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    next(err);
  }
});

// Get all groups: GET /api/groups
router.get("/", async (req, res, next) => {
  const groups = await Group.findAll();

  res.json({ Groups: groups });
});

// Create a group: POST /api/groups
router.post("/", validateGroup, async (req, res, next) => {
  const { name, about, type, private, city, state } = req.body;

  const group = await Group.create({ name, about, type, private, city, state });

  res.json(group);
});

module.exports = router;
