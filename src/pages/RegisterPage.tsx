
// import { useState } from "react";
// import { apiClient } from "../clients/api";
// import { useNavigate } from "react-router-dom";

// function RegisterPage() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await apiClient.post("/api/users/register", {
//         username,
//         email,
//         password,
//       });

//       // Save token and redirect
//       localStorage.setItem("token", res.data.token);
//       navigate("/projects");

//     } catch (err: any) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-zinc-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-zinc-800 p-8 rounded-lg w-full max-w-md shadow-lg space-y-4"
//       >
//         <h1 className="text-3xl font-bold text-white">Register</h1>

//         {error && <div className="text-red-400">{error}</div>}

//         <div className="flex flex-col">
//           <label className="text-white">Username</label>
//           <input
//             className="p-2 rounded bg-zinc-700 text-white"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-white">Email</label>
//           <input
//             className="p-2 rounded bg-zinc-700 text-white"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             required
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-white">Password</label>
//           <input
//             className="p-2 rounded bg-zinc-700 text-white"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-sky-500 w-full p-2 rounded hover:bg-sky-600 text-white"
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>

//         <p className="text-gray-300 text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-sky-400 underline">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default RegisterPage;


import { useState } from "react";
import { apiClient } from "../clients/api";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await apiClient.post("/api/users/register", {
        username,
        email,
        password,
      });

      console.log("Registered user:", res.data);


 setSuccess("User registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-lg w-full max-w-md shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-white">Register</h1>

        {error && <div className="text-red-400">{error}</div>}
        {success && <div className="text-green-400">{success}</div>}

        <div className="flex flex-col">
          <label className="text-white">Username</label>
          <input
            className="p-2 rounded bg-zinc-700 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white">Email</label>
          <input
            className="p-2 rounded bg-zinc-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white">Password</label>
          <input
            className="p-2 rounded bg-zinc-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-500 w-full p-2 rounded hover:bg-sky-600 text-white"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-300 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-sky-400 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
