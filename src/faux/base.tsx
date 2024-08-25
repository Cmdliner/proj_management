import React, { useState, useCallback } from 'react';
import { Typography, Card, Tag, List, Empty, Button, Select, message, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined, EditFilled, DeleteFilled, CheckCircleFilled, ClockCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AddEditTaskForm from './addedit';
import styles from './base.module.scss';

const { Title, Text } = Typography;
const { Option } = Select;

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'ongoing' | 'pending' | 'completed';
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'on hold' | 'completed';
  tasks: Task[];
}

const ProjectPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all');

  const [project, setProject] = useState<Project>({
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign and implement new company website',
    status: 'active',
    tasks: [
      { id: '1', name: 'Design mockups', description: 'Create initial design mockups', status: 'completed' },
      { id: '2', name: 'Frontend development', description: 'Implement responsive frontend', status: 'ongoing' },
      { id: '3', name: 'Backend integration', description: 'Integrate with backend API', status: 'pending' },
    ],
  });

  const showForm = () => setIsFormVisible(true);
  const hideForm = () => {
    setIsFormVisible(false);
    setEditingTask(null);
  };

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const taskWithId = { ...newTask, id: Date.now().toString() };
    setProject(prevProject => ({
      ...prevProject,
      tasks: [...prevProject.tasks, taskWithId],
    }));
    hideForm();
    message.success('Task added successfully');
  };

  const editTask = (updatedTask: Task) => {
    setProject(prevProject => ({
      ...prevProject,
      tasks: prevProject.tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
    hideForm();
    message.success('Task updated successfully');
  };

  const deleteTask = (taskId: string) => {
    setProject(prevProject => ({
      ...prevProject,
      tasks: prevProject.tasks.filter(task => task.id !== taskId),
    }));
    message.success('Task deleted successfully');
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    showForm();
  };

  const getStatusColor = (status: Task['status'] | Project['status']) => {
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
      ? project.tasks
      : project.tasks.filter(task => task.status === filterStatus);
  }, [project.tasks, filterStatus]);

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

  return (
    <div className={styles.projectPage}>
      <Card className={styles.projectCard}>
        <Title level={2}>{project.name}</Title>
        <Text type="secondary">{project.description}</Text>
        <div className={styles.projectStatus}>
          <Text strong>Status:</Text>
          <Tag color={getStatusColor(project.status)}>{project.status.toUpperCase()}</Tag>
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
              dataSource={filteredTasks()}
              renderItem={(task) => (
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