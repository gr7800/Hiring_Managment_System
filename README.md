
# Hiring Management System

This project is a full-stack hiring management system designed to streamline the process of job postings, applications, and management. It includes features for both hiring managers and applicants, ensuring smooth functionality for posting jobs, managing applications, and applying for positions.

## Features

- **Job Management**: Hiring managers can create, update, and delete job postings.
- **Job Application**: Applicants can apply to jobs by submitting resumes.
- **Application Tracking**: Managers can review, track, and update the status of job applications.
- **Authentication**: Secure login and registration system using JSON Web Tokens (JWT).
- **File Upload**: Users can upload resumes, which are stored in Cloudinary.
- **Pagination, Sorting, and Filtering**: Jobs can be paginated, searched, and sorted.
- **Role-Based Access Control**: Different user roles (e.g., manager, user) with protected routes.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React, Redux Toolkit, Vite, TailwindCSS
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary for resume uploads
- **State Management**: Redux Toolkit for managing application state

## Prerequisites

Ensure you have the following installed before running the application:

- Node.js (v14 or higher)
- MongoDB (locally or using MongoDB Atlas)
- A Cloudinary account for file storage

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/hiring-management-system.git
   cd hiring-management-system/backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```bash
   PORT=5000
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT secret key>
   CLOUDINARY_CLOUD_NAME=<Your Cloudinary cloud name>
   CLOUDINARY_API_KEY=<Your Cloudinary API key>
   CLOUDINARY_API_SECRET=<Your Cloudinary API secret>
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory with the following content:
   ```bash
   VITE_BASE_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

All protected routes require a JWT token in the `Authorization` header.

- **Authorization Header Format**:
  ```
  Authorization: Bearer <token>
  ```

### Job Routes

- **GET** `/jobs`: Retrieves all job postings with optional pagination, search, and sorting.
  - **Query Params**:
    - `page`: Current page (e.g., `/jobs?page=2`)
    - `search`: Search for job titles or descriptions (e.g., `/jobs?search=developer`)
    - `sort`: Sort by fields (e.g., `/jobs?sort=-datePosted`)

- **GET** `/jobs/:jobId`: Retrieve a specific job by its ID.

- **POST** `/jobs`: Create a new job posting (Protected: Manager).
  - **Request Body**:
    ```json
    {
      "title": "Full Stack Developer",
      "description": "Looking for an experienced developer.",
      "requirements": ["3+ years experience", "React, Node.js"],
      "location": "Remote",
      "salaryRange": "60,000-80,000"
    }
    ```
  - **Authorization**: Requires a JWT token with a `role: "manager"`.

- **PUT** `/jobs/:jobId`: Update a job posting (Protected: Manager).
  - **Request Body**: Same as for job creation.
  - **Authorization**: JWT token with `role: "manager"` required.

- **DELETE** `/jobs/:jobId`: Delete a job posting (Protected: Manager).
  - **Authorization**: JWT token with `role: "manager"` required.

### Application Routes

- **POST** `/applications/:jobId/apply`: Apply to a job posting.
  - **Authorization**: Requires a JWT token.
  - **Request Body (FormData)**:
    - **Field**: `resume` (file upload)
  - **Example**:
    ```bash
    curl -X POST -H "Authorization: Bearer <token>" -F "resume=@path/to/file.pdf" http://localhost:5000/applications/<jobId>/apply
    ```

- **GET** `/applications/:jobId/applications`: Get all applications for a specific job (Protected: Manager).
  - **Authorization**: JWT token with `role: "manager"` required.

- **PUT** `/applications/:applicationId/status`: Update the status of an application (Protected: Manager).
  - **Request Body**:
    ```json
    {
      "status": "accepted" 
    }
    ```
  - **Authorization**: JWT token with `role: "manager"` required.

### User Routes

- **POST** `/users/register`: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```

- **POST** `/users/login`: Log in a user.
  - **Request Body**:
    ```json
    {
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```

- **GET** `/users/profile`: Get the logged-in user's profile (Protected).
  - **Authorization**: JWT token required.

- **PUT** `/users/profile`: Update the user's profile (Protected).
  - **Request Body**:
    ```json
    {
      "name": "Updated Name",
      "password": "newpassword"
    }
    ```

## Cloudinary Integration for Resume Upload

- Resumes are uploaded to Cloudinary when a user applies for a job.
- The Cloudinary configuration is stored in the `.env` file with the following keys:
  ```bash
  CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
  CLOUDINARY_API_KEY=<your-cloudinary-api-key>
  CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
  ```

- After successful upload, resumes are stored in the `resume` folder on Cloudinary.

### Example of Upload Functionality:

```javascript
const cloudinaryUpload = async (req) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "resume",
    resource_type: "raw",
  });
  return result.secure_url;
};
```

## Middleware

### Authentication Middleware

- The `authMiddleware` checks for the JWT in the request's `Authorization` header and verifies the token.
- If the token is invalid or absent, a `401 Unauthorized` response is sent.

### Role Verification Middleware

- The `verifyRole` middleware ensures that only users with the required role (e.g., `manager`) can access specific routes.

### Multer for File Uploads

- `Multer` is used for handling file uploads. Resume files are stored temporarily on the server, then uploaded to Cloudinary, after which the local file is deleted.

## Running Tests

To run tests for the application:

```bash
npm run test
```

## Deployment

### Backend

The backend can be deployed to services like Heroku or DigitalOcean. Ensure that you properly set your environment variables on the production server.

### Frontend

The frontend can be deployed using services like Vercel or Netlify. Update the `VITE_BASE_URL` in the `.env` file to point to your production API URL.

