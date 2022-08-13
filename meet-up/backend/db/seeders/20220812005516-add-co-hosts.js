"use strict";
const bcrypt = require("bcryptjs");
const { User, Group, Membership } = require("../models");

const users = [
  {
    firstName: "Snoop",
    lastName: "Dog",
    email: "snoop_dog@email.com",
    hashedPassword: bcrypt.hashSync("snoopdogpw"),
    groups: [1, 8, 9],
    cohost: [4],
  },
  {
    firstName: "Steve",
    lastName: "Jobs",
    email: "steve_jobs@email.com",
    hashedPassword: bcrypt.hashSync("stevejobspw"),
    groups: [1, 2, 6, 9],
    cohost: [8],
  },
  {
    firstName: "Isaac",
    lastName: "Newt",
    email: "isaac_newt@email.com",
    hashedPassword: bcrypt.hashSync("isaacnewtpw"),
    groups: [2, 3, 9],
    cohost: [3],
  },
  {
    firstName: "Jim",
    lastName: "Neutron",
    email: "jim_neutron@email.com",
    hashedPassword: bcrypt.hashSync("jimneutronpw"),
    groups: [3, 4, 8],
    cohost: [5],
  },
  {
    firstName: "Abe",
    lastName: "Lincoln",
    email: "abe_lincoln@email.com",
    hashedPassword: bcrypt.hashSync("abelincolnpw"),
    groups: [5, 6, 8, 9],
    cohost: [1],
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const user of users) {
      const { firstName, lastName, email, hashedPassword, groups, cohost } =
        user;
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
      for (const groupId of cohost) {
        // const group = await Group.findByPk(groupId);
        // await newUser.addGroup(group);
        await newUser.createMembership({
          groupId,
          status: "co-host",
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
