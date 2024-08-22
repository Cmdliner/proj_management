import { Button } from "antd";
import { NavLink } from "react-router-dom";

const HeaderUI = () => {
    return (
        <header className="app-header flex">
            <div>Dashboard</div>
            <nav>
                <ul className="flex">
                    <li></li>
                    <li><NavLink to="/my-projects">My Projects</NavLink></li>
                    <li><NavLink to="/">Logout</NavLink></li>
                    <li><NavLink to="/create-project"><Button ghost={true}>New Project</Button></NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderUI;
