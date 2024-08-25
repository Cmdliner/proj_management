// ProjectPage.tsx
import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddTaskForm from './AddTask';
import styles from './ProjectPage.module.scss';

const ProjectPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => setIsFormVisible(true);
  const hideForm = () => setIsFormVisible(false);

  return (
    <div className={styles.projectPage}>
      <h1>Project Management</h1>
      {/* Other project content goes here */}
      
      <FloatButton
        icon={<PlusOutlined />}
        onClick={showForm}
        type="primary"
        style={{ right: 24, bottom: 24 }}
      />

      {isFormVisible && <AddTaskForm onClose={hideForm} />}
    </div>
  );
};

export default ProjectPage;