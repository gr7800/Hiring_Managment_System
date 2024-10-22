import request from "supertest";
import app from "../../app.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import mongoose from "mongoose";

describe("Job Routes", () => {
  let token;
  let userId;
  let jobId;

  beforeAll(async () => {
    await User.deleteMany();
    await Job.deleteMany();

    const user = new User({
      name: "HR User",
      email: "hruser@example.com",
      password: "123456",
      role: "HR",
    });
    await user.save();
    userId = user._id;

    const response = await request(app).post("/users/login").send({
      email: "hruser@example.com",
      password: "123456",
    });
    token = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany();
    await Job.deleteMany();
  });

  it("should create a new job", async () => {
    const jobData = {
      title: "Software Engineer",
      description: "Job description",
      location: "Remote",
      salaryRange: "60,000 - 80,000",
      jobType: "Full-time",
      remoteOrOnsite: "Remote",
      experiences: "2+ years",
      educationalRequirements: "Bachelor's Degree",
    };

    const response = await request(app)
      .post("/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send(jobData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Job created successfully");
    expect(response.body.job).toHaveProperty("title", jobData.title);
    expect(response.body.job).toHaveProperty("postedBy", userId.toString());

    jobId = response.body.job._id;
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  it("should get all jobs", async () => {
    const response = await request(app).get("/jobs");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.jobs)).toBe(true);
  });

  it("should get a job by ID", async () => {
    const response = await request(app).get(`/jobs/singlejob/${jobId}`);
    expect(response.status).toBe(200);
    expect(response.body.job).toHaveProperty("_id", jobId.toString());
  });

  it("should return 400 for invalid job ID format", async () => {
    const response = await request(app).get("/jobs/singlejob/invalidId");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid job ID format");
  });

  it("should update a job", async () => {
    const updateData = { title: "Updated Job Title" };

    const response = await request(app)
      .put(`/jobs/${jobId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Job updated successfully");
    expect(response.body.job).toHaveProperty("title", updateData.title);
  });

  it("should return 400 for invalid job ID format", async () => {
    const response = await request(app)
      .put("/jobs/invalidId")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Title" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid job ID format");
  });

  it("should delete a job", async () => {
    const response = await request(app)
      .delete(`/jobs/${jobId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Job deleted successfully");
  });

  it("should return 400 for invalid job ID format", async () => {
    const response = await request(app)
      .delete("/jobs/invalidId")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid job ID format");
  });
});
