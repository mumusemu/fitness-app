const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  heightCm: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weightKg: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bmiRatio: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  preferredDays: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fitnessGoal: {
    type: DataTypes.ENUM("lose_weight", "gain_muscle", "healthy_living"),
    allowNull: false,
  },
  language: {
    type: DataTypes.ENUM("en", "ar"),
    defaultValue: "en",
  },
}, {
  sequelize,
  modelName: "User",   // Model adı
  tableName: "users",  // Tablo adı
  timestamps: true,
});

module.exports = User;
