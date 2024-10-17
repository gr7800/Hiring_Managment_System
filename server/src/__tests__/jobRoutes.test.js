import request from "supertest";
import app from "../../app.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import mongoose from "mongoose";

describe("Job Routes", () => {
  let token;
  let userId;

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
    mongoose.connection.close();
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
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({}); // No data

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  it("should get all jobs", async () => {
    const response = await request(app).get("/jobs");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.jobs)).toBe(true);
  });

  it("should get a job by ID", async () => {
    const job = await Job.findOne();

    const response = await request(app).get(`/jobs/singlejob/${job._id}`);
    expect(response.status).toBe(200);
    expect(response.body.job).toHaveProperty("_id", job._id.toString());
  });

  it("should return 404 for non-existent job", async () => {
    const response = await request(app).get("/jobs/singlejob/invalidId");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Job not found");
  });

  it("should update a job", async () => {
    const job = await Job.findOne();
    const updateData = { title: "Updated Job Title" };

    const response = await request(app)
      .put(`/jobs/${job._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Job updated successfully");
    expect(response.body.job).toHaveProperty("title", updateData.title);
  });

  it("should return 404 if job not found for update", async () => {
    const response = await request(app)
      .put("/jobs/invalidId")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Title" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Job not found or not authorized to update"
    );
  });

  it("should delete a job", async () => {
    const job = await Job.findOne();

    const response = await request(app)
      .delete(`/jobs/${job._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Job deleted successfully");
  });

  it("should return 404 if job not found for delete", async () => {
    const response = await request(app)
      .delete("/jobs/invalidId")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Job not found or not authorized to delete"
    );
  });
});
