import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createJob as handleCreateJob, updateJob as handleUpdateJob } from '../redux/slices/jobSlice';

const JobFormModal = ({ isOpen, onClose, initialData, isUpdate }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salaryRange: '',
        jobType: 'Full-time',
        remoteOrOnsite: 'Remote',
        experiences: '',
        educationalRequirements: '',
    });

    useEffect(() => {
        if (isUpdate && initialData) {
            setFormData(initialData);
        }
    }, [isUpdate, initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            dispatch(handleUpdateJob(formData));
        } else {
            dispatch(handleCreateJob(formData));
        }
        onClose(); 
    };

    if (!isOpen) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal-container shadow-lg p-8 bg-white rounded">
                <form onSubmit={handleSubmit}>
                    <h2>{isUpdate ? "Update Job" : "Create Job"}</h2>
                    <input
                        className="input-field"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Job Title"
                        required
                    />
                    <textarea
                        className="input-field"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Job Description"
                        required
                    />
                    <input
                        className="input-field"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                    />
                    <input
                        className="input-field"
                        type="text"
                        name="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleChange}
                        placeholder="Salary Range"
                        required
                    />
                    <select className="input-field" name="jobType" value={formData.jobType} onChange={handleChange}>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <select
                        className="input-field"
                        name="remoteOrOnsite"
                        value={formData.remoteOrOnsite}
                        onChange={handleChange}
                    >
                        <option value="Remote">Remote</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                    <input
                        className="input-field"
                        type="text"
                        name="experiences"
                        value={formData.experiences}
                        onChange={handleChange}
                        placeholder="Experience Required"
                        required
                    />
                    <input
                        className="input-field"
                        type="text"
                        name="educationalRequirements"
                        value={formData.educationalRequirements}
                        onChange={handleChange}
                        placeholder="Educational Requirements"
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 bg-red-500 text-white p-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                            {isUpdate ? "Update Job" : "Create Job"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobFormModal;
