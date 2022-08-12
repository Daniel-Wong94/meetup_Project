"use strict";
const { Model } = require("sequelize");
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
        type: DataTypes.STRING,
      },
      memberId: {
        type: DataTypes.INTEGER,
      },
      groupId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Membership",
    }
  );
  return Membership;
};
