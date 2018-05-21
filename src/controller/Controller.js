class Controller {
    constructor() {
    }

    //note 检查是否是登陆状态
    isLogin(ctx) {
        if (ctx.session && ctx.session.isLogin) {
            return true;
        }
        return false;
    }

    setLogin(ctx) {
        ctx.session = {login: true};
    }

    setLogout(ctx) {
        ctx.session = {login: false}

    }

    // //note 未登陆自动跳转
    // redirectNoLogin(ctx) {
    //     if (!this.isLogin(ctx)) {
    //         ctx.redirect('./login');
    //         return false;
    //     }
    //     return true;
    // }
    //
    // //note 已登陆自动跳转
    // redirectLogin(ctx) {
    //     if (this.isLogin(ctx)) {
    //         ctx.redirect('./index');
    //         return false;
    //     }
    //     return true;
    // }

    //note 返回消息
    response(ctx, data, code, msg, dataType = 'json') {
        let result = {
            code: code,
            msg: msg,
            data: data
        };
        if (dataType === 'json') {
            result = JSON.stringify(result);
        }
        ctx.body = result;
    }

    //note 成功
    success(ctx, params) {
        const {data, code, msg} = params;
        this.response(ctx, data || {}, msg || '', code || '0')
    }

    //note 失败
    fail(ctx, params) {
        console.log(params)
        const {data, code, msg} = params;
        this.response(ctx, data || {}, code || '1', msg || '')
    }
}

module.exports = Controller;