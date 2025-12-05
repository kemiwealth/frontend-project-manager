import axios from "axios"

export const apiClient = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzFkOGNmMzI3YjkzOTUxODMzMTIyYiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3NjQ5NTYyOTQsImV4cCI6MTc2NDk2MzQ5NH0.PQilrS0Zout2U2FDS6oooid8Y8zBaiTDyd0SE2_LoyA'
    },
});