const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Product =  sequelize.define("Product",{
          sellerId:{
            type: DataTypes.INTEGER,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          price: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true
          }

    });

    return Product;
};
