import "./App.scss"
import HeaderUI from "./components/partials/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import ProjectForm from "./ProjectForm";
import RegisterForm from "./auth/Register";
import LoginForm from "./auth/Login";
import ProjectPage from "./ProjectDetails";
import AuthProvider from "./auth/AuthContext";
import ProtectedRoute from "./auth/AuthGuard";

const App = () => {

    return (
        <Router>
            <AuthProvider>
                <HeaderUI />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute children={<ProjectsList />} />} />
                        <Route path="/my-projects" element={<ProtectedRoute children={<ProjectsList />} />} />
                        <Route path="/create-project" element={<ProtectedRoute children={<ProjectForm />} />} />
                        <Route path="/project/:projectID" element={<ProtectedRoute children={<ProjectPage />} />} />

                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
