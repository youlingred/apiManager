const userModel = require('../model/UserModel');
const Controller = require('./Controller');
const ErrObj = require('../lib/consts/ErrorDescript')
const captcha = require('svg-captcha');
const md5 = require('md5');

class UserController extends Controller {
    constructor() {
        super();
        this.model = userModel;
        //因为路由处理要单独使用这些函数,所以需要显示绑定this指向类本身,不然会有this指向问题
        this.index = this.index.bind(this);
        this.reg = this.reg.bind(this);
        this.login = this.login.bind(this);
    }

    //note 验证码
    getCaptcha(ctx) {
        const code = captcha.createMathExpr(
            {
                noise: 1,
                // background: '#BF4030'
            }
        );
        ctx.session.captcha = code.text;
        ctx.set('Content-Type', 'image/svg+xml');
        ctx.body = code.data;
    }

    //note 用户首页
    async index(ctx, next) {
        await this.redirectNoLogin();
    }

    //NOTE 注册
    async reg(ctx, next) {
        if (this.isLogin(ctx)) {
            this.fail(ctx, ErrObj.USER.IS_LOGIN)
            return;
        }
        const {name, password, repeatPassword, code} = ctx.request.body;
        // name.replace(/\s+/g, "");
        if (!name || !password) {
            this.fail(ctx, ErrObj.USER.NAME_PWD_NOT_NULL);
            return;
        }
        if (password !== repeatPassword) {
            this.fail(ctx, ErrObj.USER.PWD_REPEAT_RULE);
            return;
        }
        if (code !== ctx.session.captcha) {
            this.fail(ctx, ErrObj.USER.CAPTCHA_WRONG);
            return;
        }
        await this.model.findOne({
            where: {
                name: name
            }
        }).then(async data => {
            if (data) {
                this.fail(ctx, ErrObj.USER.REG_FAIL_EXIST);
            } else {
                await this.model.create({
                    id: `${Date.now()}`,
                    name: name,
                    password: md5(password)
                }).then(data => {
                    this.success(ctx, {...{data: {id: data.get('id'), name: name}}, ...ErrObj.USER.REG_SUCCESS});
                }).catch(error => {
                    this.fail(ctx, {msg: error.message});
                })
            }
        })

    }

    //NOTE 登录
    async login(ctx, next) {
        if (this.isLogin(ctx)) {
            this.fail(ctx, ErrObj.USER.IS_LOGIN);
            return;
        }
        const {name, password, code} = ctx.request.body;
        if (!name || !password) {
            this.fail(ctx, ErrObj.USER.NAME_PWD_NOT_NULL);
            return;
        }
        if (code !== ctx.session.captcha) {
            this.fail(ctx, ErrObj.USER.CAPTCHA_WRONG);
            return;
        }
        await this.model.findOne({
            where: {
                name: name
            }
        }).then(data => {
            if (data && name === data.get('name') && md5(password) === data.get('password')) {
                this.success(ctx, ErrObj.USER.LOGIN_SUCCESS)
            } else {
                this.fail(ctx, ErrObj.USER.LOGIN_FAIL_PWD_WRONG)
            }
        })

    }

    //NOTE 退出
    logout(ctx, next) {
        this.setLogout(ctx);
        this.success(ctx, ErrObj.USER.LOGIN_SUCCESS)
    }
}

module.exports = UserController;