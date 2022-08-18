"use strict";
const { Attendee } = require("../models");

const attendees = [
  // {
  //   status: "co-host",
  //   eventId: [1, 2, 3, 4, 5, 6],
  //   userId: [10, 1, 9, 4, 11, 16],
  // },
  {
    status: "member",
    eventId: [2, 3, 4, 5, 6, 1],
    userId: [1, 2, 3, 4, 5, 6],
  },
  {
    status: "pending",
    eventId: [1, 2, 3, 4, 5, 6],
    userId: [7, 8, 9, 10, 11, 12],
  },
  {
    status: "waitlist",
    eventId: [1, 2, 3, 4, 5, 6],
    userId: [12, 13, 14, 15, 16, 2],
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const { status, eventId, userId } of attendees) {
      for (let i = 0; i < eventId.length; i++) {
        await Attendee.create({
          status,
          eventId: eventId[i],
          userId: userId[i],
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    for (const { status, eventId, userId } of attendees) {
      for (let i = 0; i < eventId.length; i++) {
        const attendee = await Attendee.findOne({
          where: { status, eventId, userId },
        });

        await attendee.destroy();
      }
    }
  },
};
