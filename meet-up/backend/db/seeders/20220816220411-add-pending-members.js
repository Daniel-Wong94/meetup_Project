"use strict";
const bcrypt = require("bcryptjs");
const { User, Group, Membership } = require("../models");

const users = [
  {
    firstName: "Pending1",
    lastName: "User1",
    email: "pending_user1@email.com",
    hashedPassword: bcrypt.hashSync("pendinguser1pw"),
    groups: [7, 2, 4],
  },
  {
    firstName: "Pending2",
    lastName: "User2",
    email: "pending_user2@email.com",
    hashedPassword: bcrypt.hashSync("pendinguser2pw"),
    groups: [6, 8],
  },
  {
    firstName: "Pending3",
    lastName: "User3",
    email: "pending_user3@email.com",
    hashedPassword: bcrypt.hashSync("pendinguser3pw"),
    groups: [3, 4, 7],
  },
  {
    firstName: "Pending4",
    lastName: "User4",
    email: "pending_user4@email.com",
    hashedPassword: bcrypt.hashSync("pendinguser4pw"),
    groups: [1, 2, 3, 4],
  },
  {
    firstName: "Pending5",
    lastName: "User5",
    email: "pending_user5@email.com",
    hashedPassword: bcrypt.hashSync("pendinguser5pw"),
    groups: [5, 6, 7],
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
      for (const groupId of groups) {
        await newUser.createMembership({
          groupId,
          status: "pending",
        });
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
