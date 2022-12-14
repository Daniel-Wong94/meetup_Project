"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsTo(models.User, {
        foreignKey: "organizerId",
      });

      Group.hasMany(models.Event, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });

      Group.hasMany(models.Venue, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });

      Group.hasMany(models.Membership, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });

      Group.hasMany(models.Image, {
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "group",
        },
      });
    }

    static async isOrganizer(userId, groupId) {
      const group = await Group.findByPk(groupId);
      return group.organizerId === userId;
    }
  }
  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 60],
            msg: "Name must be 60 characters or less",
          },
        },
      },
      about: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [50],
            msg: "About must be 50 characters or more",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          validType(type) {
            if (type !== "Online" && type !== "In person") {
              throw new Error("Type must be 'Online' or 'In person'");
            }
          },
        },
      },
      private: {
        type: DataTypes.BOOLEAN,
        validate: {
          isIn: {
            args: [[true, false]],
            msg: "Private must be a boolean",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            arg: [true],
            msg: "City is required",
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            arg: [true],
            msg: "State is required",
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return this.getDataValue("createdAt").toLocaleString("sv");
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return this.getDataValue("updatedAt").toLocaleString("sv");
        },
      },
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
