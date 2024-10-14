import React, { useState } from "react";
import AdminJobList from "../component/AdminJobList";
import ApplicantsList from "../component/ApplicantsList";
import JobFormModal from "../component/JobFormModal";

const Admin = () => {
  const [showJobs, setShowJobs] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleCreateJobClick = () => {
    setIsUpdate(false);
    setSelectedJob(null);
    setModalOpen(true);
  };

  const handleUpdate = (job) => {
    setIsUpdate(true);
    setSelectedJob(job);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-10 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          className="bg-blue-600 text-white p-3 rounded shadow-lg transition duration-300 hover:bg-blue-700"
          onClick={handleCreateJobClick}
        >
          Create New Job
        </button>

        <button
          className="bg-blue-600 text-white p-3 rounded shadow-lg transition duration-300 hover:bg-blue-700"
          onClick={() => setShowJobs(!showJobs)}
        >
          {showJobs ? 'Hide Jobs' : 'See Jobs'}
        </button>
      </div>

      {modalOpen && (
        <JobFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={selectedJob}
          isUpdate={isUpdate}
        />
      )}

      {showJobs && (
        <div className="mt-4 shadow-md p-4 bg-white rounded-lg">
          <AdminJobList handleUpdate={handleUpdate} />
        </div>
      )}
    </div>
  );
};

export default Admin;
