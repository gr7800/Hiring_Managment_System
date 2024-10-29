import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, clearMessage, deleteJob, fetchMyJob } from "../redux/slices/jobSlice";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const JobList = ({ searchTerm, currentPage, jobsPerPage, setCurrentPage, handleUpdate }) => {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { jobs, loading, totalPage, error, message } = useSelector((state) => state.jobs);
  const role = useSelector((state) => state?.auth?.user?.role) || "Applicant";

  useEffect(() => {
    dispatch(clearMessage());
    if (role && ((role !== "HR" && role !== "Manager") || pathname == "/jobs")) {
      dispatch(fetchJobs({ searchTerm, page: currentPage, limit: jobsPerPage }));
      console.log("from joblist")
    }
  }, [currentPage, jobsPerPage, role]);

  const handleDelete = async (job) => {
    dispatch(clearMessage());
    try {
      const res = await dispatch(deleteJob(job._id));
      if (res?.payload.message) {
        toast.success(res.payload.message);
        dispatch(fetchMyJob({ searchTerm, page: currentPage, limit: jobsPerPage }));
      } else {
        toast.warning(res.payload);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (loading) {
    return <LoadingScreen />
  }
  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div className="flex flex-col gap-5">
        {jobs&&jobs?.length > 0 ? (
          jobs?.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-gray-500">No jobs found.</p>
        )}
      </div>

      {totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={(value) => setCurrentPage(value)}
        />
      )}
    </div>
  );
};

export default JobList;
