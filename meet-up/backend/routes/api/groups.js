const express = require("express");
const router = express.Router();
const {
  Event,
  Venue,
  Group,
  Membership,
  Image,
  Attendee,
  User,
} = require("../../db/models");
const {
  validateGroup,
  validateVenue,
  validateEvent,
} = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth");

// Get all members by groupId: GET /api/groups/:groupId/members
router.get("/:groupId/members", async (req, res, next) => {
  const { groupId } = req.params;
  const { user } = req;

  const group = await Group.findByPk(groupId);

  const member = await Membership.findOne({
    where: {
      memberId: user.id,
      groupId,
    },
  });

  let memberships;
  // check if host/organizer or not
  if (
    member &&
    (member.status === "host" ||
      member.status === "co-host" ||
      group.organizerId === user.id)
  ) {
    memberships = await Membership.scope({
      method: ["showPending", groupId],
    }).findAll();
  } else {
    memberships = await Membership.scope({
      method: ["hidePending", groupId],
    }).findAll();
  }

  const payload = [];

  for (const {
    status,
    User: { id, firstName, lastName },
  } of memberships) {
    const obj = {
      id,
      firstName,
      lastName,
      Membership: {
        status,
      },
    };
    payload.push(obj);
  }

  res.json({ Members: payload });
});

// Get all events of a group: GET /api/groups/:groupId/events
router.get("/:groupId/events", async (req, res, next) => {
  const { groupId } = req.params;
  // const group = await Group.findByPk(groupId);
  const events = await Event.findAll({
    where: { groupId },
    include: [
      { model: Venue, attributes: ["id", "city", "state"] },
      { model: Group, attributes: ["id", "name", "city", "state"] },
    ],
  });

  // middleware for finding group

  for (const event of events) {
    event.dataValues.numAttending = await Attendee.count({
      where: {
        eventId: event.dataValues.id,
      },
    });

    const previewImage = await Image.findOne({
      where: {
        imageableId: event.id,
        imageableType: "event",
      },
    });

    const { url } = previewImage;

    event.dataValues.previewImage = url;
  }

  await res.json({ Events: events });
});

// Create an event for a group by groupId: POST /api/groups/:groupId/events
router.post(
  "/:groupId/events",
  requireAuth,
  validateEvent,
  async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);
    // middleware to make sure group exists
    // middleware auth user is organizer or cohost
    const event = await group.createEvent(req.body);
    const {
      id,
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    } = event;
    res.json({
      id,
      groupId,
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    });
  }
);

// Get all venues of a specific group: GET /api/groups/:groupId/venues
// organizer of group or cohost member
router.get("/:groupId/venues", requireAuth, async (req, res, next) => {
  const { groupId } = req.params;
  const { user } = req;
  const membership = await Membership.findOne({
    where: { memberId: user.id, groupId },
  });

  const group = await Group.findByPk(groupId);
  if (!group) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    next(err);
  }

  if (group.organizerId === user.id || membership.status === "co-host") {
    const venues = await group.getVenues();
    res.json({ Venues: venues });
  }
});

// Create new venue for a group: POST /api/groups/:groupId/venues
// NEEDS body validation
router.post("/:groupId/venues", validateVenue, async (req, res, next) => {
  const { groupId } = req.params;
  const { user } = req;
  const { address, city, state, lat, lng } = req.body;

  const group = await Group.findByPk(groupId);
  const membership = await Membership.findOne({
    where: {
      memberId: user.id,
      groupId,
    },
  });

  if (!group) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    next(err);
  }

  if (group.organizerId === user.id || membership.status === "co-host") {
    const venue = await Venue.create({ ...req.body, groupId });
    const { id, address, city, state, lat, lng } = venue;

    res.json({ id, groupId, address, city, state, lat, lng });
  }
});

// Add an image to group by groupId: POST /api/groups/:groupId/images
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { url } = req.body;
    const { id: userId } = req.user;

    const group = await Group.findByPk(groupId);
    const image = await group.createImage({ url, userId });
    const { id, imageableId } = image;

    res.json({ id, url, imageableId });
  } catch (e) {
    const err = new Error("Group couldn't be found");
    err.status = 404;
    next(err);
  }
});

// Get a group by groupId: GET /api/groups/:groupId
router.get("/:groupId", async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, {
      include: [{ model: Image }, { model: Venue }],
    });

    const user = await group.getUser({
      attributes: ["id", "firstName", "lastName"],
    });

    const numMembers = await Membership.count({
      where: {
        groupId,
      },
    });

    const payload = {
      ...group.dataValues,
      numMembers,
      Organizer: user,
    };

    res.json(payload);
  } catch (e) {
    const err = new Error("Group couldn't be found.");
    err.status = 404;
    next(err);
  }
});

// Update an existing group by id: PATCH /api/groups/:groupId
// NEEDS AUTHORIZATION
router.patch(
  "/:groupId",
  requireAuth,
  validateGroup,
  async (req, res, next) => {
    try {
      const { name, about, type, private, city, state } = req.body;
      const { groupId } = req.params;
      const group = await Group.findByPk(groupId);

      await group.update({
        name: name || group.name,
        about: about || group.about,
        type: type || group.type,
        private: private || group.private,
        city: city || group.city,
        state: state || group.state,
      });

      res.json(group);
    } catch (e) {
      const err = new Error("Group couldn't be found");
      err.status = 404;
      next(err);
    }
  }
);

// Delete an existing group by id: DELETE /api/groups/:groupId
router.delete("/:groupId", requireAuth, async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { user } = req;

    const group = await Group.findByPk(groupId);

    if (group.organizerId === user.id) {
      await group.destroy();
      res.json({ message: "Successfully deleted", statusCode: 200 });
    }

    throw new Error("Authorization Error");
  } catch (e) {
    const err = new Error(e.message || "Group couldn't be found");
    err.status = 404;
    next(err);
  }
});

// Get all groups: GET /api/groups
router.get("/", async (req, res, next) => {
  const groups = await Group.findAll({
    include: [{ model: Membership }, { model: Image }],
  });

  groups.forEach((group) => {
    group.dataValues.numMembers = group.Memberships.length;
    delete group.dataValues.Memberships;
    if (group.Images.length) {
      group.dataValues.previewImage = group.Images[0].url;
    }
    delete group.dataValues.Images;
  });

  res.json({ Groups: groups });
});

// Create a group: POST /api/groups
router.post("/", requireAuth, validateGroup, async (req, res, next) => {
  const { name, about, type, private, city, state } = req.body;
  const { user } = req;

  const group = await user.createGroup({
    name,
    about,
    type,
    private,
    city,
    state,
  });

  res.status(201).json(group);
});

module.exports = router;
