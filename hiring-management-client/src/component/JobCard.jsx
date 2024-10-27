import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const JobCard = ({ job, onDelete, onUpdate }) => {
  const role = useSelector((state) => state.auth.user?.role);
  const { pathname } = useLocation();

  return (
    <div className="job-card border border-gray-300 rounded-lg shadow-[#1f84b9] shadow-md p-7 bg-white hover:shadow-lg transition-shadow duration-300 text-[#1f84b9] capitalize">
      <div className="mb-4 grid grid-cols-2 items-center justify-between">
        <h3 className="text-2xl font-semibold uppercase">{job.title}</h3>
        <p className="w-full text-[#1f84b9] text-right">
          <span className="font-siemibold">Salary Range:</span>{" "}
          {job.salaryRange}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> {job.location}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 p-4 gap-4 text-gray-600 mb-4">
        <p>
          <span className="font-semibold">Job Type:</span> {job.jobType}
        </p>
        <p>
          <span className="font-semibold">Remote/Onsite:</span>{" "}
          {job.remoteOrOnsite}
        </p>
        <p>
          <span className="font-semibold">Education:</span>{" "}
          {job.educationalRequirements}
        </p>
        <p>
          <span className="font-semibold">Experience:</span> {job.experiences}
        </p>
        <p>
          <span className="font-semibold">Posted On:</span>{" "}
          {new Date(job.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Updated On:</span>{" "}
          {new Date(job.updatedAt).toLocaleDateString()}
        </p>
      </div>

      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="flex flex-wrap justify-start gap-4">
        {["HR", "Manager"].includes(role) && pathname === "/hr/dashboard" ? (
          <>
            <button
              className="buttonbg text-white px-4 py-2 rounded hover:buttonbg transition duration-200"
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
              className="buttonbg text-white px-4 py-2 rounded hover:buttonbg transition duration-200 overflow-ellipsis line-clamp-1"
            >
              Manage Applications
            </Link>
          </>
        ) : (
          <Link
            to={`/jobs/${job._id}`}
            className="buttonbg text-white px-4 py-2 rounded hover:buttonbg transition duration-200"
          >
            See More
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;
