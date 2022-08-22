const { Venue, Membership } = require("../db/models");

const isValidVenue = async (req, res, next) => {
  const { venueId } = req.params;
  const venue = await Venue.findByPk(venueId);

  if (!venue) {
    const err = new Error("Venue couldn't be found");
    err.status = 404;
    next(err);
  }

  req.venue = venue;
  next();
};

const venueAuth = async (req, res, next) => {
  const { user, venue } = req;
  const group = await venue.getGroup();
  const membership = await Membership.findOne({
    where: {
      memberId: user.id,
      groupId: group.id,
    },
  });

  if (
    !membership ||
    (user.id !== group.organizerId && membership.status !== "co-host")
  ) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
  }

  req.venue = venue;
  next();
};

module.exports = {
  isValidVenue,
  venueAuth,
};
