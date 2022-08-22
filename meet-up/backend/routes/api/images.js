const express = require("express");
const router = express.Router();
const { Image } = require("../../db/models");
const {
  isValidImage,
  imageAuth,
} = require("../../middlewares/image-authorization");
const { requireAuth } = require("../../utils/auth");

// Delete an existing Image: DELETE /api/images/:imageId
router.delete(
  "/:imageId",
  requireAuth,
  isValidImage,
  imageAuth,
  async (req, res, next) => {
    const { image } = req;

    await image.destroy();
    res.json({ message: "Successfully deleted" });
  }
);

module.exports = router;
