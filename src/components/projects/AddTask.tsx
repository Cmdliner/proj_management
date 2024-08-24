import { Button, Form, Input } from "antd";
import app from "../../lib/constants";
import { setHeadersIfAuth } from "../../lib/getHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = ({ id }: { id: string }) => {
    const [error, setError] = useState<string>();
    const [TaskForm] = Form.useForm();
    const navigate = useNavigate();

    async function newTask() {
        const { name, description } = TaskForm.getFieldsValue();
        const res = await fetch(`/${app.API_SERVER}/project/${id}/add`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: setHeadersIfAuth(),
            body: JSON.stringify({ name, description })
        });
        const data = await res.json();
        if (data.error) {
            setError(error);
        }
        navigate('/');

    }

    return (
        <div className="add-task-overlay">
            {/* Put project name in breadcrumbs => Projects/{project_name}/addtask*/}
            Add Task
            <Form form={TaskForm}
                onFinish={newTask}>
                <Form.Item
                    name="name"
                    label="Task Name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" value="Add task" />
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddTask;