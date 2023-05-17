const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const uploads =  sequelize.define("uploads",{
          originalname:{
            type: DataTypes.STRING,
            allowNull: false
          },
          filename: {
            type: DataTypes.STRING,
            allowNull: false
          },
          path: {
            type: DataTypes.STRING,
            allowNull: true
          },
          encoding: {
            type: DataTypes.STRING,
            allowNull: true
          },
          mimetype: {
            type: DataTypes.STRING,
            allowNull: true
          },
          destination: {
            type: DataTypes.STRING,
            allowNull: true
          },
          size: {
            type: DataTypes.STRING,
            allowNull: true
          }

    });

    return uploads;
};
