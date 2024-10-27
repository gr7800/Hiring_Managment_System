import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMyJob, createJob as handleCreateJob, updateJob as handleUpdateJob } from "../redux/slices/jobSlice";
import { toast } from "react-toastify";

const JobFormModal = ({ isOpen, onClose, initialData, isUpdate }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salaryRange: "",
    jobType: "Full-time",
    remoteOrOnsite: "Remote",
    experiences: "",
    educationalRequirements: "",
  });

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData(initialData);
    }
  }, [isUpdate, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { title, description, location, salaryRange, experiences, educationalRequirements } = formData;

    if (!title || !/^[a-zA-Z0-9\s,.-]+$/.test(title)) {
      toast.error("Job title must not contain special characters.");
      return false;
    }

    if (!description) {
      toast.error("Description is required.");
      return false;
    }

    if (!location || !/^[a-zA-Z\s,()-]+$/.test(location)) {
      toast.error("Location must contain only alphabets, spaces, commas, hyphens, and parentheses.");
      return false;
    }

    if (!/^\d{4,}\s*-\s*\d{4,}$/.test(salaryRange.trim())) {
      toast.error("Salary Range should be in the format 'min - max' (e.g., 50000 - 70000).");
      return false;
    }
    const [minSalary, maxSalary] = salaryRange.split('-').map(s => parseInt(s.trim(), 10));
    if (minSalary >= maxSalary) {
      toast.error("Minimum salary should be less than maximum salary.");
      return false;
    }

    if (!/^\d+(\.\d+)?\s*years?$/.test(experiences.trim())) {
      toast.error("Experience must be a number followed by 'year' or 'years' (e.g., '2 years' or '2.3 years').");
      return false;
    }

    if (!educationalRequirements || !/^[a-zA-Z\s,()-]+$/.test(educationalRequirements)) {
      toast.error("Educational requirements should not contain special characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const action = isUpdate
        ? handleUpdateJob({ jobId: initialData._id, jobData: formData })
        : handleCreateJob(formData);
      const res = await dispatch(action);

      if (res.payload.message) {
        toast.success(res.payload.message);
      } else {
        toast.warning(res.payload);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      onClose();
    }

    dispatch(fetchMyJob({ page: 1, limit: 5, sort: "updatedAt", order: "desc" }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container shadow-lg shadow-[#1f84b9] p-8 bg-white rounded">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">{isUpdate ? "Update Job" : "Create Job"}</h2>
          <input
            className="input-field mb-4"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
          />
          <textarea
            className="input-field mb-4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            required
          />
          <input
            className="input-field mb-4"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <input
            className="input-field mb-4"
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            placeholder="Salary Range (e.g., 50000 - 70000)"
            required
          />
          <select
            className="input-field mb-4"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <select
            className="input-field mb-4"
            name="remoteOrOnsite"
            value={formData.remoteOrOnsite}
            onChange={handleChange}
            required
          >
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <input
            className="input-field mb-4"
            type="text"
            name="experiences"
            value={formData.experiences}
            onChange={handleChange}
            placeholder="Experience Required (e.g., 3 years)"
            required
          />
          <input
            className="input-field mb-4"
            type="text"
            name="educationalRequirements"
            value={formData.educationalRequirements}
            onChange={handleChange}
            placeholder="Educational Requirements"
            required
          />
          <div className="flex justify-end">
            <button type="button" className="mr-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:buttonbg transition duration-200">
              {isUpdate ? "Update Job" : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFormModal;
