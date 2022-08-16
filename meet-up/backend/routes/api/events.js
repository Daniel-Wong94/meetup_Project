const express = require("express");
const router = express.Router();
const { Event, Group, Venue, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateEvent } = require("../../utils/validation");

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

// Edit an event by id: PATCH /api/events/:eventId
router.patch(
  "/:eventId",
  requireAuth,
  validateEvent,
  async (req, res, next) => {
    const { eventId } = req.params;
    const {
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    } = req.body;
    const event = await Event.findByPk(eventId);

    // middleware to check user is owner

    await event.update({
      venueId: venueId || event.venueId,
      name: name || event.name,
      type: type || event.type,
      capacity: capacity || event.capacity,
      price: price || event.price,
      description: description || event.description,
      startDate: startDate || event.startDate,
      endDate: endDate || event.endDate,
    });

    // add scoping
    const response = await Event.findByPk(eventId);
    res.json(response);
  }
);

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
