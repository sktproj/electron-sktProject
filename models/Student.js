const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {}

  Student.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      grade: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      classNM: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      overdue: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'student',
      freezeTableName: true,
      timestamps: false,
    },
  );

  return Student;
};