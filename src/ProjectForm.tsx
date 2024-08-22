import { Button, Dropdown, Form, Input } from "antd";
import { FC } from "react";
import { type ProjectForm } from "./lib/Project";
import TextArea from "antd/es/input/TextArea";

const ProjectForm: FC = () => {
    function submitForm() { }
    function handleError() { }
    return (
        <Form
            name="projectForm"
            style={{ maxWidth: "60%", margin: "auto", paddingTop: "10em" }}
            onFinish={submitForm}
            onFinishFailed={handleError}
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
                name="status"
                rules={[{ enum: ['pending', 'ongoing', 'completed'] }]}
            >
		<Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    New Project
                </Button>
            </Form.Item>

        </Form>
    );
}



export default ProjectForm;
