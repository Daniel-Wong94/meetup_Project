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

module.exports = {
  isValidAttendance,
};
