const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "fitness_app_system",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "db",
    dialect: "mysql",
  }
);

module.exports = sequelize;
