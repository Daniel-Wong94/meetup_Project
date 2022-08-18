const express = require("express");
const router = express.Router();
const { Image } = require("../../db/models");

// Delete an existing Image: DELETE /api/images/:imageId
router.delete("/:imageId", async (req, res, next) => {
  const { imageId } = req.params;
  const { user } = req;
  const image = await Image.findByPk(imageId);

  if (!image) {
    const err = new Error("Image couldn't be found");
    err.status = 404;
    next(err);
  } else if (image.userId === user.id) {
    await image.destroy();

    res.json({ message: "Successfully deleted" });
  } else {
    res.json({ message: "Must be owner of image to delete" });
  }
});

module.exports = router;
