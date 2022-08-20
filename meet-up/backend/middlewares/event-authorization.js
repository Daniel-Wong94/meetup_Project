const { Event } = require("../db/models");

const isValidEvent = async (req, res, next) => {
  const { eventId } = req.params;
  const event = await Event.findByPk(eventId);

  if (!event) {
    const err = new Error("Event couldn't be found");
    err.status = 404;
    next(err);
  }

  req.event = event;
  next();
};

const eventAuth = async (req, res, next) => {
  const { user, event } = req;

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
    req.locals = {
      isEventAuth: true,
    };
  } else {
    req.locals = {
      isEventAuth: false,
    };

    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
  }
  next();
};

module.exports = {
  isValidEvent,
  eventAuth,
};
