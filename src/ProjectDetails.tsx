import { FC, useEffect, useState } from "react";
import { IProject } from "./lib/Project";
import Paragraph from "antd/es/typography/Paragraph";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import app from "./lib/constants";
import { setHeadersIfAuth } from "./lib/getHeader";
import { useParams } from "react-router-dom";

const ProjectDetails: FC = () => {
    const { projectID } = useParams();
    const [error, setError] = useState('');
    const [project, setProject] = useState<IProject>();
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
            {error && <div>{error}</div>}
            {project && <div>
                <h1>{project.name}</h1>
                <Paragraph>
                    {project.description}
                </Paragraph>
                <span>{project.status}</span>
                <FloatButton icon={<PlusCircleOutlined />} />
            </div>}
        </>
    );
}

export default ProjectDetails;