import Paragraph from 'antd/es/typography/Paragraph';
import './Register.scss';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import app from '../lib/constants';
import { setHeadersIfAuth } from '../lib/auth';

const LoginForm = () => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async () => {
        const { username, password } = form.getFieldsValue();
        const fetchOpts: RequestInit = {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: setHeadersIfAuth(),
            body: JSON.stringify({ username, password })
        }
        const res = await fetch(`${app.API_SERVER}/auth/login`, fetchOpts);
        if(res.status === 200) {
            localStorage.setItem("Authorization", res.headers.get("Authorization")?.split(" ")[1] as string);
        }
        const data = await res.json();
        if(data["success"]) {
            navigate("/");
        }
        console.error(data["error"]);

    };
    return (
        <div className="signup-form-container">
            <Form
                form={form}
                name="login"
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="signup-button">
                        Log  In
                    </Button>
                </Form.Item>
            </Form>
            <Paragraph style={{ marginTop: "2em" }}>
                Just getting started? <Link to="/register">Register</Link>
            </Paragraph>
        </div>
    );
}

export default LoginForm;
