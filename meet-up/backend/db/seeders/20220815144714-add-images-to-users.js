"use strict";
const { Image, User } = require("../models");
const group = require("../models/group");

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
  async up(queryInterface, Sequelize) {},

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
