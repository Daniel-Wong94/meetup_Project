"use strict";
const bcrypt = require("bcryptjs");
const { User, Group, Membership } = require("../models");

const users = [
  {
    firstName: "Ray",
    lastName: "Kelly",
    email: "ray_kelly@email.com",
    hashedPassword: bcrypt.hashSync("raykellypw"),
    groups: [7, 2, 4],
  },
  {
    firstName: "Larry",
    lastName: "Liao",
    email: "larry_liao@email.com",
    hashedPassword: bcrypt.hashSync("larryliaopw"),
    groups: [6, 8],
  },
  {
    firstName: "Pat",
    lastName: "Story",
    email: "pat_story@email.com",
    hashedPassword: bcrypt.hashSync("patstorypw"),
    groups: [3, 4, 7],
  },
  {
    firstName: "Mike",
    lastName: "Roy",
    email: "mike_roy@email.com",
    hashedPassword: bcrypt.hashSync("mikeroypw"),
    groups: [1, 2, 3, 4],
  },
  {
    firstName: "Queen",
    lastName: "Rey",
    email: "queen_rey@email.com",
    hashedPassword: bcrypt.hashSync("queenreypw"),
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
        // const group = await Group.findByPk(groupId);
        // await newUser.addGroup(group);
        await newUser.createMembership({
          groupId,
          status: "member",
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
