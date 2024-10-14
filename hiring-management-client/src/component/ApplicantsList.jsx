import React from "react";
import { useSelector } from "react-redux";
import ApplicationCard from "./ApplicationCard";

const ApplicantsList = () => {
  const { applications, applicationDetails, loading, error } = useSelector(
    (state) => state.application
  );
  if(applications.length==0){
    return (
      <p className="text-red-500">No Applications Submitted yet</p>
    )
  }
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      {applications.map((application) => (
        <ApplicationCard key={application._id} application={application} />
      ))}
    </div>
  );
};

export default ApplicantsList;
