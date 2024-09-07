import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Card, Tag, List, Empty, Button, Select, message, Popconfirm, Tooltip, FloatButton } from 'antd';
import { PlusOutlined, EditFilled, DeleteFilled, CheckCircleFilled, ClockCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AddEditTaskForm from './AddEdit';
import styles from './Project.module.scss';
import { useParams } from "react-router-dom";
import { IProject } from "./lib/Project";
import app from "./lib/constants";
import { setHeadersIfAuth } from "./lib/auth";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'ongoing' | 'pending' | 'completed';
}

const ProjectPage: React.FC = () => {
  const { projectID } = useParams();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all');
  const [error, setError] = useState('');
  const [project, setProject] = useState<IProject | null>(null);

  useEffect(() => {
    fetchProject();
  }, [projectID]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`${app.API_SERVER}/project/${projectID}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: setHeadersIfAuth()
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setProject(data.project as IProject);
      }
    } catch (err) {
      setError('Failed to fetch project details');
    }
  };

  const showForm = () => setIsFormVisible(true);
  const hideForm = () => {
    setIsFormVisible(false);
    setEditingTask(null);
  };

  const addTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const res = await fetch(`${app.API_SERVER}/project/${projectID}/add`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: setHeadersIfAuth(),
        body: JSON.stringify(newTask)
      });
      const data = await res.json();
      if (data.error) {
        message.error(data.error);
      } else {
        await fetchProject(); // Refetch project to get updated tasks
        hideForm();
        message.success('Task added successfully');
      }
    } catch (err) {
      message.error('Failed to add task');
    }
  };

  const editTask = async (updatedTask: Task) => {
    try {
      const res = await fetch(`${app.API_SERVER}/project/${projectID}/task/${updatedTask.id}`, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: setHeadersIfAuth(),
        body: JSON.stringify(updatedTask)
      });
      const data = await res.json();
      if (data.error) {
        message.error(data.error);
      } else {
        await fetchProject(); // Refetch project to get updated tasks
        hideForm();
        message.success('Task updated successfully');
      }
    } catch (err) {
      message.error('Failed to update task');
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`${app.API_SERVER}/project/task/${taskId}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: setHeadersIfAuth()
      });
      const data = await res.json();
      if (data.error) {
        message.error(data.error);
      } else {
        await fetchProject(); // Refetch project to get updated tasks
        message.success('Task deleted successfully');
      }
    } catch (err) {
      message.error('Failed to delete task');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    showForm();
  };

  const getStatusColor = (status: Task['status'] | IProject['status']) => {
    switch (status) {
      case 'ongoing':
      case 'active':
        return 'processing';
      case 'pending':
      case 'on hold':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredTasks = useCallback(() => {
    return filterStatus === 'all'
      ? project?.tasks || []
      : (project?.tasks || []).filter((task: any) => task.status === filterStatus);
  }, [project?.tasks, filterStatus]);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleFilled style={{ color: '#52c41a' }} />;
      case 'ongoing':
        return <ClockCircleFilled style={{ color: '#1890ff' }} />;
      case 'pending':
        return <ExclamationCircleFilled style={{ color: '#faad14' }} />;
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.projectPage}>
      <Card className={styles.projectCard}>
        <Title level={2}>{project.name}</Title>
        <Paragraph>{project.description}</Paragraph>
        <div className={styles.projectStatus}>
          <Text strong>Status:</Text>
          <Tag color={getStatusColor(project.status || 'def')}>{project.status?.toUpperCase() || 'DEF'}</Tag>
        </div>
      </Card>

      <Card
        title={<Title level={3}>Project Tasks</Title>}
        className={styles.tasksCard}
        extra={
          <div className={styles.cardExtra}>
            <Select
              defaultValue="all"
              style={{ width: '100%', maxWidth: '200px' }}
              onChange={(value: Task['status'] | 'all') => setFilterStatus(value)}
            >
              <Option value="all">All Tasks</Option>
              <Option value="ongoing">Ongoing</Option>
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
            </Select>
            <Button type="primary" icon={<PlusOutlined />} onClick={showForm}>
              Add Task
            </Button>
          </div>
        }
      >
        {filteredTasks().length > 0 ? (
          <TransitionGroup>
            <List
              itemLayout="horizontal"
              dataSource={filteredTasks() as any}
              renderItem={(task: Task) => (
                <CSSTransition key={task.id} timeout={300} classNames={{
                  enter: styles.taskEnter,
                  enterActive: styles.taskEnterActive,
                  exit: styles.taskExit,
                  exitActive: styles.taskExitActive,
                }}>
                  <List.Item className={styles.taskItem}>
                    <div className={styles.taskContent}>
                      <div className={styles.taskHeader}>
                        <Text strong>{task.name}</Text>
                        <div className={styles.taskStatus}>
                          {getStatusIcon(task.status)}
                          <Text type="secondary">{task.status}</Text>
                        </div>
                      </div>
                      <Text type="secondary" className={styles.taskDescription}>{task.description}</Text>
                    </div>
                    <div className={styles.taskActions}>
                      <Tooltip title="Edit">
                        <Button type="text" icon={<EditFilled />} onClick={() => handleEdit(task)} />
                      </Tooltip>
                      <Popconfirm
                        title="Are you sure you want to delete this task?"
                        onConfirm={() => deleteTask(task.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Tooltip title="Delete">
                          <Button type="text" icon={<DeleteFilled />} />
                        </Tooltip>
                      </Popconfirm>
                    </div>
                  </List.Item>
                </CSSTransition>
              )}
            />
          </TransitionGroup>
        ) : (
          <Empty
            description="No tasks yet. Click 'Add Task' to get started!"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>

      <FloatButton
        icon={<PlusOutlined />}
        onClick={showForm}
        type="primary"
        style={{ right: 24, bottom: 24 }}
      />

      {isFormVisible && (
        <AddEditTaskForm
          onClose={hideForm}
          onSubmit={editingTask ? editTask as any : addTask}
          initialValues={editingTask}
        />
      )}
    </div>
  );
};

export default ProjectPage;