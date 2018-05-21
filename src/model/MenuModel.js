const db = require('./DB');
const Lang = require('../lib/consts/Lang')
const DataTypes = require('sequelize').DataTypes;

const menu = db.sequelize.define('menu', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 23],
                msg: Lang.USER.NAME_REG_RULE
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
menu.sync();
module.exports = menu;