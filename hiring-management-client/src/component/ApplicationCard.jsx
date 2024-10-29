import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IFrameModel from "./IFrameModel";
import {
  updateApplicationStatus,
  getApplicationsForJob,
} from "../redux/slices/applicationSlice";

const ApplicationCard = ({ application }) => {
  const [showResume, setShowResume] = useState(false);
  const [status, setStatus] = useState(application.status || "Applied");
  const dispatch = useDispatch();

  const handleStatusChange = async () => {
    if (!status) {
      toast.warning("Please select a valid status.");
      return;
    }
    try {
      const res = await dispatch(
        updateApplicationStatus({ applicationId: application._id, status })
      );
      if (res?.payload?.message) {
        toast.success(res.payload.message);
        dispatch(getApplicationsForJob(application.job._id));
      } else {
        toast.warning(
          res.payload || "An error occurred while updating the status."
        );
      }
    } catch (error) {
      toast.error(error.message || "Failed to update application status.");
    }
  };

  return (
    <div className="border rounded-lg p-6 mb-6 shadow-lg shadow-[#1f84b9] bg-white hover:shadow-xl transition-shadow">
      <div className="mb-4 grid grid-cols-2 items-center justify-between">
        <h3 className="text-xl font-semibold text-[#1f84b9]">
          {application.job?.title || "Job Title"}
        </h3>
        <div className="flex justify-end items-center gap-4">
          <label className="text-[#1f84b9]">Status: </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg bg-blue-50"
          >
            {(status === "Applied") && (
              <option value="Applied">Applied</option>
            )}
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <p className="text-gray-600 ">
          <strong>Location:</strong> {application.job?.location || "N/A"}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="text-lg font-medium text-gray-800 mb-3">
          Applicant Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-700">
            <strong>Name:</strong> {application.applicant?.name || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {application.applicant?.email || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Designation:</strong>{" "}
            {application.applicant?.designation || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Education:</strong>{" "}
            {application.applicant?.education || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Experience:</strong>{" "}
            {application.applicant?.experience || "N/A"} years
          </p>
          <p className="text-gray-700">
            <strong>Applied At:</strong>{" "}
            {new Date(application.appliedAt).toLocaleDateString() || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="buttonbg text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowResume(true)}
        >
          View Resume
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={handleStatusChange}
        >
          Update Status
        </button>
      </div>

      {showResume && (
        <IFrameModel
          resumeUrl={application.resumeUrl || "#"}
          toggleModal={() => setShowResume(false)}
        />
      )}
    </div>
  );
};

export default ApplicationCard;
