Here is a detailed `README.md` file for your app based on the implementation and structure discussed:

---

# Hiring Management System

This is a full-stack hiring management system where hiring managers can post jobs, users can apply for jobs, and managers can track and update the status of job applications. The application is designed to be scalable, modular, and optimized for performance, with both frontend and backend components.

## Features

- **Job Posting and Management**: Allows hiring managers to post jobs, update, delete, and list job postings.
- **Job Application**: Users can apply to jobs, and upload resumes.
- **Application Tracking**: Managers can track applications and update their status.
- **Pagination, Sorting, and Search**: The job listing supports pagination, search, and sorting for better usability.
- **Profile Management**: Users can register, log in, update their profiles, and manage their job applications.
- **Authentication**: Uses JWT for securing API requests and managing user sessions.

## Tech Stack

- **Frontend**: React, Redux Toolkit, Vite, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Token (JWT)
- **File Upload**: Cloudinary for storing resumes
- **State Management**: Redux Toolkit (Async Thunks)

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (running locally or through a cloud provider like MongoDB Atlas)
- Cloudinary account for file uploads

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/hiring-management-system.git
   cd hiring-management-system/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following variables:
   ```bash
   PORT=5000
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=<Your JWT secret key>
   CLOUDINARY_NAME=<Your Cloudinary cloud name>
   CLOUDINARY_API_KEY=<Your Cloudinary API key>
   CLOUDINARY_API_SECRET=<Your Cloudinary API secret>
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the following variables:
   ```bash
   VITE_BASE_URL=http://localhost:5000
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```

## API Endpoints

### Jobs

- **GET** `/jobs` - Get all jobs with pagination, search, and sorting
- **GET** `/jobs/:jobId` - Get job details by ID
- **POST** `/jobs` - Create a new job (Protected: Manager)
- **PUT** `/jobs/:jobId` - Update a job (Protected: Manager)
- **DELETE** `/jobs/:jobId` - Delete a job (Protected: Manager)
  
### Applications

- **POST** `/applications/:jobId/apply` - Apply to a job
- **GET** `/applications/:jobId/applications` - Get all applications for a job (Protected: Manager)
- **PUT** `/applications/:applicationId/status` - Update application status (Protected: Manager)
- **GET** `/applications/details/:applicationId` - Get application details

### User

- **POST** `/users/register` - Register a new user
- **POST** `/users/login` - Log in a user
- **GET** `/users/profile` - Fetch the user's profile (Protected)
- **PUT** `/users/profile` - Update the user's profile (Protected)

## State Management

State management is handled using Redux Toolkit. Async actions like fetching jobs, applying to jobs, updating application status, etc., are managed using `createAsyncThunk`. Below is a breakdown of the application state.

### Slices

- **Jobs Slice**: Manages the state for job listings, fetching jobs, updating jobs, and deleting jobs.
- **Applications Slice**: Manages the state for job applications, applying to jobs, updating application status, and fetching application details.
- **User Slice**: Handles user authentication (login, register) and profile management.

### Thunks

Each action that requires asynchronous data fetching is handled using `createAsyncThunk`. This makes it easier to manage loading, success, and error states.

Example for applying to a job:

```javascript
export const applyToJob = createAsyncThunk(
  "applications/applyToJob",
  async ({ jobId, resumeUrl }, { rejectWithValue }) => {
    try {
      const response = await apiApplyToJob(jobId, resumeUrl);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

## Error Handling

The application makes use of structured error handling to provide meaningful messages in case of failure. All async actions use `rejectWithValue` to return error messages that are stored in the Redux state and displayed to the user when necessary.

Example:

```javascript
export const updateApplicationStatus = createAsyncThunk(
  "applications/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateApplicationStatus(applicationId, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update status");
    }
  }
);
```

## Running Tests

Tests can be written using Jest or any preferred testing framework. To run tests:

```bash
npm run test
```

## Deployment

### Backend

You can deploy the backend to services like Heroku or DigitalOcean. Make sure to update the environment variables for production, including MongoDB connection strings and Cloudinary credentials.

### Frontend

You can deploy the frontend to services like Vercel or Netlify. Update the `VITE_BASE_URL` in the `.env` file to point to the deployed backend API.

## Contributing

If you wish to contribute to the project, feel free to fork the repository and submit a pull request. Please ensure your code follows best practices and is well-tested.
