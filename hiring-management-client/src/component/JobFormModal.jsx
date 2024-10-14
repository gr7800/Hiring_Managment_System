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
    if (!title || !description || !location || !salaryRange || !experiences || !educationalRequirements) {
      toast.error("All fields are required.");
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
        dispatch(fetchMyJob());
      } else {
        toast.warning(res.payload);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container shadow-lg p-8 bg-white rounded">
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
            placeholder="Salary Range"
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
            placeholder="Experience Required"
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
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
              {isUpdate ? "Update Job" : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFormModal;
