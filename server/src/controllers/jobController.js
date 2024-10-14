import { Types } from "mongoose";
import mongoose from "mongoose";
import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salaryRange,
      jobType,
      remoteOrOnsite,
      experiences,
      educationalRequirements,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !salaryRange ||
      !jobType ||
      !remoteOrOnsite ||
      !experiences ||
      !educationalRequirements
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = new Job({
      title,
      description,
      location,
      salaryRange,
      jobType,
      remoteOrOnsite,
      experiences,
      educationalRequirements,
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
    const {
      title,
      description,
      location,
      salaryRange,
      jobType,
      remoteOrOnsite,
      experiences,
      educationalRequirements,
    } = req.body;

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
    if (jobType) job.jobType = jobType;
    if (remoteOrOnsite) job.remoteOrOnsite = remoteOrOnsite;
    if (experiences) job.experiences = experiences;
    if (educationalRequirements)
      job.educationalRequirements = educationalRequirements;

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
    const {
      searchTerm,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    let searchCriteria = {};

    if (searchTerm) {
      searchCriteria = {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { location: { $regex: searchTerm, $options: "i" } },
          { jobType: { $regex: searchTerm, $options: "i" } },
          { remoteOrOnsite: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(searchCriteria)
      .populate("postedBy", "name email")
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(searchCriteria);

    if (jobs.length === 0 && searchTerm) {
      return res
        .status(404)
        .json({ message: "No jobs found matching your search" });
    }

    res.status(200).json({
      jobs: jobs.map((job) => ({
        ...job.toObject(),
        postedBy: { name: job.postedBy.name, email: job.postedBy.email },
      })),
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const {
      searchTerm,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const userId = req.user._id;

    let searchCriteria = { postedBy: userId };

    if (searchTerm) {
      searchCriteria = {
        ...searchCriteria,
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { location: { $regex: searchTerm, $options: "i" } },
          { jobType: { $regex: searchTerm, $options: "i" } },
          { remoteOrOnsite: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(searchCriteria)
      .populate("postedBy", "name email")
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(searchCriteria);

    if (jobs.length === 0 && searchTerm) {
      return res.status(404).json({ message: "No jobs found matching your search" });
    }

    res.status(200).json({
      jobs: jobs.map((job) => ({
        ...job.toObject(),
        postedBy: { name: job.postedBy.name, email: job.postedBy.email },
      })),
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate("postedBy", "_id name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({
      job: {
        ...job.toObject(),
        postedBy: { _id:job.postedBy._id, name: job.postedBy.name, email: job.postedBy.email },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

