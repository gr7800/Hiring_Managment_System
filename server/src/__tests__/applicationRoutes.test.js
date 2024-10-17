import request from "supertest";
import app from "../../app.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import mongoose from "mongoose";

describe("Application Routes", () => {
  let token;
  let userId;
  let jobId;

  beforeAll(async () => {
    await User.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();

    const user = new User({
      name: "Applicant User",
      email: "applicant@example.com",
      password: "123456",
      role: "Applicant",
    });
    await user.save();
    userId = user._id;

    const job = new Job({
      title: "Software Engineer",
      description: "Job description",
      location: "Remote",
      salaryRange: "60,000 - 80,000",
      jobType: "Full-time",
      remoteOrOnsite: "Remote",
      experiences: "2+ years",
      educationalRequirements: "Bachelor's Degree",
      postedBy: userId,
    });
    await job.save();
    jobId = job._id;

    const response = await request(app).post("/users/login").send({
      email: "applicant@example.com",
      password: "123456",
    });
    token = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();
    mongoose.connection.close();
  });

  it("should apply for a job", async () => {
    const response = await request(app)
      .post(`/applications/${jobId}/apply`)
      .set("Authorization", `Bearer ${token}`)
      .send({ resumeUrl: "http://resume.url" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Application submitted successfully");
  });

  it("should return 400 if already applied for the job", async () => {
    await request(app)
      .post(`/applications/${jobId}/apply`)
      .set("Authorization", `Bearer ${token}`)
      .send({ resumeUrl: "http://resume.url" }); // Apply again

    const response = await request(app)
      .post(`/applications/${jobId}/apply`)
      .set("Authorization", `Bearer ${token}`)
      .send({ resumeUrl: "http://resume.url" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("You have already applied for this job");
  });

  it("should get applications for a job", async () => {
    const response = await request(app)
      .get(`/applications/${jobId}/applications`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 404 if job not found for applications", async () => {
    const response = await request(app)
      .get("/applications/invalidId/applications")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Job not found");
  });

  it("should update application status", async () => {
    const application = await Application.findOne();

    const response = await request(app)
      .put(`/applications/${application._id}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "Shortlisted" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Application status updated");
  });

  it("should return 400 if invalid status is provided", async () => {
    const application = await Application.findOne();

    const response = await request(app)
      .put(`/applications/${application._id}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "InvalidStatus" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid status value");
  });

  it("should return 404 if application not found for status update", async () => {
    const response = await request(app)
      .put("/applications/invalidId/status")
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "Shortlisted" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Application not found");
  });

  it("should get application details", async () => {
    const application = await Application.findOne();

    const response = await request(app)
      .get(`/applications/${application._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("applicant");
  });

  it("should return 404 if application not found for details", async () => {
    const response = await request(app)
      .get("/applications/invalidId")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Application not found");
  });

  it("should return 401 if not authenticated", async () => {
    const response = await request(app)
      .post(`/applications/${jobId}/apply`)
      .send({ resumeUrl: "http://resume.url" }); // No token set

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 403 if user is not an applicant", async () => {
    const employer = new User({
      name: "Employer User",
      email: "employer@example.com",
      password: "123456",
      role: "Hr",
    });
    await employer.save();

    const loginResponse = await request(app).post("/users/login").send({
      email: "employer@example.com",
      password: "123456",
    });
    const employerToken = loginResponse.body.token;

    const response = await request(app)
      .post(`/applications/${jobId}/apply`)
      .set("Authorization", `Bearer ${employerToken}`)
      .send({ resumeUrl: "http://resume.url" });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Only applicants can apply for jobs");
  });
});
