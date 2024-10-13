# Hiring_Managment_System

### Requirement


To build this hiring management system with an admin panel, here’s how you can approach it using Node.js for the backend:

### 1. **Define Your System’s Requirements:**
   - **Admin (HR) panel:**
     - Post and manage job listings.
     - View applicants for each job.
     - Shortlist candidates.
   
   - **Normal User:**
     - View job listings.
     - Apply to jobs with a resume (upload PDF/doc).
     - Track their application status.
   
   - **Manager:**
     - Track applications.
     - View resumes.
     - Shortlist or reject candidates.

### 2. **Set Up Your Database (MongoDB/MySQL):**
   - **Jobs Table:**
     - `id` (Job ID)
     - `title`
     - `description`
     - `location`
     - `salary_range`
     - `posted_by` (HR's User ID)
     - `created_at`
     - `updated_at`
   
   - **Users Table (for job applicants):**
     - `id` (User ID)
     - `name`
     - `email`
     - `password` (hashed)
     - `role` (HR, Manager, Applicant)
     - `resume_url` (file path or URL to resume)
     - `created_at`
   
   - **Applications Table:**
     - `id` (Application ID)
     - `job_id` (linked to Jobs)
     - `user_id` (linked to Users)
     - `status` (applied, shortlisted, rejected)
     - `created_at`

### 3. **Routes and API Design:**
   You can use **Express.js** to handle the backend routes.

   - **Job Routes:**
     - `POST /jobs`: HR/Admin posts a job.
     - `GET /jobs`: Get the list of available jobs.
     - `GET /jobs/:id`: Get a specific job.
     - `PUT /jobs/:id`: Update a job (HR/Admin).
     - `DELETE /jobs/:id`: Delete a job (HR/Admin).

   - **User Routes:**
     - `POST /register`: Register a user.
     - `POST /login`: Login a user and return a JWT token.
     - `GET /user/applications`: Get the current user’s applications.
   
   - **Application Routes:**
     - `POST /apply/:jobId`: User applies for a job (attach resume).
     - `GET /applications`: HR/Admin or Manager views all applications.
     - `PUT /applications/:id/shortlist`: Shortlist an applicant.
     - `PUT /applications/:id/reject`: Reject an applicant.
   
### 4. **Setting Up Role-Based Authentication (JWT):**
   - **HR/Admin** should have permissions to post and manage jobs.
   - **Manager** should have permissions to track applications and shortlist/reject candidates.
   - **Applicants** should only have access to viewing and applying for jobs.

   Use **JWT (JSON Web Tokens)** to manage authentication and roles.

   - Middleware for routes that check the user’s role:
     ```javascript
     const verifyRole = (roles) => {
       return (req, res, next) => {
         const user = req.user; 
         if (roles.includes(user.role)) {
           next();
         } else {
           res.status(403).json({ message: "Forbidden" });
         }
       };
     };
     ```
   
### 5. **Handling File Uploads (Resume Upload):**
   Use **Multer** to handle resume uploads for applicants. You can store the files locally or use cloud storage like AWS S3 or Firebase.

   Example route to handle resume upload:
   ```javascript
   const multer = require('multer');
   const storage = multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, 'uploads/');
     },
     filename: (req, file, cb) => {
       cb(null, Date.now() + '-' + file.originalname);
     }
   });

   const upload = multer({ storage });

   app.post('/apply/:jobId', upload.single('resume'), (req, res) => {
     const jobId = req.params.jobId;
     const resume = req.file.path;
     // Save application with resume in the database
   });
   ```

### 6. **Frontend Design:**
   You can use **React.js** for building a dynamic user interface.
   
   - **Admin Panel (for HR/Managers)**:
     - A dashboard to post and manage jobs.
     - View and filter applications.
     - Shortlist/reject candidates.

   - **User Panel**:
     - A page to list all jobs.
     - Apply to jobs (upload resume).
     - Track application status (applied, shortlisted, rejected).

### 7. **Database Relationships:**
   - **One-to-Many Relationship** between Jobs and Applications (one job can have many applications).
   - **One-to-Many Relationship** between Users and Applications (one user can apply to many jobs).

### 8. **Deployment:**
   - **Backend**: You can deploy it using services like **Heroku, AWS, or DigitalOcean**.
   - **Database**: Use **MongoDB Atlas** for MongoDB or **AWS RDS** for MySQL/Postgres.
   - **Frontend**: Host the React frontend on **Netlify** or **Vercel**.

### Sample Flow:

1. **HR/Manager** logs into the admin panel and posts a job.
2. **Applicant** logs in, views the job listings, and applies for jobs with a resume.
3. **Manager** logs in, views the applications, and shortlists or rejects candidates.

