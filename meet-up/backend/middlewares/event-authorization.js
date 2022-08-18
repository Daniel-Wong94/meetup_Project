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

module.exports = {
  isValidEvent,
};
