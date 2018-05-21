import React, {Component} from 'react';
import {Card, Form, Button, Input} from 'element-react';
import 'element-theme-default'
import './Login.css'
import _ from 'lodash'
import Service from '../../lib/service/Login'

class Login extends Component {
    //FIXME 构造函数
    constructor(props) {
        super(props);
        this.service = new Service();
        this.state = {
            form:{
                name: '',
                password: '',
                repeatPassword: '',
                code: '',
            },
            viewType:'login',
            captchaRefshTime: ''
        }
    }

    //FIXME 输入改变
    onChange(key, value) {
        this.state.form[key]=value;
        this.forceUpdate();
    }

    //FIXME 刷新验证码
    refreshCaptcha() {
        this.setState({
            captchaRefshTime: Date.now()
        })
    }
    //FIXME 登录/注册
    onSubmit(e) {
        e.preventDefault();
        if(this.state.viewType==='login'){
            this.service.login(_.pick(this.state.form,['name','password','code']))
        }else if(this.state.viewType==='reg'){
            this.service.reg(this.state.form);
        }
    }
    renderTitle(){
        if(this.state.viewType==='login'){
            return '登录'
        }else if(this.state.viewType==='reg'){
            return  '注册'
        }
    }
    renderInput(){
        if(this.state.viewType==='login'){
            return ''
        }else if(this.state.viewType==='reg'){
            return  <Form.Item label="确认密码">
                <Input onChange={this.onChange.bind(this, 'repeatPassword')}
                       placeholder='确认密码'/>
            </Form.Item>
        }
    }
    renderBtns(){
        if(this.state.viewType==='login'){
            return <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" nativeType="submit">登录</Button>
                <Button onClick={()=>this.setState({viewType:'reg'})}>注册</Button>
            </Form.Item>
        }else if(this.state.viewType==='reg'){
            return <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" nativeType="submit">提交</Button>
                <Button onClick={()=>this.setState({viewType:'login'})}>已有账号?</Button>
            </Form.Item>
        }
    }
    //FIXME 渲染函数
    render() {
        return (
            <div className='login-bg'>
                <Card className='Login-form' header={this.renderTitle()}>
                    <Form labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                        <Form.Item label="用户名">
                            <Input onChange={this.onChange.bind(this, 'name')} placeholder='用户名'/>
                        </Form.Item>
                        <Form.Item label="密码">
                            <Input onChange={this.onChange.bind(this, 'password')}
                                   placeholder='密码'/>
                        </Form.Item>
                        {this.renderInput()}
                        <Form.Item label="验证码">
                            <Input onChange={this.onChange.bind(this, 'code')} placeholder='验证码'/>
                            <img src={`${this.service.captcha()}?t=${this.state.captchaRefshTime}`}
                                 onClick={() => this.refreshCaptcha()} alt='captcha'/>
                        </Form.Item>
                        {this.renderBtns()}
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Login;