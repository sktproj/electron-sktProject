const { Model, literal } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    static associate(models) {
      this.belongsTo(models.Student, {
        foreignKey: 'studentId',
      });
      this.belongsTo(models.Product, {
        foreignKey: 'productId',
      });
    }
  }

  Borrow.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      borrowDate: {
        type: DataTypes.DATEONLY,
        defaultValue: literal('(current_date)'),
      },
      returnDueDate: {
        type: DataTypes.DATEONLY,
        defaultValue: literal('(current_date + 7)'),
      },
    },
    {
      sequelize,
      modelName: 'Borrow',
      tableName: 'borrow',
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Borrow;
};
