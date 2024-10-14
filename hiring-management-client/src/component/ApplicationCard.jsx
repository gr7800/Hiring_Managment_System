import React from 'react';

const ApplicationCard = ({ application }) => {

  const handleClick = () => {
    // history.push(`/applications/${application._id}`); 
  };

  return (
    <div 
      className="border rounded-lg p-4 mb-4 shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="font-semibold text-lg text-blue-600">{application.job.title}</h3>
      <p className="text-gray-700"><strong>Applicant:</strong> {application.applicant.name}</p>
      <p className="text-gray-700"><strong>Email:</strong> {application.applicant.email}</p>
      <p className="text-gray-700"><strong>Location:</strong> {application.job.location}</p>
      <p className="text-gray-700"><strong>Status:</strong> <span className="text-green-500">{application.status}</span></p>
      <p className="text-gray-500"><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ApplicationCard;
