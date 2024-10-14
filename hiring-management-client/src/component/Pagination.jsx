import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center shadow-lg shadow-green-200 justify-center mt-4 gap-4 px-4 py-2 bg-gray-300 rounded-lg">
      <button
        className={`flex justify-center items-center bg-green-200 text-green-700 rounded-full px-3 py-1 text-sm font-semibold w-fit ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-200"}`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="flex justify-center items-center bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={`flex justify-center items-center bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold w-fit ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-green-200"}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
