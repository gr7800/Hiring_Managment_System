import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salaryRange: { type: String, required: true },
  jobType: { type: String, enum: ["Full-time", "Part-time", "Contract", "Internship"], required: true },
  remoteOrOnsite: { type: String, enum: ["Remote", "Onsite", "Hybrid"], required: true },
  experiences: { type: String, required: true },  
  educationalRequirements: { type: String, required: true },  
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Job', jobSchema);
