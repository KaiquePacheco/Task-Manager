require("dotenv").config()
const {Sequelize, Model, DataTypes} = require("sequelize")

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`)

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
  final_date: DataTypes.DATE,
  is_finished: DataTypes.BOOLEAN
}, {
  timestamps: false
})

sequelize.authenticate()
TaskModel.sync({alter: true})

module.exports = {TaskModel, sequelize}