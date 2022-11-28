const { Sequelize } = require('sequelize');
const sequelizeConfig = require('../config/sequelize.config');

module.exports = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig.options,
);
