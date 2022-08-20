const express = require("express");
const router = express.Router();
const {
  Event,
  Venue,
  Group,
  Membership,
  Image,
  Attendee,
} = require("../../db/models");
const {
  validateGroup,
  validateVenue,
  validateEvent,
  validateUpdateMembership,
} = require("../../utils/validation.js");
const { requireAuth } = require("../../utils/auth");
const {
  isValidGroup,
  groupAuth,
} = require("../../middlewares/group-authorization");

const {
  isValidMembership,
} = require("../../middlewares/membership-authorization");

// Change status of a membership by groupId: PATCH /api/groups/:groupId/members/:memberId
// NEEDS REFACTORING
router.patch(
  "/:groupId/members/:memberId",
  requireAuth,
  isValidGroup,
  validateUpdateMembership,
  isValidMembership,
  groupAuth,
  async (req, res, next) => {
    const { memberId, status } = req.body;
    const { group, membership, user } = req;

    // error in api docs, add this error
    if (memberId != req.params.memberId) {
      const err = new Error("Req params doesn't match with request body");
      err.status = 400;
      next(err);
    }

    if (
      (status === "co-host" || status === "member") &&
      group.organizerId === user.id
    ) {
      const updated = await membership.update({
        status,
      });

      const { id, groupId, memberId } = updated;

      res.json({ id, groupId, memberId, status });
    } else if (status === "member" && req.locals.isGroupAuth) {
      const updated = await membership.update({
        status,
      });
      const { id, groupId, memberId } = updated;
      res.json({ id, groupId, memberId, status });
    } else {
      const err = new Error("Must be organizer to update to co-host");
      err.status = 400;
      next(err);
    }
  }
);

// Deletes a membership by groupId: DELETE /api/groups/:groupId/members/:memberId
router.delete(
  "/:groupId/members/:memberId",
  requireAuth,
  isValidGroup,
  groupAuth,
  isValidMembership,
  async (req, res, next) => {
    const { group, membership, user } = req;
    const { memberId } = req.params;

    if (group.organizerId === user.id || user.id === memberId) {
      await membership.destroy();

      res.json({ message: "Successfully deleted membership from group" });
    } else {
      res.json({
        message:
          "Must be host of the group or user whos membership is being deleted",
      });
    }
  }
);

// Get all members by groupId: GET /api/groups/:groupId/members
router.get(
  "/:groupId/members",
  isValidGroup,
  groupAuth,
  async (req, res, next) => {
    const { groupId } = req.params;

    let memberships;

    if (req.locals.isGroupAuth) {
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
  }
);

// Request a membership for a group by id: POST /api/groups/:groupId/members
router.post(
  "/:groupId/members",
  requireAuth,
  isValidGroup,
  async (req, res, next) => {
    const { group, user } = req;

    // check if membership exists already
    const hasMembership = await Membership.findOne({
      where: {
        memberId: user.id,
        groupId: group.id,
      },
    });

    if (!hasMembership) {
      const { groupId, memberId, status } = await Membership.create({
        memberId: user.id,
        groupId: group.id,
        status: "pending",
      });

      return res.json({ groupId, memberId, status });
    } else if (hasMembership.status === "pending") {
      const err = new Error("Membership has already been requested");
      err.status = 400;
      next(err);
    } else {
      const err = new Error("User is already a member of the group");
      err.status = 400;
      next(err);
    }
  }
);

// Get all events of a group: GET /api/groups/:groupId/events
router.get("/:groupId/events", isValidGroup, async (req, res, next) => {
  const { groupId } = req.params;
  const events = await Event.findAll({
    where: { groupId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      { model: Venue, attributes: ["id", "city", "state"] },
      { model: Group, attributes: ["id", "name", "city", "state"] },
    ],
  });

  for (const event of events) {
    event.numAttending = await Attendee.count({
      where: {
        eventId: event.id,
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
  isValidGroup,
  validateEvent,
  async (req, res, next) => {
    const { groupId } = req.params;
    const group = req.group;

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
router.get(
  "/:groupId/venues",
  requireAuth,
  isValidGroup,
  groupAuth,
  async (req, res, next) => {
    const group = req.group;

    if (req.locals.isGroupAuth) {
      const venues = await group.getVenues();
      res.json({ Venues: venues });
    } else {
      const err = new Error("Forrbidden");
      err.status = 403;
      next(err);
    }
  }
);

// Create new venue for a group: POST /api/groups/:groupId/venues
// NEEDS body validation
router.post(
  "/:groupId/venues",
  isValidGroup,
  validateVenue,
  async (req, res, next) => {
    const { groupId } = req.params;
    const { user } = req;
    const { address, city, state, lat, lng } = req.body;

    const group = req.group;
    const membership = await Membership.findOne({
      where: {
        memberId: user.id,
        groupId,
      },
    });

    if (group.organizerId === user.id || membership.status === "co-host") {
      const venue = await Venue.create({ ...req.body, groupId });
      const { id, address, city, state, lat, lng } = venue;

      res.json({ id, groupId, address, city, state, lat, lng });
    }
  }
);

// Add an image to group by groupId: POST /api/groups/:groupId/images
router.post(
  "/:groupId/images",
  isValidGroup,
  requireAuth,
  async (req, res, next) => {
    const { groupId } = req.params;
    const { url } = req.body;
    const { id: userId } = req.user;

    const group = await Group.findByPk(groupId);
    const image = await group.createImage({ url, userId });
    const { id, imageableId } = image;

    res.json({ id, url, imageableId });
  }
);

// Get a group by groupId: GET /api/groups/:groupId
router.get("/:groupId", isValidGroup, async (req, res, next) => {
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
