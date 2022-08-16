const express = require("express");
const router = express.Router();
const { Event, Group, Venue, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// Add an image to an event: POST /api/events/:eventId/images
router.post("/:eventId/images", requireAuth, async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { url } = req.body;
    const { id: userId } = req.user;

    const event = await Event.findByPk(eventId);
    const image = await event.createImage({ url, userId });
    const { id, imageableId } = image;

    res.json({ id, url, imageableId });
  } catch (e) {
    const err = new Error("Event couldn't be found");
    err.status = 404;
    next(err);
  }
});

// Get details of event by id: GET /api/events/:eventId
router.get("/:eventId", async (req, res, next) => {
  const { eventId } = req.params;
  const event = await Event.findByPk(eventId, {
    include: [
      { model: Group, attributes: ["id", "name", "private", "city", "state"] },
      {
        model: Venue,
        attributes: { exclude: ["createdAt", "updatedAt", "groupId"] },
      },
      { model: Image, attributes: ["id", "imageableId", "url"] },
    ],
  });

  // middleware for no event found
  if (!event) {
    const err = new Error("Event couldn't be found");
    err.status = 404;
    next(err);
  }

  res.json(event);
});

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
