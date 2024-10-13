import React, { useState } from 'react';
import AdminJobList from '../component/AdminJobList';
import ApplicantsList from '../component/ApplicantsList';
import JobFormModal from '../component/JobFormModal';

const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [isUpdate, setIsUpdate] = useState(false);   
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCreateJobClick = () => {
    setIsUpdate(false);
    setSelectedJob(null);
    setModalOpen(true);
  };

  const handleCreateJob = (jobDetails) => {
    const newJob = { id: jobs.length + 1, ...jobDetails };
    setJobs([...jobs, newJob]);
    setModalOpen(false); 
  };

  const handleUpdateJob = (job) => {
    setIsUpdate(true);
    setSelectedJob(job); 
    setModalOpen(true);
  };

  const handleJobUpdateSubmit = (updatedJob) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    setModalOpen(false); 
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleViewApplicants = (jobId) => {
    setShowApplicants(true);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Button to open the Job creation modal */}
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleCreateJobClick}>
        Create New Job
      </button>

      {modalOpen && (
        <JobFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}  
          initialData={selectedJob}           
          isUpdate={isUpdate}                 
          onCreate={handleCreateJob}         
          onUpdate={handleJobUpdateSubmit}   
        />
      )}

      <AdminJobList
        jobs={jobs}
        onDelete={handleDeleteJob}
        onUpdate={handleUpdateJob}
        onViewApplicants={handleViewApplicants}
      />

      {showApplicants && <ApplicantsList applicants={applicants} />}
    </div>
  );
};

export default Admin;
