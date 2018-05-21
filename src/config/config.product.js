module.exports={
    "env":"production",
    "debug":false,
    //数据库配置
    database: {
        dialect:'mysql',
        host: 'localhost',             //主机地址
        port: 3306,                  //端口
        user: 'root',                      //用户名
        password: '123456',            //密码
        database: 'api_sql',         //数据库名称
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    },
    sessionStore:{
        host: 'localhost',             //主机地址
        port: 3306,                  //端口
        user: 'root',                      //用户名
        password: '123456',            //密码
        database: 'api_sql'         //数据库名称
    },
};