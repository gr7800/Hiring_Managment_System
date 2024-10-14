import React, { useState, useEffect } from 'react';
import JobList from '../component/JobList';
import { useDispatch } from 'react-redux';
import { fetchJobs } from '../redux/slices/jobSlice';

const Job = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 9;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchJobs({ searchTerm, page: currentPage, limit: jobsPerPage }));
    }, [searchTerm, currentPage, dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(fetchJobs({ searchTerm, page: 1, limit: jobsPerPage }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold mb-4 lg:mb-0 text-gray-800">Job Listings</h1>
                <form onSubmit={handleSearch} className="flex gap-2 w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Search for jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg w-full md:w-64 lg:w-80 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
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
