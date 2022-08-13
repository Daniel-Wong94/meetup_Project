"use strict";
const { Venue } = require("../models");

const venues = [
  {
    address: "123 Tennis Court",
    city: "Tennis City",
    state: "TN",
    lat: 63.2456532,
    lng: -101.4342564,
    groupId: 1,
  },
  {
    address: "30 Basketball Way",
    city: "Basketball Town",
    state: "NY",
    lat: 56.3246788,
    lng: 99.1234509,
    groupId: 2,
  },
  {
    address: "53 Volley Beach",
    city: "Volley City",
    state: "NJ",
    lat: 62.2355473,
    lng: 129.3456541,
    groupId: 3,
  },
  {
    address: "35 Basement St",
    city: "Hometown",
    state: "NJ",
    lat: -13.3456223,
    lng: 120.4958732,
    groupId: 4,
  },
  {
    address: "93 Victory Rd",
    city: "Pallet Town",
    state: "PA",
    lat: -12.3426425,
    lng: 123.4446672,
    groupId: 5,
  },
  {
    address: "798 Pool End",
    city: "Swim City",
    state: "CA",
    lat: 12.4262345,
    lng: 179.3234235,
    groupId: 6,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const venue of venues) {
      await Venue.create(venue);
    }
  },

  async down(queryInterface, Sequelize) {
    for (const venue of venues) {
      const destroyVenue = await Venue.findOne({ where: venue });

      await destroyVenue.destroy();
    }
  },
};
