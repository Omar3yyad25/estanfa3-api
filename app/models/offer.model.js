const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const offer =  sequelize.define("offer",{
          sellerId:{
            type: DataTypes.INTEGER,
            allowNull: false
          },
          buyerId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          offeredPrice: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false
          },
          tradedProductId: {
            type: DataTypes.STRING,
            allowNull: true
          }

    });

    return offer;
};
