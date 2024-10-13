import React, { useState } from 'react';
import JobList from '../component/JobList'; 
import { useDispatch } from 'react-redux';
import { fetchJobs } from '../redux/slices/jobSlice';

const Job = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const jobsPerPage = 9;
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); 
        dispatch(fetchJobs({ searchTerm, page: 1, limit: jobsPerPage }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 lg:mb-0">Job Listings</h1>
                <form onSubmit={handleSearch} className="flex gap-2 w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Search for jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full md:w-64 lg:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                        Search
                    </button>
                </form>
            </div>
            <JobList
                searchTerm={searchTerm}
                currentPage={currentPage}
                jobsPerPage={jobsPerPage}
                setCurrentPage={setCurrentPage} 
            />
        </div>
    );
};

export default Job;
