"use strict";
const { Event } = require("../models");

const events = [
  {
    name: "US Open",
    description:
      "Watch the US Open with your group! We'll gather at the entrance (we'll be holding a red flag so you can't miss us). Make sure to bring vaccination cards.",
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
      "Play pickup games to 21 with the members of the group, two day event. Bring your kids, family, and friends.",
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
    description:
      "Slay some dragons. Online event since my basement is flooded.",
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
    description: "Play the retro Pokemon red version on a gameboy.",
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
  {
    name: "Walk through Central Park",
    description:
      "Take a mental break from it all and enjoy a peaceful stroll through central park. We plan on having a BYOB picnic so feel free to bring food and drinks. If someone could bring a frisbee, that would be nice.",
    type: "In person",
    capacity: 8,
    price: 0,
    startDate: new Date(`October 17, 2024 12:30:00`),
    endDate: new Date(`October 17, 2024 20:30:00`),
    venueId: 3,
    groupId: 10,
  },
  {
    name: "Tennis Practice",
    description:
      "All day practice with the group. We'll meet in Astoria park by the south courts.",
    type: "In person",
    capacity: 10,
    price: 0,
    startDate: new Date(`April 17, 2024 09:30:00`),
    endDate: new Date(`April 17, 2024 14:30:00`),
    venueId: 2,
    groupId: 1,
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
