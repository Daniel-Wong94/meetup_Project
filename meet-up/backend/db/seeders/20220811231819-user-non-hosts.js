"use strict";
const bcrypt = require("bcryptjs");
const { User, Group, Membership } = require("../models");

const users = [
  {
    firstName: "Mike",
    lastName: "Phelps",
    email: "mike_phelps@email.com",
    hashedPassword: bcrypt.hashSync("mikephelpspw"),
    groups: [
      {
        name: "Pokemon Trading Cards",
        about:
          "Tournament of 20 players. Winner gets super rare reverse holo mewtwo card.",
        type: "Online",
        private: true,
        city: "Chicago",
        state: "IL",
      },
      {
        name: "Swim Meet",
        about:
          "Ages from 17-30 are welcome. Will be held at YMCA on broadway at 6pm. Bring your own swim caps.",
        type: "In person",
        private: true,
        city: "Chicago",
        state: "IL",
      },
    ],
  },
  {
    firstName: "Jerry",
    lastName: "Lu",
    email: "jerry_lu@email.com",
    hashedPassword: bcrypt.hashSync("jerrylupw"),
    groups: [
      {
        name: "Meet and greet",
        about:
          "Meet at McDonalds on grand st. for casual socializing event. Interests: dogs, mcdonalds, and stonks",
        type: "In person",
        private: true,
        city: "Queens",
        state: "NY",
      },
    ],
  },
  {
    firstName: "Alex",
    lastName: "Bet",
    email: "alex_bet@email.com",
    hashedPassword: bcrypt.hashSync("alexbetpw"),
    groups: [
      {
        name: "Jollibee Dinner Party",
        about:
          "Enjoy rounds of D&D with a tight-nit group of people in my basement. My mom is making pizza rolls.",
        type: "In person",
        private: true,
        city: "Cherry Hill",
        state: "NJ",
      },
    ],
  },
  {
    firstName: "Mike",
    lastName: "Jones",
    email: "mike_jones@email.com",
    hashedPassword: bcrypt.hashSync("mikejonespw"),
  },
  {
    firstName: "Erica",
    lastName: "Watson",
    email: "erica_watson@email.com",
    hashedPassword: bcrypt.hashSync("ericawatsonpw"),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
