


# Project Management App

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to register, log in, and manage personal projects.
Each user can create, view, update, and delete their own projects.
The application uses JWT authentication, React Context for global state, and Axios for API communication.
This project demonstrates authentication, protected routes, CRUD operations, API design, and production deployment.

# Project Structure
project/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   ├── clients/api.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── .env
    └── vite.config.js

# Features
### Authentication  
- User registration
- User login
- JWT-based authentication
- Protected routes (backend + frontend)

### Projects
- Create a project
- View all user-owned projects
- View project details
- Edit a project
- Delete a project

### Frontend
- React + TypeScript
- React Router
- Context API for auth
- Axios API client with interceptor

### Backend
- Node.js + Express
- Mongoose + MongoDB
- JWT + middleware
- RESTful API routes

# Getting Started

1. Clone the repository (frontend)
git clone https://github.com/kemiwealth/frontend-project-manager

2. Install frontend dependencies
cd ../frontend
npm i

3. Add the Vite environment variable
Create .env in the frontend folder:
VITE_BACKEND_URL=http://localhost:4000

4. Start the frontend
npm run dev
Frontend runs on:http://localhost:5173


# API Documentation
Base URL (development):http://localhost:4000/api

## Users API

- POST /api/users/register
Create a new user.
Body:
JSON
{
  "username": "Johnny Deep",
  "email": "john@example.com",
  "password": "password123"
}
Responses
201 Created – user created
400 – user already exists

- POST /api/users/login
Authenticate a user and return a JWT token.
Body:
JSON
{
  "email": "john@example.com",
  "password": "password123"
}
Response:
{
  "token": "jwt_token_here",
  "user": {
    "_id": "...",
    "username": "...",
    "email": "..."
  }
}

- GET /api/users/
Admin-only endpoint.
Returns list of all users.
Headers:
Authorization: Bearer <token>

- GET /api/users/:id
Returns a single user by ID (unprotected).

## Projects API
All project routes require authentication.
Headers
Authorization: Bearer <token>

- GET /api/projects/
Get all projects belonging to the logged-in user.
Response:
[
  {
    "_id": "...",
    "title": "My Project",
    "description": "Details",
    "userId": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]

- POST /api/projects/
Create a project.
Body:
{
  "title": "New Project",
  "description": "Project description"
}

- GET /api/projects/:id
Get details of a single project.

- PUT /api/projects/:id
Update a project.
Body:
{
  "title": "Updated title",
  "description": "Updated description"
}

- DELETE /api/projects/:id
Delete a project permanently.

# Technologies Used
**Frontend**
React
TypeScript
Vite
React Router
Axios
Context API

**Backend**
Node.js
Express
MongoDB (Mongoose)
JWT Authentication
bcrypt

# Run Both Servers Together

(If you want)
Open two terminals:

Terminal 1:

cd backend
npm run dev


Terminal 2:

cd frontend
npm run dev

# Deployment Notes

Frontend uses VITE_BACKEND_URL for production requests

Make sure CORS is enabled for your production domain

Render requires environment variables set in dashboard
