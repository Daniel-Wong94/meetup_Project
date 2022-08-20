const express = require("express");
const router = express.Router();
const { Venue, Group, Membership } = require("../../db/models");
const { validateVenue } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth");

// Edit a venue by id: PATCH venues/:venueId
router.patch(
  "/:venueId",
  requireAuth,
  validateVenue,
  async (req, res, next) => {
    const { user } = req;
    const { venueId } = req.params;
    const { address, city, state, lat, lng } = req.body;

    const venue = await Venue.findByPk(venueId);
    if (!venue) {
      const err = new Error("Venue couldn't be found");
      err.status = 400;
      next(err);
    }

    // authorization middleware here:
    const group = await venue.getGroup();
    if (!group) {
      const err = new Error("Group couldn't be found");
      err.status = 404;
      next(err);
    }

    const membership = await Membership.findOne({
      where: { memberId: user.id, groupId: group.id },
    });

    if (membership.status !== "co-host") {
      const err = new Error("Must be co-host");
      err.status = 404;
      next(err);
    }

    if (group.organizerId === user.id || membership.status === "co-host") {
      await venue.update({
        address: address || venue.address,
        city: city || venue.city,
        state: state || venue.state,
        lat: lat || venue.lat,
        lng: lng || venue.lng,
      });

      res.json(venue);
    }
  }
);

module.exports = router;
