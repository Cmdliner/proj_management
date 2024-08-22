import { FC } from "react";
import { IProjectItem } from "../../lib/Project";
import Paragraph from "antd/es/typography/Paragraph";

const ProjectDetails: FC<IProjectItem>  = ({name, description, status}) => {
    return (
        <div>
            <h1>{name}</h1>
            <Paragraph>
                {description}
            </Paragraph>
            <span>{status}</span>
        </div>
    );
}

export default ProjectDetails;