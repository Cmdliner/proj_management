import Paragraph from 'antd/es/typography/Paragraph';
import './Register.scss';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ISignUpForm } from '../lib/User';
import { useState } from 'react';
import app from '../lib/constants';
import { setHeadersIfAuth } from '../lib/auth';
import { ResponseType } from '../lib/Data';
import { useAuth } from './AuthContext';

const RegisterForm = () => {
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const [form] = Form.useForm<ISignUpForm>();
    const { login } = useAuth();

    const onFinish = async () => {
        const { username, password, confirmPassword } = form.getFieldsValue();
        if (password !== confirmPassword) {
            setError('Password does not match confirm password');
            return;
        }
        const res = await fetch(`${app.API_SERVER}/auth/register`, {
            method: 'POST',
            headers: setHeadersIfAuth(),
            body: JSON.stringify({ username, password })
        });
        if (res.status === 201) {
            const authHeader = res.headers.get('Authorization');
            if (authHeader) login(authHeader?.split(" ")?.[1]!, 29 * 24 * 60 * 60);
        }
        const data: ResponseType = await res.json();
        if (data.error) {
            setError(error);
            return;
        }
        navigate('/');

    };
    return (
        <div className="signup-form-container">
            {error && <div>{error}</div>}
            <Form
                form={form}
                name="signup"
                onFinish={onFinish}
                layout="vertical"
                className="signup-form"
            >
                <h1 style={{ textAlign: 'center' }}>PSI</h1>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[{ required: true, message: 'Please input your confirm password!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="signup-button">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            <Paragraph style={{ marginTop: "2em" }}>
                Already signed up? <Link to="/login">Login</Link>
            </Paragraph>
        </div>
    );
}

export default RegisterForm;
