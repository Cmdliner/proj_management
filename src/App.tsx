import "./App.scss"
import HeaderUI from "./components/partials/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import ProjectForm from "./ProjectForm";
const App = () => {

  return (
    <Router>
      <HeaderUI />
      <Routes>
        <Route path="/" element={<ProjectsList />} />
        <Route path="/my-projects" element={<ProjectsList />} />
        <Route path="/create-project" element={<ProjectForm />} />
      </Routes> 
    </Router>
  );
}

export default App;
