import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job,  }) => {

    return (
        <div className="job-card border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.description}</p>
            <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-700"><strong>Salary:</strong> {job.salaryRange}</p>
            <p className="text-gray-700"><strong>Job Type:</strong> {job.jobType}</p>
            <p className="text-gray-700"><strong>Remote/Onsite:</strong> {job.remoteOrOnsite}</p>
            <p className="text-gray-700"><strong>Experience:</strong> {job.experiences}</p>
            <p className="text-gray-700"><strong>Education:</strong> {job.educationalRequirements}</p>
            <p className="text-gray-700"><strong>Company:</strong> {job.companyName}</p>
            <p className="text-gray-700"><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Application Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
            <div className="mt-4 flex space-x-2">
                <Link
                    to={`/jobs/${job._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    See More
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
