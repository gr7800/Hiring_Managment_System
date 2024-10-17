import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v); 
      },
      message: (props) => `${props.value} is not a valid name!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); 
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^.{6}$/.test(v); 
      },
      message: (props) => "Password must be exactly 6 characters long!",
    },
  },
  role: {
    type: String,
    enum: ["Applicant", "HR", "Manager"],
    default: "Applicant",
  },
  resumeUrl: { type: String },
  experience: { type: String },
  education: { type: String },
  designation: { type: String },
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
