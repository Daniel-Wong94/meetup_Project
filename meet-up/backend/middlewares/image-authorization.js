const { Image } = require("../db/models");

const isValidImage = async (req, res, next) => {
  const { imageId } = req.params;
  try {
    const image = await Image.findByPk(imageId);
    req.image = image;

    next();
  } catch (e) {
    const err = new Error("Image couldn't be found");
    err.status = 404;
    next(err);
  }
};

const imageAuth = async (req, res, next) => {
  const { user, image } = req;

  if (user.id !== image.userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
  }
  next();
};

module.exports = {
  isValidImage,
  imageAuth,
};
