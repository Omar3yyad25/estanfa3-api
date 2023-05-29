const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const offer =  sequelize.define("contract",{
          sellerId:{
            type: DataTypes.INTEGER,
            allowNull: false
          },
          buyerId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          diffPrice: {
            type: DataTypes.STRING,
            allowNull: false
          },
          dealtPrice: {
            type: DataTypes.STRING,
            allowNull: false
          },
          tradedProductId: {
            type: DataTypes.STRING,
            allowNull: true
          },
          status: {
            type: DataTypes.STRING,
            allowNull: true
          } 

    });

    return contract;
};
