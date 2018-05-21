const config = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, config.database);
module.exports = {
    sequelize:sequelize
}