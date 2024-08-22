import Paragraph from 'antd/es/typography/Paragraph';
import './Register.scss';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    return (
        <div className="signup-form-container">
            <Form
                form={form}
                name="signup"
                onFinish={onFinish}
                layout="vertical"
                className="signup-form"
            >
                <h1 style={{ textAlign: 'center'}}>PSI</h1>
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
                    name="confirmpassword"
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
            <Paragraph style={{ marginTop: "2em"}}>
                Already signed up? <Link to="/login">Login</Link>
            </Paragraph>
        </div>
    );
}

export default RegisterForm;
