// // import { useEffect, useState } from "react";
// // import { apiClient } from "../clients/api";
// // import { useParams } from "react-router-dom";
// // import type { Project } from "../types";

// // function ProjectDetailsPage() {
// //   const [project, setProject] = useState<Project | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const { projectId } = useParams();

// //   useEffect(() => {
// //     const fetchProjectDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await apiClient.get(`/api/projects/${projectId}`);
// //         console.log(res.data);
// //         setProject(res.data);
// //       } catch (error: any) {
// //         console.log(error);
// //         setError(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProjectDetails();
// //   }, [projectId]);

// //   if (loading) return <div className="text-3xl text-white">loading Project</div>;

// //   if (error) return <div className="text-3xl text-white">Error loading Project</div>;

// //   return (
// //     <div className="text-white">
// //       <h1 className="text-4xl">Project Details</h1>

// //       <div className="mt-10">
// //         <div className="text-3xl">{project?.name}</div>
// //         <div className="text-xl">{project?.description}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProjectDetailsPage;

import { useEffect, useState, useContext } from "react";
import { apiClient } from "../clients/api";
import { useParams, useNavigate } from "react-router-dom";
import type { Project, Task } from "../types";
import { AuthContext } from "../context/AuthContext";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("todo");

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
        setTasks(res.data);
      } catch (err: any) {
        console.error(err);
      }
    };
    if (projectId) fetchTasks();
  }, [projectId]);

  if (loading)
    return <div className="text-3xl text-white">Loading Project...</div>;
  if (error) return <div className="text-3xl text-white">Error: {error}</div>;

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await apiClient.put(`/api/projects/${projectId}`, {
        name,
        description,
      });
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
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

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
    logout(); // clears token and updates auth state
    navigate("/login"); // redirect to login page
  };
     
  // Task Management //
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ taskTitle, taskDescription, taskStatus });
    try {
      const res = await apiClient.post(`/api/projects/${projectId}/tasks`, {
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
      });
      setTasks((prev) => [...prev, res.data]);
      setTaskTitle("");
      setTaskDescription("");
      setTaskStatus("todo");
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    currentStatus: string
  ) => {
    const nextStatus =
      currentStatus === "todo"
        ? "in-progress"
        : currentStatus === "in-progress"
        ? "done"
        : "todo";

    try {
      const res = await apiClient.put(`/api/tasks/${taskId}`, {
        status: nextStatus,
      });
      setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await apiClient.delete(`/api/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err: any) {
      console.error(err);
    }
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

      <form onSubmit={handleAddTask} className="mt-6 space-y-2">
        <h2 className="text-2xl font-bold">Add Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          className="border p-2 rounded w-full bg-green-500"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" className="bg-sky-500 p-2 rounded">
          Add Task
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Tasks</h2>
        {tasks.map((task) => (
          <div key={task._id} className="border p-2 rounded mb-2">
            <div className="font-bold">{task.title}</div>
            <div>{task.description}</div>
            <div>Status: {task.status}</div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleUpdateTaskStatus(task._id, task.status)}
                className="bg-yellow-500 p-1 rounded"
              >
                Toggle Status
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-500 p-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="text-red-400 mt-2">{error}</div>}
    </div>
  );
}

export default ProjectDetailsPage;
