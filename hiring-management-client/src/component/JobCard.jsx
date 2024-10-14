import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const JobCard = ({ job, onDelete, onUpdate }) => {
  const role = useSelector((state) => state.auth.user?.role);

  return (
    <div className="job-card border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="text-gray-700 mb-2">
        <strong>Location:</strong> {job.location}
      </div>
      <div className="text-gray-700 mb-2">
        <strong>Salary:</strong> {job.salaryRange}
      </div>
      <div className="text-gray-700 mb-2">
        <strong>Job Type:</strong> {job.jobType}
      </div>
      <div className="text-gray-700 mb-2">
        <strong>Remote/Onsite:</strong> {job.remoteOrOnsite}
      </div>
      <div className="text-gray-700 mb-2">
        <strong>Experience:</strong> {job.experiences}
      </div>
      <div className="text-gray-700 mb-2">
        <strong>Education:</strong> {job.educationalRequirements}
      </div>
      <div className="text-gray-700 mb-4">
        <strong>Company:</strong> {job.companyName}
      </div>
      <div className="text-gray-700 mb-4">
        <strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}
      </div>
      <div className="flex space-x-2">
        {["HR", "Manager"].includes(role) ? (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => onUpdate(job)}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              onClick={() => onDelete(job)}
            >
              Delete
            </button>
            <Link
              to={`/jobs/${job._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Manage Applications
            </Link>
          </>
        ) : (
          <Link
            to={`/jobs/${job._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            See More
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;
