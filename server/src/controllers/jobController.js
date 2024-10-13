import Job from "../models/Job.js"; 

export const createJob = async (req, res) => {
  try {
    const { title, description, location, salaryRange } = req.body;
    if (!title || !description || !location || !salaryRange) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = new Job({
      title,
      description,
      location,
      salaryRange,
      postedBy: req.user._id, 
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { title, description, location, salaryRange } = req.body;

    const job = await Job.findOne({ _id: jobId, postedBy: req.user._id });
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized to update" });
    }

    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (salaryRange) job.salaryRange = salaryRange;
    job.updatedAt = Date.now();

    await job.save();
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findOneAndDelete({
      _id: jobId,
      postedBy: req.user._id,
    });
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized to delete" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const searchJobs = async (req, res) => {
  try {
    const { title, location } = req.query;
    let searchCriteria = {};
    if (title) searchCriteria.title = { $regex: title, $options: "i" }; 
    if (location) searchCriteria.location = { $regex: location, $options: "i" };

    const jobs = await Job.find(searchCriteria);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
