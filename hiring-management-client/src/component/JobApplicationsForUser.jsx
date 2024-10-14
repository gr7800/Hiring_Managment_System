import React, { useState } from "react";
import { Link } from "react-router-dom";

const JobApplicationsForUser = ({ applications = [] }) => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Job Applications</h2>
            {applications.length > 0 ? (
                <ul className="space-y-4">
                    {applications.map((application) => (
                        <li key={application._id} className="border rounded p-4 shadow bg-white transition-transform hover:shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold">{application.job.title}</p>
                                    <p className="text-sm text-gray-500">Location: {application.job.location}</p>
                                    <p className="text-sm text-gray-500">Status: {application.status}</p>
                                </div>
                                <button
                                    onClick={() => toggleExpand(application._id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-700"
                                >
                                    {expandedId === application._id ? "Hide Details" : "Show Details"}
                                </button>
                            </div>

                            {expandedId === application._id && (
                                <div className="mt-4 text-gray-700">
                                    <p><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
                                    <p>
                                        <strong>Job ID:</strong>{" "}
                                        <Link to={`/jobs/${application.job._id}`} className="underline text-blue-500 hover:text-blue-600 transition duration-200">{application.job._id}</Link>
                                    </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No applications found.</p>
            )}
        </div>
    );
};

export default JobApplicationsForUser;
