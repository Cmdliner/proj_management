import { FC, useEffect, useState } from "react";
import { IProject } from "./lib/Project";
import Paragraph from "antd/es/typography/Paragraph";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import app from "./lib/constants";
import { setHeadersIfAuth } from "./lib/getHeader";
import { useParams } from "react-router-dom";
import styles from "./Project.module.scss";
import AddTaskForm from "./components/projects/AddTask";

const ProjectDetails: FC = () => {
    const { projectID } = useParams();
    const [error, setError] = useState('');
    const [project, setProject] = useState<IProject>();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const showForm = () => setIsFormVisible(true);
    const hideForm = () => setIsFormVisible(false);


    useEffect(() => {
        (async () => {
            const res = await fetch(`${app.API_SERVER}/project/${projectID}`, {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: setHeadersIfAuth()
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            }
            setProject(data.project as IProject);
        })()
    }, [])
    return (
        <>
            { error && <div>{error}</div> }
            {project && <div className={styles.projectPage}>
                <h1>Project Management</h1>
                {/* Other project content goes here */}
                {/* Breadcrumb  /project/task/add */}
                <Paragraph>
                    {project.description}
                </Paragraph>
                <span>{project.status}</span>
                <FloatButton
                    icon={<PlusOutlined />}
                    onClick={showForm}
                    type="primary"
                    style={{ right: 24, bottom: 24 }}
                />

                {isFormVisible && <AddTaskForm onClose={hideForm} projectId={projectID as string} />}
            </div>}
        </>
    );
}

export default ProjectDetails;

