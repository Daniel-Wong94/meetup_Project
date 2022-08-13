"use strict";
const { Event } = require("../models");

const events = [
  {
    name: "US Open",
    description: "Watch the US Open with your group!",
    type: "In person",
    capacity: 30,
    price: 30.0,
    startDate: new Date(`April 14, 2024 14:30:00`),
    endDate: new Date(`April 14, 2024 18:30:00`),
    venueId: 1,
    groupId: 1,
  },
  {
    name: "Basketball Pickup Games",
    description:
      "Play pickup games to 21 with the members of the group, two day event",
    type: "In person",
    capacity: 16,
    price: 0.0,
    startDate: new Date(`September 14, 2024 10:30:00`),
    endDate: new Date(`September 16, 2024 16:30:00`),
    venueId: 2,
    groupId: 2,
  },
  {
    name: "D&D slay Dragons",
    description: "Slay some dragons",
    type: "Online",
    capacity: 8,
    price: 5.0,
    startDate: new Date(`December 15, 2024 12:30:00`),
    endDate: new Date(`December 15, 2024 20:30:00`),
    venueId: 4,
    groupId: 4,
  },
  {
    name: "Pokemon Red",
    description: "Beat pokemon red version in one day",
    type: "Online",
    capacity: 10,
    price: 10.0,
    startDate: new Date(`January 15, 2024 12:30:00`),
    endDate: new Date(`January 15, 2024 20:30:00`),
    venueId: 5,
    groupId: 5,
  },
  {
    name: "Pokemon Blue",
    description: "Beat pokemon blue version in one day",
    type: "Online",
    capacity: 10,
    price: 10.0,
    startDate: new Date(`January 16, 2024 12:30:00`),
    endDate: new Date(`January 16, 2024 20:30:00`),
    venueId: 5,
    groupId: 5,
  },
  {
    name: "Pokemon Yellow",
    description: "Beat pokemon yellow version in one day",
    type: "Online",
    capacity: 10,
    price: 10.0,
    startDate: new Date(`January 17, 2024 12:30:00`),
    endDate: new Date(`January 17, 2024 20:30:00`),
    venueId: 5,
    groupId: 5,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const event of events) {
      await Event.create(event);
    }
  },

  async down(queryInterface, Sequelize) {
    for (const event of events) {
      const destroyEvent = await Event.findOne({ where: event });
      await destroyEvent.destroy();
    }
  },
};
