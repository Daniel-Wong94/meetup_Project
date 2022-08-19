"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static async isValidVenue(id) {
      const venue = await Venue.findByPk(id);
      if (!venue) throw new Error("Invalid Venue");
    }
    static associate(models) {
      Venue.belongsTo(models.Group, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });
    }
  }
  Venue.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL(9, 7),
        allowNull: false,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false,
        validate: {
          min: -180,
          max: 180,
        },
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Venue",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Venue;
};
