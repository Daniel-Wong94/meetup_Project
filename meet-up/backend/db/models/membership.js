"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    static associate(models) {
      Membership.belongsTo(models.User, {
        foreignKey: "memberId",
      });
      Membership.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
    }
  }
  Membership.init(
    {
      status: {
        type: DataTypes.ENUM("host", "co-host", "member", "pending"),
        allowNull: false,
      },
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Membership",
      scopes: {
        showPending(groupId) {
          const { User } = require("../models");
          return {
            attributes: ["status"],
            where: {
              groupId,
            },
            include: [
              {
                model: User,
                attributes: ["id", "firstName", "lastName"],
              },
            ],
          };
        },
        hidePending(groupId) {
          const { User } = require("../models");
          return {
            attributes: ["status"],
            where: {
              groupId,
              status: {
                [Op.not]: "pending",
              },
            },
            include: [
              { model: User, attributes: ["id", "firstName", "lastName"] },
            ],
          };
        },
      },
    }
  );
  return Membership;
};
