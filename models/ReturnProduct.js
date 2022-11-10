const { Model, literal } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReturnProduct extends Model {
    static associate(models) {
      this.belongsTo(models.Student, {
        foreignKey: 'studentId',
      });
      this.belongsTo(models.Product, {
        foreignKey: 'productId',
      });
    }
  }

  ReturnProduct.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      borrowDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      returnDate: {
        type: DataTypes.DATEONLY,
        defaultValue: literal('(current_date)'),
      },
      overdueDay: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'ReturnProduct',
      tableName: 'return_product',
      freezeTableName: true,
      timestamps: false,
    },
  );

  return ReturnProduct;
};
