"use strict";
const bcrypt = require("bcryptjs");
const { User, Group } = require("../models");

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john_doe@email.com",
    hashedPassword: bcrypt.hashSync("johndoepw"),
    groups: [
      {
        name: "Evening Tennis on the Water",
        about:
          "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
        type: "In person",
        private: true,
        city: "New York",
        state: "NY",
      },
      {
        name: "Basketball Tournament",
        about:
          "20 teams compete in a streetball tournament. Winner gets cash prize of $10,000",
        type: "In person",
        private: true,
        city: "New York",
        state: "NY",
      },
    ],
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane_doe@email.com",
    hashedPassword: bcrypt.hashSync("janedoepw"),
    groups: [
      {
        name: "Volleyball at the Beach",
        about:
          "Enjoy rounds of volleyball with a tight-nit group of people on the beach facing the Hudson River. Singles or doubles.",
        type: "In person",
        private: true,
        city: "Brooklyn",
        state: "NY",
      },
    ],
  },
  {
    firstName: "Adam",
    lastName: "Smith",
    email: "adam_smith@email.com",
    hashedPassword: bcrypt.hashSync("adamsmithpw"),
    groups: [
      {
        name: "D&D in my Basement",
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
    for (const user of users) {
      const { firstName, lastName, email, hashedPassword, groups } = user;
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
      });

      if (groups) {
        for (const group of groups) {
          await newUser.createGroup(group);
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    for (const user of users) {
      const { email } = user;
      const deleteUser = await User.findOne({ where: { email } });
      await deleteUser.destroy();
    }
  },
};
