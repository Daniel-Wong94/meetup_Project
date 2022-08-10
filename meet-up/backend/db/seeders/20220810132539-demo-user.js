"use strict";
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john_doe@email.com",
    hashedPassword: bcrypt.hashSync("johndoepw"),
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane_doe@email.com",
    hashedPassword: bcrypt.hashSync("janedoepw"),
  },
  {
    firstName: "Adam",
    lastName: "Smith",
    email: "adam_smith@email.com",
    hashedPassword: bcrypt.hashSync("adamsmithpw"),
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
      User.create(user);
    }
  },

  async down(queryInterface, Sequelize) {
    for (const { email } of users) {
      User.destroy({ where: { email } });
    }
  },
};
