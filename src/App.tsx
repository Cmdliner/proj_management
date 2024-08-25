import "./App.scss"
import HeaderUI from "./components/partials/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import ProjectForm from "./ProjectForm";
import RegisterForm from "./auth/Register";
import LoginForm from "./auth/Login";
import ProjectDetails from "./ProjectDetails";
import ProjectPage from "./final";
const App = () => {

    return (
        <Router>
            <HeaderUI />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<ProjectsList />} />
                    {/* <Route path="/faux" element={<ProjectPage />} /> */}
                    <Route path="/project/:projectID" element={<ProjectPage />} />
                    <Route path="/my-projects" element={<ProjectsList />} />
                    <Route path="/create-project" element={<ProjectForm />} />
                    {/* <Route path="/project/:projectID" element={<ProjectDetails />} /> */}

                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
