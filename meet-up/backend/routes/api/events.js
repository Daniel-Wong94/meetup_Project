const express = require("express");
const router = express.Router();
const {
  Event,
  Group,
  Venue,
  Image,
  Membership,
  Attendee,
  User,
  sequelize,
} = require("../../db/models");
const {
  groupAuth,
  isValidGroup,
} = require("../../middlewares/group-authorization");
const { requireAuth } = require("../../utils/auth");
const { validateEvent, validateEventQuery } = require("../../utils/validation");
const { isValidEvent } = require("../../middlewares/event-authorization");
const {
  isValidAttendance,
} = require("../../middlewares/attendee-authorization");

// Change the status of an attendance by eventId: PATCH /api/events/:eventId/attendees/:attendeeId
router.patch(
  "/:eventId/attendees/:attendeeId",
  isValidEvent,
  isValidAttendance,
  async (req, res, next) => {
    const { user, event, attendance } = req;
    const { userId, status } = req.body;
    const group = await event.getGroup();

    // error in api docs, add this error
    if (req.params.attendeeId != userId) {
      const err = new Error("Req params doesn't match with req body");
      err.status = 404;
      next(err);
    }

    if (
      status === "member" &&
      ((await Group.isOrganizer(user.id, group.id)) ||
        (await Membership.isCohost(userId, group.id)))
    ) {
      const updated = await attendance.update({
        status,
      });

      const { id, eventId, userId } = updated;
      res.json({ id, eventId, userId, status });
    } else if (status === "pending") {
      const err = new Error("Cannot change an attendance status to pending");
      err.status = 400;
      next(err);
    } else {
      const err = new Error("Must be organizer or cohost to update attendance");
      err.status = 400;
      next(err);
    }
  }
);

// Delete attendance to an event by eventId: DELETE /api/events/:eventId/attendees/:attendeeId
router.delete(
  "/:eventId/attendees/:attendeeId",
  requireAuth,
  isValidEvent,
  isValidAttendance,
  async (req, res, next) => {
    const { user, event, attendance } = req;
    const { userId } = req.body;
    const { attendeeId } = req.params;
    const group = await event.getGroup();

    // api docs missing this error:
    if (userId != attendeeId) {
      const err = new Error("Req params does not match req body");
      err.status = 400;
      next(err);
    }

    if ((await Group.isOrganizer(user.id, group.id)) || user.id === userId) {
      await attendance.destroy();

      res.json({ message: "Successfully deleted attendance from event" });
    } else {
      res.status(403).json({
        message: "Only the User or organizer can delete an Attendance",
      });
    }
  }
);

// Get all attendees of an event by eventId: GET /api/events/:eventId/attendees
router.get("/:eventId/attendees", isValidEvent, async (req, res, next) => {
  const { eventId } = req.params;
  const { user, event } = req;
  const group = await event.getGroup();

  let attendees;

  if (
    (await Group.isOrganizer(user.id, group.id)) ||
    (await Membership.isCohost(user.id, group.id))
  ) {
    attendees = await Attendee.scope({
      method: ["showPending", eventId],
    }).findAll();
  } else {
    attendees = await Attendee.scope({
      method: ["hidePending", eventId],
    }).findAll();
  }

  const payload = [];

  for (const {
    status,
    User: { id, firstName, lastName },
  } of attendees) {
    const obj = {
      id,
      firstName,
      lastName,
      Attendance: {
        status,
      },
    };

    payload.push(obj);
  }
  res.json({ Attendees: payload });
});

// Request attendance for an event: POST /api/events/:eventId/attendance
router.post("/:eventId/attendance", isValidEvent, async (req, res, next) => {
  const { eventId } = req.params;
  const { user, event } = req;

  const isAttending = await Attendee.findOne({
    where: {
      eventId,
      userId: user.id,
    },
  });

  if (!isAttending) {
    const { eventId, userId, status } = await Attendee.create({
      eventId: event.id,
      userId: user.id,
      status: "pending",
    });

    return res.json({ eventId, userId, status });
  } else if (isAttending.status === "pending") {
    const err = new Error("Attendance has already been requested");
    err.status = 400;
    next(err);
  } else {
    const err = new Error("User is already an attendee of the event");
    err.status = 400;
    next(err);
  }
});

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

// Delete an event by id: DELETE /api/events/:eventId
// STILL NEED ERROR HANDLING
router.delete("/:eventId", requireAuth, async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { user } = req;

    const event = await Event.findByPk(eventId);
    // middleware to make sure user is owner
    const group = await event.getGroup();
    const membership = await Membership.findOne({
      where: {
        memberId: user.id,
        groupId: group.id,
      },
    });

    if (
      group.organizerId === user.id ||
      membership.dataValues.status === "co-host" ||
      membership.dataValues.status === "host"
    ) {
      // manual delete cascading a polymorphic association
      await Image.destroy({
        where: {
          imageableId: eventId,
          imageableType: "event",
        },
      });
      await event.destroy();
      return res.json({ message: "success" });
    }
  } catch (e) {
    next(e);
  }
});

// Get all events: GET /api/events
// make a middleware to parse query
router.get("/", validateEventQuery, async (req, res, next) => {
  let { page, size } = req.query;
  size = size ? size : 20;
  page = page ? page * size : 0;

  // build where option
  let search = {};
  for (const param in req.query) {
    if (param !== "page" && param !== "size") {
      search[param] = req.query[param];
    }
    if (param === "startDate") {
      const date = new Date(req.query[param]);
      search[param] = date;
      // Work in progress:
      // const dateTime = req.query[params].split("T")
      // search[param] = {
      //   [Op.lt]: new Date(dateOnly),
      //   [Op.gt]: new Date(dateTime[0]),
      // };
      // console.log("search: ", search);
    }
  }

  // NEED TO FORMAT DATE
  const events = await Event.findAll({
    where: {
      ...search,
    },
    attributes: {
      exclude: ["capacity", "createdAt", "updatedAt"],
    },
    include: [
      { model: Group, attributes: ["id", "name", "city", "state"] },
      { model: Venue, attributes: ["id", "city", "state"] },
    ],
    limit: size,
    offset: page,
  });

  res.json({ Events: events });
});

module.exports = router;
