"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Group, {
        foreignKey: "organizerId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Membership, {
        foreignKey: "memberId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.belongsToMany(models.Event, {
        through: "Attendees",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Image, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }

    // returns object for JWT
    toSafeObject() {
      const { id, firstName, lastName, email } = this;
      return { id, firstName, lastName, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static async login({ email, password }) {
      const user = await User.scope("loginUser").findOne({ where: { email } });

      if (user && user.validatePassword(password)) {
        return await User.findOne({ where: { email } });
      }
    }

    static async signupUser({ firstName, lastName, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.findOne({ where: { email } });

      if (user) {
        const err = new Error("User already exists");
        err.message = err.message;
        err.status = 403;
        err.errors = {
          email: "User with that email already exists",
        };

        throw err;
      } else {
        const user = await User.create({
          firstName,
          lastName,
          email,
          hashedPassword,
        });

        return await User.findByPk(user.id);
      }
    }

    async updateCredentials({
      currentEmail,
      newEmail,
      currentPassword,
      newPassword,
    }) {
      const user = await User.scope("loginUser").findOne({
        where: { email: currentEmail },
      });

      if (user.validatePassword(currentPassword)) {
        user.update({
          email: newEmail || user.email,
          hashedPassword: newPassword
            ? bcrypt.hashSync(newPassword)
            : user.hashedPassword.toString(),
        });
      } else {
        const err = new Error("Invalid credentials");
        err.status = 401;
        throw err;
      }

      return user;
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
        unique: {
          arg: [true],
          msg: "User already exists",
        },
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
