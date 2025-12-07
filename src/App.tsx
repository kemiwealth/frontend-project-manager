import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import Navbar from "./components/NavBar";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";


console.log(import.meta.env.VITE_BACKEND_URL);


function App() {
  return (
    <>
      <div className="p-5 bg-zinc-900 h-screen">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/projects" element={<ProtectedRoute> <ProjectsPage /> </ProtectedRoute>}/>
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />}/>
        </Routes>
      </div>
    </>
  );
}
export default App;