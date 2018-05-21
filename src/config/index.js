"use strict";
const path = require('path');
const _ = require('lodash');
const devConfig = require('./config.dev');
const proConfig = require('./config.product');

let config = {
    "ENV_PROD": "production",
    "ENV_DEV": "development",
    "ENV_DEV_OPEN": "development-open",
    "port": 3000,                                //服务器监听端口
    "logDir": path.join(__dirname, '..', 'log'),
    database:{
        //NOTE sequelize模型定义全局设置
        define: {
            timestamps: false,//时间戳,是否自动添加createAt updateAt
            freezeTableName:true//默认为false,会自动把表名变复数
        }
    },
    sessionKey:'SERVER_SID'
};
//根据环境融合生成不同的config
if (process.env.NODE_ENV === config.ENV_DEV || process.env.NODE_ENV === config.ENV_DEV_OPEN) {
    _.merge(config, devConfig);
} else if (process.env.NODE_ENV === config.ENV_PROD) {
    _.merge(config, proConfig);
}
module.exports = config;