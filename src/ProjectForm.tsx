import { Button, DatePicker, Form, Input } from "antd";
import { FC, useState } from "react";
import { type ProjectForm } from "./lib/Project";
import TextArea from "antd/es/input/TextArea";
import { setHeadersIfAuth } from "./lib/auth";
import app from "./lib/constants";
import { type ResponseType } from "./lib/Data";
import { useNavigate } from "react-router-dom";


const ProjectForm: FC = () => {
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    async function submitForm() {
        const { name, status, description, dueDate } = form.getFieldsValue();
        const res = await fetch(`${app.API_SERVER}/project/create`, {
            method: 'POST',
            credentials: "include",
            mode: "cors",
            headers: setHeadersIfAuth(),
            body: JSON.stringify({ name, status, description, dueDate })
        });
        const data: ResponseType = await res.json();
        if (data.error) {
            setError(error);
            return;
        }
        navigate('/');

    }
    
    return (
        <>
            {error && <div>{error}</div>}
            <Form
                form={form}
                style={{ maxWidth: "60%", margin: "auto" }}
                onFinish={submitForm}
                autoComplete="off"
            >
                {/* Project Name */}
                <Form.Item<ProjectForm>
                    label="Project Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the project name!' }]}
                >
                    <Input />
                </Form.Item>

                {/* Project Description */}
                <Form.Item<ProjectForm>
                    label="Project Description"
                    name="description"
                    rules={[{ required: false, min: 5 }]}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item<ProjectForm>
                    label="Status"
                    name="status"
                    rules={[{ enum: ['pending', 'ongoing', 'completed'] }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<ProjectForm>
                    name="dueDate"
                    label="Due date"
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        New Project
                    </Button>
                </Form.Item>

            </Form>
            {error && <div>{error}</div>}

        </>
    );
}



export default ProjectForm;
