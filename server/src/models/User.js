import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name is too short"],
    maxlength: [50, "Name is too long"],
    validate: {
      validator: function (v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: "Name can only contain letters and spaces",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[a-z0-9.]+@[a-z]+\.[a-z]{2,}$/, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    enum: {
      values: ["Applicant", "HR", "Manager"],
      message: "Invalid role",
    },
    default: "Applicant",
  },
  resumeUrl: { type: String },
  experience: {
    type: String,
    maxlength: [500, "Experience description is too long"],
  },
  education: {
    type: String,
    maxlength: [500, "Education description is too long"],
  },
  designation: {
    type: String,
    maxlength: [50, "Designation is too long"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", userSchema);
