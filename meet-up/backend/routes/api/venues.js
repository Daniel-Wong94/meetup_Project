const express = require("express");
const router = express.Router();
const { Venue, Membership } = require("../../db/models");
const { validateVenue } = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth");
const {
  venueAuth,
  isValidVenue,
} = require("../../middlewares/venue-authorization");

// Edit a venue by id: PATCH /api/venues/:venueId
router.patch(
  "/:venueId",
  requireAuth,
  isValidVenue,
  validateVenue,
  venueAuth,
  async (req, res, next) => {
    const { venue } = req;
    const { address, city, state, lat, lng } = req.body;

    await venue.update({
      address: address || venue.address,
      city: city || venue.city,
      state: state || venue.state,
      lat: lat || venue.lat,
      lng: lng || venue.lng,
    });

    res.json(venue);
  }
);

// Get all Venues: GET /api/venues
router.get("/", async (req, res, next) => {
  const venues = await Venue.findAll();
  res.json({ Venues: venues });
});

// Create a Venue: POST /api/venues
router.post("/", requireAuth, validateVenue, async (req, res, next) => {
  const venue = await Venue.create(req.body);
  res.json(venue);
});

module.exports = router;
