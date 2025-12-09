// import { useEffect, useState } from "react";
// import { apiClient } from "../clients/api";
// import { useParams } from "react-router-dom";
// import type { Project } from "../types";

// function ProjectDetailsPage() {
//   const [project, setProject] = useState<Project | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
  

//   const { projectId } = useParams();

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         setLoading(true);
//         const res = await apiClient.get(`/api/projects/${projectId}`);
//         console.log(res.data);
//         setProject(res.data);
//       } catch (error: any) {
//         console.log(error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjectDetails();
//   }, [projectId]);

//   if (loading) return <div className="text-3xl text-white">loading Project</div>;

//   if (error) return <div className="text-3xl text-white">Error loading Project</div>;

//   return (
//     <div className="text-white">
//       <h1 className="text-4xl">Project Details</h1>

//       <div className="mt-10">
//         <div className="text-3xl">{project?.name}</div>
//         <div className="text-xl">{project?.description}</div>
//       </div>
//     </div>
//   );
// }

// export default ProjectDetailsPage;

import { useEffect, useState, useContext } from "react";
import { apiClient } from "../clients/api";
import { useParams, useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { AuthContext } from "../context/AuthContext";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const { projectId } = useParams();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        setProject(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  if (loading) return <div className="text-3xl text-white">Loading Project...</div>;
  if (error) return <div className="text-3xl text-white">Error: {error}</div>;

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await apiClient.put(`/api/projects/${projectId}`, { name, description });
      setProject(res.data);
      setEditing(false);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      setLoading(true);
      await apiClient.delete(`/api/projects/${projectId}`);
      navigate("/projects"); // To Redirect after deletion
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

    const handleLogout = () => {
    logout();            // clears token and updates auth state
    navigate("/login");   // redirect to login page
  };


  return (
    <div className="text-white max-w-xl mx-auto p-4">
      <h1 className="text-4xl mb-4">Project Details</h1>
              <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>

      {editing ? (
        <div className="space-y-2">
          <input
            className="w-full p-2 rounded bg-zinc-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full p-2 rounded bg-zinc-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="bg-sky-500 p-2 rounded hover:bg-sky-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-3xl font-bold">{project?.name}</div>
          <div className="text-xl my-2">{project?.description}</div>
          {isAuthenticated && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-yellow-500 p-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {error && <div className="text-red-400 mt-2">{error}</div>}
    </div>
  );
}

export default ProjectDetailsPage;
