import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, clearMessage, deleteJob, fetchMyJob } from "../redux/slices/jobSlice";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { toast } from "react-toastify";

const JobList = ({
  searchTerm,
  currentPage,
  jobsPerPage,
  setCurrentPage,
  handleUpdate,
}) => {
  const dispatch = useDispatch();
  const { jobs, loading, totalPage, error, message } = useSelector(
    (state) => state.jobs
  );
  const role = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    dispatch(clearMessage);
    if (role != "HR" || role != "Manager") {
      dispatch(
        fetchJobs({ searchTerm, page: currentPage, limit: jobsPerPage })
      );
    }
  }, [currentPage, jobsPerPage]);

  const handleDelete = (job) => {
    dispatch(clearMessage());
    dispatch(deleteJob(job._id))
      .then((res) => {
        if (res?.payload.message) {
          toast.success(res?.payload?.message);
          dispatch(
            fetchMyJob({ searchTerm, page: currentPage, limit: jobsPerPage })
          );
        } else {
          toast.warning(res?.payload);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="p-6">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div className="flex flex-col gap-5">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={(value) => setCurrentPage(value)}
      />
    </div>
  );
};

export default JobList;
