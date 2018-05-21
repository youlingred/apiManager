const db = require('./DB');
const Lang = require('../lib/consts/Lang')
const DataTypes = require('sequelize').DataTypes;

const project = db.sequelize.define('project', {
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
    //摘要0-255字节
    summary: {
        type: DataTypes.TEXT('tiny'),
        allowNull: false,
    },
});
project.sync();
module.exports = project;