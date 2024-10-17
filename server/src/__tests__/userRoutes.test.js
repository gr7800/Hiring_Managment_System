import request from "supertest";
import app from "../../app.js"; 
import User from "../models/User.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

describe("Authentication Middleware", () => {
  let token;
  
  beforeAll(async () => {
    await User.deleteMany(); 
    const user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "123456",
      role: "Applicant",
    });
    await user.save();
    
    const response = await request(app).post("/users/login").send({
      email: "testuser@example.com",
      password: "123456",
    });
    token = response.body.token;
  });

  afterAll(async () => {
    await User.deleteMany(); 
    mongoose.connection.close();
  });

  it("should verify the token and allow access to protected route", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", "testuser@example.com");
  });

  it("should deny access without a token", async () => {
    const response = await request(app).get("/users/profile");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No token provided");
  });

  it("should deny access with an invalid token", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set("Authorization", "Bearer invalidToken");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid token");
  });

  it("should verify user role for protected route", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", "testuser@example.com");
  });


});
