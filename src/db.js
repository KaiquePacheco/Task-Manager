require("dotenv").config()
const {Sequelize, Model, DataTypes} = require("sequelize")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
})

var TaskModel = sequelize.define('Tasks', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  team_name: DataTypes.STRING,
  description: DataTypes.STRING(511),
  start_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  final_date: DataTypes.DATEONLY,
  is_finished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
})

sequelize.authenticate()
TaskModel.sync({alter: true})

module.exports = {TaskModel, sequelize}