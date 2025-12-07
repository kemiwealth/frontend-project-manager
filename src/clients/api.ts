// import axios from "axios"

// export const apiClient = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_URL,
//     headers: {
//         Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzFkOGNmMzI3YjkzOTUxODMzMTIyYiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3NjUwMjA4NTcsImV4cCI6MTc2NTEwNzI1N30.JTrjpTzDY8N52DIHM6IOt4SPsK1jzEhk36_LWpUu6Rk"
//     },
// });

import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
