//products.model.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, Sequelize) => {
    const Product =  sequelize.define("products",{
        name: {
            type: sequelize.STRING,
            allowNull: false
          },
          price: {
            type: sequelize.STRING,
            allowNull: false
          },
          description: {
            type: sequelize.STRING,
            allowNull: false
          },
          image: {
            type: sequelize.STRING,
            allowNull: false
          }
    });

    return Product
};
