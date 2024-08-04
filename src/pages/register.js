import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd';
import LoginWrap from './components/login_wrap';
import { Link } from 'react-router-dom';
import axios from '../util/http'

function Register() {

    const [form] = Form.useForm()

    async function register_click() {
        const form_data = await form.validateFields()
        if (form_data) {
            // console.log(form_data)
            axios.post('/api/register', form_data)
        }
    }

    return (
        <LoginWrap>
            <Form form={form}>
                <h2>请注册</h2>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        type="text"
                        id="username"
                        placeholder="用户名"
                    />
                </Form.Item>

                <Form.Item name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={register_click}
                >
                    注册
                </Button>
                <Divider />
                <Link className='login_enroll' to="/login">已有帐号？直接登录</Link>
            </Form>
        </LoginWrap>

    );
};

export default Register;