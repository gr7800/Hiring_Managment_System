import React from "react";
import { useSelector } from "react-redux";
import ApplicationCard from "./ApplicationCard";

const ApplicantsList = () => {
  const { applications, loading, error } = useSelector((state) => state.application);

  if (loading) {
    return <div className="flex justify-center items-center h-40">Loading...</div>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!applications || applications.length === 0) {
    return <p className="text-red-500">No Applications Submitted yet</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      <div className="grid gap-4">
        {applications.map((application) => (
          <ApplicationCard key={application._id} application={application} />
        ))}
      </div>
    </div>
  );
};

export default ApplicantsList;
