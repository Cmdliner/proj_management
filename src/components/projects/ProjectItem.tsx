import { FC } from "react";
import { IProjectItem } from "../../lib/Project";
import Paragraph from "antd/es/typography/Paragraph";

const ProjectItem: FC<IProjectItem> = ({ name, description, status }) => {
  console.log(description);
  return (
    <section className="project-item flex">
      <div className="text-data">
        <div className="name">{name}</div>
        <Paragraph
          ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
          className="details"
        >
          {description}
        </Paragraph>
      </div>

      <div>{status}</div>
    </section>
  );
}

export default ProjectItem;
