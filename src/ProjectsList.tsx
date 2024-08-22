import Search from "antd/es/input/Search";
import ProjectItem from "./components/projects/ProjectItem";

const ProjectsList = () => {
    const projects = [
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' },
        { name: 'Project Alpha', details: 'This one is just a demo project', status: 'pending' }
    ]
    return (
        <main className="proj-list">
            <div className="search-container flex">
            <Search className="search-projects"/>
            </div>
            {projects.map((proj, index) => (
                 <ProjectItem key={index} name={proj.name} description={proj.details} status={proj.status}/>
            ))}
            <ProjectItem name="" description="" status=""/>
        </main>
    );
}



export default ProjectsList;