// AddEditTaskForm.tsx
import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import styles from './addedit.module.scss';

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'ongoing' | 'pending' | 'completed';
}

interface AddEditTaskFormProps {
  onClose: () => void;
  onSubmit: (task: Task | Omit<Task, 'id'>) => void;
  initialValues?: Task | null;
}

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({ onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const onFinish = (values: Omit<Task, 'id'>) => {
    if (initialValues) {
      onSubmit({ ...values, id: initialValues.id });
    } else {
      onSubmit(values);
    }
    form.resetFields();
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{initialValues ? 'Edit Task' : 'Add New Task'}</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialValues || {}}
        >
          <Form.Item
            name="name"
            label="Task Name"
            rules={[{ required: true, message: 'Please input the task name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the task description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the task status!' }]}
          >
            <Select>
              <Select.Option value="ongoing">Ongoing</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {initialValues ? 'Update Task' : 'Add Task'}
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

export default AddEditTaskForm;