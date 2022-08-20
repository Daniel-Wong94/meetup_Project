"use strict";
const { raw } = require("express");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsToMany(models.User, {
        through: "Attendees",
      });

      Event.belongsTo(models.Venue, {
        foreignKey: "venueId",
      });

      Event.belongsTo(models.Group, {
        foreignKey: "groupId",
      });

      Event.hasMany(models.Image, {
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "event",
        },
      });
    }
  }
  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Online", "In person"),
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          this.getDataValue("startDate").toLocaleString("sv");
        },
        // validate: {
        //   isAfter: new Date().toDateString(),
        // },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        // validate: {
        //   isAfter: this.startDate,
        // },
        get() {
          this.getDataValue("endDate").toLocaleString("sv");
        },
      },
      venueId: {
        type: DataTypes.INTEGER,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
