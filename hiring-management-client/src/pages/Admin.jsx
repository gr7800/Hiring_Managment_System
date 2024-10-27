import React, { useState } from "react";
import AdminJobList from "../component/AdminJobList";
import ApplicantsList from "../component/ApplicantsList";
import JobFormModal from "../component/JobFormModal";

const Admin = () => {
  const [showJobs, setShowJobs] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const toggleModal = (job = null, updateMode = false) => {
    setSelectedJob(job);
    setIsUpdate(updateMode);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="container mx-auto px-8 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Hr Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          className="buttonbg text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
          onClick={() => toggleModal()}
        >
          Create New Job
        </button>

        <button
          className="buttonbg text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
          onClick={() => setShowJobs((prev) => !prev)}
        >
          {showJobs ? "Hide Jobs" : "Show Jobs"}
        </button>
      </div>

      {modalOpen && (
        <JobFormModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          initialData={selectedJob}
          isUpdate={isUpdate}
        />
      )}

      {showJobs && (
        <div className="mt-6 bg-white p-6 shadow-lg shadow-[#1f84b9] rounded-md">
          <AdminJobList handleUpdate={(job) => toggleModal(job, true)} />
        </div>
      )}
    </div>
  );
};

export default Admin;
