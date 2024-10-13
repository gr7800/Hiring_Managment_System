import User from "../models/User.js";
import Application from "../models/Application.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let resumeUrl = "";
    if (req.file) {
      resumeUrl = await uploadToCloudinary(req);
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      resumeUrl,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, experience, education, designation } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (experience) user.experience = experience;
    if (education) user.education = education;
    if (designation) user.designation = designation;

    if (req.file) {
      const resumeUrl = await uploadToCloudinary(req);
      user.resumeUrl = resumeUrl;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const applications = await Application.find({ applicant: req.user._id })
      .populate("job", "title location")
      .select("status appliedAt job");
    const userProfile = {
      ...user._doc,
      applications,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
