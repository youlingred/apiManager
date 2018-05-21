const db = require('./DB');
const Lang=require('../lib/consts/Lang')
const DataTypes=require('sequelize').DataTypes;

const user = db.sequelize.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:{
                args:[1,23],
                msg:Lang.USER.NAME_REG_RULE
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
});
user.sync();
module.exports = user;