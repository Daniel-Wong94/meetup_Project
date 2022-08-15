"use strict";
const { Group, Image } = require("../models");

const images = [
  {
    url: "tennis image",
  },
  {
    url: "basketball image",
  },
  {
    url: "volleyball image",
  },
  {
    url: "dragon image",
  },
  {
    url: "pokemon image",
  },
  {
    url: "swimming image",
  },
  {
    url: "mcdonalds image",
  },
  {
    url: "jollibee image",
  },
  {
    url: "meditation image",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const groups = await Group.findAll();

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      await group.createImage({
        url: images[i].url,
        userId: group.organizerId,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    for (const { url } of images) {
      const image = await Image.findOne({ where: { url } });
      await image.destroy();
    }
  },
};
