const { Attendee } = require("../db/models");

const isValidAttendance = async (req, res, next) => {
  const { eventId, attendeeId: userId } = req.params;

  const attendance = await Attendee.findOne({
    where: {
      eventId,
      userId,
    },
  });

  if (!attendance) {
    const err = new Error(
      "Attendance between the user and the event does not exist"
    );
    err.status = 404;
    next(err);
  }

  req.attendance = attendance;
  next();
};

const attendeeAuth = async (req, res, next) => {
  const { user } = req;
  const { eventId } = req.params;

  const attendee = await Attendee.findOne({
    where: {
      userId: user.id,
      eventId,
    },
  });

  if (!attendee) {
    const err = new Error("Forbidden");
    err.status = 403;
    next(err);
  }

  req.attendee = attendee;
  next();
};

module.exports = {
  isValidAttendance,
  attendeeAuth,
};
