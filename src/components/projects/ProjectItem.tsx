import { FC } from "react";
import { IProjectItem } from "../../lib/Project";
import Paragraph from "antd/es/typography/Paragraph";
import { Link } from "react-router-dom";

const ProjectItem: FC<IProjectItem> = ({ name, description, status, id }) => {
  return (
    <section className="project-item flex">
      <Link to={`/project/${id}`} className="text-data">
        <div className="name">{name}</div>
        <Paragraph
          ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
          className="details"
        >
          {description}
        </Paragraph>
      </Link>

      <div>{status}</div>
    </section>
  );
}

export default ProjectItem;
