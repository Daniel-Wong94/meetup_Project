"use strict";
const bcrypt = require("bcryptjs");
const { User, Group, Membership } = require("../models");

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
          "We hold basketball tournaments every two weeks on Sundays. Music, BBQ, and drinks are provided.",
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
        private: false,
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
          "Meet at McDonalds on Grand St. for casual socializing event. Interests: dogs, mcdonalds, and stonks",
        type: "In person",
        private: false,
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
      {
        name: "Cyber Meditation",
        about:
          "Experience a live meditation session with your instructor, Alex Betita. Go through breathing exercises and yoga poses.",
        type: "Online",
        private: false,
        city: "San Francisco",
        state: "CA",
      },
    ],
  },
  {
    firstName: "Demo",
    lastName: "User",
    email: "demo_user@email.com",
    hashedPassword: bcrypt.hashSync("demouserpw"),
    groups: [
      {
        name: "New York Urban Explorers: Art, Food, Museums, Walks, etc.",
        about:
          "Thanks for joining our Meetup group as we explore NYC! We have different types of fun events and look forward to meeting you.",
        type: "In person",
        private: false,
        city: "Manhattan",
        state: "NY",
      },
      {
        name: "Ethnic Dining in Queens and Beyond!",
        about:
          "It’s time to eat all the ethnic cuisines that Queens and other boroughs have to offer. Members will eat in a family style setting and share the total food costs plus tax and tips.",
        type: "In person",
        private: true,
        city: "Queens",
        state: "NY",
      },
      {
        name: "New York Code and Coffee",
        about:
          "An NYC coding meetup for any dev-curious, aspiring, or professional developer to work/hack on your project. Or learn to code in an afternoon with coffee and cool-inclusive people. All skill levels are welcome. Bring your laptop!",
        type: "In person",
        private: true,
        city: "Brooklyn",
        state: "NY",
      },
    ],
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

      for (const group of groups) {
        const newGroup = await newUser.createGroup(group);

        await newUser.createMembership({
          groupId: newGroup.id,
          status: "host",
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
