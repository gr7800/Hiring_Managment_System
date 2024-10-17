import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex flex-wrap items-center shadow-lg shadow-[#1f84b9] justify-center mt-4 gap-4 px-4 py-4 bg-gray-100 rounded-lg">
      <button
        className={`flex justify-center items-center buttonbg text-white rounded-md px-3 py-1 text-sm font-semibold w-fit ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:buttonbg"}`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="flex justify-center items-center buttonbg text-white rounded-md px-3 py-1 text-sm font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={`flex justify-center items-center buttonbg text-white rounded-md px-3 py-1 text-sm font-semibold w-fit ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:buttonbg"}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
