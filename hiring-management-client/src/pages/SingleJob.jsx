import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleJob } from "../redux/slices/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { applyToJob } from "../redux/slices/applicationSlice";
import useHasApplied from "../hooks/useHashApplied";

const SingleJob = () => {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { singleJob, loading, error } = useSelector((state) => state.jobs);
    const { user } = useSelector((state) => state.auth);
    const [isApplied, setIsApplied] = useState(false);
    const isExist = useHasApplied(jobId);

    useEffect(() => {
        if (jobId) {
            dispatch(fetchSingleJob(jobId));
        }
    }, [jobId, dispatch]);

    useEffect(() => {
        setIsApplied(isExist)
    }, [isExist])


    const handleApplyToJob = () => {
        if (!user) {
            return navigate("/login");
        }

        if (!user.resumeUrl) {
            toast.warning("Please upload a resume first")
            return navigate("/profile");
        }

        dispatch(applyToJob({ jobId, resumeUrl: user.resumeUrl }))
            .then((res) => {
                if (res.payload.message) {
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

    if (loading) return <p className="text-center">Loading job details...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {singleJob ? (
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 mx-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{singleJob.title}</h2>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Description:</span> {singleJob.description}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Location:</span> {singleJob.location}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Salary Range:</span> {singleJob.salaryRange}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Job Type:</span> {singleJob.jobType}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Remote or Onsite:</span> {singleJob.remoteOrOnsite}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Experience Required:</span> {singleJob.experiences}
                    </p>
                    <p className="text-gray-600 mb-4">
                        <span className="font-semibold">Educational Requirements:</span> {singleJob.educationalRequirements}
                    </p>
                    <p className="text-gray-600 mb-4">
                        <span className="font-semibold">Posted by:</span> {singleJob.postedBy.name} ({singleJob.postedBy.email})
                    </p>

                    <button
                        className={`bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition duration-300 ease-in-out ${isApplied ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                        onClick={handleApplyToJob}
                        disabled={isApplied}
                    >
                        {isApplied ? "Already Applied!" : "Apply Now"}
                    </button>
                </div>
            ) : (
                <p className="text-center">No job details available.</p>
            )}
        </div>
    );
};

export default SingleJob;
