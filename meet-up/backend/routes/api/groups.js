const express = require("express");
const router = express.Router();
const { Venue, Group, Membership, Image } = require("../../db/models");
const { validateGroup } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth");

// Add an image to group by groupId: POST /api/groups/:groupId/images
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { url } = req.body;
    const { id: userId } = req.user;

    const group = await Group.findByPk(groupId);
    await group.createImage({ url, userId });
    const image = await Image.scope("postImage").findOne({
      where: { url, userId },
    });

    res.json(image);
  } catch (e) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    next(err);
  }
});

// Get a group by groupId: GET /api/groups/:groupId
router.get("/:groupId", async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, {
      include: [
        { model: Image, attributes: ["id", "imageableId", "url"] },
        { model: Venue },
      ],
    });

    const user = await group.getUser({
      attributes: ["id", "firstName", "lastName"],
    });

    const numMembers = await Membership.count({
      where: {
        groupId,
      },
    });

    const payload = {
      ...group.dataValues,
      numMembers,
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
router.patch(
  "/:groupId",
  requireAuth,
  validateGroup,
  async (req, res, next) => {
    try {
      const { name, about, type, private, city, state } = req.body;
      const { groupId } = req.params;
      const group = await Group.findByPk(groupId);

      if (!group) throw new Error();

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
  }
);

// Delete an existing group by id: DELETE /api/groups/:groupId
router.delete("/:groupId", requireAuth, async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { user } = req;

    const group = await Group.findByPk(groupId);

    if (group.organizerId === user.id) {
      await group.destroy();
      res.json({ message: "Successfully deleted", statusCode: 200 });
    }

    throw new Error("Authorization Error");
  } catch (e) {
    const err = new Error(e.message || "Group couldn't be found");
    err.status = 404;
    next(err);
  }
});

// Get all groups: GET /api/groups
router.get("/", async (req, res, next) => {
  const groups = await Group.findAll({
    include: [{ model: Membership }, { model: Image }],
  });

  groups.forEach((group) => {
    group.dataValues.numMembers = group.Memberships.length;
    delete group.dataValues.Memberships;
    if (group.Images.length) {
      group.dataValues.previewImage = group.Images[0].url;
    }
    delete group.dataValues.Images;
  });

  res.json({ Groups: groups });
});

// Create a group: POST /api/groups
router.post("/", requireAuth, validateGroup, async (req, res, next) => {
  const { name, about, type, private, city, state } = req.body;
  const { user } = req;

  const group = await user.createGroup({
    name,
    about,
    type,
    private,
    city,
    state,
  });

  res.status(201).json(group);
});

module.exports = router;
