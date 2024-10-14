import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { resumeUrl } = req.body; 

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      job: jobId,
      applicant: req.user._id,
      resumeUrl
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    console.log(job);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (req.user.role !== 'HR' && req.user.role !== 'Manager') {
      return res.status(403).json({ message: 'Access denied' });
    }

    console.log(Application.find())

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email experience education designation resume') 
      .populate('job', 'title location');  

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    console.log(status)
    if (!['Applied','Shortlisted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (req.user.role !== 'HR' && req.user.role !== 'Manager') {
      return res.status(403).json({ message: 'Access denied' });
    }

    application.status = status;
    application.updatedAt = Date.now();

    await application.save();
    res.status(200).json({ message: 'Application status updated', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getApplicationDetails = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate('applicant', 'name email')
      .populate('job', 'title location');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (
      req.user._id.toString() !== application.applicant._id.toString() &&
      req.user.role !== 'HR' &&
      req.user.role !== 'Manager'
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
