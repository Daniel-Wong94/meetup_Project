const express = require("express");
const router = express.Router();
const { Membership, Group, User, Image } = require("../../../db/models");
const { requireAuth } = require("../../../utils/auth");

// router.use(requireAuth);

// Get all images of current user: GET /api/users/profile/images
router.get("/images", requireAuth, async (req, res, next) => {
  const { id: userId } = req.user;
  const images = await Image.findAll({ where: { userId } });

  res.json(images);
});

// Get all groups that current user is in: GET /api/users/profile/groups
router.get("/groups", requireAuth, async (req, res, next) => {
  const { id: organizerId } = req.user;
  const groups = await Group.findAll({
    where: { organizerId },
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

// Get current session: GET /api/users/profile
router.get("/", async (req, res, next) => {
  const { user } = req;
  if (user) {
    return res.json(user);
  } else {
    res.json(null);
  }
});

// Change Password or Email: PATCH /api/users/profile
router.patch("/", requireAuth, async (req, res, next) => {
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
router.delete("/", async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByPk(id);

  await user.destroy();
  res.clearCookie("token");

  res.json({ message: "Successfully deleted user" });
});

module.exports = router;
