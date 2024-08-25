import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import styles from './AddTask.module.scss';
import { useNavigate } from 'react-router-dom';
import app from '../../lib/constants';
import { setHeadersIfAuth } from '../../lib/getHeader';

interface AddTaskFormProps {
  onClose: () => void;
  projectId: string;
}

interface ITaskForm {
  name: string;
  description: string;
  dueDate: string;
  // status: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onClose, projectId }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

async function onFinish() {
    const { name, description, dueDate } = form.getFieldsValue();
    const res = await fetch(`${app.API_SERVER}/project/${projectId}/add`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: setHeadersIfAuth(),
        body: JSON.stringify({ name, description, status: 'pending', dueDate })
    });
    const data = await res.json();
    if (data.error) {
        console.log(data.error);
    }
    onClose();
    navigate('/');

}

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>Add New Task</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item<ITaskForm>
            name="name"
            label="Task title"
            rules={[{ required: true, message: 'Please input the task name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<ITaskForm>
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the task description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item<ITaskForm>
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select the due date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
            <Button onClick={onClose} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddTaskForm;