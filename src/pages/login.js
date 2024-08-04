import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd';
import LoginWrap from './components/login_wrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../util/http';

function Login() {

    const navigate = useNavigate()
    const [form] = Form.useForm()

    async function login_click() {
        const form_data = await form.validateFields()

        if (form_data) {
            const res = await axios.post('/api/login', form_data)

            if (res.data.code === 0) {
                navigate('/project')
            }
        }
    }

    return (
        <LoginWrap>
            <Form form={form}>
                <h2>请登录</h2>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        type="text"
                        id="username"
                        placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        id='password'
                        placeholder="密码"
                    />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={login_click}
                >
                    登录
                </Button>
                <Divider />
                <Link className='login_enroll' to="/register">没有账号？注册新账号</Link>
            </Form>
        </LoginWrap>
    );
};

export default Login;