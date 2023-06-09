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
          imageid: {
            type: DataTypes.INTEGER,
            allowNull: true
          }
    });

    return Product;
};
