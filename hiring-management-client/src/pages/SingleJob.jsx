import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleJob } from "../redux/slices/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  applyToJob,
  getApplicationsForJob,
} from "../redux/slices/applicationSlice";
import useHasApplied from "../hooks/useHashApplied";
import ApplicantsList from "../component/ApplicantsList";

const SingleJob = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleJob, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || "Applicant";
  const [isApplied, setIsApplied] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const isExist = useHasApplied(jobId);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchSingleJob(jobId));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    setIsApplied(isExist);
  }, [isExist]);

  const handleApplyToJob = () => {
    if (!user) {
      return navigate("/login");
    }

    if (!user.resumeUrl) {
      toast.warning("Please upload a resume first");
      return navigate("/profile");
    }

    dispatch(applyToJob({ jobId, resumeUrl: user.resumeUrl }))
      .then((res) => {
        if (res.payload?.message) {
          toast.success(res.payload.message);
          setIsApplied(true);
        } else {
          toast.error("You already applied for this job");
        }
      })
      .catch(() => {
        toast.error("Error applying for the job");
      });
  };

  const handleSeeApplication = () => {
    dispatch(getApplicationsForJob(jobId))
      .then((res) => {
        if (res.payload) {
          setShowApplications((prev) => !prev);
        }
      })
      .catch(() => {
        toast.error("Error fetching applications");
      });
  };

  if (loading) return <p className="text-center">Loading job details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen bg-gray-100 px-10 py-10">
      {singleJob ? (
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg shadow-[#1f84b9] p-8 mx-4">
            <div className="mb-4 grid grid-cols-2 items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1f84b9]">
                {singleJob.title}
              </h2>
              <p className="w-full text-[#1f84b9] text-right">
                <span className="font-semibold">Salary Range:</span>{" "}
                {singleJob.salaryRange}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span>{" "}
                {singleJob.location}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 p-4 gap-4 text-gray-600 mb-4">
              <p>
                <span className="font-semibold">Job Type:</span>{" "}
                {singleJob.jobType}
              </p>
              <p>
                <span className="font-semibold">Remote or Onsite:</span>{" "}
                {singleJob.remoteOrOnsite}
              </p>
              <p>
                <span className="font-semibold">Experience Required:</span>{" "}
                {singleJob.experiences}
              </p>
              <p>
                <span className="font-semibold">Educational Requirements:</span>{" "}
                {singleJob.educationalRequirements}
              </p>
              <p>
                <span className="font-semibold">Posted by:</span>{" "}
                {singleJob.postedBy.name}{" "}
                <a
                  className="underline text-[#1f84b9]"
                  href={`mailto:${singleJob.postedBy.email}`}
                >{`( Send Mail )`}</a>
              </p>
            </div>
            <p className="mb-4 text-gray-600">
              <span className="font-semibold text-[#1f84b9]">Description:</span>{" "}
              {singleJob.description}
            </p>
            {role === "HR" || role === "Manager" ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:buttonbg transition duration-200"
                onClick={handleSeeApplication}
              >
                {showApplications ? "Hide Applications" : "See Applications"}
              </button>
            ) : (
              <button
                className={`buttonbg text-white px-6 py-2 rounded-lg shadow transition duration-300 ease-in-out ${
                  isApplied
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                onClick={handleApplyToJob}
                disabled={isApplied}
              >
                {isApplied ? "Already Applied!" : "Apply Now"}
              </button>
            )}
          </div>
          {showApplications && <ApplicantsList jobId={jobId} />}
        </div>
      ) : (
        <p className="text-center">No job details available.</p>
      )}
    </div>
  );
};

export default SingleJob;
