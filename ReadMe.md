# Book Management App

## Overview
A full-stack application for managing book collections with user authentication.

## Project Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation
1. Clone the repository: `git clone https://github.com/your-repo/hiring-task.git`
2. Navigate to the project directory: `cd hiring-task`

### Backend Setup
1. Navigate to the api directory: `cd api`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server: `npm run dev`
   - API available at http://localhost:5000

### Frontend Setup
1. Navigate to the client directory: `cd ../client`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
   - Client available at http://localhost:3000

## API Documentation

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user

### Books (Protected Routes)
- GET /api/books - Get all books for authenticated user
- GET /api/books/:id - Get specific book by ID
- POST /api/books - Create new book
- PUT /api/books/:id - Update book
- DELETE /api/books/:id - Delete book

### Testing
- Import `Book Management App.postman_collection.json` into Postman
- For protected routes, set Authorization header: `Bearer your_jwt_token`