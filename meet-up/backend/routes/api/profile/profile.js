const express = require("express");
const router = express.Router();
const { Membership, Group, User, Image } = require("../../../db/models");
const { requireAuth } = require("../../../utils/auth");
const { validateUserUpdate } = require("../../../utils/validation");

// router.use(requireAuth);

router.get("/pending", requireAuth, async (req, res, next) => {
  const { id: memberId } = req.user;
  const pendingGroups = await Membership.findAll({
    where: {
      memberId,
      status: "pending",
    },
  });

  res.json(pendingGroups);
});

// Get all images of current user: GET /api/users/profile/images
router.get("/images", requireAuth, async (req, res, next) => {
  const { id: userId } = req.user;
  const images = await Image.findAll({ where: { userId } });

  res.json(images);
});

// Get all Groups joined or organized by the Current User: GET /api/users/profile/groups
router.get("/groups", requireAuth, async (req, res, next) => {
  const { id: memberId } = req.user;
  const groups = await Group.findAll({
    include: [{ model: Membership, where: { memberId } }, { model: Image }],
  });

  // Add preview images
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
router.patch("/", requireAuth, validateUserUpdate, async (req, res, next) => {
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
router.delete("/", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;
  const currentUser = await User.scope("loginUser").findByPk(user.id);

  if (currentUser.validatePassword(password)) {
    await Image.destroy({ where: { userId: currentUser.id } });

    await currentUser.destroy();
    res.clearCookie("token");

    res.json({ message: "Successfully deleted user" });
  } else {
    const err = new Error("Incorrect password");
    err.status = 400;
    next(err);
  }
});

module.exports = router;
