const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}

  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'product',
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Product;
};
