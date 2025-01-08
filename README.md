# Task Manager Web Application

A full-stack task management application that allows users to create, manage, and track their tasks efficiently. Built with React, Node.js, Express, and MongoDB.

## Features

- User Authentication and Authorization using JWT
- Create, Read, Update, and Delete tasks
- Secure user registration and login system
- Input validation for tasks and user data
- RESTful API architecture
- MongoDB Atlas cloud database integration

## Live Demo

- Frontend: [View Live Application](https://task-manager-tp4x.vercel.app/)  [Hosted on render]
- Backend API: [API Endpoint](https://taskmanager-cicm.onrender.com) [Hosted on Vercel]

## API Endpoints

### user Routes
- `POST /user/register` - Register a new user
- `POST /user/login` - Login user

### Task Routes
- `GET /tasks/get-tasks` - Get all tasks
- `POST /tasks/create-task` - Create a new task
- `PATCH /tasks/edit/:id` - Update a task
- `DELETE /tasks/delete/:id` - Delete a task


## Tech Stack

### Backend
- Node.js (v20.11)
- Express.js
- MongoDB Atlas
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- Database: MongoDB Atlas

### Frontend
- React (Vite)
- HTML5
- CSS
- JavaScript

###Libraries Used
-bcryptjs
-cors
-dotenv
-express
-jsonwebtoken
-mongoose
-validator
-axios
-react-router-dom  

### Installation

1. Clone the repository
```bash
git clone https://github.com/Vishesh3928/TaskManager.git
cd TaskManager
```
2. Install backend dependencies and run server
```bash
cd server
npm install
npm start 
(start script is - node index.js)
```
3. Install frontend dependencies and run frontend
```bash
cd client/Task-Manager
npm install
npm run dev # using vite
```
4. Create .env file in backend Folder
```env
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

The application should now be running on:
- Frontend: `http://localhost:5173` (default Vite port)
- Backend: `http://localhost:5000`


## Project Structure
```
TaskManager/
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
└── client/Task-Manager    |
    ├── public/
    ├── src/
    │   ├── pages/
    │   └── App.jsx
    └── package.json
```

## Validations

### User Registration
- Password must be at least 6 characters long
- Email address is validated for correct format
- Email is automatically converted to lowercase for consistency
- Email address must be unique in the database
- All fields are required

### User Login
- Email and password combinations are verified against database
- All fields are required

### Task Management
- Required fields:
  - Title
  - Description
- Optional fields:
  - Due Date
  - Status
- Default values:
  - Due Date : null    
  - Status: "Pending"
- All fields can be updated after creation


