import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobList from "./JobList";
import { fetchMyJob } from "../redux/slices/jobSlice";

const AdminJobList = ({ handleUpdate }) => {
  const { jobs } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("createAt");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    dispatch(fetchMyJob({ page, limit, sortBy, order }));
  }, [page, limit, sortBy, order]);

  return (
    <div>
      <JobList
        searchTerm={""}
        currentPage={page}
        jobsPerPage={limit}
        setCurrentPage={setPage}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default AdminJobList;
