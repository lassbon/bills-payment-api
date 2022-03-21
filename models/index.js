'use strict'

require('dotenv').config()

const path = require('path')

const Sequelize = require("sequelize")
const sequelize = require('../config/mysql')

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./users.models")(sequelize, Sequelize);
db.otp = require("./otp.models")(sequelize, Sequelize);
//db.payment = require("./payment.models")(sequelize, Sequelize);
module.exports = db;