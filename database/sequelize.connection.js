const { Sequelize } = require('sequelize');
const sequelizeConfig = require('../config/sequelize.config');

module.exports = new Sequelize(sequelizeConfig);
