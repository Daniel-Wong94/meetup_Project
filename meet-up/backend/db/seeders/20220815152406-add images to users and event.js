"use strict";
const { Image, Event, Attendee } = require("../models");

const images = [
  {
    url: "basketball pickup game image",
  },
  {
    url: "dungeons and dragon image",
  },
  {
    url: "pokemon red image",
  },
  {
    url: "pokemon blue image",
  },
  {
    url: "pokemon yellow image",
  },
  {
    url: "us open image",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const attendees = await Attendee.findAll({
      where: {
        status: "member",
      },
    });

    for (let i = 0; i < attendees.length; i++) {
      const { eventId, userId } = attendees[i];
      const event = await Event.findByPk(eventId);
      await event.createImage({ userId, url: images[i].url });
    }
  },

  async down(queryInterface, Sequelize) {
    for (const { url } of images) {
      const image = await Image.findOne({ where: { url } });
      await image.destroy();
    }
  },
};
