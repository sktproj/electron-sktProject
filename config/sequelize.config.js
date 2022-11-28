module.exports = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  options: {
    host: process.env.DB_HOST,
    timezone: '+09:00',
    dialect: 'mysql',
  },
};
