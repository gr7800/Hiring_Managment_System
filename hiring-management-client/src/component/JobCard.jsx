import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PopupModel from "./PopupModel";
import ApplicantsList from "./ApplicantsList";
import { getApplicationsForJob } from "../redux/slices/applicationSlice";

const JobCard = ({ job, onDelete, onUpdate }) => {
  const role = useSelector((state) => state.auth.user.role);
  const [showApplications, setShowApplications] = useState(false);
  const dispatch = useDispatch();

  const handleSeeApplication = () => {
    dispatch(getApplicationsForJob(job._id))
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
    setShowApplications((prev)=>!prev);
  };

  return (
    <div className="job-card border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.description}</p>
      <p className="text-gray-700">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-700">
        <strong>Salary:</strong> {job.salaryRange}
      </p>
      <p className="text-gray-700">
        <strong>Job Type:</strong> {job.jobType}
      </p>
      <p className="text-gray-700">
        <strong>Remote/Onsite:</strong> {job.remoteOrOnsite}
      </p>
      <p className="text-gray-700">
        <strong>Experience:</strong> {job.experiences}
      </p>
      <p className="text-gray-700">
        <strong>Education:</strong> {job.educationalRequirements}
      </p>
      <p className="text-gray-700">
        <strong>Company:</strong> {job.companyName}
      </p>
      <p className="text-gray-700">
        <strong>Posted On:</strong>{" "}
        {new Date(job.createdAt).toLocaleDateString()}
      </p>
      <div className="mt-4 flex space-x-2">
        {role === "HR" || role === "Manager" ? (
          <div className="flex flex-wrap gap-4">
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={handleSeeApplication}
            >
              {showApplications?'Hide Applications':'See Applications'}
            </button>
          </div>
        ) : (
          <Link
            to={`/jobs/${job._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            See More
          </Link>
        )}
      </div>
      {showApplications && <ApplicantsList />}
    </div>
  );
};

export default JobCard;
