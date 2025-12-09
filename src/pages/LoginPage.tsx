
// import { useContext, useState } from "react";
// import { apiClient } from "../clients/api";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const {login} = useContext(AuthContext)

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await apiClient.post("/api/users/login", {
//         email,
//         password,
//       });

//     //   localStorage.setItem("token", res.data.token);
//       login(res.data.token);
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
//         <h1 className="text-3xl font-bold text-white">Login</h1>

//         {error && <div className="text-red-400">{error}</div>}

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
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-gray-300 text-sm">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-sky-400 underline">Register</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;


import { useState,useContext } from "react";
import { apiClient } from "../clients/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login }= useContext(AuthContext); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("")

      // Axios call with credentials
      // const res = await apiClient.post(
      //   "/api/users/login",
      //   { email, password },
      //   { withCredentials: true }
      // );

      const res = await apiClient.post("/api/users/login", { email, password });

      login(res.data.token)
// localStorage.setItem("token", res.data.token);

//       localStorage.setItem("token", res.data.token);
      navigate("/projects");
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
        <h1 className="text-3xl font-bold text-white">Login</h1>

        {error && <div className="text-red-400">{error}</div>}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-300 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-sky-400 underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
