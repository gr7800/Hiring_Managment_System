import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9\s,.-]+$/.test(v); 
      },
      message: "Job title must not contain special characters",
    },
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s,()-]+$/.test(v); 
      },
      message:
        "Location must contain only alphabets, spaces, commas, hyphens, and parentheses",
    },
  },
  salaryRange: {
    type: String,
    required: [true, "Salary range is required"],
    validate: {
      validator: function (v) {
        const match = /^\d{4,}\s*-\s*\d{4,}$/.test(v);
        if (!match) return false;
        const [minSalary, maxSalary] = v.split("-").map(s => parseInt(s.trim(), 10));
        return minSalary < maxSalary; 
      },
      message:
        "Salary Range should be in the format 'min - max' (e.g., 50000 - 70000) and min salary should be less than max",
    },
  },
  jobType: {
    type: String,
    enum: {
      values: ["Full-time", "Part-time", "Contract", "Internship"],
      message: "Invalid job type",
    },
    required: [true, "Job type is required"],
  },
  remoteOrOnsite: {
    type: String,
    enum: {
      values: ["Remote", "Onsite", "Hybrid"],
      message: "Invalid remote or onsite option",
    },
    required: [true, "Remote or onsite option is required"],
  },
  experiences: {
    type: String,
    required: [true, "Experience is required"],
    validate: {
      validator: function (v) {
        return /^\d+(\.\d+)?\s*years?$/.test(v); 
      },
      message:
        "Experience must be a number followed by 'year' or 'years' (e.g., '2 years' or '2.3 years')",
    },
  },
  educationalRequirements: {
    type: String,
    required: [true, "Educational requirements are required"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s,()-]+$/.test(v); 
      },
      message: "Educational requirements should not contain special characters",
    },
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
