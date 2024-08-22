import "./App.scss"
import HeaderUI from "./components/partials/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import ProjectForm from "./ProjectForm";
import RegisterForm from "./auth/Register";
import LoginForm from "./auth/Login";
const App = () => {

  return (
    <Router>
      <HeaderUI />
      <Routes>
        <Route path="/" element={<ProjectsList />} />
        <Route path="/my-projects" element={<ProjectsList />} />
        <Route path="/create-project" element={<ProjectForm />} />

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes> 
    </Router>
  );
}

export default App;
