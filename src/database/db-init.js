const { Sequelize, Model, DataTypes } = require("sequelize");
const path = require('path')
require('dotenv').config({
    path: path.join(__dirname, './../../.env')
})




const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',

});

exports.sequelize = sequelize;


