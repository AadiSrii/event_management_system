# Event_Management_System

This is a full-stack application that allows users to create, manage, and participate in events. The application includes features such as user authentication, event creation, and real-time updates.

## Table of Contents

- [Project Structure](#project-structure)

my-project/
├── backend/
│ ├── .gitignore
│ ├── src/
│ ├── package.json
│ └── ...
├── frontend/
│ ├── .gitignore
│ ├── src/
│ ├── package.json
│ └── ...
├── .gitignore
└── README.md


- [Features](#features)

## Features

- User Authentication and Authorization
- Event Creation and Management
- Real-time Updates and Notifications
- Event Dashboard and Analytics

## Tech Stack

**Frontend:**
- React
- Vite
- Axios
- Chakra UI

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT for Authentication

## Setup Instructions

### Backend Setup

1. **Navigate to the `backend/` directory:**
   npm install

2. Create .env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

3.Run the backend server:
npm start

4.cd frontend
npm install
npm run dev


## Environment Variables
**Backend**

PORT: The port on which the backend server runs.
MONGO_URI: The URI for your MongoDB database.
JWT_SECRET: The secret key for JWT token generation.

**Frontend**
Ensure any required environment variables (such as API base URLs) are added to the .env file in the frontend directory.

**Contributing**
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a Pull Request.


