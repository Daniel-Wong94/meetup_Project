const express = require("express");
const router = express.Router();
const { Event, Group, Venue } = require("../../db/models");

// Get all events: GET /api/events
router.get("/", async (req, res, next) => {
  const events = await Event.findAll({
    include: [
      { model: Group, attributes: ["id", "name", "city", "state"] },
      { model: Venue, attributes: ["id", "city", "state"] },
    ],
  });

  res.json({ Events: events });
});

module.exports = router;
