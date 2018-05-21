import Service from './Service';
import api from './api';
class Login extends Service{
    //FIXME 验证码
    captcha(){
        return this.url(api.captcha)
    }
    //FIXME 登录
    login(params){
        return this.post(api.login,params);
    }
    //FIXME 注册
    reg(params){
        return this.post(api.reg,params);
    }
}
export default Login;