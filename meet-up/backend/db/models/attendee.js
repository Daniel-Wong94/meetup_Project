"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    static associate(models) {
      Attendee.belongsTo(models.Event, {
        foreignKey: "eventId",
      });
      Attendee.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Attendee.init(
    {
      status: {
        type: DataTypes.ENUM("member", "pending", "waitlist"),
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Attendee",
      scopes: {
        showPending(eventId) {
          const { User } = require("../models");
          return {
            where: {
              eventId,
            },
            attributes: ["status"],
            include: [
              {
                model: User,
                attributes: ["id", "firstName", "lastName"],
              },
            ],
          };
        },
        hidePending(eventId) {
          const { User } = require("../models");
          return {
            where: {
              eventId,
              status: {
                [Op.not]: "pending",
              },
            },
            attributes: ["status"],
            include: [
              { model: User, attributes: ["id", "firstName", "lastName"] },
            ],
          };
        },
      },
    }
  );
  return Attendee;
};
