"use strict";
const { Model, Op } = require("sequelize");

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

    static async isValidMembership(memberId, groupId) {
      const membership = await Membership.findOne({
        where: {
          memberId,
          groupId,
        },
      });
      if (!membership) throw new Error("Invalid Membership");
    }

    static async isCohost(memberId, groupId) {
      const membership = await Membership.findOne({
        where: {
          memberId,
          groupId,
        },
      });

      return (
        membership &&
        (membership.status === "host" || membership.status === "co-host")
      );
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
            where: {
              groupId,
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
        hidePending(groupId) {
          const { User } = require("../models");
          return {
            where: {
              groupId,
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
  return Membership;
};
