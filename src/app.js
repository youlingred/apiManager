const koa = require('koa');
const bodyparser=require('koa-bodyparser');
const session = require('koa-session-minimal');
const cors =require('koa2-cors');
const mysqlSessionStore = require('koa-mysql-session')
const config = require('./config');
const router = require('./router');
const ip = require('ip');
const opn = require('opn')
const app = new koa();
const sessionStore = new mysqlSessionStore(config.sessionStore);

app.keys = ['some secret hurr'];
//NOTE 扩展config属性
// app.config = config;
//NOTE 跨域中间件
app.use(cors({
    origin:'*'
}));
//NOTE 使用session中间件
app.use(session({
    key: config.sessionKey,
    store: sessionStore
}));
//NOTE 使用body解析中间件
app.use(bodyparser({
    formLimit:'1mb'
}));
//NOTE 使用路由中间件
app.use(router.routes());

//NOTE 启动监听
app.listen(config.port);
//NOTE 开发环境下打开浏览器
if (process.env.NODE_ENV === config.ENV_DEV_OPEN) {
    opn(`http://${ip.address()}:${config.port}`);
}

console.log('启动完成,端口: http://%s:%s http://%s:%s', ip.address(), config.port, 'localhost', config.port);