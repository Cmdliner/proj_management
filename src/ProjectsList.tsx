import Search from "antd/es/input/Search";
import ProjectItem from "./components/projects/ProjectItem";
import { useEffect, useState } from "react";
import { IProject } from "./lib/Project";
import app from "./lib/constants";
import { ResponseType } from "./lib/Data";
import { setHeadersIfAuth } from "./lib/getHeader";

const ProjectsList = () => {
    const [projects, setProjects] = useState<IProject[]>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${app.API_SERVER}/project/user-projects`, {
              method: "GET",
              headers: setHeadersIfAuth(),
              mode: "cors",
              credentials: "include",
            });
            const data: ResponseType = await res.json();
            if (data.error) {
                setError(data.error);
                return;
            }
            console.log(data);
            setProjects(data?.projects as any as IProject[]);
        }
        )();

    }, [])

    return (
        <main className="proj-list">
            <div className="search-container flex">
                { error && <div>{error}</div> }
                <Search className="search-projects" />
            </div>
            {projects && projects.length > 0 && projects.map((proj, index) => (
                <ProjectItem key={index} name={proj.name} description={proj.description} status={proj.status} id={proj.id} />
            ))}

        </main>
    );
}



export default ProjectsList;
