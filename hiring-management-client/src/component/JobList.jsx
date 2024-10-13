import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, clearMessage } from "../redux/slices/jobSlice";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

const JobList = ({ searchTerm, currentPage, jobsPerPage, setCurrentPage }) => {
    const dispatch = useDispatch();
    const { jobs, loading, totalPage, error, message } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(fetchJobs({ searchTerm, page: currentPage, limit: jobsPerPage }));
    }, [currentPage, jobsPerPage]);

    const handleDelete = (jobId) => {
        // Implement job deletion logic here
        // You may want to dispatch an action to delete the job
    };

    return (
        <div className="p-6">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}

            <div className="flex flex-col gap-5">
                {jobs.map((job) => (
                    <JobCard key={job._id} job={job} onDelete={() => handleDelete(job._id)} />
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
