# Book Management App

## Overview
A full-stack application for managing book collections with user authentication.

## API Setup and Running Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Environment Setup
1. Clone the repository
2. Navigate to the project directory
3. Create a `.env` file in the root directory with the following variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

npm run dev

The API will be available at http://localhost:5000

### API Endpoints Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user Books (Protected Routes - Require Authentication)
- GET /api/books - Get all books for the authenticated user
- GET /api/books/:id - Get a specific book by ID
- POST /api/books - Create a new book
- PUT /api/books/:id - Update a book
- DELETE /api/books/:id - Delete a book


### Testing the API
You can test the API using Postman or any other API testing tool.

For protected routes, include the JWT token in the Authorization header:

Authorization: Bearer your_jwt_token


This ReadMe provides clear instructions on how to set up and run the API, including environment variables, installation steps, and available endpoints. It also includes information about authentication requirements for the protected routes.