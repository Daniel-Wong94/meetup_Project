"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // returns object for JWT
    toSafeObject() {
      const { id, firstName, lastName, email } = this;
      return { id, firstName, lastName, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    // static getCurrentUserById(id) {
    //   return User.findByPk(id);
    // }
    static async login({ email, password }) {
      const user = await User.scope("loginUser").findOne({ where: { email } });

      if (user && user.validatePassword(password)) {
        return await User.findOne({ where: { email } });
      }
    }

    static async signup({ firstName, lastName, email, password }) {
      // middleware to validate password before this method
      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
      });

      return user;
    }

    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 64],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 64],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt", "hashedPassword"],
        },
      },
      scopes: {
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
