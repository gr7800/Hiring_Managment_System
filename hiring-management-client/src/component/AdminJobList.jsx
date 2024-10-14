import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import JobList from "./JobList";
import { clearMessage, fetchMyJob } from "../redux/slices/jobSlice";

const AdminJobList = ({ handleUpdate }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const fetchJobs = useCallback(() => {
    if (page > 0 && limit > 0) {
      dispatch(clearMessage());
      dispatch(fetchMyJob({ page, limit, sortBy, order }));
    }
  }, [page, limit, sortBy, order, dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handlePageChange = (newPage) => {
    if (newPage > 0) setPage(newPage);
  };

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setLimit(value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <div className="admin-job-list">
      <div className="flex bg-gray-200 flex-wrap justify-between items-center px-6 py-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="limit" className="font-semibold">Jobs per page:</label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="border rounded px-2 py-1 bg-[#e5faff]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <label htmlFor="sortBy" className="font-semibold">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="border rounded px-2 py-1 bg-[#e5faff]"
          >
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
            <option value="salary">Salary</option>
          </select>

          <label htmlFor="order" className="font-semibold">Order:</label>
          <select
            id="order"
            value={order}
            onChange={handleOrderChange}
            className="border rounded px-2 py-1 bg-[#e5faff]"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <JobList
        searchTerm=""
        currentPage={page}
        jobsPerPage={limit}
        setCurrentPage={handlePageChange}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default AdminJobList;
