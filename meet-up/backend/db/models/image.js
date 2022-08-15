"use strict";
const { Model } = require("sequelize");
const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Image.belongsTo(models.Event, {
        foreignKey: "imageableId",
        constraints: false,
      });

      Image.belongsTo(models.Group, {
        foreignKey: "imageableId",
        constraints: false,
      });
    }

    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.imageableType)}`;
      return this[mixinMethodName](options);
    }
  }
  Image.init(
    {
      userId: DataTypes.INTEGER,
      url: DataTypes.STRING,
      imageableId: DataTypes.INTEGER,
      imageableType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
      scopes: {
        postImage: {
          attributes: ["id", "imageableId", "url"],
        },
      },
      hooks: {
        afterFind: (findResult) => {
          if (!Array.isArray(findResult)) findResult = [findResult];
          for (const instance of findResult) {
            if (
              instance.imageableType === "event" &&
              instance.image !== undefined
            ) {
              instance.imageable = instance.event;
            } else if (
              instance.imageableType === "group" &&
              instance.group !== undefined
            ) {
              instance.imageable = instance.group;
            }
            // To prevent mistakes:
            delete instance.group;
            delete instance.dataValues.group;
            delete instance.event;
            delete instance.dataValues.event;
          }
        },
      },
    }
  );
  return Image;
};
